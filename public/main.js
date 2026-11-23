(function () {
    'use strict';

    // Scrollspy: highlight the nav strip link for the section in view
    var navLinks = document.querySelectorAll('.section-nav a[href^="#"]');
    if (navLinks.length && 'IntersectionObserver' in window) {
        var visible = {};
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                visible[entry.target.id] = entry.isIntersecting;
            });
            // About and Now sit side by side, so pick the first visible section in nav order.
            var first = null;
            navLinks.forEach(function (link) {
                var id = link.getAttribute('href').slice(1);
                if (!first && visible[id]) first = link;
            });
            if (!first) return;
            navLinks.forEach(function (link) { link.classList.toggle('active', link === first); });
        }, { rootMargin: '-25% 0px -65% 0px' });
        navLinks.forEach(function (link) {
            var section = document.getElementById(link.getAttribute('href').slice(1));
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
