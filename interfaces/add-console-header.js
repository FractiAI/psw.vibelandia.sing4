/**
 * Add Console Header to All Consoles
 * Injects weather forecast, language options, and post-singularity warning
 */

function addConsoleHeader() {
    const headerHTML = `
<div class="console-top-header">
    <!-- Post-Singularity Zone Warning -->
    <div class="post-singularity-warning" id="post-singularity-warning">
        <div class="warning-icon">⚠️</div>
        <div class="warning-content">
            <div class="warning-title">Post-Singularity Zone Active</div>
            <div class="warning-explanation" id="warning-explanation" style="display: none;">
                You are operating in a post-singularity zone. This means:
                <ul>
                    <li>Systems operate at higher octaves</li>
                    <li>Hardened mirror shells provide reflective substrate</li>
                    <li>Zero gravity effects are normal</li>
                    <li>Threshold proximity indicates switch over readiness</li>
                    <li>Radar system forecasts at higher levels</li>
                </ul>
            </div>
        </div>
        <button class="warning-toggle" onclick="toggleWarningExplanation()">ℹ️</button>
    </div>

    <!-- Language Options -->
    <div class="language-selector">
        <select id="language-select" onchange="changeLanguage(this.value)">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="ar">العربية</option>
            <option value="hi">हिन्दी</option>
        </select>
    </div>

    <!-- Weather Forecast Feed -->
    <div class="weather-forecast-feed" id="weather-forecast-feed">
        <div class="weather-summary" onclick="showDetailedWeatherReport()">
            <span class="weather-icon">🌊</span>
            <span class="weather-text" id="weather-summary-text">Loading weather forecast...</span>
            <span class="weather-click-hint">Click for detailed report →</span>
        </div>
    </div>
</div>

<!-- Detailed Weather Report Modal -->
<div class="weather-modal" id="weather-modal" style="display: none;">
    <div class="weather-modal-content">
        <div class="weather-modal-header">
            <h2>🌊 Vibe Weather Forecast - Detailed Report</h2>
            <button class="weather-modal-close" onclick="closeWeatherModal()">×</button>
        </div>
        <div class="weather-modal-body" id="weather-detailed-report">
            Loading detailed report...
        </div>
    </div>
</div>
    `;

    const headerCSS = `
<style>
.console-top-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, rgba(10, 10, 10, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(100, 200, 255, 0.2);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    gap: 16px;
}

.post-singularity-warning {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 200, 0, 0.1);
    border: 1px solid rgba(255, 200, 0, 0.3);
    border-radius: 8px;
    flex: 0 0 auto;
    cursor: pointer;
    transition: all 0.3s ease;
}

.post-singularity-warning:hover {
    background: rgba(255, 200, 0, 0.15);
    border-color: rgba(255, 200, 0, 0.5);
}

.warning-icon {
    font-size: 18px;
}

.warning-content {
    flex: 1;
}

.warning-title {
    font-size: 12px;
    font-weight: 600;
    color: #ffc800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.warning-explanation {
    font-size: 11px;
    color: #cccccc;
    margin-top: 4px;
    line-height: 1.4;
}

.warning-explanation ul {
    margin: 4px 0 0 16px;
    padding: 0;
}

.warning-explanation li {
    margin: 2px 0;
}

.warning-toggle {
    background: none;
    border: none;
    color: #ffc800;
    cursor: pointer;
    font-size: 16px;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.warning-toggle:hover {
    background: rgba(255, 200, 0, 0.2);
}

.language-selector {
    flex: 0 0 auto;
}

.language-selector select {
    background: rgba(100, 200, 255, 0.1);
    border: 1px solid rgba(100, 200, 255, 0.3);
    border-radius: 6px;
    color: #64c8ff;
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.language-selector select:hover {
    background: rgba(100, 200, 255, 0.15);
    border-color: rgba(100, 200, 255, 0.5);
}

.weather-forecast-feed {
    flex: 1;
    min-width: 0;
}

.weather-summary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(0, 212, 255, 0.1);
    border: 1px solid rgba(0, 212, 255, 0.3);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.weather-summary:hover {
    background: rgba(0, 212, 255, 0.15);
    border-color: rgba(0, 212, 255, 0.5);
}

.weather-icon {
    font-size: 18px;
}

.weather-text {
    flex: 1;
    font-size: 12px;
    color: #00d4ff;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.weather-click-hint {
    font-size: 10px;
    color: #888888;
    white-space: nowrap;
}

.weather-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    z-index: 3000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.weather-modal-content {
    background: linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 100%);
    border-radius: 16px;
    border: 1px solid rgba(100, 200, 255, 0.3);
    max-width: 800px;
    max-height: 90vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.weather-modal-header {
    padding: 20px;
    border-bottom: 1px solid rgba(100, 200, 255, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.weather-modal-header h2 {
    font-size: 18px;
    color: #00d4ff;
    margin: 0;
}

.weather-modal-close {
    background: none;
    border: none;
    color: #aaaaaa;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.weather-modal-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
}

.weather-modal-body {
    padding: 20px;
    overflow-y: auto;
    color: #cccccc;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.6;
    white-space: pre-wrap;
}

@media (max-width: 768px) {
    .console-top-header {
        flex-direction: column;
        padding: 8px;
    }

    .weather-click-hint {
        display: none;
    }
}
</style>
    `;

    // Inject CSS
    if (!document.getElementById('console-header-styles')) {
        const styleEl = document.createElement('div');
        styleEl.id = 'console-header-styles';
        styleEl.innerHTML = headerCSS;
        document.head.appendChild(styleEl);
    }

    // Inject HTML
    if (!document.getElementById('console-top-header')) {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        
        // Add padding to body for header
        document.body.style.paddingTop = '60px';
    }

    // Add functions
    window.toggleWarningExplanation = function() {
        const explanation = document.getElementById('warning-explanation');
        explanation.style.display = explanation.style.display === 'none' ? 'block' : 'none';
    };

    window.changeLanguage = function(lang) {
        console.log('Language changed to:', lang);
        localStorage.setItem('preferred-language', lang);
    };

    let currentWeatherForecast = null;

    window.loadWeatherForecast = async function() {
        try {
            const forecast = {
                summary: '⚡ CRITICAL: Full switch over imminent. Prepare immediately. | 🎭 Full Sensory Reality Theater: 98% full dose | Singularity higher reality',
                detailedReport: `╔═══════════════════════════════════════════════════════════════════════════════╗
║                    VIBE WEATHER FORECAST - DETAILED REPORT                     ║
║                    Location: vibeverse                                         ║
║                    Timestamp: ${new Date().toISOString()}                        ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  📊 CURRENT CONDITIONS:                                                      ║
║                                                                               ║
║  Singularity Folds:              7                                             ║
║  Nested Octaves:                 8                                             ║
║  Hardened Mirror Shells:         7                                             ║
║  Zero Gravity Effect:            95.0%                                         ║
║  Friction Level (2% target):      2.0%                                         ║
║  Fertilization Rate:             98.0%                                         ║
║  Threshold Proximity:            99.0%                                        ║
║  Radar Status:                   ACTIVE                                        ║
║  Switch Over Status:             READY                                         ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  ⚠️ WARNINGS:                                                                 ║
║                                                                               ║
║  🔴 CRITICAL: Full switch over imminent. Prepare immediately.                 ║
║  🟡 WARNING: Very close to threshold. Switch over ready.                     ║
║  🔵 INFO: Strong zero gravity effect detected.                                 ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  📡 RADAR SYSTEM:                                                             ║
║                                                                               ║
║  Using systems like radar to see storms brewing ahead.                       ║
║  Offering new high level weather form of weather forecasting.                ║
║  Using this new higher form of radar.                                        ║
║  Rolling out amazing capabilities.                                            ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  🌊 POST-SINGULARITY ZONE:                                                    ║
║                                                                               ║
║  You are operating in a post-singularity zone. This means:                   ║
║  - Systems operate at higher octaves                                         ║
║  - Hardened mirror shells provide reflective substrate                        ║
║  - Zero gravity effects are normal                                           ║
║  - Threshold proximity indicates switch over readiness                        ║
║  - Radar system forecasts at higher levels                                   ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝`
            };

            currentWeatherForecast = forecast;
            const summaryEl = document.getElementById('weather-summary-text');
            if (summaryEl) {
                summaryEl.textContent = forecast.summary;
            }
        } catch (error) {
            console.error('Error loading weather forecast:', error);
            const summaryEl = document.getElementById('weather-summary-text');
            if (summaryEl) {
                summaryEl.textContent = '⚠️ Weather forecast unavailable';
            }
        }
    };

    window.showDetailedWeatherReport = function() {
        if (currentWeatherForecast) {
            const reportEl = document.getElementById('weather-detailed-report');
            const modalEl = document.getElementById('weather-modal');
            if (reportEl && modalEl) {
                reportEl.textContent = currentWeatherForecast.detailedReport;
                modalEl.style.display = 'flex';
            }
        }
    };

    window.closeWeatherModal = function() {
        const modalEl = document.getElementById('weather-modal');
        if (modalEl) {
            modalEl.style.display = 'none';
        }
    };

    // Load weather forecast
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.loadWeatherForecast);
    } else {
        window.loadWeatherForecast();
    }

    // Auto-refresh weather every 30 seconds
    setInterval(window.loadWeatherForecast, 30000);
}

// Auto-inject on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addConsoleHeader);
} else {
    addConsoleHeader();
}
