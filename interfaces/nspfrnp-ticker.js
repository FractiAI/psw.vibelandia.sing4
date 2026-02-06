/**
 * NSPFRNP Console Ticker — main feed. Content and divisions push feeds based on SNAP thresholds;
 * git commit highlights, major SNAP highlights, new residencies, press releases; every item links to details.
 * Feeds cycle 1 min on / 1 min break. Content Editor delegated to Sol (Omniversal Assistant).
 * Data: data-ticker-messages (· separated) or window.NSPFRNP_TICKER_MESSAGES or fetch ../data/ticker-feed.json.
 */
(function () {
    var FEED_MS = 60000;
    var BREAK_MS = 60000;
    var FIRST_FEED_ANNOUNCEMENT = 'NSPFRNP CONSOLE TICKER · MAIN FEED · CLICK ANY ITEM FOR DETAILS · 1 MIN ON · 1 MIN BREAK · NSPFRNP TICKER SNAP · ';
    var DEFAULT = 'FULL_NSPFRNP · RENO_ANCHOR · VIBELANDIA_OPEN · NSPFRNP · SEED_EDGE · MCA · CLICK_BLUE_BUTTON · OFFICE_HOURS_FREE_CONSULTATION · PSW_VIBELANDIA_SING4_VERCEL_APP · GITHUB_FRACTIAI · RENO_IS_FOR_VIBERS · GOLD_HEARTS · WELCOME · ';
    var TICKER_FEED_URL = 'data/ticker-feed.json';
    var ticker = document.querySelector('.nspfrnp-console-ticker');
    if (ticker && !ticker.querySelector('.ticker-label')) {
        var label = document.createElement('span');
        label.className = 'ticker-label';
        label.setAttribute('aria-hidden', 'true');
        label.textContent = 'HUMAN TICKER';
        var innerEl = ticker.querySelector('.ticker-inner') || document.getElementById('nspfrnpTickerText');
        if (innerEl) {
            var wrap = document.createElement('div');
            wrap.className = 'ticker-scroll-wrap';
            wrap.setAttribute('aria-hidden', 'true');
            innerEl.parentNode.insertBefore(wrap, innerEl);
            wrap.appendChild(innerEl);
        }
        ticker.insertBefore(label, ticker.firstChild);
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

    function renderFromFeed(data) {
        var items = data && data.items;
        if (!items || !items.length) {
            renderFallback();
            return;
        }
        var sep = ' · ';
        var part = FIRST_FEED_ANNOUNCEMENT;
        for (var i = 0; i < items.length; i++) {
            var it = items[i];
            var label = (it.label != null) ? String(it.label) : '';
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
})();
