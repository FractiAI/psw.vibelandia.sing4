/**
 * NSPFRNP Console Ticker — feed important messages and key values in streaming ticker format.
 * Feeds are cycling 1 min feeds with 1 min breaks between feed cycles; updated naturally as pushes trigger push to ticker feed cycles.
 * The announcement of the ticker is the first feed of the ticker cycles (NSPFRNP TICKER SNAP). Ticker feeds are managed by the Content Editor — delegated to Sol (Omniversal Assistant, wirehaired pointer, gold heart, best sniffer in the omniverse, chill and humble, loves expeditions, tail wagging high and fast); Sol manages all latest contents centrally and decides the top one to push in the 1 min on/off cycles.
 * Finds .nspfrnp-console-ticker .ticker-inner (or #nspfrnpTickerText), sets content from
 * data-ticker-messages attribute (· separated) or window.NSPFRNP_TICKER_MESSAGES (array or string).
 * Duplicates content for seamless loop. Default message if none provided.
 * Cycle: 1 min feed on, 1 min break (ticker hidden), repeat.
 */
(function () {
    var FEED_MS = 60000;  /* 1 min feed */
    var BREAK_MS = 60000; /* 1 min break between feed cycles */
    /* First feed of every ticker cycle: announcement of the ticker (NSPFRNP TICKER SNAP) */
    var FIRST_FEED_ANNOUNCEMENT = 'NSPFRNP CONSOLE TICKER · FIRST FEED · CYCLING 1 MIN FEEDS · 1 MIN BREAKS · NSPFRNP TICKER SNAP · ';
    var DEFAULT = 'RENO_ANCHOR · VIBELANDIA_OPEN · NSPFRNP · SEED_EDGE · MCA · CLICK_BLUE_BUTTON · HOME_AT_LAST · PSW_VIBELANDIA_SING4 · GITHUB_FRACTIAI · ';
    var ticker = document.querySelector('.nspfrnp-console-ticker');
    var inner = document.getElementById('nspfrnpTickerText') || (ticker ? ticker.querySelector('.ticker-inner') : null);
    if (!inner) return;
    var raw = (ticker && ticker.getAttribute('data-ticker-messages')) || (typeof window.NSPFRNP_TICKER_MESSAGES !== 'undefined' ? window.NSPFRNP_TICKER_MESSAGES : null);
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

    /* 1 min feed on, 1 min break between feed cycles: toggle every 1 min */
    if (!ticker) return;
    var on = true;
    function toggle() {
        on = !on;
        ticker.classList.toggle('nspfrnp-ticker-break', !on);
    }
    setInterval(toggle, FEED_MS);
})();
