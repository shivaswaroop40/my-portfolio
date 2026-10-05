/**
 * shivu.io edge worker.
 *
 * Runs in front of the static assets and does four things:
 *   1. Agent mode — AI agents, crawlers, and CLI clients asking for a page
 *      get the markdown mirror (/agent.md) instead of HTML. Detection uses
 *      the User-Agent, an explicit Accept: text/markdown preference, a
 *      ?format=md override, and Cloudflare's verified-bot classification
 *      (request.cf.verifiedBotCategory).
 *   2. Redirects — www → apex, /blog → the Notion blog.
 *   3. Sift and 4sight — /sift and /4sight are proxied to their own GitHub
 *      Pages sites.
 *   4. Security + caching headers on everything that passes through.
 */

const BLOG_URL =
  'https://shiva-swaroop.notion.site/Shiv-Writes-About-Stuff-2066afd5b4ac800fabeae431c4b7a271';

// Sift and 4sight each build and deploy from their own repo to GitHub Pages
// under the same base path they use here (/sift, /4sight), so they are proxied
// rather than deployed twice. GitHub Pages stays the origin and its URL keeps
// working for existing feed subscribers and links.
const PAGES_ORIGIN = 'https://shivaswaroop40.github.io';
const PROXIED_APPS = ['/sift', '/4sight'];

async function proxyPages(request, url, base) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
  }
  const headers = new Headers();
  for (const name of ['accept', 'if-none-match', 'if-modified-since']) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  const upstream = await fetch(PAGES_ORIGIN + url.pathname + url.search, {
    method: request.method,
    headers,
    redirect: 'manual',
  });

  // GitHub Pages redirects /sift/tech to its own absolute /sift/tech/.
  const location = upstream.headers.get('location');
  if (location) {
    return Response.redirect(location.replace(PAGES_ORIGIN, url.origin), upstream.status);
  }

  // Feeds and the about page carry absolute URLs. Point them at this host.
  const type = upstream.headers.get('content-type') || '';
  if (request.method === 'GET' && upstream.status === 200 && /html|xml/i.test(type)) {
    const body = (await upstream.text()).replaceAll(`${PAGES_ORIGIN}${base}`, `${url.origin}${base}`);
    const res = new Response(body, upstream);
    res.headers.delete('content-length');
    return res;
  }
  return upstream;
}

// UA fragments that identify AI agents, crawlers, and programmatic clients.
const AGENT_UA =
  /\b(bot|crawler|spider|crawling|gptbot|chatgpt|oai-searchbot|claudebot|claude-web|claude-user|anthropic|perplexity|google-extended|geminibot|cohere|ccbot|bytespider|amazonbot|applebot|duckassistbot|meta-external|mistralai|youbot|phindbot|exabot|curl|wget|httpie|python-requests|python-urllib|aiohttp|httpx|go-http-client|node-fetch|undici|axios|libwww|okhttp|java\/|ruby|lua-resty)\b/i;

// Paths that make sense to answer with the markdown mirror.
const PAGE_PATHS = new Set(['/', '/index.html', '/agent', '/agent/']);

function wantsMarkdown(request, url) {
  if (url.searchParams.get('format') === 'md') return true;
  if (url.searchParams.get('format') === 'html') return false;

  const accept = request.headers.get('accept') || '';
  // A client that explicitly prefers markdown/plain over html.
  if (/text\/(markdown|plain)/i.test(accept) && !/text\/html/i.test(accept)) return true;

  const cfCategory = request.cf && request.cf.verifiedBotCategory;
  if (cfCategory && cfCategory !== 'Search Engine Optimization') return true;

  const ua = request.headers.get('user-agent') || '';
  if (ua === '' || AGENT_UA.test(ua)) return true;

  return false;
}

function withHeaders(response, extra = {}) {
  const res = new Response(response.body, response);
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  for (const [k, v] of Object.entries(extra)) res.headers.set(k, v);
  return res;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // www → apex
    if (url.hostname === 'www.shivu.io') {
      url.hostname = 'shivu.io';
      return Response.redirect(url.toString(), 301);
    }

    // Blog lives on Notion.
    if (url.pathname === '/blog' || url.pathname === '/blog/') {
      return Response.redirect(BLOG_URL, 302);
    }

    for (const base of PROXIED_APPS) {
      if (url.pathname === base) {
        return Response.redirect(`${url.origin}${base}/${url.search}`, 301);
      }
      if (url.pathname.startsWith(`${base}/`)) {
        return withHeaders(await proxyPages(request, url, base));
      }
    }

    // Agent mode: answer page requests from agents with the markdown mirror.
    if (PAGE_PATHS.has(url.pathname) && wantsMarkdown(request, url)) {
      const md = await env.ASSETS.fetch(new URL('/agent.md', url.origin));
      return withHeaders(md, {
        'Content-Type': 'text/markdown; charset=utf-8',
        'X-Agent-Mode': 'active',
        'Cache-Control': 'public, max-age=300',
        Vary: 'Accept, User-Agent',
      });
    }

    // /agent for humans renders a small HTML explainer.
    if (url.pathname === '/agent' || url.pathname === '/agent/') {
      const page = await env.ASSETS.fetch(new URL('/agent.html', url.origin));
      return withHeaders(page, { Vary: 'Accept, User-Agent' });
    }

    const response = await env.ASSETS.fetch(request);

    const extra = {};
    if (PAGE_PATHS.has(url.pathname)) extra['Vary'] = 'Accept, User-Agent';
    if (/\.(jpg|jpeg|png|webp|avif|mp3|woff2?)$/i.test(url.pathname)) {
      extra['Cache-Control'] = 'public, max-age=31536000, immutable';
    }
    return withHeaders(response, extra);
  },
};
