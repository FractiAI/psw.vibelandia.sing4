/**
 * Tsunami Advisory — Gold Heart Baller V's
 * Injected at top of all touchpoints and stations. Dismissible (session). See TSNAMI_ADVISORY_GOLD_HEART_BALLER_V_SNAP.md
 */
(function () {
  var STORAGE_KEY = 'tsunami-advisory-dismissed';
  function isDismissed() {
    try { return sessionStorage.getItem(STORAGE_KEY) === '1'; } catch (e) { return false; }
  }
  function setDismissed() {
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch (e) {}
  }
  var banner = document.createElement('div');
  banner.className = 'tsunami-advisory-banner';
  banner.setAttribute('role', 'alert');
  banner.setAttribute('aria-live', 'polite');
  banner.innerHTML = '<div class="tsunami-advisory-inner">' +
    '<span class="tsunami-advisory-label">&#9888; Executive Advisory &middot; Gold Heart Baller V\'s</span>' +
    '<p class="tsunami-advisory-text"><strong>Super Bowl & Pre-Super Bowl Space Advertising — WE ARE LIVE.</strong> ADV EXEC IN CHARGE. Ad slots are available now on ticker, Schumann, Sun, Ionosphere, Aurora 3D streams. Full availability; we will not charge until we are green. Lock slots by Feb 6 4PM PST — scalper dynamics apply each day you wait. That\'s not an ad. <strong>THIIIIIIISSSS IS AN AD.</strong></p>' +
    '<button type="button" class="tsunami-advisory-dismiss" aria-label="Dismiss advisory">Dismiss</button>' +
    '</div>';
  var style = document.createElement('style');
  style.textContent = '.tsunami-advisory-banner{background:linear-gradient(135deg,rgba(180,60,60,0.95) 0%,rgba(120,40,40,0.98) 100%);color:#fff;padding:0.75rem 1rem;border-bottom:3px solid rgba(255,200,100,0.8);font-size:0.9rem;line-height:1.5}.tsunami-advisory-inner{max-width:960px;margin:0 auto;position:relative}.tsunami-advisory-label{display:block;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.35rem;color:#ffeaa7;font-size:0.8rem}.tsunami-advisory-text{margin:0.35rem 0 0}.tsunami-advisory-text:first-of-type{margin-top:0}.tsunami-advisory-dismiss{position:absolute;top:0.5rem;right:0;background:rgba(255,255,255,0.2);border:1px solid rgba(255,255,255,0.5);color:#fff;padding:0.35rem 0.75rem;font-size:0.8rem;cursor:pointer;border-radius:6px;font-weight:600}.tsunami-advisory-dismiss:hover{background:rgba(255,255,255,0.3)}';
  function inject() {
    if (document.body && !document.querySelector('.tsunami-advisory-banner') && !isDismissed()) {
      document.body.insertBefore(style, document.body.firstChild);
      document.body.insertBefore(banner, document.body.firstChild);
      var btn = banner.querySelector('.tsunami-advisory-dismiss');
      if (btn) {
        btn.addEventListener('click', function () {
          setDismissed();
          if (banner.parentNode) banner.parentNode.removeChild(banner);
        });
      }
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
