/**
 * Gold Hearted Grown Ups Zone — top and bottom of all user surfaces.
 * NSPFRNP. See GOLD_HEARTED_GROWN_UPS_ZONE_SNAP.md.
 */
(function () {
  var TEXT = 'Gold Hearted Grown Ups Zone';
  var topBar = document.createElement('div');
  topBar.className = 'gold-hearted-grown-ups-zone-bar top';
  topBar.setAttribute('aria-label', TEXT);
  topBar.textContent = TEXT;
  var bottomBar = document.createElement('div');
  bottomBar.className = 'gold-hearted-grown-ups-zone-bar bottom';
  bottomBar.setAttribute('aria-label', TEXT);
  bottomBar.textContent = TEXT;
  function inject() {
    if (document.body) {
      document.body.insertBefore(topBar, document.body.firstChild);
      document.body.appendChild(bottomBar);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
