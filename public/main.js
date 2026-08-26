(function () {
    'use strict';

    // Theme toggle — dark by default (set inline in <head>), persisted
    var html = document.documentElement;
    var toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', function () {
            var next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) {}
        });
    }

    // Scrollspy — highlight the sidebar nav link for the section in view
    var navLinks = document.querySelectorAll('.side-nav a[href^="#"]');
    if (navLinks.length && 'IntersectionObserver' in window) {
        var byId = {};
        navLinks.forEach(function (link) {
            byId[link.getAttribute('href').slice(1)] = link;
        });
        var current = null;
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    if (current) current.classList.remove('active');
                    current = byId[entry.target.id];
                    if (current) current.classList.add('active');
                }
            });
        }, { rootMargin: '-25% 0px -65% 0px' });
        Object.keys(byId).forEach(function (id) {
            var section = document.getElementById(id);
            if (section) observer.observe(section);
        });
    }

    // Opt-in ambient music (Reethigowla excerpt), footer only
    var musicBtn = document.getElementById('music-toggle');
    var audio = document.getElementById('ambient-music');
    if (musicBtn && audio) {
        var label = musicBtn.querySelector('.music-btn-label');
        musicBtn.addEventListener('click', function () {
            if (audio.paused) {
                audio.volume = 0.55;
                audio.play().then(function () {
                    musicBtn.setAttribute('aria-pressed', 'true');
                    if (label) label.textContent = 'Pause Reethigowla';
                }).catch(function () { /* autoplay policies; ignore */ });
            } else {
                audio.pause();
                musicBtn.setAttribute('aria-pressed', 'false');
                if (label) label.textContent = 'Play Reethigowla';
            }
        });
    }

    // If an automated browser is visiting, point it at the machine-readable routes
    if (navigator.webdriver) {
        var note = document.getElementById('agent-note');
        if (note) note.hidden = false;
    }
})();
