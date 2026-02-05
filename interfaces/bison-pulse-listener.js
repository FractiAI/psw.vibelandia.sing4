/**
 * Bison Abundance Protocol — Dashboard listener
 * Project Bison (Agüeybaná 1493 Legacy)
 * Listens for 'bison-pulse' (when Kp >= 5) and applies screen-shake.
 * Include on dashboard pages. Dispatch: window.dispatchEvent(new CustomEvent('bison-pulse', { detail: { kpIndex: 5 } }));
 */
(function () {
    var BISON_PULSE_EVENT = 'bison-pulse';
    var durationMs = 600;
    var intensityPx = 4;

    function applyShake() {
        if (!document.body) return;
        var style = document.body.style;
        var transition = style.transition;
        style.transition = 'transform 0.05s ease-out';
        var start = Date.now();
        function run() {
            var elapsed = Date.now() - start;
            if (elapsed >= durationMs) {
                style.transform = '';
                style.transition = transition;
                return;
            }
            var decay = 1 - elapsed / durationMs;
            var x = (Math.random() - 0.5) * 2 * intensityPx * decay;
            var y = (Math.random() - 0.5) * 2 * intensityPx * decay;
            style.transform = 'translate(' + x + 'px,' + y + 'px)';
            requestAnimationFrame(run);
        }
        requestAnimationFrame(run);
    }

    window.addEventListener(BISON_PULSE_EVENT, function () {
        applyShake();
    });
})();
