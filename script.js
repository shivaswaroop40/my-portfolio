(function () {
    'use strict';

    const prefersReducedMotion = () =>
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initSplash() {
        const root = document.documentElement;
        if (root.classList.contains('splash-dismissed')) return;

        const splash = document.getElementById('splash-screen');
        if (!splash) return;

        function dismiss() {
            try {
                sessionStorage.setItem('portfolioSplashSeen', '1');
            } catch (e) {
                /* private mode */
            }
            root.classList.add('splash-dismissed');
            splash.setAttribute('aria-hidden', 'true');
        }

        const enter = splash.querySelector('.splash-enter');
        const backdrop = splash.querySelector('.splash-backdrop');

        enter?.addEventListener('click', dismiss);
        backdrop?.addEventListener('click', dismiss);

        splash.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                dismiss();
            }
        });

        requestAnimationFrame(() => enter?.focus());
    }

    initSplash();

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const theme = html.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Mobile navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = navToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }

    navItems.forEach((item) => {
        item.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (navToggle) {
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    });

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#' || id === '') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top,
                behavior: prefersReducedMotion() ? 'auto' : 'smooth',
            });
        });
    });

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        let current = '';
        sections.forEach((section) => {
            const top = section.offsetTop - 120;
            if (scrollY >= top) current = section.getAttribute('id') || '';
        });
        links.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${current}`);
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    function slideLabel(slide, index, total) {
        const h = slide.querySelector('h3, h4');
        if (h && h.textContent.trim()) return h.textContent.trim();
        const img = slide.querySelector('img');
        if (img && img.alt && img.alt.trim()) return img.alt.trim();
        return `Slide ${index + 1}`;
    }

    function initCarousel(root) {
        const track = root.querySelector('.carousel-track');
        const viewport = root.querySelector('.carousel-viewport');
        const prevBtn = root.querySelector('.carousel-prev');
        const nextBtn = root.querySelector('.carousel-next');
        const dotsBox = root.querySelector('.carousel-dots');
        const live = root.querySelector('[aria-live="polite"]');
        const autoplayEnabled = root.getAttribute('data-carousel-autoplay') === 'true';
        const isPhoto = root.classList.contains('photo-carousel');

        if (!track || !viewport || !dotsBox) return;

        const slides = () => [...track.querySelectorAll(':scope > .carousel-slide')];

        let index = 0;
        let autoplayTimer = null;
        let resizeRaf = null;

        function layoutAndApply() {
            const list = slides();
            const total = list.length;
            if (total === 0) return;

            const w = viewport.clientWidth || Math.round(viewport.getBoundingClientRect().width);
            if (w <= 0) return;

            index = ((index % total) + total) % total;

            if (isPhoto) {
                track.getAnimations().forEach((a) => a.cancel());
            }

            list.forEach((slide) => {
                slide.style.flex = `0 0 ${w}px`;
                slide.style.width = `${w}px`;
                slide.style.minWidth = `${w}px`;
                slide.style.maxWidth = `${w}px`;
                slide.style.boxSizing = 'border-box';
            });
            track.style.width = `${total * w}px`;
            track.style.transform = `translateX(-${index * w}px)`;

            dotsBox.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
                dot.setAttribute('aria-selected', idx === index ? 'true' : 'false');
            });
            list.forEach((s, idx) => {
                s.setAttribute('aria-hidden', idx === index ? 'false' : 'true');
            });
            if (live) {
                const label = slideLabel(list[index], index, total);
                live.textContent = `Slide ${index + 1} of ${total}: ${label}`;
            }

            if (isPhoto && list.length) {
                requestAnimationFrame(() => {
                    list.forEach((s) => {
                        s.style.minHeight = '';
                    });
                    requestAnimationFrame(() => {
                        let maxH = 0;
                        list.forEach((s) => {
                            maxH = Math.max(maxH, s.scrollHeight);
                        });
                        const cap = Math.min(Math.floor(window.innerHeight * 0.88), 960);
                        maxH = Math.min(Math.max(maxH, 220), cap);
                        list.forEach((s) => {
                            s.style.minHeight = `${maxH}px`;
                        });
                        viewport.style.minHeight = `${maxH}px`;
                    });
                });
            } else if (!isPhoto) {
                viewport.style.minHeight = '';
            }
        }

        root.addEventListener('carousel:reflow', layoutAndApply);

        const list0 = slides();
        if (list0.length === 0) return;

        if (list0.length === 1) {
            root.dataset.single = 'true';
            layoutAndApply();
            if (live) live.textContent = slideLabel(list0[0], 0, 1);
            if (isPhoto) {
                const img = list0[0].querySelector('img');
                if (img) {
                    const bump = () => layoutAndApply();
                    if (img.complete) requestAnimationFrame(bump);
                    else img.addEventListener('load', () => requestAnimationFrame(bump), { once: true });
                }
            }
            return;
        }

        function buildDots() {
            dotsBox.innerHTML = '';
            slides().forEach((_, idx) => {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 'carousel-dot';
                b.setAttribute('role', 'tab');
                b.setAttribute('aria-label', `Go to slide ${idx + 1}`);
                b.addEventListener('click', () => {
                    index = idx;
                    layoutAndApply();
                    restartAutoplay();
                });
                dotsBox.appendChild(b);
            });
        }

        buildDots();
        layoutAndApply();

        if (isPhoto) {
            track.querySelectorAll('img').forEach((img) => {
                const bump = () => layoutAndApply();
                if (img.complete) requestAnimationFrame(bump);
                else img.addEventListener('load', () => requestAnimationFrame(bump), { once: true });
            });
        }

        const ro = new ResizeObserver(() => {
            if (resizeRaf) cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(() => {
                resizeRaf = null;
                layoutAndApply();
            });
        });
        ro.observe(viewport);

        function step(delta) {
            const total = slides().length;
            if (total === 0) return;
            index += delta;
            layoutAndApply();
            restartAutoplay();
        }

        prevBtn?.addEventListener('click', () => step(-1));
        nextBtn?.addEventListener('click', () => step(1));

        root.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                step(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                step(1);
            }
        });

        function startAutoplay() {
            if (!autoplayEnabled || prefersReducedMotion() || slides().length <= 1) return;
            stopAutoplay();
            autoplayTimer = window.setInterval(() => {
                index += 1;
                layoutAndApply();
            }, 6500);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                window.clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        function restartAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        root.addEventListener('mouseenter', stopAutoplay);
        root.addEventListener('mouseleave', startAutoplay);
        root.addEventListener('focusin', stopAutoplay);
        root.addEventListener('focusout', () => {
            if (!root.contains(document.activeElement)) startAutoplay();
        });

        startAutoplay();

        if (isPhoto) {
            window.addEventListener(
                'load',
                () => {
                    layoutAndApply();
                },
                { once: true }
            );

            if (slides().length > 1 && !prefersReducedMotion()) {
                let peekIntervalId = null;

                function clearPeekSchedule() {
                    if (peekIntervalId) {
                        window.clearInterval(peekIntervalId);
                        peekIntervalId = null;
                    }
                    track.getAnimations().forEach((a) => a.cancel());
                }

                function schedulePeekHints() {
                    clearPeekSchedule();
                    peekIntervalId = window.setInterval(runPeekHint, 10500);
                }

                function runPeekHint() {
                    if (document.hidden) return;
                    if (root.matches(':hover')) return;
                    if (root.contains(document.activeElement)) return;

                    const list = slides();
                    const total = list.length;
                    if (total <= 1) return;

                    const w = viewport.clientWidth || Math.round(viewport.getBoundingClientRect().width);
                    if (w <= 0) return;

                    const base = -index * w;
                    const nudge = Math.min(40, Math.max(16, Math.round(w * 0.04)));
                    const nudge2 = Math.round(nudge * 0.65);

                    const peekTowardNext = index < total - 1;
                    const d1 = peekTowardNext ? -nudge : nudge;
                    const d2 = peekTowardNext ? -nudge2 : nudge2;

                    track.getAnimations().forEach((a) => a.cancel());

                    const anim = track.animate(
                        [
                            { transform: `translateX(${base}px)` },
                            { transform: `translateX(${base + d1}px)` },
                            { transform: `translateX(${base}px)` },
                            { transform: `translateX(${base + d2}px)` },
                            { transform: `translateX(${base}px)` },
                        ],
                        {
                            duration: 780,
                            easing: 'cubic-bezier(0.33, 1.1, 0.55, 1)',
                        }
                    );

                    anim.onfinish = () => {
                        track.style.transform = `translateX(${base}px)`;
                    };
                }

                window.setTimeout(runPeekHint, 3200);
                schedulePeekHints();

                root.addEventListener('mouseenter', clearPeekSchedule);
                root.addEventListener('mouseleave', schedulePeekHints);
                root.addEventListener('focusin', clearPeekSchedule);
                root.addEventListener('focusout', () => {
                    if (!root.contains(document.activeElement)) {
                        schedulePeekHints();
                    }
                });
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) clearPeekSchedule();
                    else schedulePeekHints();
                });
            }
        }
    }

    /** Encode each path segment so spaces and unicode in filenames load correctly. */
    function encodePicturePath(path) {
        return path
            .split('/')
            .filter(Boolean)
            .map((seg) => encodeURIComponent(seg))
            .join('/');
    }

    async function initPhotoAlbum() {
        const section = document.querySelector('.photo-album-section');
        const root = document.querySelector('.photo-carousel');
        const track = root?.querySelector('.photo-carousel-track');
        if (!section || !root || !track) return;

        try {
            const res = await fetch('pictures/manifest.json', { cache: 'no-store' });
            if (!res.ok) throw new Error('manifest missing');
            const urls = await res.json();
            if (!Array.isArray(urls) || urls.length === 0) {
                section.classList.add('is-empty');
                return;
            }

            urls.forEach((url, idx) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide photo-slide';
                slide.setAttribute('role', 'group');
                slide.setAttribute('aria-roledescription', 'slide');
                const img = document.createElement('img');
                img.src = encodePicturePath(url);
                img.alt = 'Album photo';
                img.loading = 'eager';
                img.decoding = 'async';
                slide.appendChild(img);
                track.appendChild(slide);
            });

            initCarousel(root);
        } catch {
            section.classList.add('is-empty');
        }
    }

    function initBentoTilt() {
        if (prefersReducedMotion()) return;
        document.querySelectorAll('[data-bento-tilt]').forEach((tile) => {
            tile.style.setProperty('--tilt-x', '0deg');
            tile.style.setProperty('--tilt-y', '0deg');
            const maxTilt = 7;
            tile.addEventListener('mousemove', (e) => {
                const rect = tile.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                tile.style.setProperty('--tilt-x', `${y * -maxTilt}deg`);
                tile.style.setProperty('--tilt-y', `${x * maxTilt}deg`);
            });
            tile.addEventListener('mouseleave', () => {
                tile.style.setProperty('--tilt-x', '0deg');
                tile.style.setProperty('--tilt-y', '0deg');
            });
        });
    }

    initBentoTilt();

    document.querySelectorAll('.projects-carousel').forEach((el) => initCarousel(el));
    initPhotoAlbum().then(() => {
        const sec = document.querySelector('.photo-album-section');
        const link = document.querySelector('a[href="#snapshots"]');
        if (sec?.classList.contains('is-empty') && link) {
            link.hidden = true;
        }
    });

    // Scroll reveal
    const revealEls = document.querySelectorAll('.scroll-reveal');
    if (revealEls.length && !prefersReducedMotion()) {
        const revObs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        revObs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.04, rootMargin: '0px 0px 10% 0px' }
        );
        revealEls.forEach((el) => revObs.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('is-visible'));
    }
})();
