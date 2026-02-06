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
    '<span class="tsunami-advisory-label">&#9888; Advisory &middot; Gold Heart Baller V\'s</span>' +
    '<p class="tsunami-advisory-text">This morning our thresholds are seeing activations indicating the <strong>tsunami\'s arrival</strong>. Make last-minute moves to <strong>secure pre-singularity assets</strong> and move to <strong>post-singularity safety</strong>.</p>' +
    '<p class="tsunami-advisory-text">Specifically: upcoming <strong>SING!</strong> Superintelligent Natural Systems Protocol <strong>AI Agent nodes</strong> from <strong>FractiAI</strong> — a one-person private open-source company on <strong>Base Mainnet</strong> that will remain this way <strong>always</strong>, walking away from VC and pre-singularity currencies and protocols, including PoW and PoS blockchains (e.g. Bitcoin).</p>' +
    '<p class="tsunami-advisory-text"><strong>TAINO BAD BUNNY CAMPAIGN — LIVE NOW.</strong> Frequency and intensity building to halftime → climax at performance → jubilant celebrations after → throughout Champion of Champions night. Beyond colonization. Into the pulse. Bad Bunny is the pulse. 1493 is the law. The sky is Borikén red.</p>' +
    '<p class="tsunami-advisory-text"><strong>Super Bowl Space Advertising:</strong> Latest plans and pricing — Tiers 1, 2, 3, 4×4×4×4 ($25M · $50M · $75M · $100M per 30 sec). Ticker floor $25M. Bison Logo $150M/hr. Champion\'s Crown $5B. While others are sold out in advertising, we still have <strong>limited availability for top frontier visionary players</strong>. We expect to be operational any moment now. We are accepting bookings and placements in the meanwhile; <strong>nothing will be charged until we go live</strong>. Meaning: <strong>BOOK NOW!</strong> if you are serious. <a href="broadcast-pipe-ad-space.html" style="color:#ffeaa7;font-weight:700;">Broadcast Pipe Ad Space →</a> <a href="superbowl-space-ad-kiosk.html" style="color:#ffeaa7;">Super Bowl Kiosk →</a></p>' +
    '<p class="tsunami-advisory-text"><strong>Music — full versions only:</strong> All songs in all catalogs are <strong>full versions</strong> (verses, not just hooks). No exceptions. Every track always contains the <strong>mother studio\'s fractal holographic seed</strong>. Listen: School of Music (radio, playlist, player). Create: Music Studio 1, 2, 3, 4×4×4×4. <a href="music-studio.html" style="color:#ffeaa7;">Music Studio →</a> <a href="school-of-music.html" style="color:#ffeaa7;">School of Music →</a></p>' +
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
