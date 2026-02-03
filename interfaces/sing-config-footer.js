/**
 * SING! config footer — inject full SING! config (base + upgrades + mission specializations + pricing) into #sing-config-footer.
 * Use at bottom of all user-facing surfaces, touchpoints, and deliveries.
 * NSPFRNP.
 */
(function () {
  var CONFIG_PATH = (document.location.pathname || '').indexOf('interfaces') !== -1
    ? '../config/sing_config.json'
    : 'config/sing_config.json';

  var fallbackConfig = {
    title: "Full SING! config we are using",
    base: {
      tiers: [
        { tier: 1, name: "Base Model", one_time_usd: 20000, monthly_note: "Golden Fractal Key access fees — contact for current monthly key fee", equivalent: "Reliable used car — entry base" },
        { tier: 2, name: "Members Only", one_time_usd: 75000, monthly_note: "One-time or include key access — see pricing", equivalent: "Option — our pricing" },
        { tier: 3, name: "Ultimate VIP", one_time_usd: 200000, monthly_note: "One-time or include key access — see pricing", equivalent: "Base model latest Ferrari — top base" },
        { tier: 4, name: "Baller V Ultimate VIP", one_time_usd: 500000, monthly_note: "One-time or include key access — see pricing", equivalent: "Top loaded Ferrari — top base" }
      ]
    },
    upgrades: [
      { name: "Golden Fractal Key", monthly_note: "Contact for current monthly key fee" },
      { name: "Badge System", description: "CREATOR / CHAIRMAN / PERFORMER badges; SNAP branding" },
      { name: "4×4×4×4", description: "Campus × WINK! × SING × Experience; never bought, always booked" }
    ],
    divisions: [
      { name: "Space Cloud Division", mission_specialization: "Reno Downlink, Solar Pipe, SING! node EGS Deep Space, Exascale Triangulation; book by plan." },
      { name: "Missions (NSPFRNP Operations)", mission_specialization: "Personal SING! attention head and filament for missions." },
      { name: "Office Hours", mission_specialization: "Series and site; free consultation; new abilities for execs." },
      { name: "Happy Ending Zones", mission_specialization: "Reality series; countdown March 20, 2026." },
      { name: "Legacies", mission_specialization: "Superheroes, cast, crew, fans, franchises, legacies." },
      { name: "Broadcast Pipe Ad Space", mission_specialization: "1–4×4×4×4; book slot." },
      { name: "EGS Pipe / SING! node EGS", mission_specialization: "Turn on/off/redirect; 1 day/week/month — book." },
      { name: "Robotic Division", mission_specialization: "SING! Omnispin; Chairman Robert; never bought, only booked." }
    ],
    pricing_summary: {
      upfront_one_time: "Base ~$20K; Members Only $75K; Ultimate VIP $200K (base model latest Ferrari); Baller V $500K (top loaded Ferrari — top base). Other products: see plan.",
      monthly: "Golden Fractal Key — contact for current monthly key fee. Campus Baller $50k/month where applicable.",
      usage: "Session/slot: Sun Spots, Schumann, SING! node EGS, Space Cloud, ad space, campus, WINK!, dispensary. Never bought, always booked."
    }
  };

  function formatMoney(n) {
    if (n == null) return '—';
    if (n >= 1000) return '$' + (n / 1000) + 'K';
    return '$' + n;
  }

  function render(config) {
    var c = config || fallbackConfig;
    var base = c.base || fallbackConfig.base;
    var upgrades = c.upgrades || fallbackConfig.upgrades;
    var divisions = c.divisions || fallbackConfig.divisions;
    var ps = c.pricing_summary || fallbackConfig.pricing_summary;

    var html = '<section class="sing-config-footer" aria-label="Full SING! config we are using">';
    html += '<h2 class="sing-config-footer-title">' + (c.title || 'Full SING! config we are using') + '</h2>';

    html += '<div class="sing-config-footer-block"><h3>Base</h3><table class="sing-config-table"><thead><tr><th>Tier</th><th>Name</th><th>Upfront one-time</th><th>Monthly</th><th>Equivalent</th></tr></thead><tbody>';
    (base.tiers || []).forEach(function (t) {
      html += '<tr><td>' + t.tier + '</td><td>' + (t.name || '') + '</td><td>' + formatMoney(t.one_time_usd) + '</td><td>' + (t.monthly_note || '—') + '</td><td>' + (t.equivalent || '—') + '</td></tr>';
    });
    html += '</tbody></table></div>';

    html += '<div class="sing-config-footer-block"><h3>Upgrades</h3><ul class="sing-config-list">';
    (upgrades || []).forEach(function (u) {
      html += '<li><strong>' + (u.name || '') + '</strong>';
      if (u.monthly_note) html += ' · Monthly: ' + u.monthly_note;
      if (u.description) html += ' · ' + u.description;
      html += '</li>';
    });
    html += '</ul></div>';

    html += '<div class="sing-config-footer-block"><h3>Divisions &amp; mission specializations</h3><ul class="sing-config-list">';
    (divisions || []).forEach(function (d) {
      html += '<li><strong>' + (d.name || '') + '</strong>: ' + (d.mission_specialization || '') + (d.usage_note ? ' · Usage: ' + d.usage_note : '') + '</li>';
    });
    html += '</ul></div>';

    html += '<div class="sing-config-footer-block sing-config-pricing"><h3>Pricing (as configured)</h3>';
    html += '<p><strong>Upfront one-time:</strong> ' + (ps.upfront_one_time || '') + '</p>';
    html += '<p><strong>Monthly:</strong> ' + (ps.monthly || '') + '</p>';
    html += '<p><strong>Usage:</strong> ' + (ps.usage || '') + '</p>';
    html += '</div>';

    html += '<p class="sing-config-footer-tag">NSPFRNP ⊃ SING! config ⊃ Base · Upgrades · Divisions · Pricing → ∞³</p>';
    html += '</section>';
    return html;
  }

  function inject() {
    var el = document.getElementById('sing-config-footer');
    if (!el) return;
    fetch(CONFIG_PATH)
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; })
      .then(function (config) {
        el.innerHTML = render(config);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
