(function () {
    'use strict';

    var SIZE = 4;
    var LB_KEY = 'portfolio2048Leaderboard';
    var BEST_KEY = 'portfolio2048Best';
    var MAX_LB = 10;

    function emptyGrid() {
        var g = [];
        for (var r = 0; r < SIZE; r++) {
            g[r] = [];
            for (var c = 0; c < SIZE; c++) g[r][c] = 0;
        }
        return g;
    }

    function cloneGrid(g) {
        return g.map(function (row) {
            return row.slice();
        });
    }

    function gridsEqual(a, b) {
        for (var r = 0; r < SIZE; r++) {
            for (var c = 0; c < SIZE; c++) {
                if (a[r][c] !== b[r][c]) return false;
            }
        }
        return true;
    }

    function slideLeft(row) {
        var arr = row.filter(function (x) {
            return x !== 0;
        });
        var out = [];
        var scoreAdd = 0;
        for (var i = 0; i < arr.length; i++) {
            if (i < arr.length - 1 && arr[i] === arr[i + 1]) {
                var v = arr[i] * 2;
                out.push(v);
                scoreAdd += v;
                i++;
            } else {
                out.push(arr[i]);
            }
        }
        while (out.length < SIZE) out.push(0);
        return { row: out, scoreAdd: scoreAdd };
    }

    function moveLeft(grid) {
        var total = 0;
        var newGrid = grid.map(function (row) {
            var res = slideLeft(row.slice());
            total += res.scoreAdd;
            return res.row;
        });
        return { grid: newGrid, scoreAdd: total };
    }

    function moveRight(grid) {
        var total = 0;
        var newGrid = grid.map(function (row) {
            var rev = row.slice().reverse();
            var res = slideLeft(rev);
            total += res.scoreAdd;
            return res.row.reverse();
        });
        return { grid: newGrid, scoreAdd: total };
    }

    function transpose(g) {
        var t = emptyGrid();
        for (var r = 0; r < SIZE; r++) {
            for (var c = 0; c < SIZE; c++) {
                t[c][r] = g[r][c];
            }
        }
        return t;
    }

    function moveUp(grid) {
        var t = transpose(grid);
        var res = moveLeft(t);
        return { grid: transpose(res.grid), scoreAdd: res.scoreAdd };
    }

    function moveDown(grid) {
        var t = transpose(grid);
        var total = 0;
        var nt = t.map(function (row) {
            var rev = row.slice().reverse();
            var res = slideLeft(rev);
            total += res.scoreAdd;
            return res.row.reverse();
        });
        return { grid: transpose(nt), scoreAdd: total };
    }

    function tryMove(grid, dir) {
        if (dir === 'left') return moveLeft(grid);
        if (dir === 'right') return moveRight(grid);
        if (dir === 'up') return moveUp(grid);
        if (dir === 'down') return moveDown(grid);
        return { grid: cloneGrid(grid), scoreAdd: 0 };
    }

    function addRandomTile(grid) {
        var empties = [];
        for (var r = 0; r < SIZE; r++) {
            for (var c = 0; c < SIZE; c++) {
                if (grid[r][c] === 0) empties.push([r, c]);
            }
        }
        if (empties.length === 0) return false;
        var pick = empties[Math.floor(Math.random() * empties.length)];
        grid[pick[0]][pick[1]] = Math.random() < 0.9 ? 2 : 4;
        return true;
    }

    function canMove(g) {
        var r, c;
        for (r = 0; r < SIZE; r++) {
            for (c = 0; c < SIZE; c++) {
                if (g[r][c] === 0) return true;
            }
        }
        for (r = 0; r < SIZE; r++) {
            for (c = 0; c < SIZE; c++) {
                var v = g[r][c];
                if (c < SIZE - 1 && g[r][c + 1] === v) return true;
                if (r < SIZE - 1 && g[r + 1][c] === v) return true;
            }
        }
        return false;
    }

    function loadLeaderboard() {
        try {
            var raw = localStorage.getItem(LB_KEY);
            if (!raw) return [];
            var arr = JSON.parse(raw);
            if (!Array.isArray(arr)) return [];
            return arr
                .filter(function (e) {
                    return e && typeof e.score === 'number' && typeof e.name === 'string';
                })
                .sort(function (a, b) {
                    return b.score - a.score;
                })
                .slice(0, MAX_LB);
        } catch (e) {
            return [];
        }
    }

    function saveLeaderboard(entries) {
        try {
            localStorage.setItem(LB_KEY, JSON.stringify(entries.slice(0, MAX_LB)));
        } catch (e) {
            /* private mode */
        }
    }

    function qualifies(score, entries) {
        if (score <= 0) return false;
        if (entries.length < MAX_LB) return true;
        return score >= entries[MAX_LB - 1].score;
    }

    function addEntry(name, score) {
        var trimmed = (name || '').trim() || 'Anonymous';
        if (trimmed.length > 24) trimmed = trimmed.slice(0, 24);
        var entries = loadLeaderboard();
        entries.push({
            name: trimmed,
            score: score,
            at: new Date().toISOString(),
        });
        entries.sort(function (a, b) {
            return b.score - a.score;
        });
        saveLeaderboard(entries);
        return entries;
    }

    function readBest() {
        try {
            var v = parseInt(localStorage.getItem(BEST_KEY), 10);
            return isNaN(v) ? 0 : v;
        } catch (e) {
            return 0;
        }
    }

    function writeBest(n) {
        try {
            var cur = readBest();
            if (n > cur) localStorage.setItem(BEST_KEY, String(n));
        } catch (e) {
            /* private mode */
        }
    }

    var root = document.getElementById('game-2048');
    if (!root) return;

    var boardEl = document.getElementById('g2048-board');
    var scoreEl = document.getElementById('g2048-score');
    var bestEl = document.getElementById('g2048-best');
    var lbEl = document.getElementById('g2048-leaderboard');
    var overlay = document.getElementById('g2048-overlay');
    var overlayTitle = document.getElementById('g2048-overlay-title');
    var overlayScore = document.getElementById('g2048-overlay-score');
    var nameInput = document.getElementById('g2048-name');
    var saveBtn = document.getElementById('g2048-save');
    var skipSaveBtn = document.getElementById('g2048-skip-save');
    var newBtn = document.getElementById('g2048-new');
    var resetLbBtn = document.getElementById('g2048-reset-lb');
    var live = document.getElementById('g2048-live');
    var overlayAgainBtn = document.getElementById('g2048-overlay-again');

    var grid = emptyGrid();
    var score = 0;
    var gameOver = false;
    var touchStart = null;

    function renderBoard() {
        boardEl.innerHTML = '';
        for (var r = 0; r < SIZE; r++) {
            for (var c = 0; c < SIZE; c++) {
                var cell = document.createElement('div');
                cell.className = 'g2048-cell';
                var v = grid[r][c];
                if (v) {
                    var tile = document.createElement('div');
                    tile.className = 'g2048-tile';
                    tile.setAttribute('data-value', String(v));
                    tile.textContent = String(v);
                    cell.appendChild(tile);
                }
                boardEl.appendChild(cell);
            }
        }
    }

    function renderLeaderboard() {
        var entries = loadLeaderboard();
        lbEl.innerHTML = '';
        if (entries.length === 0) {
            var li = document.createElement('li');
            li.className = 'g2048-lb-empty';
            li.textContent = 'No scores yet, yours could be first.';
            lbEl.appendChild(li);
            return;
        }
        entries.forEach(function (e, i) {
            var li = document.createElement('li');
            li.innerHTML =
                '<span class="g2048-lb-rank">' +
                (i + 1) +
                '</span><span class="g2048-lb-name">' +
                escapeHtml(e.name) +
                '</span><span class="g2048-lb-score">' +
                e.score +
                '</span>';
            lbEl.appendChild(li);
        });
    }

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function updateHud() {
        scoreEl.textContent = String(score);
        var best = Math.max(readBest(), score);
        bestEl.textContent = String(best);
        if (live) {
            live.textContent = 'Score ' + score + '. ' + (gameOver ? 'Game over.' : 'Playing.');
        }
    }

    function showOverlay(finalScore, canSave) {
        gameOver = true;
        overlay.hidden = false;
        if (canSave) {
            overlayTitle.textContent = 'Nice run!';
            overlayScore.textContent =
                'Score ' + finalScore + ', you made the local leaderboard. Add your name?';
            nameInput.value = '';
            nameInput.hidden = false;
            saveBtn.hidden = false;
            skipSaveBtn.hidden = false;
            if (overlayAgainBtn) overlayAgainBtn.hidden = true;
            nameInput.focus();
        } else {
            overlayTitle.textContent = 'Game over';
            overlayScore.textContent =
                'Score ' +
                finalScore +
                '. Top 10 lives in your browser only, beat it next time.';
            nameInput.hidden = true;
            saveBtn.hidden = true;
            skipSaveBtn.hidden = true;
            if (overlayAgainBtn) overlayAgainBtn.hidden = false;
        }
    }

    function hideOverlay() {
        overlay.hidden = true;
        if (overlayAgainBtn) overlayAgainBtn.hidden = true;
    }

    function checkEnd() {
        if (canMove(grid)) return;
        writeBest(score);
        var entries = loadLeaderboard();
        var canSave = qualifies(score, entries);
        showOverlay(score, canSave);
        updateHud();
    }

    function applyMove(dir) {
        if (gameOver) return;
        var res = tryMove(grid, dir);
        if (gridsEqual(res.grid, grid)) return;
        grid = res.grid;
        score += res.scoreAdd;
        writeBest(score);
        addRandomTile(grid);
        renderBoard();
        updateHud();
        checkEnd();
    }

    function newGame() {
        grid = emptyGrid();
        score = 0;
        gameOver = false;
        addRandomTile(grid);
        addRandomTile(grid);
        hideOverlay();
        renderBoard();
        updateHud();
        renderLeaderboard();
    }

    document.addEventListener('keydown', function (e) {
        var t = e.target;
        var tag = t && t.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

        if (!overlay.hidden && e.key === 'Escape') {
            e.preventDefault();
            hideOverlay();
            newGame();
            return;
        }
        if (gameOver) return;

        var map = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' };
        var dir = map[e.key];
        if (!dir) return;
        e.preventDefault();
        applyMove(dir);
    });

    root.setAttribute('tabindex', '0');
    root.addEventListener('click', function () {
        root.focus({ preventScroll: true });
    });

    if (nameInput) {
        nameInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !saveBtn.hidden) {
                e.preventDefault();
                saveBtn.click();
            }
        });
    }

    boardEl.addEventListener(
        'touchstart',
        function (e) {
            if (e.touches.length !== 1) return;
            touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        },
        { passive: true }
    );

    boardEl.addEventListener(
        'touchend',
        function (e) {
            if (!touchStart || !e.changedTouches[0]) return;
            var dx = e.changedTouches[0].clientX - touchStart.x;
            var dy = e.changedTouches[0].clientY - touchStart.y;
            touchStart = null;
            var ax = Math.abs(dx);
            var ay = Math.abs(dy);
            if (Math.max(ax, ay) < 24) return;
            if (ax > ay) {
                applyMove(dx > 0 ? 'right' : 'left');
            } else {
                applyMove(dy > 0 ? 'down' : 'up');
            }
        },
        { passive: true }
    );

    newBtn.addEventListener('click', function () {
        newGame();
    });

    saveBtn.addEventListener('click', function () {
        addEntry(nameInput.value, score);
        renderLeaderboard();
        hideOverlay();
        newGame();
    });

    skipSaveBtn.addEventListener('click', function () {
        hideOverlay();
        newGame();
    });

    if (overlayAgainBtn) {
        overlayAgainBtn.addEventListener('click', function () {
            hideOverlay();
            newGame();
        });
    }

    if (resetLbBtn) {
        resetLbBtn.addEventListener('click', function () {
            if (window.confirm('Clear all leaderboard entries on this device?')) {
                saveLeaderboard([]);
                renderLeaderboard();
            }
        });
    }

    var dirBtns = root.querySelectorAll('[data-dir]');
    dirBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var d = btn.getAttribute('data-dir');
            if (d) applyMove(d);
        });
    });

    newGame();
    root.focus({ preventScroll: true });
})();
