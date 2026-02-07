/**
 * NSPFRNP Console Ticker — main feed. Content and divisions push feeds based on SNAP thresholds;
 * git commit highlights, major SNAP highlights, new residencies, press releases; every item links to details.
 * Feeds cycle 1 min on / 1 min break. Content Editor delegated to Sol (Omniversal Assistant).
 * Data: data-ticker-messages (· separated) or window.NSPFRNP_TICKER_MESSAGES or fetch ../data/ticker-feed.json.
 * Also injects Mature Gold Heart Zone bars at top and bottom of all user surfaces.
 */
(function () {
    /* Mature Gold Heart Zone — top and bottom of all user surfaces */
    if (document.body && !document.querySelector('.gold-hearted-grown-ups-zone-bar')) {
        var zoneText = 'Mature Gold Heart Zone';
        var topBar = document.createElement('div');
        topBar.className = 'gold-hearted-grown-ups-zone-bar top';
        topBar.setAttribute('aria-label', zoneText);
        topBar.textContent = zoneText;
        var bottomBar = document.createElement('div');
        bottomBar.className = 'gold-hearted-grown-ups-zone-bar bottom';
        bottomBar.setAttribute('aria-label', zoneText);
        bottomBar.textContent = zoneText;
        document.body.insertBefore(topBar, document.body.firstChild);
        document.body.appendChild(bottomBar);
    }
    var bottomZone = document.querySelector('.gold-hearted-grown-ups-zone-bar.bottom');
    if (bottomZone) {
        var tickerEl = document.querySelector('.nspfrnp-console-ticker');
        if (tickerEl) tickerEl.style.bottom = '2.25rem';
    }

    var FEED_MS = 180000;
    var BREAK_MS = 30000;
    var FIRST_FEED_ANNOUNCEMENT = 'NSPFRNP CONSOLE TICKER · MAIN FEED · CLICK ANY ITEM FOR DETAILS · 3 MIN FEED · 30 SEC BREAK · NSPFRNP TICKER SNAP · ';
    var DEFAULT = 'SUPER BOWL ADS LIVE · ADV EXEC IN CHARGE · TICKER + SCHUMANN STREAMS · BAD BUNNY x AGÜEYBANÁ 1493 · GOLDEN HEART TAINO · NOVEL 20K · SCREENPLAY 12K · WE ARE LIVE · FULL NSPFRNP · RENO_ANCHOR · VIBELANDIA_OPEN · BOOK BROADCAST PIPE NOW · OFFICE_HOURS_FREE_CONSULTATION · GOLD_HEARTS · WELCOME · ';
    var TICKER_FEED_URL = (typeof window !== 'undefined' && window.location && window.location.pathname.indexOf('interfaces') !== -1) ? '../data/ticker-feed.json' : 'data/ticker-feed.json';
    var ticker = document.querySelector('.nspfrnp-console-ticker');
    if (ticker && !ticker.querySelector('.ticker-scroll-wrap')) {
        var innerEl = ticker.querySelector('.ticker-inner') || document.getElementById('nspfrnpTickerText');
        if (innerEl) {
            var wrap = document.createElement('div');
            wrap.className = 'ticker-scroll-wrap';
            wrap.setAttribute('aria-hidden', 'true');
            innerEl.parentNode.insertBefore(wrap, innerEl);
            wrap.appendChild(innerEl);
        }
    }
    var inner = document.getElementById('nspfrnpTickerText') || (ticker ? ticker.querySelector('.ticker-inner') : null);
    if (!inner) return;

    function escapeHtml(s) {
        var div = document.createElement('div');
        div.textContent = s;
        return div.innerHTML;
    }

    function renderFallback() {
        var text = FIRST_FEED_ANNOUNCEMENT + DEFAULT;
        inner.textContent = text + text;
    }

    var lastFeedData = null;
    function renderFromFeed(data) {
        lastFeedData = data;
        var items = data && data.items;
        if (!items || !items.length) {
            renderFallback();
            return;
        }
        items = items.slice().sort(function (a, b) { return (a.priority != null ? a.priority : 99) - (b.priority != null ? b.priority : 99); });
        var sep = ' · ';
        var part = FIRST_FEED_ANNOUNCEMENT;
        var useSpanglish = (typeof window.VibelandiaLang !== 'undefined' && window.VibelandiaLang.isSpanglish && window.VibelandiaLang.isSpanglish());
        for (var i = 0; i < items.length; i++) {
            var it = items[i];
            var label = (useSpanglish && it.label_spanglish != null) ? String(it.label_spanglish) : ((it.label != null) ? String(it.label) : '');
            var url = (it.url != null) ? String(it.url).trim() : '';
            if (!label) continue;
            var isExternal = url.indexOf('http://') === 0 || url.indexOf('https://') === 0;
            if (url) {
                part += '<a href="' + escapeHtml(url) + '"' + (isExternal ? ' target="_blank" rel="noopener"' : '') + ' class="ticker-feed-link">' + escapeHtml(label) + '</a>' + sep;
            } else {
                part += escapeHtml(label) + sep;
            }
        }
        inner.innerHTML = part + part;
    }

    function renderFromMessages(raw) {
        var text = '';
        if (raw != null && raw !== '') {
            if (Array.isArray(raw)) {
                text = raw.join(' · ') + (raw.length ? ' · ' : '');
            } else {
                text = String(raw).trim() + (String(raw).trim() ? ' · ' : '');
            }
        }
        if (!text) text = DEFAULT;
        text = FIRST_FEED_ANNOUNCEMENT + text;
        inner.textContent = text + text;
    }

    var dataAttr = ticker && ticker.getAttribute('data-ticker-messages');
    var winMessages = typeof window.NSPFRNP_TICKER_MESSAGES !== 'undefined' ? window.NSPFRNP_TICKER_MESSAGES : null;
    if (dataAttr != null && dataAttr !== '' || winMessages != null && winMessages !== '') {
        renderFromMessages(dataAttr || winMessages);
    } else {
        var base = document.querySelector('base');
        var feedUrl = (base && base.href) ? new URL(TICKER_FEED_URL, base.href).href : (typeof window.location !== 'undefined' ? new URL(TICKER_FEED_URL, window.location.origin + window.location.pathname).href : TICKER_FEED_URL);
        fetch(feedUrl)
            .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
            .then(renderFromFeed)
            .catch(renderFallback);
    }

    if (ticker) {
        var on = true;
        function toggle() {
            on = !on;
            ticker.classList.toggle('nspfrnp-ticker-break', !on);
        }
        setInterval(toggle, FEED_MS);
    }
    window.addEventListener('spanglish-change', function () {
        if (lastFeedData) renderFromFeed(lastFeedData);
    });
})();
