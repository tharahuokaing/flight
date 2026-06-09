/**
 * Unified Tactical Drone & Military Tracking Core Console
 */

// 1. Dual-Engine Target Routing Map configurations
const ADS_B_BASE = "https://globe.adsbexchange.com/?hideButtons=1&hideSideBar=1&enableLabels=1";
const FR24_BASE  = "https://www.flightradar24.com/13.06,93.10/5";

const TRACKING_CONFIGS = {
  ALL: {
    adsb: "type=UAV.*|MQ.*|RQ.*|GH.*", // Default view shows drones on ADS-B
    fr24: ""                            // Default view shows raw region on FR24
  },
  DRONES: {
    adsb: "type=UAV.*|MQ.*|RQ.*|GH.*",
    fr24: "aircraft=uav,mq9,rq4"
  },
  STEALTH_MILITARY: {
    adsb: "mil=1&type=F35*|F22*|B2*|B21*|F117*|E3*|RC135*",
    fr24: "aircraft=f35,f22,b2,e3cf,r135"
  },
  ALL_MILITARY: {
    adsb: "mil=1",
    fr24: "cat=military"
  }
};

/**
 * Coordinated Map Link Updater
 * Targets both iframes dynamically on click
 */
function switchTrackingTarget(modeKey) {
  const adsbIframe = document.getElementById('adsb-map');
  const fr24Iframe = document.getElementById('fr24-map');
  const mode = TRACKING_CONFIGS[modeKey];

  if (!mode) return;

  // Update ADS-B Exchange Screen
  if (adsbIframe) {
    adsbIframe.src = mode.adsb ? `${ADS_B_BASE}&${mode.adsb}` : ADS_B_BASE;
  }

  // Update Flightradar24 Screen
  if (fr24Iframe) {
    fr24Iframe.src = mode.fr24 ? `${FR24_BASE}?${mode.fr24}` : FR24_BASE;
  }

  console.log(`📡 Dual-Array Scan initialized: ${modeKey}`);
}

/**
 * Creates a Single Unified Interactive HUD Control Panel
 */
function injectHUDConsole() {
  const consoleContainer = document.createElement('div');
  consoleContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 20, 40, 0.9);
    border: 1px solid #00f9ff;
    box-shadow: 0 0 15px rgba(0, 249, 255, 0.4);
    padding: 10px 20px;
    border-radius: 8px;
    display: flex;
    gap: 10px;
    z-index: 9999;
    backdrop-filter: blur(5px);
  `;

  // Generate tactical buttons from unified layout keys
  Object.keys(TRACKING_CONFIGS).forEach(mode => {
    const btn = document.createElement('button');
    btn.innerText = mode.replace('_', ' ');
    btn.style.cssText = `
      background: transparent;
      border: 1px solid rgba(0, 249, 255, 0.5);
      color: #00f9ff;
      padding: 6px 12px;
      cursor: pointer;
      font-family: 'Orbitron', sans-serif;
      font-size: 11px;
      text-transform: uppercase;
      transition: all 0.3s ease;
    `;
    
    btn.onmouseover = () => btn.style.background = "rgba(0, 249, 255, 0.2)";
    btn.onmouseout = () => btn.style.background = "transparent";
    btn.onclick = () => switchTrackingTarget(mode);
    
    consoleContainer.appendChild(btn);
  });

  document.body.appendChild(consoleContainer);
}

// Global System Boot
window.addEventListener('DOMContentLoaded', () => {
  injectHUDConsole();
});


/* ==========================================================================
   SECURITY AND PROTECTION LAYER (PREVENTS REVERSE ENGINEERING / DISCOVERY)
   ========================================================================== */

/* DISABLE RIGHT CLICK */
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});

/* DISABLE DOUBLE CLICK */
document.addEventListener("dblclick", function(e) {
  e.preventDefault();
});

/* BLOCK INSPECT SHORTCUTS */
document.addEventListener("keydown", function(e) {
  if (e.key === "F12") e.preventDefault();
  
  if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) {
    e.preventDefault();
  }

  if (e.ctrlKey && e.key.toLowerCase() === "u") {
    e.preventDefault();
  }
});
