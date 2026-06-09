/**
 * Stealth & Military Aircraft Tracking Core Console
 */

// 1. Target configurations for stealth and special military operation profiles
const TRACKING_MODES = {
  All: "type=UAV.*|MQ.*|RQ.*|GH.*",
  STEALTH_MILITARY: "mil=1&type=F35*|F22*|B2*|B21*|F117*|E3*|RC135*",
  ALL_MILITARY: "mil=1",
  RAW_MLAT: "mlat=1" // Finds aircraft tracking only via receiver triangulation (no GPS broadcast)
};

// Base map engine endpoint
const BASE_MAP_URL = "https://globe.adsbexchange.com/?hideButtons=1&hideSideBar=1&enableLabels=1";

/**
 * Updates the map iframe source to filter by specific target criteria
 * @param {string} modeKey - The key corresponding to the desired tracking profile
 */
function switchTrackingTarget(modeKey) {
  const iframe = document.querySelector('.map-iframe');
  if (!iframe) return;

  const filterParam = TRACKING_MODES[modeKey];
  if (filterParam) {
    // Inject the new filter configuration into the map display
    iframe.src = `${BASE_MAP_URL}&${filterParam}`;
    console.log(`📡 Scan profile changed to: ${modeKey}`);
  }
}

/**
 * Creates an interactive HUD Control Panel inside the UI dynamically
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

  // Generate control tabs for the interface
  Object.keys(TRACKING_MODES).forEach(mode => {
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

// Initialize interface enhancements on window load
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
  // Disable F12
  if (e.key === "F12") {
    e.preventDefault();
  }

  // Disable Ctrl + Shift + I
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
  }

  // Disable Ctrl + Shift + J
  if (e.ctrlKey && e.shiftKey && e.key === "J") {
    e.preventDefault();
  }

  // Disable Ctrl + Shift + C
  if (e.ctrlKey && e.shiftKey && e.key === "C") {
    e.preventDefault();
  }

  // Disable Ctrl + U (View Source)
  if (e.ctrlKey && e.key.toLowerCase() === "u") {
    e.preventDefault();
  }
});
