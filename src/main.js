import * as THREE from "three";

const els = {
  menu: document.querySelector("#menu"),
  play: document.querySelector("#play"),
  viewButton: document.querySelector("#viewButton"),
  kills: document.querySelector("#kills"),
  wave: document.querySelector("#wave"),
  trophies: document.querySelector("#trophies"),
  floor: document.querySelector("#floor"),
  health: document.querySelector("#health"),
  armor: document.querySelector("#armor"),
  weaponName: document.querySelector("#weaponName"),
  ammo: document.querySelector("#ammo"),
  message: document.querySelector("#message"),
  radar: document.querySelector("#radar"),
  topdown: document.querySelector("#topdown2d"),
  pause: document.querySelector("#pause"),
  damage: document.querySelector("#damage"),
  waveAnnounce: document.querySelector("#waveAnnounce"),
  chargeBar: document.querySelector("#chargeBar"),
  hotbar: document.querySelector("#hotbar"),
  characterGrid: document.querySelector("#characterGrid"),
  mapGrid: document.querySelector("#mapGrid"),
  selectedMapInfo: document.querySelector("#selectedMapInfo"),
  characterName: document.querySelector("#characterName"),
  characterRole: document.querySelector("#characterRole"),
  characterHp: document.querySelector("#characterHp"),
  characterSpeed: document.querySelector("#characterSpeed"),
  characterSkill: document.querySelector("#characterSkill"),
  lobbyFighter: document.querySelector("#lobbyFighter"),
  skinRow: document.querySelector("#skinRow"),
  armoryList: document.querySelector("#armoryList"),
  coins: document.querySelector("#coins"),
  lobbyTrophies: document.querySelector("#lobbyTrophies"),
  createRoom: document.querySelector("#createRoom"),
  joinRoom: document.querySelector("#joinRoom"),
  roomCodeInput: document.querySelector("#roomCodeInput"),
  roomStatus: document.querySelector("#roomStatus"),
  mobileControls: document.querySelector("#mobileControls"),
  moveStick: document.querySelector("#moveStick"),
  moveKnob: document.querySelector("#moveKnob"),
  lookPad: document.querySelector("#lookPad"),
  mobileFire: document.querySelector("#mobileFire"),
  mobileAim: document.querySelector("#mobileAim"),
  mobileGrenade: document.querySelector("#mobileGrenade"),
  grenadeCancel: document.querySelector("#grenadeCancel"),
  mobileJump: document.querySelector("#mobileJump"),
  mobileSlide: document.querySelector("#mobileSlide"),
  mobileProne: document.querySelector("#mobileProne"),
  mobileReload: document.querySelector("#mobileReload"),
  mobileInteract: document.querySelector("#mobileInteract"),
  mobileExtract: document.querySelector("#mobileExtract"),
  mobileView: document.querySelector("#mobileView"),
  touchStickX: document.querySelector("#touchStickX"),
  touchStickY: document.querySelector("#touchStickY"),
  touchActionsX: document.querySelector("#touchActionsX"),
  touchActionsY: document.querySelector("#touchActionsY"),
  touchScale: document.querySelector("#touchScale"),
  touchLookWidth: document.querySelector("#touchLookWidth"),
  touchLayoutReset: document.querySelector("#touchLayoutReset")
};

const RADAR_RANGE = 180;
const PLAYER_SPEED = 9.5;
const BOT_SPEED = 4.15;
const SPRINT_SPEED = 13;
const GRAVITY = 28;
const JUMP_SPEED = 9.2;
const FLOOR_HEIGHT = 4.2;
const BUILDING_FLOORS = 5;
const TOWER_WIDTH = 34;
const TOWER_DEPTH = 26;
const LOW_BARRIER_CLEARANCE = 0.62;
const LOW_BARRIER_LOWER_MARGIN = 1.05;
const STAND_EYE_HEIGHT = 1.34;
const PRONE_EYE_HEIGHT = 0.38;
const SLIDE_EYE_HEIGHT = 0.22;
const BASEMENT_Y = -5.2;
const BOT_STAND_HEIGHT = 1.25;
const GUN_SKINS = [
  { name: "Graphite", metal: 0x15191b, stock: 0x36261c, accent: 0xffd06b },
  { name: "Desert", metal: 0xc7aa75, stock: 0x5c4931, accent: 0xfff0a8 },
  { name: "Jungle", metal: 0x2f5131, stock: 0x1e2a1d, accent: 0x9bd36a },
  { name: "Crimson", metal: 0x6d1f28, stock: 0x191919, accent: 0xff5a68 }
];
const CHARACTERS = [
  { name: "Steel", className: "steel", role: "Balanced assault fighter", hp: 100, speed: 9.5, skill: "Arc Blade", skin: 0xd1a57d, shirt: 0x2d6c9f, pants: 0x24334b, hair: 0x101315, armor: 0x42505b, token: "linear-gradient(135deg,#4ea2ff,#285ff7)" },
  { name: "Volt", className: "volt", role: "Fast runner and flank picker", hp: 90, speed: 10.4, skill: "Returning Blade", skin: 0xe0aa78, shirt: 0xff9d3f, pants: 0x46301c, hair: 0x53320a, armor: 0x5b451f, token: "linear-gradient(135deg,#ffe15a,#ff8b2f)" },
  { name: "Iris", className: "iris", role: "Precision fighter", hp: 95, speed: 9.8, skill: "Homing Blade", skin: 0xf0bf98, shirt: 0x24a7b8, pants: 0x16394a, hair: 0x0d5362, armor: 0x2d6068, token: "linear-gradient(135deg,#62ffd7,#168da0)" },
  { name: "Brick", className: "brick", role: "Heavy close-range bruiser", hp: 120, speed: 8.8, skill: "Spear Dash", skin: 0xc98b65, shirt: 0xb22747, pants: 0x2c2530, hair: 0x25151d, armor: 0x5b2636, token: "linear-gradient(135deg,#ff7d86,#b22747)" },
  { name: "Echo", className: "echo", role: "Remote blade controller", hp: 92, speed: 9.6, skill: "Echo Blade", skin: 0xe2b18a, shirt: 0x5d45a8, pants: 0x20233c, hair: 0x182033, armor: 0x4d5b72, token: "linear-gradient(135deg,#b78cff,#4fdcff)" },
  { name: "Guardian", className: "guardian", role: "Wall builder / defender", hp: 105, speed: 9.1, skill: "Team Wall", skin: 0xd9a77d, shirt: 0x7357ff, pants: 0x1f2744, hair: 0x23223a, armor: 0x6f7cff, token: "linear-gradient(135deg,#9d8cff,#4d63ff)" }
];
const WEAPONS = [
  { key: "Digit1", name: "Pistol", icon: "pistol", mag: 12, reserve: 72, damage: 22, cooldown: 0.22, range: 38, pellets: 1, spread: 0.012, auto: false, reload: 0.95 },
  { key: "Digit2", name: "Rifle", icon: "rifle", mag: 30, reserve: 120, damage: 24, cooldown: 0.115, range: 48, pellets: 1, spread: 0.014, auto: true, reload: 1.25 },
  { key: "Digit3", name: "Sniper", icon: "sniper", mag: 6, reserve: 36, damage: 76, cooldown: 0.78, range: 220, pellets: 1, spread: 0.0015, auto: false, reload: 1.75 },
  { key: "Digit4", name: "Shotgun", icon: "shotgun", mag: 8, reserve: 48, damage: 15, cooldown: 0.58, range: 28, pellets: 7, spread: 0.056, auto: false, reload: 1.45 },
  { key: "Digit5", name: "Knife", icon: "knife", mag: 1, reserve: 0, damage: 48, cooldown: 0.48, range: 2.85, pellets: 1, spread: 0, auto: false, reload: 0, melee: true }
];
const KNIFE_SKILLS = [
  "Arc Blade",
  "Returning Blade",
  "Homing Blade",
  "Spear Dash",
  "Echo Blade",
  "Team Wall"
];
const MAPS = [
  { key: "practice", name: "Solo Practice", desc: "Practice alone against AI bots. No room code or Render connection required." },
  { key: "duel", name: "Online 1V1", desc: "Create or join a room, wait for an opponent, then fight a real 1V1 match." }
];
const SAVE_KEY = "block-battle-save-v1";
const TOUCH_LAYOUT_DEFAULTS = {
  stickX: 18,
  stickY: 88,
  actionsX: 12,
  actionsY: 76,
  scale: 100,
  lookWidth: 58
};

let started = false;
let viewMode = "3d";
let yaw = 0;
let pitch = -0.12;
let hp = 100;
let armor = 50;
let weaponIndex = 0;
let gunSkinIndex = 0;
let characterIndex = 0;
let selectedMap = "practice";
let pubgExpanded = false;
let coins = 2450;
let trophies = 0;
let matchTrophies = 0;
let weaponLevels = WEAPONS.map(() => 1);
let inventory = WEAPONS.map(weapon => ({ ammo: weapon.mag, reserve: weapon.reserve }));
let reloadTimer = 0;
let fireTimer = 0;
let kills = 0;
let wave = 1;
let messageTimer = 0;
let hitTimer = 0;
let hurtTimer = 0;
let shakeTimer = 0;
let shakePower = 0;
let waveAnnounceTimer = 0;
let hotbarTimer = 0;
let audioCtx = null;
let mouseDown = false;
let ads = false;
let prone = false;
let sliding = false;
let slideTimer = 0;
let slideCooldown = 0;
let slideDistance = 0;
let slideDirection = new THREE.Vector3(0, 0, -1);
let meleeSwingTimer = 0;
let knifeChargeTimer = 0;
let knifeCharging = false;
let spearDashTimer = 0;
let spearDashCharge = 0;
let wallSkillCooldown = 0;
let extractHoldTimer = 0;
let extracting = false;
const WALL_CHARACTER_INDEX = 5;
const WALL_WIDTH = 6.8;
const WALL_HEIGHT = 3.3;
const WALL_THICKNESS = 0.34;
const WALL_LIFETIME = 14;
const WALL_COOLDOWN = 6;
const EXPLOSION_KNOCK_RADIUS = 3.7;
const EXPLOSION_KNOCK_DISTANCE = 1.18;
const EXTRACT_HOLD_TIME = 3;
const GRENADE_COOLDOWN = 4.5;
const spearDashHits = new Set();
let lastWTap = 0;
let paused = false;
let grenadeCooldown = 0;
let grenadeAiming = false;
let grenadeTouchId = null;
let grenadeCanceled = false;
let lastFrame = performance.now();
const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
const mobileInput = {
  enabled: false,
  moveId: null,
  lookId: null,
  lookLastX: 0,
  lookLastY: 0,
  originX: 0,
  originY: 0,
  x: 0,
  z: 0,
  sprint: false,
  aimHeld: false
};
let touchLayout = { ...TOUCH_LAYOUT_DEFAULTS };

const multiplayer = {
  socket: null,
  connected: false,
  pending: null,
  roomCode: "",
  playerId: "",
  role: "",
  players: {},
  remoteBot: null,
  lastSend: 0,
  opponentReady: false
};

const keys = new Set();
const obstacles = [];
const floorColliders = [];
const stairZones = [];
const mapMarkers = [];
const doors = [];
const lootCrates = [];
const bots = [];
const pickups = [];
const tracers = [];
const skillProjectiles = [];
const impactMarks = [];
const shieldWalls = [];
const botHud = document.createElement("div");
botHud.id = "botHud";
document.querySelector("#game").append(botHud);
const slashEffect = document.createElement("div");
slashEffect.id = "slashEffect";
document.querySelector("#game").append(slashEffect);
const player = {
  position: new THREE.Vector3(0, STAND_EYE_HEIGHT, 16),
  velocity: new THREE.Vector3(),
  verticalVelocity: 0,
  grounded: true,
  eyeHeight: STAND_EYE_HEIGHT,
  fallStartY: STAND_EYE_HEIGHT
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fb9e2);
scene.fog = new THREE.Fog(0x8fb9e2, 54, 118);

const camera = new THREE.PerspectiveCamera(74, innerWidth / innerHeight, 0.1, 220);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
document.querySelector("#game").prepend(renderer.domElement);
scene.add(camera);

const raycaster = new THREE.Raycaster();
const materials = makeMaterials();
buildWorld();
const gun = buildGun();
reshapeGun();
const playerModel = makeCharacter(99);
playerModel.userData.hitbox.visible = false;
scene.add(playerModel);
// 1V1 mode: no AI bots at startup. The opponent will be created after joining a room.

scene.add(new THREE.HemisphereLight(0xb9dcff, 0x6f5a3d, 1.45));
const sun = new THREE.DirectionalLight(0xfff3d0, 2.4);
sun.position.set(28, 46, 18);
sun.castShadow = true;
sun.shadow.camera.left = -70;
sun.shadow.camera.right = 70;
sun.shadow.camera.top = 70;
sun.shadow.camera.bottom = -70;
sun.shadow.mapSize.set(2048, 2048);
scene.add(sun);

els.play.addEventListener("click", startGame);
els.createRoom?.addEventListener("click", createRoom);
els.joinRoom?.addEventListener("click", () => joinRoom(els.roomCodeInput?.value || ""));
els.viewButton.addEventListener("click", togglePersonView);
loadProgress();
initTouchLayoutControls();
renderLobby();
renderHotbar();
initMobileControls();
document.addEventListener("keydown", event => {
  if (event.code === "Tab") {
    event.preventDefault();
    startExtractHold();
    return;
  }
  if (event.code === "F5" || event.code === "KeyK") {
    event.preventDefault();
    toggleView();
    return;
  }
  if (event.code === "KeyP" || event.code === "Escape") {
    togglePause();
    return;
  }
  if (event.code === "KeyR") {
    event.preventDefault();
    if (!event.repeat) toggleProne();
    return;
  }
  if (event.code === "KeyW" && !event.repeat) {
    const now = performance.now();
    if ((keys.has("ShiftLeft") || keys.has("ShiftRight")) && now - lastWTap < 280) startSlide();
    lastWTap = now;
  }
  const nextWeapon = WEAPONS.findIndex(weapon => weapon.key === event.code);
  if (nextWeapon >= 0) {
    switchWeapon(nextWeapon);
    showHotbar();
  }
  if (event.code === "KeyG") cycleGunSkin();
  if (event.code === "KeyQ") reload();
  if (event.code === "Space") {
    event.preventDefault();
    jump();
  }
  keys.add(event.code);
});
document.addEventListener("keyup", event => {
  if (event.code === "Tab") {
    event.preventDefault();
    cancelExtractHold();
    return;
  }
  keys.delete(event.code);
});
document.addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  if (!started || document.pointerLockElement !== renderer.domElement) return;
  yaw -= event.movementX * 0.00235;
  if (viewMode !== "2d") pitch = clamp(pitch - event.movementY * 0.002, -1.56, 1.56);
});
document.addEventListener("contextmenu", event => event.preventDefault());
document.addEventListener("mousedown", event => {
  if (!started || paused) return;
  if (viewMode !== "2d") renderer.domElement.requestPointerLock();
  if (event.button === 0) {
    mouseDown = true;
    shoot();
  }
  if (event.button === 2) {
    if (WEAPONS[weaponIndex].melee) {
      startKnifeSkill();
      return;
    }
    if (tryInteract()) return;
    if (viewMode !== "2d") ads = true;
  }
});
document.addEventListener("mouseup", event => {
  if (event.button === 0) mouseDown = false;
  if (event.button === 2) {
    if (knifeCharging) releaseKnifeCharge();
    ads = false;
  }
});
document.addEventListener("wheel", event => {
  if (!started || paused) return;
  switchWeapon((weaponIndex + (event.deltaY > 0 ? 1 : WEAPONS.length - 1)) % WEAPONS.length);
});
addEventListener("resize", resize);
requestAnimationFrame(animate);


function initMobileControls() {
  const detectTouchControls = () => {
    const hasTouchPoints = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches === true;
    const noHover = window.matchMedia?.("(hover: none)")?.matches === true;
    const touchApi = "ontouchstart" in window;
    return hasTouchPoints || coarsePointer || (touchApi && noHover);
  };
  const setTouchControls = enabled => {
    mobileInput.enabled = enabled;
    document.body.classList.toggle("touch-device", enabled);
  };

  setTouchControls(detectTouchControls());
  // Some browsers only become clearly touch-capable after the first real touch.
  window.addEventListener("touchstart", () => setTouchControls(true), { once: true, passive: true });

  if (!els.mobileControls) return;

  const stop = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  const clampStick = (dx, dy) => {
    const max = 48;
    const length = Math.hypot(dx, dy);
    const scale = length > max ? max / length : 1;
    const x = dx * scale;
    const y = dy * scale;
    mobileInput.x = clamp(x / max, -1, 1);
    mobileInput.z = clamp(-y / max, -1, 1);
    mobileInput.sprint = Math.hypot(mobileInput.x, mobileInput.z) > 0.82;
    if (els.moveKnob) els.moveKnob.style.transform = `translate(${x}px, ${y}px)`;
  };
  const resetStick = () => {
    mobileInput.moveId = null;
    mobileInput.x = 0;
    mobileInput.z = 0;
    mobileInput.sprint = false;
    if (els.moveKnob) els.moveKnob.style.transform = "translate(0,0)";
  };
  const beginLook = touch => {
    if (!touch || mobileInput.lookId !== null || touch.identifier === mobileInput.moveId) return;
    mobileInput.lookId = touch.identifier;
    mobileInput.lookLastX = touch.clientX;
    mobileInput.lookLastY = touch.clientY;
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
  };
  const moveLook = touch => {
    if (!touch || touch.identifier !== mobileInput.lookId) return;
    const dx = touch.clientX - mobileInput.lookLastX;
    const dy = touch.clientY - mobileInput.lookLastY;
    mobileInput.lookLastX = touch.clientX;
    mobileInput.lookLastY = touch.clientY;
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
    if (!started || paused) return;
    yaw -= dx * 0.0052;
    if (viewMode !== "2d") pitch = clamp(pitch - dy * 0.0045, -1.56, 1.56);
  };
  const endLook = touches => {
    if ([...touches].some(t => t.identifier === mobileInput.lookId)) mobileInput.lookId = null;
  };

  els.mobileControls.addEventListener("touchmove", event => {
    if (mobileInput.lookId === null) return;
    const touch = [...event.changedTouches].find(t => t.identifier === mobileInput.lookId);
    if (!touch) return;
    stop(event);
    moveLook(touch);
  }, { passive: false, capture: true });

  ["touchend", "touchcancel"].forEach(type => {
    els.mobileControls.addEventListener(type, event => endLook(event.changedTouches), { passive: true, capture: true });
  });

  els.moveStick?.addEventListener("touchstart", event => {
    stop(event);
    const touch = event.changedTouches[0];
    if (!touch) return;
    mobileInput.moveId = touch.identifier;
    const rect = els.moveStick.getBoundingClientRect();
    mobileInput.originX = rect.left + rect.width / 2;
    mobileInput.originY = rect.top + rect.height / 2;
    clampStick(touch.clientX - mobileInput.originX, touch.clientY - mobileInput.originY);
  }, { passive: false });

  els.moveStick?.addEventListener("touchmove", event => {
    stop(event);
    const touch = [...event.changedTouches].find(t => t.identifier === mobileInput.moveId);
    if (!touch) return;
    clampStick(touch.clientX - mobileInput.originX, touch.clientY - mobileInput.originY);
  }, { passive: false });

  ["touchend", "touchcancel"].forEach(type => {
    els.moveStick?.addEventListener(type, event => {
      stop(event);
      if ([...event.changedTouches].some(t => t.identifier === mobileInput.moveId)) resetStick();
    }, { passive: false });
  });

  els.lookPad?.addEventListener("touchstart", event => {
    stop(event);
    beginLook(event.changedTouches[0]);
  }, { passive: false });

  els.lookPad?.addEventListener("touchmove", event => {
    stop(event);
    const touch = [...event.changedTouches].find(t => t.identifier === mobileInput.lookId);
    moveLook(touch);
  }, { passive: false });

  ["touchend", "touchcancel"].forEach(type => {
    els.lookPad?.addEventListener(type, event => {
      stop(event);
      endLook(event.changedTouches);
    }, { passive: false });
  });

  const bindHoldButton = (button, onDown, onUp) => {
    if (!button) return;
    const down = event => {
      stop(event);
      button.classList.add("active");
      onDown?.();
      beginLook(event.changedTouches?.[0]);
    };
    const up = event => { stop(event); button.classList.remove("active"); onUp?.(); };
    button.addEventListener("touchstart", down, { passive: false });
    button.addEventListener("touchend", up, { passive: false });
    button.addEventListener("touchcancel", up, { passive: false });
  };

  bindHoldButton(els.mobileFire, () => { mouseDown = true; shoot(); }, () => { mouseDown = false; });
  bindHoldButton(els.mobileAim, () => {
    mobileInput.aimHeld = true;
    if (WEAPONS[weaponIndex].melee) startKnifeSkill();
    else if (!tryInteract() && viewMode !== "2d") ads = true;
  }, () => {
    mobileInput.aimHeld = false;
    if (knifeCharging) releaseKnifeCharge();
    ads = false;
  });

  els.mobileGrenade?.addEventListener("touchstart", event => {
    stop(event);
    const touch = event.changedTouches[0];
    if (!touch || !startGrenadeAim(touch.identifier)) return;
    beginLook(touch);
    updateGrenadeCancel(touch);
  }, { passive: false });

  els.mobileGrenade?.addEventListener("touchmove", event => {
    stop(event);
    const touch = [...event.changedTouches].find(t => t.identifier === grenadeTouchId);
    if (touch) updateGrenadeCancel(touch);
  }, { passive: false });

  els.mobileGrenade?.addEventListener("touchend", event => {
    stop(event);
    const touch = [...event.changedTouches].find(t => t.identifier === grenadeTouchId);
    if (touch) finishGrenadeAim();
  }, { passive: false });

  els.mobileGrenade?.addEventListener("touchcancel", event => {
    stop(event);
    const touch = [...event.changedTouches].find(t => t.identifier === grenadeTouchId);
    if (touch) {
      resetGrenadeAim();
      flashMessage("Grenade canceled");
    }
  }, { passive: false });

  let lastTouchTap = 0;
  const bindTap = (button, action) => {
    if (!button) return;
    button.addEventListener("touchstart", event => {
      stop(event);
      lastTouchTap = performance.now();
      action();
      beginLook(event.changedTouches?.[0]);
      button.classList.add("active");
      setTimeout(() => button.classList.remove("active"), 120);
    }, { passive: false });
    button.addEventListener("click", event => {
      event.preventDefault();
      if (performance.now() - lastTouchTap < 450) return;
      action();
    });
  };

  bindTap(els.mobileJump, jump);
  bindTap(els.mobileSlide, startSlide);
  bindTap(els.mobileProne, toggleProne);
  bindTap(els.mobileReload, reload);
  bindTap(els.mobileInteract, tryInteract);
  bindTap(els.mobileView, togglePersonView);
  bindHoldButton(els.mobileExtract, startExtractHold, cancelExtractHold);

  document.querySelectorAll(".mobile-weapon").forEach(button => {
    bindTap(button, () => {
      const index = Number(button.dataset.weapon);
      if (Number.isFinite(index)) {
        switchWeapon(index);
        showHotbar();
        updateMobileWeaponButtons();
      }
    });
  });

  addEventListener("orientationchange", () => setTimeout(resize, 250));
}

function initTouchLayoutControls() {
  applyTouchLayout();
  const bindings = [
    [els.touchStickX, "stickX"],
    [els.touchStickY, "stickY"],
    [els.touchActionsX, "actionsX"],
    [els.touchActionsY, "actionsY"],
    [els.touchScale, "scale"],
    [els.touchLookWidth, "lookWidth"]
  ];
  bindings.forEach(([input, key]) => {
    if (!input) return;
    input.value = String(touchLayout[key]);
    input.addEventListener("input", () => {
      touchLayout[key] = Number(input.value);
      applyTouchLayout();
      saveProgress();
    });
  });
  els.touchLayoutReset?.addEventListener("click", () => {
    touchLayout = { ...TOUCH_LAYOUT_DEFAULTS };
    bindings.forEach(([input, key]) => {
      if (input) input.value = String(touchLayout[key]);
    });
    applyTouchLayout();
    saveProgress();
  });
}

function applyTouchLayout() {
  const root = document.documentElement;
  root.style.setProperty("--touch-stick-x", `${touchLayout.stickX}px`);
  root.style.setProperty("--touch-stick-y", `${touchLayout.stickY}px`);
  root.style.setProperty("--touch-actions-x", `${touchLayout.actionsX}px`);
  root.style.setProperty("--touch-actions-y", `${touchLayout.actionsY}px`);
  root.style.setProperty("--touch-actions-scale", touchLayout.scale / 100);
  root.style.setProperty("--touch-look-width", `${touchLayout.lookWidth}vw`);
}

function renderLobby() {
  renderCharacterGrid();
  renderMapGrid();
  renderSkinRow();
  renderArmoryList();
  applyCharacterSelection();
  if (els.coins) els.coins.textContent = coins;
  if (els.lobbyTrophies) els.lobbyTrophies.textContent = trophies;
}

function saveProgress() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      coins,
      trophies,
      weaponLevels,
      gunSkinIndex,
      characterIndex,
      selectedMap,
      touchLayout
    }));
  } catch (error) {
    console.warn("saveProgress failed:", error);
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (Number.isFinite(data.coins)) coins = Math.max(0, Math.floor(data.coins));
    if (Number.isFinite(data.trophies)) trophies = Math.max(0, Math.floor(data.trophies));
    if (Array.isArray(data.weaponLevels)) {
      weaponLevels = WEAPONS.map((_, index) => clamp(Math.floor(data.weaponLevels[index] || 1), 1, 8));
    }
  if (Number.isFinite(data.gunSkinIndex)) gunSkinIndex = clamp(Math.floor(data.gunSkinIndex), 0, GUN_SKINS.length - 1);
  if (Number.isFinite(data.characterIndex)) characterIndex = clamp(Math.floor(data.characterIndex), 0, CHARACTERS.length - 1);
  if (MAPS.some(map => map.key === data.selectedMap)) selectedMap = data.selectedMap; else selectedMap = "duel";
  if (data.touchLayout && typeof data.touchLayout === "object") {
    touchLayout = {
      stickX: clamp(Number(data.touchLayout.stickX) || TOUCH_LAYOUT_DEFAULTS.stickX, 0, 120),
      stickY: clamp(Number(data.touchLayout.stickY) || TOUCH_LAYOUT_DEFAULTS.stickY, 58, 210),
      actionsX: clamp(Number(data.touchLayout.actionsX) || TOUCH_LAYOUT_DEFAULTS.actionsX, 0, 120),
      actionsY: clamp(Number(data.touchLayout.actionsY) || TOUCH_LAYOUT_DEFAULTS.actionsY, 44, 190),
      scale: clamp(Number(data.touchLayout.scale) || TOUCH_LAYOUT_DEFAULTS.scale, 78, 116),
      lookWidth: clamp(Number(data.touchLayout.lookWidth) || TOUCH_LAYOUT_DEFAULTS.lookWidth, 42, 76)
    };
    applyTouchLayout();
  }
  applyGunSkin();
  } catch (error) {
    console.warn("loadProgress failed:", error);
  }
}

function renderMapGrid() {
  if (!els.mapGrid) return;
  els.mapGrid.innerHTML = "";
  for (const map of MAPS) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `map-card${selectedMap === map.key ? " selected" : ""}`;
    card.innerHTML = `<strong>${map.name}</strong><span>${map.desc}</span>`;
    card.addEventListener("click", () => {
      selectedMap = map.key;
      saveProgress();
      renderMapGrid();
      updateSelectedMapInfo();
    });
    els.mapGrid.append(card);
  }
  updateSelectedMapInfo();
}

function updateSelectedMapInfo() {
  if (!els.selectedMapInfo) return;
  const map = MAPS.find(item => item.key === selectedMap) || MAPS[0];
  els.selectedMapInfo.textContent = `Selected mode: ${map.name}. ${map.desc}`;
}

function renderCharacterGrid() {
  if (!els.characterGrid) return;
  els.characterGrid.innerHTML = "";
  CHARACTERS.forEach((character, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `character-card${index === characterIndex ? " selected" : ""}`;
    card.innerHTML = `<strong>${character.name}</strong><span>${character.role}<br>Skill: ${KNIFE_SKILLS[index]}</span><i class="character-token"></i>`;
    card.querySelector(".character-token").style.background = character.token;
    card.addEventListener("click", () => {
      characterIndex = index;
      saveProgress();
      applyCharacterSelection();
      renderCharacterGrid();
    });
    els.characterGrid.append(card);
  });
}

function applyCharacterSelection() {
  const character = CHARACTERS[characterIndex];
  if (!character) return;
  if (els.characterName) els.characterName.textContent = character.name;
  if (els.characterRole) els.characterRole.textContent = character.role;
  if (els.characterHp) els.characterHp.textContent = character.hp;
  if (els.characterSpeed) els.characterSpeed.textContent = character.speed.toFixed(1);
  if (els.characterSkill) els.characterSkill.textContent = KNIFE_SKILLS[characterIndex] || character.skill;
  if (els.lobbyFighter) els.lobbyFighter.className = `lobby-fighter ${character.className}`;
  applyCharacterMaterials(playerModel, characterIndex);
}

function renderSkinRow() {
  if (!els.skinRow) return;
  els.skinRow.innerHTML = "";
  GUN_SKINS.forEach((skin, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `mini-btn${index === gunSkinIndex ? " active" : ""}`;
    button.textContent = skin.name;
    button.addEventListener("click", () => {
      gunSkinIndex = index;
      applyGunSkin();
      saveProgress();
      renderSkinRow();
    });
    els.skinRow.append(button);
  });
}

function renderArmoryList() {
  if (!els.armoryList) return;
  els.armoryList.innerHTML = "";
  WEAPONS.forEach((weapon, index) => {
    const level = weaponLevels[index];
    const cost = 120 + level * 90;
    const damage = getWeaponDamage(weapon, index);
    const item = document.createElement("div");
    item.className = "armory-item";
    item.innerHTML = `<div><strong>${index + 1}. ${weapon.name} Lv.${level}</strong><div class="armory-meta">Damage ${damage} | ${weapon.melee ? "Melee" : `Mag ${weapon.mag}`} | Range ${weapon.range}</div></div><button class="mini-btn">${level >= 8 ? "Max" : `Upgrade ${cost}`}</button>`;
    const button = item.querySelector("button");
    button.disabled = level >= 8 || coins < cost;
    button.addEventListener("click", () => {
      if (level >= 8 || coins < cost) return;
      coins -= cost;
      weaponLevels[index] += 1;
      saveProgress();
      if (els.coins) els.coins.textContent = coins;
      renderArmoryList();
      flashMessage(`${weapon.name} upgraded to Lv.${weaponLevels[index]}`);
    });
    els.armoryList.append(item);
  });
}

function renderHotbar() {
  if (!els.hotbar) return;
  els.hotbar.innerHTML = "";
  WEAPONS.forEach((weapon, index) => {
    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = `hotbar-slot${index === weaponIndex ? " active" : ""}`;
    slot.title = `${index + 1}. ${weapon.name}`;
    slot.innerHTML = `<span class="hotbar-key">${index + 1}</span><span class="weapon-icon ${weapon.icon}"><span></span></span>`;
    slot.addEventListener("click", () => switchWeapon(index));
    els.hotbar.append(slot);
  });
  updateMobileWeaponButtons();
}

function updateMobileWeaponButtons() {
  document.querySelectorAll(".mobile-weapon").forEach(button => {
    const index = Number(button.dataset.weapon);
    button.classList.toggle("active", index === weaponIndex);
  });
}

function startGame() {
  started = true;
  hp = CHARACTERS[characterIndex]?.hp || 100;
  armor = 50;
  kills = 0;
  matchTrophies = 0;
  inventory = WEAPONS.map(weapon => ({ ammo: weapon.mag, reserve: weapon.reserve }));
  reloadTimer = 0;
  fireTimer = 0;
  grenadeCooldown = 0;
  mouseDown = false;
  ads = false;
  prone = false;
  sliding = false;
  player.eyeHeight = STAND_EYE_HEIGHT;

  if (selectedMap === "practice") {
    wave = 1;
    clearBots();
    spawnBots(10);
    setPlayerSpawn(1);
    updateRoomStatus("Solo Practice: AI bots spawned. No room required.", "ok");
  } else {
    if (!multiplayer.roomCode) {
      started = false;
      flashMessage("Create or join a room first");
      updateRoomStatus("Create a room or enter your friend's room code first.", "bad");
      return;
    }
    if (!multiplayer.opponentReady) {
      started = false;
      flashMessage("Waiting for opponent");
      updateRoomStatus(`Room ${multiplayer.roomCode}: waiting for opponent.`, "warn");
      return;
    }
    wave = multiplayer.roomCode;
    clearBots();
    ensureRemoteBot();
    setPlayerSpawn(multiplayer.role === "host" ? 1 : 2);
    sendSocket({ type: "ready", characterIndex, gunSkinIndex });
  }
  els.menu.classList.add("hidden");
  if (!mobileInput.enabled) renderer.domElement.requestPointerLock?.();
  const modeLabel = selectedMap === "practice" ? "Solo Practice started" : "Online 1V1 started";
  flashMessage(mobileInput.enabled ? `${modeLabel}: left stick moves, right side looks` : modeLabel);
}

function animate(now) {
  const dt = Math.min(0.05, (now - lastFrame) / 1000);
  lastFrame = now;
  requestAnimationFrame(animate);
  if (started && !paused) {
    updateExtractHold(dt);
    updatePlayer(dt);
    if (selectedMap === "duel") updateMultiplayer(dt);
    if (selectedMap === "practice") updateBots(dt);
    updateCombat(dt);
    updatePickups(dt);
    updateTracers(dt);
    updateImpactMarks(dt);
    updateSkillProjectiles(dt);
    if (selectedMap === "practice") updateWave();
  }
  updateCamera(dt);
  drawTopdown2d();
  updateBotHealthbars(dt);
  updateHud(dt);
  renderer.render(scene, camera);
}

function getViewMoveAxes() {
  const forward = new THREE.Vector3();
  if (viewMode === "3d") {
    forward.set(0, 0, -1).applyEuler(new THREE.Euler(0, yaw, 0, "YXZ"));
  } else {
    forward.set(-Math.sin(yaw), 0, -Math.cos(yaw));
  }
  forward.y = 0;
  forward.normalize();
  const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
  return { forward, right };
}

function updatePlayer(dt) {
  const inputX = ((keys.has("KeyD") ? 1 : 0) - (keys.has("KeyA") ? 1 : 0)) + mobileInput.x;
  const inputZ = ((keys.has("KeyW") ? 1 : 0) - (keys.has("KeyS") ? 1 : 0)) + mobileInput.z;
  const length = Math.hypot(inputX, inputZ) || 1;
  const x = inputX / length;
  const z = inputZ / length;

  updateSlide(dt);
  const characterSpeed = CHARACTERS[characterIndex]?.speed || PLAYER_SPEED;
  const baseSpeed = keys.has("ShiftLeft") || keys.has("ShiftRight") || mobileInput.sprint ? characterSpeed * (SPRINT_SPEED / PLAYER_SPEED) : characterSpeed;
  const speed = prone ? baseSpeed * 0.42 : baseSpeed;
  const targetEye = sliding ? SLIDE_EYE_HEIGHT : prone ? PRONE_EYE_HEIGHT : STAND_EYE_HEIGHT;
  player.eyeHeight += (targetEye - player.eyeHeight) * Math.min(1, dt * 14);

  if (viewMode === "2d") {
    const centerX = innerWidth / 2;
    const centerY = innerHeight / 2;
    const aimX = mouse.x - centerX;
    const aimY = mouse.y - centerY;
    if (Math.hypot(aimX, aimY) > 12) yaw = -Math.atan2(aimX, -aimY);
  }

  if (sliding) {
    const step = Math.min(slideDistance, (SPRINT_SPEED * 1.18) * dt);
    const moved = moveWithCollision(player.position, slideDirection.x * step, slideDirection.z * step, 0.48, player.position.y);
    slideDistance -= moved ? step : step * 0.45;
    player.velocity.copy(slideDirection).multiplyScalar(SPRINT_SPEED * 1.18);
    if (slideDistance <= 0.05) sliding = false;
  } else {
    const axes = getViewMoveAxes();
    player.velocity.copy(axes.right.clone().multiplyScalar(x).add(axes.forward.clone().multiplyScalar(z)).multiplyScalar(speed));
    moveWithCollision(player.position, player.velocity.x * dt, player.velocity.z * dt, prone ? 0.5 : 0.62, player.position.y);
  }

  updateVerticalMotion(dt);
  updateStairs(dt);
  updateSpearDash(dt);
  keepOutOfObstacles(player.position, sliding ? 0.48 : prone ? 0.5 : 0.62, player.position.y);
  resolveBasementStuck();
  updatePlayerModel();
}

function resolveBasementStuck() {
  const footY = player.position.y - player.eyeHeight;
  if (footY > BASEMENT_Y + 0.35 || player.position.z < 12 || player.position.z > 58) return;
  player.position.x = clamp(player.position.x, -20.5, 20.5);
  if (player.position.z < 18) player.position.z += 0.18;
}

function jump() {
  if (!started || paused || !player.grounded) return;
  player.verticalVelocity = JUMP_SPEED;
  player.grounded = false;
}

function updateVerticalMotion(dt) {
  const floorY = getFloorHeight(player.position.x, player.position.z, player.position.y);
  if (player.grounded && player.verticalVelocity <= 0) player.fallStartY = player.position.y;
  player.verticalVelocity -= GRAVITY * dt;
  player.position.y += player.verticalVelocity * dt;
  if (player.position.y <= floorY + player.eyeHeight) {
    const landedFrom = player.fallStartY || player.position.y;
    const drop = Math.max(0, landedFrom - (floorY + player.eyeHeight));
    player.position.y = floorY + player.eyeHeight;
    if (!player.grounded) applyFallDamage(drop);
    player.verticalVelocity = 0;
    player.grounded = true;
    player.fallStartY = player.position.y;
  } else {
    if (player.grounded) player.fallStartY = player.position.y;
    player.grounded = false;
  }
}

function updateStairs(dt) {
  const footY = player.position.y - player.eyeHeight;
  const zone = getStairZone(player.position.x, player.position.z, footY);
  if (!zone) return;
  const floorY = getFloorHeight(player.position.x, player.position.z, footY + 0.9);
  player.position.y += ((floorY + player.eyeHeight) - player.position.y) * Math.min(1, dt * 12);
  player.verticalVelocity = 0;
  player.grounded = true;
  player.fallStartY = player.position.y;
}

function updateBots(dt) {
  let activeShooters = 0;
  for (const bot of bots) {
    if (bot.isRemote) continue;
    if (bot.deadTimer > 0) {
      if (bot.deadTimer >= 900) continue;
      bot.deadTimer -= dt;
      if (bot.deadTimer <= 0) respawnBot(bot);
      continue;
    }

    updateBotVerticalMotion(bot, dt);
    updateBotStairs(bot, dt);

    const toPlayer = player.position.clone().sub(bot.group.position);
    const distance = toPlayer.length();
    const sameFloor = Math.abs(player.position.y - (bot.group.position.y - BOT_STAND_HEIGHT + player.eyeHeight)) < 2.4;
    const canSeePlayer = sameFloor && distance < 34 && hasLineOfSight3d(bot.group.position, player.position);
    const moveTarget = getBotMoveTarget(bot, canSeePlayer);
    const desired = moveTarget.clone().sub(bot.group.position);
    desired.y = 0;
    if (desired.lengthSq() > 0.04) bot.group.rotation.y = Math.atan2(desired.x, desired.z);
    let walkSpeed = 0;

    const onStair = isOnAnyStair(bot.group.position.x, bot.group.position.z, bot.group.position.y - BOT_STAND_HEIGHT);
    const botRadius = onStair ? 0.42 : 0.72;

    if (canSeePlayer && distance > 9.5) {
      desired.normalize();
      walkSpeed = BOT_SPEED;
      moveWithCollision(bot.group.position, desired.x * walkSpeed * dt, desired.z * walkSpeed * dt, botRadius, bot.group.position.y);
    } else if (!canSeePlayer) {
      bot.wanderTimer -= dt;
      if (bot.wanderTimer <= 0) {
        bot.wanderTimer = rand(0.75, 1.65);
        bot.wanderAngle = rand(-Math.PI, Math.PI);
      }
      const wander = moveTarget.userData?.stairGoal
        ? desired
        : new THREE.Vector3(Math.sin(bot.wanderAngle), 0, Math.cos(bot.wanderAngle));
      if (wander.lengthSq() > 0.02) wander.normalize();
      walkSpeed = BOT_SPEED * 0.72;
      moveWithCollision(bot.group.position, wander.x * walkSpeed * dt, wander.z * walkSpeed * dt, botRadius, bot.group.position.y);
    }
    animateCharacter(bot.group, walkSpeed, dt);

    if (!onStair) keepOutOfObstacles(bot.group.position, 0.74, bot.group.position.y);
    keepBotInsidePlayableArea(bot);
    bot.fireTimer -= dt;
    if (canSeePlayer && distance < 24 && bot.fireTimer <= 0 && activeShooters < 2) {
      activeShooters += 1;
      bot.fireTimer = rand(1.2, 2.1);
      addTracer(bot.group.position.clone().add(new THREE.Vector3(0, 0.8, 0)), player.position.clone().add(new THREE.Vector3(0, 0.8, 0)), 0xff5959);
      applyDamage(4 + Math.floor(wave * 0.75));
    }
  }
}

function updateCombat(dt) {
  const weapon = WEAPONS[weaponIndex];
  if (mouseDown && weapon.auto) shoot();
  fireTimer = Math.max(0, fireTimer - dt);
  if (reloadTimer > 0) {
    reloadTimer -= dt;
    if (reloadTimer <= 0) {
      finishReload();
      flashMessage("Reload complete");
    }
  }
  hitTimer = Math.max(0, hitTimer - dt);
  hurtTimer = Math.max(0, hurtTimer - dt);
  shakeTimer = Math.max(0, shakeTimer - dt);
  waveAnnounceTimer = Math.max(0, waveAnnounceTimer - dt);
  meleeSwingTimer = Math.max(0, meleeSwingTimer - dt);
  wallSkillCooldown = Math.max(0, wallSkillCooldown - dt);
  grenadeCooldown = Math.max(0, grenadeCooldown - dt);
  updateShieldWalls(dt);
  if (knifeCharging) {
    knifeChargeTimer = Math.min(1.6, knifeChargeTimer + dt);
    slashEffect.classList.add("charging");
    updateChargeBar();
  } else {
    slashEffect.classList.remove("charging");
    updateChargeBar();
  }
  if (messageTimer > 0) {
    messageTimer -= dt;
    if (messageTimer <= 0) els.message.textContent = "";
  }
  if (els.waveAnnounce && waveAnnounceTimer <= 0) els.waveAnnounce.textContent = "";
}

function shoot() {
  if (fireTimer > 0 || reloadTimer > 0) return;
  const weapon = WEAPONS[weaponIndex];
  const mag = inventory[weaponIndex];
  if (!weapon.melee && mag.ammo <= 0) {
    reload();
    return;
  }
  if (!weapon.melee) mag.ammo -= 1;
  fireTimer = weapon.cooldown;
  gun.userData.flash.material.opacity = weapon.melee ? 0 : 1;
  if (!weapon.melee) {
    playGunSound(weapon.name);
    shakeTimer = Math.max(shakeTimer, 0.08);
    shakePower = weapon.name === "Sniper" ? 0.075 : weapon.name === "Shotgun" ? 0.055 : 0.035;
  }

  if (weapon.melee) {
    meleeSwingTimer = 0.18;
    slashEffect.classList.remove("active");
    void slashEffect.offsetWidth;
    slashEffect.classList.add("active");
    const hit = traceMelee(weapon.range);
    if (hit) {
      damageBot(hit.bot, getWeaponDamage(weapon, weaponIndex), "");
      showHitmarker();
    } else {
      const impact = traceKnifeImpact(weapon.range);
      if (impact) addImpactMark(impact.point, impact.normal, "slash");
    }
    return;
  }

  const origin = getShotOrigin();
  let anyHit = false;
  for (let i = 0; i < weapon.pellets; i++) {
    const direction = getAimDirection(weapon.spread * getAimSpreadMultiplier(weapon));
    const end = origin.clone().addScaledVector(direction, weapon.range);
    const hit = traceShot(origin, direction, weapon.range);
    if (!weapon.melee) addTracer(origin, hit?.point || end, 0xffe08a);
    if (!hit?.bot) {
      if (hit?.point) addImpactMark(hit.point, hit.normal, "bullet");
      continue;
    }
    const distanceScale = clamp(1 - hit.distance / (weapon.range * 1.5), 0.55, 1);
    const hitScale = getHitDamageScale(hit);
    const damage = Math.round(getWeaponDamage(weapon, weaponIndex) * distanceScale * hitScale.multiplier);
    damageBot(hit.bot, damage, hitScale.label);
    anyHit = true;
  }
  if (anyHit) showHitmarker();
}

function traceMelee(range) {
  const forward = getViewMoveAxes().forward;
  let best = null;
  for (const bot of bots) {
    if (!bot.group.visible || bot.deadTimer > 0) continue;
    const toBot = bot.group.position.clone().sub(player.position);
    const flatDistance = Math.hypot(toBot.x, toBot.z);
    if (flatDistance > range || Math.abs(toBot.y) > 2.2) continue;
    const direction = new THREE.Vector3(toBot.x, 0, toBot.z).normalize();
    if (direction.dot(forward) < 0.28) continue;
    if (!best || flatDistance < best.distance) best = { bot, distance: flatDistance };
  }
  return best;
}

function traceKnifeImpact(range) {
  const origin = getShotOrigin();
  const direction = getAimDirection(0);
  raycaster.set(origin, direction);
  const hits = raycaster.intersectObjects(getBlockingObstacles("shot"), false).filter(hit => hit.distance <= range);
  const hit = hits[0];
  if (!hit) return null;
  return { point: hit.point, normal: getHitNormal(hit), distance: hit.distance };
}

function startKnifeSkill() {
  if (!started || paused || WEAPONS[weaponIndex].name !== "Knife" || fireTimer > 0) return;
  if (characterIndex === WALL_CHARACTER_INDEX) {
    deployShieldWall("self");
    return;
  }
  knifeCharging = true;
  knifeChargeTimer = 0;
  flashMessage(KNIFE_SKILLS[characterIndex]);
}

function releaseKnifeCharge() {
  if (!knifeCharging) return;
  const charge = clamp(knifeChargeTimer / 1.35, 0.18, 1);
  knifeCharging = false;
  knifeChargeTimer = 0;
  if (characterIndex === WALL_CHARACTER_INDEX) return;
  fireTimer = characterIndex === 3 ? 0.58 : characterIndex === 4 ? 1.2 : 0.85;
  if (characterIndex === 0) throwSkillBlade("trident", charge);
  else if (characterIndex === 1) throwSkillBlade("boomerang", charge);
  else if (characterIndex === 2) throwSkillBlade("homing", charge);
  else if (characterIndex === 3) startSpearDash(charge);
  else if (characterIndex === 4) throwSkillBlade("missile", charge);
}

function updateChargeBar() {
  if (!els.chargeBar) return;
  const amount = knifeCharging ? clamp(knifeChargeTimer / 1.35, 0, 1) : 0;
  els.chargeBar.classList.toggle("active", knifeCharging);
  const fill = els.chargeBar.firstElementChild;
  if (fill) fill.style.width = `${Math.round(amount * 100)}%`;
}

function startSpearDash(charge) {
  meleeSwingTimer = 0.24;
  slashEffect.classList.remove("active");
  void slashEffect.offsetWidth;
  slashEffect.classList.add("active");
  spearDashTimer = 1.05;
  spearDashCharge = charge;
  spearDashHits.clear();
  flashMessage("Piercing dash window");
}

function getBlockingObstacles(mode = "outgoingShot") {
  return obstacles.filter(obstacle => {
    if (obstacle.userData.open) return false;
    if (obstacle.userData.shieldWall && obstacle.userData.owner === "self" && (mode === "outgoingShot" || mode === "shot")) return false;
    return true;
  });
}

function deployShieldWall(owner = "self", remoteData = null) {
  if (!started && owner === "self") return;
  if (owner === "self" && characterIndex !== WALL_CHARACTER_INDEX) return;
  if (owner === "self" && WEAPONS[weaponIndex].name !== "Knife") return;
  if (owner === "self" && wallSkillCooldown > 0) {
    flashMessage(`Wall skill cooldown ${wallSkillCooldown.toFixed(1)}s`);
    return;
  }
  const dir = remoteData?.dir ? new THREE.Vector3(remoteData.dir.x || 0, 0, remoteData.dir.z || -1) : getViewMoveAxes().forward.clone();
  dir.y = 0;
  if (dir.lengthSq() < 0.001) dir.set(0, 0, -1);
  dir.normalize();
  const right = new THREE.Vector3(dir.z, 0, -dir.x).normalize();
  const footY = owner === "self" ? player.position.y - player.eyeHeight : Number(remoteData?.footY ?? 0);
  const pos = remoteData?.pos
    ? new THREE.Vector3(Number(remoteData.pos.x) || 0, footY + WALL_HEIGHT / 2, Number(remoteData.pos.z) || 0)
    : new THREE.Vector3(player.position.x, footY + WALL_HEIGHT / 2, player.position.z);

  const mat = new THREE.MeshStandardMaterial({
    color: owner === "self" ? 0x6f8cff : 0xff5959,
    transparent: true,
    opacity: owner === "self" ? 0.46 : 0.58,
    roughness: 0.25,
    metalness: 0.08,
    emissive: owner === "self" ? 0x1b2cff : 0x3d0909,
    emissiveIntensity: 0.28
  });
  const wall = new THREE.Mesh(new THREE.BoxGeometry(WALL_WIDTH, WALL_HEIGHT, WALL_THICKNESS), mat);
  wall.position.copy(pos);
  wall.rotation.y = Math.atan2(dir.x, dir.z);
  wall.castShadow = true;
  wall.receiveShadow = true;
  wall.userData.shieldWall = true;
  wall.userData.owner = owner;
  wall.userData.life = WALL_LIFETIME;
  wall.userData.floorSlab = false;
  wall.userData.open = false;

  scene.add(wall);
  obstacles.push(wall);
  shieldWalls.push(wall);

  if (owner === "self") {
    wallSkillCooldown = WALL_COOLDOWN;
    flashMessage("Guardian wall placed: allies pass through, enemies and enemy shots are blocked");
    sendSocket({
      type: "action",
      action: "shieldWall",
      wall: {
        pos: { x: pos.x, z: pos.z },
        footY,
        dir: { x: dir.x, z: dir.z }
      }
    });
  }
}

function updateShieldWalls(dt) {
  for (let i = shieldWalls.length - 1; i >= 0; i--) {
    const wall = shieldWalls[i];
    wall.userData.life -= dt;
    if (wall.userData.life < 2) wall.material.opacity = Math.max(0.08, wall.material.opacity - dt * 0.22);
    if (wall.userData.life > 0) continue;
    scene.remove(wall);
    const obstacleIndex = obstacles.indexOf(wall);
    if (obstacleIndex >= 0) obstacles.splice(obstacleIndex, 1);
    shieldWalls.splice(i, 1);
    wall.geometry.dispose();
    wall.material.dispose();
  }
}

function updateSpearDash(dt) {
  if (spearDashTimer <= 0) return;
  spearDashTimer = Math.max(0, spearDashTimer - dt);
  if (characterIndex !== 3 || WEAPONS[weaponIndex].name !== "Knife") return;
  const speed = player.velocity.length();
  const speedRatio = clamp(speed / SPRINT_SPEED, 0, 1.6);
  if (speedRatio < 0.55) return;
  const forward = player.velocity.clone();
  forward.y = 0;
  if (forward.lengthSq() <= 0.01) return;
  forward.normalize();
  for (const bot of bots) {
    if (!bot.group.visible || bot.deadTimer > 0 || spearDashHits.has(bot)) continue;
    const toBot = bot.group.position.clone().sub(player.position);
    const flatDistance = Math.hypot(toBot.x, toBot.z);
    if (flatDistance > 1.55 || Math.abs(toBot.y) > 2.2) continue;
    const throughDot = new THREE.Vector3(toBot.x, 0, toBot.z).normalize().dot(forward);
    if (throughDot < 0.15) continue;
    const damage = Math.round(clamp(8 + speedRatio * 24 + spearDashCharge * 18, 10, 50));
    spearDashHits.add(bot);
    damageBot(bot, damage, `Piercing dash x${speedRatio.toFixed(1)}`);
    showHitmarker();
    shakeTimer = Math.max(shakeTimer, 0.12);
    shakePower = Math.max(shakePower, 0.06);
  }
}

function throwSkillBlade(type, charge) {
  meleeSwingTimer = 0.18;
  slashEffect.classList.remove("active");
  void slashEffect.offsetWidth;
  slashEffect.classList.add("active");

  const forward = getAimDirection(0);
  if (viewMode === "2d" || type === "boomerang") forward.y = 0;
  forward.normalize();
  const origin = player.position.clone().add(new THREE.Vector3(0, 0.65, 0)).addScaledVector(forward, 0.9);
  const speedBonus = clamp(player.velocity.length() / SPRINT_SPEED, 0, 1.55);
  const projectile = {
    type,
    mesh: buildSkillBladeMesh(type),
    position: origin.clone(),
    velocity: forward.clone().multiplyScalar(type === "trident" ? 17 + charge * 12 : type === "boomerang" ? 16 + charge * 10 : type === "homing" ? 15 + charge * 8 : 16),
    forward,
    charge,
    age: 0,
    life: type === "spear" ? 0.7 : type === "boomerang" ? 1.05 : 1.6,
    returning: false,
    hitBots: new Set(),
    target: type === "homing" ? findKnifeLockTarget(forward) : null,
    fixedY: type === "boomerang" ? origin.y : null,
    gravityScale: type === "trident" ? 0.08 + (1 - charge) * 0.22 : 0,
    side: getViewMoveAxes().right,
    damage: Math.round(clamp(18 + charge * 32, 18, 50))
  };
  if (type === "missile") {
    projectile.life = 4.2 + charge * 1.6;
    projectile.velocity.copy(forward).multiplyScalar(8.5 + charge * 5.5);
    projectile.damage = Math.round(clamp(24 + charge * 36, 28, 60));
  }
  projectile.mesh.position.copy(projectile.position);
  scene.add(projectile.mesh);
  skillProjectiles.push(projectile);
  flashMessage(type === "spear" ? `Piercing dash x${(1 + speedBonus).toFixed(1)}` : KNIFE_SKILLS[characterIndex]);
}

function startGrenadeAim(touchId = null) {
  if (!started || paused || grenadeAiming) return false;
  if (grenadeCooldown > 0) {
    flashMessage(`Grenade cooldown ${grenadeCooldown.toFixed(1)}s`);
    return false;
  }
  grenadeAiming = true;
  grenadeTouchId = touchId;
  grenadeCanceled = false;
  mouseDown = false;
  ads = false;
  document.body.classList.add("grenade-aiming");
  els.mobileGrenade?.classList.add("active");
  els.grenadeCancel?.classList.remove("cancel-active");
  flashMessage("Release to throw grenade");
  return true;
}

function updateGrenadeCancel(touch) {
  if (!grenadeAiming || !touch || !els.grenadeCancel) return;
  const rect = els.grenadeCancel.getBoundingClientRect();
  grenadeCanceled = touch.clientX >= rect.left && touch.clientX <= rect.right && touch.clientY >= rect.top && touch.clientY <= rect.bottom;
  els.grenadeCancel.classList.toggle("cancel-active", grenadeCanceled);
}

function finishGrenadeAim() {
  if (!grenadeAiming) return;
  const canceled = grenadeCanceled;
  resetGrenadeAim();
  if (canceled) {
    flashMessage("Grenade canceled");
    return;
  }
  throwGrenade();
}

function resetGrenadeAim() {
  grenadeAiming = false;
  grenadeTouchId = null;
  grenadeCanceled = false;
  document.body.classList.remove("grenade-aiming");
  els.mobileGrenade?.classList.remove("active");
  els.grenadeCancel?.classList.remove("cancel-active");
}

function throwGrenade() {
  if (!started || paused || grenadeCooldown > 0) return;
  const forward = getAimDirection(0);
  forward.normalize();
  const origin = player.position.clone().add(new THREE.Vector3(0, 0.45, 0)).addScaledVector(forward, 0.75);
  const projectile = {
    type: "grenade",
    mesh: buildGrenadeMesh(),
    position: origin.clone(),
    velocity: forward.clone().multiplyScalar(12.5).add(new THREE.Vector3(0, 5.6, 0)),
    age: 0,
    life: 2.6,
    returning: false,
    exploded: false,
    hitBots: new Set(),
    damage: 42
  };
  projectile.mesh.position.copy(projectile.position);
  scene.add(projectile.mesh);
  skillProjectiles.push(projectile);
  grenadeCooldown = GRENADE_COOLDOWN;
  flashMessage("Grenade thrown");
}

function buildGrenadeMesh() {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 12, 10),
    new THREE.MeshStandardMaterial({ color: 0x263827, roughness: 0.7, metalness: 0.25 })
  );
  const band = new THREE.Mesh(
    new THREE.BoxGeometry(0.28, 0.07, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x121812, roughness: 0.65 })
  );
  const pin = new THREE.Mesh(
    new THREE.TorusGeometry(0.1, 0.012, 6, 16),
    new THREE.MeshStandardMaterial({ color: 0xc9c7b8, metalness: 0.8, roughness: 0.25 })
  );
  pin.position.set(0.12, 0.16, 0);
  pin.rotation.y = Math.PI / 2;
  group.add(body, band, pin);
  return group;
}

function buildSkillBladeMesh(type) {
  const group = new THREE.Group();
  const bladeMat = new THREE.MeshStandardMaterial({ color: type === "homing" ? 0x8fffd5 : type === "boomerang" ? 0xffd86f : type === "missile" ? 0xa9dcff : 0xf5f7ff, metalness: 0.55, roughness: 0.2, emissive: type === "homing" ? 0x0b4f34 : type === "missile" ? 0x0d3654 : 0x111111, emissiveIntensity: 0.25 });
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.45, roughness: 0.18 });
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x4a2a17, roughness: 0.72 });
  const blade = makeKnifeBladeMesh(type === "spear" ? 0.18 : 0.14, type === "spear" ? 1.25 : 0.82, bladeMat);
  blade.position.z = type === "spear" ? -0.42 : -0.18;
  const edge = part(0.018, 0.035, type === "spear" ? 1.0 : 0.62, edgeMat, 0.075, 0.0, type === "spear" ? -0.43 : -0.18);
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.075, type === "spear" ? 1.25 : 0.46, 8), handleMat);
  handle.rotation.x = Math.PI / 2;
  handle.position.z = type === "spear" ? 0.58 : 0.3;
  const guard = part(0.36, 0.055, 0.07, bladeMat, 0, 0, type === "spear" ? 0.06 : 0.1);
  group.add(blade, edge, guard, handle);
  return group;
}

function makeKnifeBladeMesh(width, length, material) {
  const shape = new THREE.Shape();
  shape.moveTo(0, -length * 0.5);
  shape.lineTo(width, -length * 0.2);
  shape.lineTo(width * 0.55, length * 0.42);
  shape.lineTo(0, length * 0.5);
  shape.lineTo(-width * 0.55, length * 0.42);
  shape.lineTo(-width, -length * 0.2);
  shape.lineTo(0, -length * 0.5);
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.035, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.01, bevelSegments: 1 });
  geometry.center();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function findKnifeLockTarget(forward) {
  let best = null;
  let bestScore = Infinity;
  const origin = player.position.clone();
  for (const bot of bots) {
    if (!bot.group.visible || bot.deadTimer > 0) continue;
    const toBot = bot.group.position.clone().sub(origin);
    const distance = toBot.length();
    if (distance > 42) continue;
    const dir = toBot.clone();
    dir.y = 0;
    if (dir.lengthSq() <= 0.001) continue;
    dir.normalize();
    const aim = dir.dot(forward);
    if (aim < 0.45) continue;
    const score = distance * (1.25 - aim);
    if (score < bestScore) {
      bestScore = score;
      best = bot;
    }
  }
  return best;
}

function reload() {
  const weapon = WEAPONS[weaponIndex];
  if (weapon.melee) return;
  const mag = inventory[weaponIndex];
  if (reloadTimer > 0 || mag.ammo === weapon.mag || mag.reserve <= 0) return;
  reloadTimer = weapon.reload;
  flashMessage("Reloading");
}

function finishReload() {
  const weapon = WEAPONS[weaponIndex];
  if (weapon.melee) return;
  const mag = inventory[weaponIndex];
  const needed = weapon.mag - mag.ammo;
  const moved = Math.min(needed, mag.reserve);
  mag.ammo += moved;
  mag.reserve -= moved;
}

function getScopeZoom(weapon) {
  if (weapon.name === "Sniper") return 6;
  if (weapon.name === "Rifle") return 1.35;
  return 1;
}

function getWeaponDamage(weapon, index = WEAPONS.indexOf(weapon)) {
  const level = weaponLevels[index] || 1;
  return Math.round(weapon.damage * (1 + (level - 1) * 0.08));
}

function getAimSpreadMultiplier(weapon) {
  if (!ads || viewMode === "2d") return 1;
  return weapon.name === "Sniper" ? 0.12 : weapon.name === "Rifle" ? 0.38 : 0.55;
}

function toggleProne() {
  if (!started || paused || sliding) return;
  prone = !prone;
  flashMessage(prone ? "Prone" : "Stand");
}

function startSlide() {
  if (!started || paused || sliding || prone || slideCooldown > 0) return;
  sliding = true;
  slideTimer = 0.72;
  slideDistance = 8.9;
  slideCooldown = 0.9;
  slideDirection.copy(getViewMoveAxes().forward).normalize();
  player.verticalVelocity = Math.min(player.verticalVelocity, -0.4);
  flashMessage("Slide");
}

function updateSlide(dt) {
  slideCooldown = Math.max(0, slideCooldown - dt);
  if (!sliding) return;
  slideTimer -= dt;
  if (slideTimer <= 0 || slideDistance <= 0) {
    sliding = false;
    slideDistance = 0;
  }
}

function applyFallDamage(drop) {
  const floors = drop / FLOOR_HEIGHT;
  if (floors < 2.6) return;
  const damage = Math.round((floors - 2.2) * 18 + Math.max(0, floors - 3) * 16);
  applyDamage(damage);
  flashMessage(`Fall damage -${damage} HP`);
}

function getAimDirection(spread) {
  const direction = new THREE.Vector3();
  if (viewMode === "3d") {
    direction.set(0, 0, -1).applyEuler(new THREE.Euler(pitch, yaw, 0, "YXZ"));
  } else if (viewMode === "third") {
    camera.getWorldDirection(direction);
  } else {
    direction.set(-Math.sin(yaw), 0, -Math.cos(yaw));
  }
  direction.x += rand(-spread, spread);
  direction.y += rand(-spread, spread);
  direction.z += rand(-spread, spread);
  return direction.normalize();
}

function getShotOrigin() {
  if (viewMode === "3d" || viewMode === "third") {
    const origin = new THREE.Vector3();
    camera.getWorldPosition(origin);
    return origin;
  }
  return player.position.clone().add(new THREE.Vector3(0, 0.8, 0));
}

function traceShot(origin, direction, range) {
  if (viewMode === "2d") return findForgivingHit(origin, direction, range);
  raycaster.set(origin, direction);
  const botHits = raycaster.intersectObjects(bots.filter(bot => bot.deadTimer <= 0).map(bot => bot.hitbox), false).filter(hit => hit.distance <= range);
  const wallHits = raycaster.intersectObjects(getBlockingObstacles("shot"), false).filter(hit => hit.distance <= range);
  const firstBot = botHits[0];
  const firstWall = wallHits[0];
  const first = firstBot && (!firstWall || firstBot.distance <= firstWall.distance + 0.45) ? firstBot : firstWall || findForgivingHit(origin, direction, range);
  if (!first) return null;
  return {
    point: first.point,
    normal: getHitNormal(first),
    distance: first.distance,
    bot: first.bot || bots.find(bot => bot.hitbox === first.object) || null
  };
}

function getHitNormal(hit) {
  if (!hit?.face?.normal) return new THREE.Vector3(0, 1, 0);
  return hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize();
}

function findForgivingHit(origin, direction, range) {
  let best = null;
  const aimRadius = viewMode === "2d" ? 2.05 : ads ? getScopeZoom(WEAPONS[weaponIndex]) > 1 ? 0.42 : 0.72 : 0.95;
  for (const bot of bots) {
    if (!bot.group.visible || bot.deadTimer > 0) continue;
    const center = bot.group.position.clone().add(new THREE.Vector3(0, 0.92, 0));
    const toTarget = center.sub(origin);
    if (viewMode === "2d") toTarget.y = 0;
    const alongRay = toTarget.dot(direction);
    if (alongRay <= 0 || alongRay > range) continue;
    const closest = origin.clone().addScaledVector(direction, alongRay);
    const missVector = center.clone().sub(closest);
    if (viewMode === "2d") missVector.y = 0;
    const missDistance = missVector.length();
    if (missDistance > aimRadius) continue;
    if (viewMode !== "2d" && isBlocked(origin, direction, alongRay)) continue;
    if (!best || alongRay < best.distance) {
      best = { bot, distance: alongRay, point: closest };
    }
  }
  return best;
}

function isBlocked(origin, direction, distance, mode = "outgoingShot") {
  raycaster.set(origin, direction);
  const walls = raycaster.intersectObjects(getBlockingObstacles(mode), false);
  return walls.some(hit => hit.distance < distance);
}

function hasLineOfSight3d(from, to) {
  const origin = from.clone().add(new THREE.Vector3(0, 0.8, 0));
  const target = to.clone().add(new THREE.Vector3(0, 0.8, 0));
  const direction = target.clone().sub(origin);
  const distance = direction.length();
  if (distance <= 0) return true;
  direction.normalize();
  return !isBlocked(origin, direction, distance, "incomingShot");
}

function getHitDamageScale(hit) {
  if (!hit?.bot || !hit.point) return { multiplier: 1, label: "" };
  const localY = hit.point.y - hit.bot.group.position.y;
  if (localY > 0.58) return { multiplier: 2.25, label: "Headshot" };
  if (localY < -0.45) return { multiplier: 0.75, label: "Leg hit" };
  return { multiplier: 1, label: "" };
}

function damageBot(bot, damage, label = "", knock = null) {
  if (!bot || bot.deadTimer > 0) return;
  bot.hp -= damage;
  bot.healthbarTimer = 2.6;
  bot.group.scale.setScalar(1.08);
  setTimeout(() => bot.group.scale.setScalar(1), 80);
  if (label) flashMessage(`${label} -${damage}`);
  if (bot.isRemote) {
    sendSocket({ type: "hit", damage, label, weapon: WEAPONS[weaponIndex].name, knock });
    showHitmarker();
    return;
  }
  if (bot.hp > 0) return;
  bot.deadTimer = 999;
  bot.group.visible = false;
  bot.healthbar.classList.add("hidden");
  kills += 1;
  dropPickup(bot.group.position);
  flashMessage("Target down");
}

function applyDamage(amount) {
  let damage = amount;
  if (armor > 0) {
    const blocked = Math.min(armor, Math.ceil(damage * 0.65));
    armor -= blocked;
    damage -= Math.floor(blocked * 0.55);
  }
  hp = Math.max(0, hp - damage);
  playHurtSound();
  hurtTimer = 0.55;
  shakeTimer = Math.max(shakeTimer, 0.18);
  shakePower = Math.max(shakePower, 0.08);
  flashMessage(hp <= 0 ? "Downed. Respawning" : `-${damage} HP`);
  if (hp <= 0) {
    sendSocket({ type: "down" });
    respawnPlayer();
  }
}

function showHitmarker() {
  hitTimer = 0.14;
}

function getAudioContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playGunSound(name) {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(name === "Sniper" ? 420 : 620, now);
  osc.type = "square";
  osc.frequency.setValueAtTime(name === "Sniper" ? 90 : name === "Shotgun" ? 120 : 170, now);
  osc.frequency.exponentialRampToValueAtTime(45, now + (name === "Sniper" ? 0.16 : 0.09));
  gain.gain.setValueAtTime(name === "Sniper" ? 0.22 : 0.14, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + (name === "Sniper" ? 0.22 : 0.12));
  osc.connect(filter).connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.24);
}

function playHurtSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.exponentialRampToValueAtTime(70, now + 0.18);
  gain.gain.setValueAtTime(0.16, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.22);
}

function dropPickup(position) {
  const type = Math.random() < 0.55 ? "ammo" : Math.random() < 0.5 ? "armor" : "med";
  const mesh = buildPickupMesh(type);
  mesh.position.copy(position);
  mesh.position.y = position.y > 1 ? position.y + 0.35 : 0.36;
  mesh.castShadow = true;
  mesh.userData.type = type;
  pickups.push(mesh);
  scene.add(mesh);
}

function buildPickupMesh(type) {
  if (type === "ammo") {
    const group = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 0.55), materials.loot);
    base.position.y = -0.08;
    group.add(base);
    const casing = new THREE.MeshStandardMaterial({ color: 0xd7a737, metalness: 0.45, roughness: 0.35 });
    const tip = new THREE.MeshStandardMaterial({ color: 0x5b4a32, metalness: 0.25, roughness: 0.42 });
    for (let i = 0; i < 6; i++) {
      const bullet = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.46, 10), casing);
      bullet.rotation.z = Math.PI / 2;
      bullet.position.set(-0.32 + i * 0.13, 0.08, (i % 2) * 0.16 - 0.08);
      const nose = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.13, 10), tip);
      nose.rotation.z = -Math.PI / 2;
      nose.position.set(bullet.position.x + 0.29, bullet.position.y, bullet.position.z);
      group.add(bullet, nose);
    }
    group.userData.type = type;
    return group;
  }
  if (type === "med") {
    const kit = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.28, 0.62), new THREE.MeshStandardMaterial({ color: 0xf2f2e8, roughness: 0.5 }));
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.32, 0.04), new THREE.MeshBasicMaterial({ color: 0xd62828 }));
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.12, 0.04), new THREE.MeshBasicMaterial({ color: 0xd62828 }));
    crossV.position.set(0, 0.02, -0.33);
    crossH.position.set(0, 0.02, -0.34);
    kit.add(crossV, crossH);
    kit.userData.type = type;
    return kit;
  }
  const vest = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.5, 0.18), new THREE.MeshStandardMaterial({ color: 0x4db6ff, metalness: 0.12, roughness: 0.44 }));
  const plate = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.34, 0.05), materials.road);
  plate.position.set(0, 0, -0.12);
  vest.add(plate);
  vest.userData.type = type;
  return vest;
}

function updatePickups(dt) {
  for (let i = pickups.length - 1; i >= 0; i--) {
    const pickup = pickups[i];
    pickup.rotation.y += dt * 2.6;
    const baseY = pickup.userData.baseY ?? pickup.position.y;
    pickup.userData.baseY = baseY;
    pickup.position.y = baseY + Math.sin(performance.now() / 240 + i) * 0.08;
    if (pickup.position.distanceTo(player.position) > 1.45) continue;
    collectPickup(pickup);
    scene.remove(pickup);
    pickups.splice(i, 1);
  }
}

function collectPickup(pickup) {
  if (pickup.userData.type === "ammo") {
    for (let i = 0; i < inventory.length; i++) {
      if (WEAPONS[i].melee) continue;
      inventory[i].reserve += Math.ceil(WEAPONS[i].mag * 0.7);
    }
    flashMessage("Ammo picked up");
  } else if (pickup.userData.type === "armor") {
    armor = Math.min(100, armor + 35);
    flashMessage("Armor picked up");
  } else {
    hp = Math.min(100, hp + 30);
    flashMessage("Health restored");
  }
}

function tryInteract() {
  const origin = getShotOrigin();
  const direction = getAimDirection(0);
  raycaster.set(origin, direction);
  const interactables = [
    ...doors,
    ...lootCrates.filter(crate => !crate.userData.looted)
  ];
  const hit = raycaster.intersectObjects(interactables, false).find(item => item.distance < 5);
  if (!hit) return false;
  if (doors.includes(hit.object)) {
    toggleDoor(hit.object);
    return true;
  }
  if (lootCrates.includes(hit.object)) {
    lootCrate(hit.object);
    return true;
  }
  return false;
}

function toggleDoor(door) {
  const opening = !door.userData.open;
  door.userData.open = opening;
  if (opening) {
    door.position.copy(door.userData.closedPosition).add(door.userData.openOffset);
    door.rotation.y = door.userData.closedRotationY;
  } else {
    door.position.copy(door.userData.closedPosition);
    door.rotation.y = door.userData.closedRotationY;
  }
  flashMessage(opening ? "Door opened" : "Door closed");
}

function lootCrate(crate) {
  crate.userData.looted = true;
  crate.visible = false;
  const roll = Math.random();
  if (roll < 0.42) {
    for (let i = 0; i < inventory.length; i++) {
      if (WEAPONS[i].melee) continue;
      inventory[i].reserve += Math.ceil(WEAPONS[i].mag * 0.85);
    }
    flashMessage("Loot: ammo");
  } else if (roll < 0.74) {
    armor = Math.min(100, armor + 45);
    flashMessage("Loot: armor");
  } else {
    hp = Math.min(100, hp + 35);
    flashMessage("Loot: med kit");
  }
}

function updateWave() {
  if (bots.some(bot => bot.group.visible || bot.deadTimer > 0 && bot.deadTimer < 900)) return;
  const reward = awardMatchRewards();
  wave += 1;
  showWaveAnnounce(`Wave ${wave} bots incoming`);
  flashMessage(`Wave ${wave} | +${reward.trophies} trophies +${reward.coins} coins`);
  for (let i = bots.length - 1; i >= 0; i--) {
    bots[i].healthbar.remove();
    scene.remove(bots[i].group);
    bots.splice(i, 1);
  }
  spawnBots(3 + wave * 2);
}

function showWaveAnnounce(text) {
  if (!els.waveAnnounce) return;
  els.waveAnnounce.textContent = text;
  els.waveAnnounce.classList.remove("active");
  void els.waveAnnounce.offsetWidth;
  els.waveAnnounce.classList.add("active");
  waveAnnounceTimer = 2.4;
}

function awardMatchRewards() {
  const trophyReward = 8;
  const coinReward = 100;
  trophies += trophyReward;
  matchTrophies += trophyReward;
  coins += coinReward;
  if (els.coins) els.coins.textContent = coins;
  if (els.lobbyTrophies) els.lobbyTrophies.textContent = trophies;
  renderArmoryList();
  saveProgress();
  return { trophies: trophyReward, coins: coinReward };
}

function addTracer(from, to, color) {
  const geometry = new THREE.BufferGeometry().setFromPoints([from, to]);
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95, linewidth: 3 });
  const line = new THREE.Line(geometry, material);
  line.userData.maxLife = color === 0xffe08a ? 0.18 : 0.12;
  line.userData.life = line.userData.maxLife;
  tracers.push(line);
  scene.add(line);
}

function addImpactMark(point, normal, type) {
  const size = type === "bullet" ? 0.22 : 0.58;
  const material = new THREE.MeshBasicMaterial({
    color: type === "bullet" ? 0x1b1510 : 0xe8eef7,
    transparent: true,
    opacity: type === "bullet" ? 0.78 : 0.68,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  const geometry = type === "bullet" ? new THREE.CircleGeometry(size, 14) : new THREE.PlaneGeometry(size * 0.18, size);
  const mark = new THREE.Mesh(geometry, material);
  mark.position.copy(point).addScaledVector(normal, 0.012);
  mark.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.clone().normalize());
  if (type === "slash") mark.rotateZ(rand(-0.75, 0.75));
  mark.userData.life = 18;
  impactMarks.push(mark);
  scene.add(mark);
  if (impactMarks.length > 90) {
    const old = impactMarks.shift();
    scene.remove(old);
    old.geometry.dispose();
    old.material.dispose();
  }
}

function getFloorHeight(x, z, currentY) {
  let floor = 0;
  let rampFloor = null;
  for (const ramp of stairZones) {
    if (x < ramp.minX || x > ramp.maxX || z < ramp.minZ || z > ramp.maxZ) continue;
    if (Math.abs(currentY - ramp.fromY) > FLOOR_HEIGHT * 1.45 && Math.abs(currentY - ramp.toY) > FLOOR_HEIGHT * 1.45) continue;
    const t = clamp((z - ramp.startZ) / (ramp.endZ - ramp.startZ || 1), 0, 1);
    const y = ramp.fromY + (ramp.toY - ramp.fromY) * t;
    if (Math.abs(currentY - y) > 1.75) continue;
    if (y <= currentY + 1.25) rampFloor = rampFloor === null ? y : Math.max(rampFloor, y);
  }
  if (rampFloor !== null) return rampFloor;

  for (const collider of floorColliders) {
    if (x < collider.minX || x > collider.maxX || z < collider.minZ || z > collider.maxZ) continue;
    if (collider.y <= currentY + 0.65 && collider.y >= floor) floor = collider.y;
  }

  const inBasement = x >= -22 && x <= 22 && z >= 18 && z <= 55;
  if (inBasement && currentY < BASEMENT_Y + 2.2) floor = BASEMENT_Y;
  return floor;
}

function getStairTarget(x, z, currentFloorY = 0) {
  const zone = getStairZone(x, z, currentFloorY);
  return zone ? zone.toY : null;
}

function getStairZone(x, z, currentFloorY = 0) {
  return stairZones.find(zone => x > zone.minX && x < zone.maxX && z > zone.minZ && z < zone.maxZ && Math.abs(zone.fromY - currentFloorY) < FLOOR_HEIGHT * 0.55) || null;
}

function isOnAnyStair(x, z, currentFloorY = 0) {
  return stairZones.some(zone => x > zone.minX && x < zone.maxX && z > zone.minZ && z < zone.maxZ && (Math.abs(zone.fromY - currentFloorY) < FLOOR_HEIGHT * 0.9 || Math.abs(zone.toY - currentFloorY) < FLOOR_HEIGHT * 0.9));
}

function updateBotVerticalMotion(bot, dt) {
  const footY = bot.group.position.y - BOT_STAND_HEIGHT;
  const floorY = getFloorHeight(bot.group.position.x, bot.group.position.z, footY + 0.8);
  bot.verticalVelocity -= GRAVITY * dt;
  bot.group.position.y += bot.verticalVelocity * dt;
  if (bot.group.position.y <= floorY + BOT_STAND_HEIGHT || bot.group.position.y < floorY + BOT_STAND_HEIGHT + 0.18) {
    bot.group.position.y = floorY + BOT_STAND_HEIGHT;
    bot.verticalVelocity = 0;
    bot.grounded = true;
  } else {
    bot.grounded = false;
  }
}

function updateBotStairs(bot, dt) {
  const footY = bot.group.position.y - BOT_STAND_HEIGHT;
  const stair = getStairTarget(bot.group.position.x, bot.group.position.z, footY);
  if (stair === null) return;
  const targetY = stair + BOT_STAND_HEIGHT;
  bot.group.position.y += Math.sign(targetY - bot.group.position.y) * Math.min(Math.abs(targetY - bot.group.position.y), dt * 5.4);
  bot.verticalVelocity = 0;
  bot.grounded = true;
}

function getBotMoveTarget(bot, canSeePlayer) {
  if (canSeePlayer) return player.position;
  const botFloor = Math.round((bot.group.position.y - BOT_STAND_HEIGHT) / FLOOR_HEIGHT);
  const playerFloor = Math.round((player.position.y - player.eyeHeight) / FLOOR_HEIGHT);
  if (botFloor !== playerFloor) {
    const nextFloor = botFloor + Math.sign(playerFloor - botFloor);
    const stair = stairZones.find(zone => zone.fromFloor === botFloor && zone.toFloor === nextFloor);
    if (stair) {
      const target = new THREE.Vector3((stair.minX + stair.maxX) / 2, bot.group.position.y, (stair.minZ + stair.maxZ) / 2);
      target.userData = { stairGoal: true };
      return target;
    }
  }
  return bot.group.position.clone().add(new THREE.Vector3(Math.sin(bot.wanderAngle), 0, Math.cos(bot.wanderAngle)));
}

function updateTracers(dt) {
  for (let i = tracers.length - 1; i >= 0; i--) {
    const tracer = tracers[i];
    tracer.userData.life -= dt;
    tracer.material.opacity = Math.max(0, tracer.userData.life / (tracer.userData.maxLife || 0.12));
    if (tracer.userData.life > 0) continue;
    scene.remove(tracer);
    tracer.geometry.dispose();
    tracer.material.dispose();
    tracers.splice(i, 1);
  }
}

function updateImpactMarks(dt) {
  for (let i = impactMarks.length - 1; i >= 0; i--) {
    const mark = impactMarks[i];
    mark.userData.life -= dt;
    if (mark.userData.life < 3) mark.material.opacity *= Math.max(0, 1 - dt * 1.4);
    if (mark.userData.life > 0) continue;
    scene.remove(mark);
    mark.geometry.dispose();
    mark.material.dispose();
    impactMarks.splice(i, 1);
  }
}

function updateSkillProjectiles(dt) {
  for (let i = skillProjectiles.length - 1; i >= 0; i--) {
    const projectile = skillProjectiles[i];
    projectile.age += dt;

    if (projectile.type === "trident" && !projectile.returning) {
      projectile.velocity.y -= GRAVITY * projectile.gravityScale * dt;
      if (projectile.age > 0.44 + projectile.charge * 0.58) projectile.returning = true;
    }

    if (projectile.type === "boomerang") {
      const t = clamp(projectile.age / projectile.life, 0, 1);
      const speed = 16 + projectile.charge * 12;
      projectile.velocity.copy(projectile.forward).multiplyScalar(t < 0.5 ? speed : -speed * 1.08);
      projectile.velocity.y = 0;
      if (t > 0.52) projectile.returning = true;
    }

    if (projectile.type === "homing" && projectile.target?.group.visible && projectile.target.deadTimer <= 0 && !projectile.returning) {
      const seek = projectile.target.group.position.clone().add(new THREE.Vector3(0, 0.7, 0)).sub(projectile.position).normalize();
      projectile.velocity.lerp(seek.multiplyScalar(17 + projectile.charge * 9), Math.min(1, dt * 6.5));
      if (projectile.age > 0.9) projectile.returning = true;
    } else if (projectile.type === "homing" && !projectile.target) {
      projectile.returning = projectile.age > 0.35;
    }

    if (projectile.type === "missile") {
      if (keys.has("Space")) {
        const steer = getAimDirection(0);
        if (viewMode === "2d") steer.y = 0;
        steer.normalize();
        const speed = keys.has("ShiftLeft") || keys.has("ShiftRight") || mobileInput.sprint ? 18 : 10 + projectile.charge * 6;
        projectile.velocity.lerp(steer.multiplyScalar(speed), Math.min(1, dt * 4.2));
      }
      if (projectile.age > projectile.life) explodeSkillProjectile(projectile);
    }

    if (projectile.type === "grenade") {
      projectile.velocity.y -= GRAVITY * 0.82 * dt;
      if (projectile.age > projectile.life) explodeSkillProjectile(projectile);
      const floorY = getFloorHeight(projectile.position.x, projectile.position.z, projectile.position.y);
      if (projectile.age > 0.16 && projectile.position.y <= floorY + 0.22) {
        projectile.position.y = floorY + 0.22;
        explodeSkillProjectile(projectile);
      }
    }

    if (projectile.type === "spear" && projectile.age > projectile.life) projectile.returning = true;
    if (projectile.exploded) {
      removeSkillProjectile(projectile, i);
      continue;
    }

    if (projectile.returning) {
      const home = player.position.clone().add(new THREE.Vector3(0, 0.75, 0)).sub(projectile.position);
      if (projectile.fixedY !== null) home.y = 0;
      if (home.length() < 1.1 || projectile.age > 3.2) {
        scene.remove(projectile.mesh);
        skillProjectiles.splice(i, 1);
        continue;
      }
      projectile.velocity.lerp(home.normalize().multiplyScalar(22), Math.min(1, dt * 7));
    }

    projectile.position.addScaledVector(projectile.velocity, dt);
    if (projectile.fixedY !== null) projectile.position.y = projectile.fixedY;
    projectile.mesh.position.copy(projectile.position);
    if (projectile.velocity.lengthSq() > 0.01) {
      aimProjectileMesh(projectile.mesh, projectile.velocity, projectile.type !== "grenade");
    }
    const spin = projectile.type === "trident" || projectile.type === "homing" || projectile.type === "missile" ? 0 : projectile.type === "boomerang" ? 8 : 5;
    projectile.mesh.rotateZ(dt * spin);
    addTracer(projectile.position.clone(), projectile.position.clone().addScaledVector(projectile.velocity, -0.045), projectile.type === "homing" ? 0x65ffd0 : projectile.type === "boomerang" ? 0xffd76a : projectile.type === "missile" ? 0x9fd3ff : projectile.type === "grenade" ? 0xffcf5a : 0xdfeaff);
    hitSkillWorld(projectile);
    if (projectile.exploded) {
      removeSkillProjectile(projectile, i);
      continue;
    }
    hitSkillProjectile(projectile);
    if (projectile.exploded) {
      removeSkillProjectile(projectile, i);
      continue;
    }
  }
}

function hitSkillWorld(projectile) {
  if (projectile.returning) return;
  raycaster.set(projectile.position, projectile.velocity.clone().normalize());
  const hit = raycaster.intersectObjects(getBlockingObstacles("shot"), false).find(item => item.distance < 0.55);
  if (!hit) return;
  addImpactMark(hit.point, getHitNormal(hit), "slash");
  if (projectile.type === "missile" || projectile.type === "grenade") {
    explodeSkillProjectile(projectile, hit.point);
    return;
  }
  projectile.returning = true;
}

function hitSkillProjectile(projectile) {
  for (const bot of bots) {
    if (!bot.group.visible || bot.deadTimer > 0 || projectile.hitBots.has(bot)) continue;
    if (bot.group.position.distanceTo(projectile.position) > 1.35) continue;
    if (projectile.type === "grenade") {
      explodeSkillProjectile(projectile);
      break;
    }
    projectile.hitBots.add(bot);
    const knock = projectile.type === "missile" ? getExplosionKnockPayload(projectile.position, bot.group.position, projectile.velocity) : null;
    damageBot(bot, projectile.damage, projectile.type === "homing" ? "Homing" : projectile.type === "missile" ? "Echo blade" : projectile.type === "spear" ? "Spear" : "Knife", knock);
    showHitmarker();
    if (projectile.type === "missile") {
      explodeSkillProjectile(projectile);
      break;
    }
    projectile.returning = true;
    if (projectile.type !== "boomerang") break;
  }
}

function explodeSkillProjectile(projectile, point = null) {
  if (!projectile || projectile.exploded) return;
  projectile.exploded = true;
  const center = (point || projectile.position).clone();
  if (projectile.type === "grenade") applyExplosionDamage(center, projectile);
  applyExplosionKnockback(center, projectile.velocity);
  addImpactMark(center, new THREE.Vector3(0, 1, 0), "slash");
  shakeTimer = Math.max(shakeTimer, 0.14);
  shakePower = Math.max(shakePower, 0.07);
}

function removeSkillProjectile(projectile, index) {
  scene.remove(projectile.mesh);
  skillProjectiles.splice(index, 1);
}

function getExplosionKnockPayload(center, targetPosition, fallbackVelocity = null) {
  const direction = targetPosition.clone().sub(center);
  direction.y = 0;
  if (direction.lengthSq() < 0.0001 && fallbackVelocity) {
    direction.copy(fallbackVelocity);
    direction.y = 0;
  }
  if (direction.lengthSq() < 0.0001) direction.set(0, 0, -1);
  direction.normalize();
  return {
    x: direction.x,
    z: direction.z,
    power: EXPLOSION_KNOCK_DISTANCE
  };
}

function applyExplosionKnockback(center, fallbackVelocity = null) {
  for (const bot of bots) {
    if (!bot.group.visible || bot.deadTimer > 0) continue;
    const flatDistance = Math.hypot(bot.group.position.x - center.x, bot.group.position.z - center.z);
    if (flatDistance > EXPLOSION_KNOCK_RADIUS || Math.abs(bot.group.position.y - center.y) > 3.2) continue;
    const knock = getExplosionKnockPayload(center, bot.group.position, fallbackVelocity);
    const amount = EXPLOSION_KNOCK_DISTANCE * (1 - flatDistance / EXPLOSION_KNOCK_RADIUS) + 0.28;
    moveWithCollision(bot.group.position, knock.x * amount, knock.z * amount, 0.72, bot.group.position.y);
    bot.verticalVelocity = Math.max(bot.verticalVelocity || 0, 1.2 * (1 - flatDistance / EXPLOSION_KNOCK_RADIUS));
  }

  const playerFoot = player.position.clone();
  playerFoot.y -= player.eyeHeight;
  const playerDistance = Math.hypot(player.position.x - center.x, player.position.z - center.z);
  if (playerDistance <= EXPLOSION_KNOCK_RADIUS && Math.abs(playerFoot.y - center.y) <= 3.2) {
    const knock = getExplosionKnockPayload(center, player.position, fallbackVelocity);
    applyPlayerKnockback(knock, 1 - playerDistance / EXPLOSION_KNOCK_RADIUS);
  }
}

function applyPlayerKnockback(knock, falloff = 1) {
  const amount = (Number(knock?.power) || EXPLOSION_KNOCK_DISTANCE) * clamp(falloff, 0.18, 1);
  const direction = new THREE.Vector3(Number(knock?.x) || 0, 0, Number(knock?.z) || 0);
  if (direction.lengthSq() < 0.0001) return;
  direction.normalize();
  moveWithCollision(player.position, direction.x * amount, direction.z * amount, prone ? 0.5 : 0.62, player.position.y);
  player.verticalVelocity = Math.max(player.verticalVelocity, 1.1 * clamp(falloff, 0.2, 1));
}

function applyExplosionDamage(center, projectile) {
  const damageRadius = 4.1;
  for (const bot of bots) {
    if (!bot.group.visible || bot.deadTimer > 0 || projectile.hitBots.has(bot)) continue;
    const flatDistance = Math.hypot(bot.group.position.x - center.x, bot.group.position.z - center.z);
    if (flatDistance > damageRadius || Math.abs(bot.group.position.y - center.y) > 3.2) continue;
    projectile.hitBots.add(bot);
    const falloff = 1 - flatDistance / damageRadius;
    const damage = Math.round(projectile.damage * clamp(falloff, 0.3, 1));
    const knock = getExplosionKnockPayload(center, bot.group.position, projectile.velocity);
    damageBot(bot, damage, "Grenade", knock);
    showHitmarker();
  }

  const playerFootY = player.position.y - player.eyeHeight;
  const playerDistance = Math.hypot(player.position.x - center.x, player.position.z - center.z);
  if (playerDistance <= damageRadius && Math.abs(playerFootY - center.y) <= 3.2) {
    const falloff = 1 - playerDistance / damageRadius;
    applyDamage(Math.round(projectile.damage * 0.55 * clamp(falloff, 0.25, 1)));
  }
}

function aimProjectileMesh(mesh, velocity, flatBlade = false) {
  const direction = velocity.clone();
  if (direction.lengthSq() <= 0.0001) return;
  direction.normalize();
  if (flatBlade) {
    const side = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), direction);
    if (side.lengthSq() < 0.0001) side.set(1, 0, 0);
    side.normalize();
    const up = new THREE.Vector3().crossVectors(direction, side).normalize();
    const matrix = new THREE.Matrix4().makeBasis(side, direction, up);
    mesh.quaternion.setFromRotationMatrix(matrix);
    return;
  }
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), direction);
}

function updateCamera(dt) {
  updatePlayerModel();
  if (viewMode === "2d") {
    pitch = -1.0;
    const target = new THREE.Vector3(player.position.x, 34, player.position.z + 0.01);
    camera.position.lerp(target, Math.min(1, dt * 9));
    camera.lookAt(player.position.x, 0, player.position.z);
    camera.fov += (38 - camera.fov) * Math.min(1, dt * 10);
    gun.visible = false;
    playerModel.visible = false;
  } else if (viewMode === "third") {
    const lookAt = player.position.clone();
    lookAt.y += sliding ? 0.22 : prone ? 0.55 : 1.35;
    const axes = getViewMoveAxes();
    const pitchVertical = -Math.sin(pitch);
    const pitchHorizontal = Math.max(0.03, Math.cos(pitch));
    const aimPoint = lookAt.clone().add(axes.forward.clone().multiplyScalar(12 * pitchHorizontal));
    aimPoint.y += pitchVertical * 18;
    const back = axes.forward.clone().multiplyScalar(ads ? -2.15 : -5.2);
    const shoulder = axes.right.clone().multiplyScalar(ads ? 0.82 : 1.15);
    const target = lookAt.clone().add(back).add(shoulder);
    target.y += sliding ? -0.25 : ads ? 0.72 : 1.15 + pitchVertical * 0.7;
    camera.position.lerp(target, Math.min(1, dt * 12));
    camera.lookAt(aimPoint);
    camera.fov += ((ads ? 46 : 68) - camera.fov) * Math.min(1, dt * 10);
    gun.visible = false;
    playerModel.visible = !ads;
  } else {
    const target = player.position.clone();
    target.y += sliding ? -0.18 : prone ? 0.08 : 0.48;
    camera.position.copy(target);
    camera.rotation.set(sliding ? pitch + 0.18 : pitch, yaw, sliding ? 0.08 : 0, "YXZ");
    const zoom = ads ? getScopeZoom(WEAPONS[weaponIndex]) : 1;
    const targetFov = zoom >= 6 ? 16 : ads ? 62 : 74;
    camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 10);
    gun.visible = true;
    const scoped = ads && zoom >= 6;
    if (WEAPONS[weaponIndex].melee) {
      const knifeInFlight = skillProjectiles.some(projectile => projectile.type !== "spear");
      for (const part of gun.userData.knifeParts || []) part.visible = !knifeInFlight;
      const swing = meleeSwingTimer > 0 ? 1 - meleeSwingTimer / 0.18 : 0;
      const slash = Math.sin(swing * Math.PI);
      const chargeLift = knifeCharging ? Math.min(0.18, knifeChargeTimer * 0.08) : 0;
      gun.position.set(0.58 - slash * 0.32, -0.64 + slash * 0.22 + chargeLift, -0.82 - slash * 0.18);
      gun.rotation.set(-0.18 - slash * 0.55 - chargeLift, 0.12 + slash * 0.42, -0.5 + slash * 1.1);
    } else {
      gun.position.set(
        ads ? 0.18 : 0.48,
        ads ? -0.48 : -0.5 + Math.sin(performance.now() / 120) * 0.003,
        scoped ? -1.04 : ads ? -1.08 : -1.12
      );
    }
    playerModel.visible = false;
  }
  if (shakeTimer > 0) {
    const shake = shakePower * (shakeTimer / 0.18);
    camera.position.x += rand(-shake, shake);
    camera.position.y += rand(-shake, shake);
  }
  gun.userData.flash.material.opacity = Math.max(0, gun.userData.flash.material.opacity - dt * 8);
  const flashScale = 1 + gun.userData.flash.material.opacity * 2.7;
  gun.userData.flash.scale.setScalar(flashScale);
  camera.updateProjectionMatrix();
}

function updateHud(dt = 0) {
  const weapon = WEAPONS[weaponIndex];
  const mag = inventory[weaponIndex];
  els.kills.textContent = kills;
  els.wave.textContent = multiplayer.roomCode || wave;
  if (els.trophies) els.trophies.textContent = trophies;
  const currentFloor = getCurrentFloor();
  els.floor.textContent = typeof currentFloor === "string" ? currentFloor : `${currentFloor}F`;
  els.health.textContent = `${hp} HP`;
  els.armor.textContent = `${armor} ARMOR`;
  els.weaponName.textContent = weapon.name;
  els.ammo.textContent = weapon.melee ? "MELEE" : reloadTimer > 0 ? "Reloading" : `${mag.ammo} / ${mag.reserve}`;
  els.viewButton.textContent = viewMode === "third" ? "3P" : viewMode === "2d" ? "2D" : "1P";
  if (els.mobileView) els.mobileView.textContent = viewMode === "third" ? "3P" : "1P";
  document.body.classList.toggle("view-2d", viewMode === "2d");
  document.body.classList.toggle("view-third", viewMode === "third");
  document.body.classList.toggle("show-crosshair", viewMode !== "2d" && !ads);
  document.body.classList.toggle("hit", hitTimer > 0);
  document.body.classList.toggle("hurt", hurtTimer > 0);
  document.body.classList.toggle("prone", prone);
  document.body.classList.toggle("sliding", sliding);
  document.body.classList.toggle("scope-holo", viewMode !== "2d" && ads && WEAPONS[weaponIndex].name === "Rifle");
  document.body.classList.toggle("scope-sniper", viewMode !== "2d" && ads && WEAPONS[weaponIndex].name === "Sniper");
  els.pause.classList.toggle("hidden", !paused);
  updateHotbar(dt);
  drawRadar();
}

function showHotbar() {
  hotbarTimer = 1.55;
  updateHotbar(0);
}

function updateHotbar(dt = 0) {
  if (!els.hotbar) return;
  hotbarTimer = Math.max(0, hotbarTimer - dt);
  els.hotbar.classList.toggle("visible", hotbarTimer > 0);
  [...els.hotbar.children].forEach((slot, index) => {
    slot.classList.toggle("active", index === weaponIndex);
  });
}

function getCurrentFloor() {
  const floor = Math.round((player.position.y - player.eyeHeight) / FLOOR_HEIGHT) + 1;
  return floor < 1 ? "B1" : clamp(floor, 1, BUILDING_FLOORS + 1);
}

function drawRadar() {
  const ctx = els.radar.getContext("2d");
  const w = els.radar.width;
  const h = els.radar.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(0,0,0,.45)";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(255,255,255,.22)";
  ctx.strokeRect(1, 1, w - 2, h - 2);
  ctx.strokeStyle = "rgba(255,255,255,.12)";
  ctx.beginPath();
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, h);
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();

  const scale = w / RADAR_RANGE;
  const forwardX = -Math.sin(yaw);
  const forwardZ = -Math.cos(yaw);
  const rightX = Math.cos(yaw);
  const rightZ = -Math.sin(yaw);
  const radarPoint = position => {
    const dx = position.x - player.position.x;
    const dz = position.z - player.position.z;
    return {
      x: w / 2 + (dx * rightX + dz * rightZ) * scale,
      y: h / 2 - (dx * forwardX + dz * forwardZ) * scale
    };
  };

  ctx.fillStyle = "#75e06f";
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#75e06f";
  ctx.beginPath();
  ctx.moveTo(w / 2, h / 2);
  ctx.lineTo(w / 2, h / 2 - 13);
  ctx.stroke();

  for (const marker of mapMarkers) {
    const p = radarPoint(marker);
    const mw = marker.type === "mine" ? Math.max(12, marker.w * scale) : Math.max(5, marker.w * scale);
    const md = marker.type === "mine" ? Math.max(12, marker.d * scale) : Math.max(5, marker.d * scale);
    if (p.x < -mw || p.x > w + mw || p.y < -md || p.y > h + md) continue;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.strokeStyle = marker.type === "cross" ? "#ff3030" : marker.type === "mine" ? "#d7b15f" : marker.type === "tower" ? "#8bc6ff" : "rgba(230,238,245,.72)";
    ctx.fillStyle = marker.type === "cross" ? "rgba(255,48,48,.22)" : marker.type === "mine" ? "rgba(215,177,95,.16)" : marker.type === "tower" ? "rgba(139,198,255,.16)" : "rgba(230,238,245,.11)";
    ctx.lineWidth = marker.type === "tower" ? 2 : 1;
    ctx.fillRect(-mw / 2, -md / 2, mw, md);
    ctx.strokeRect(-mw / 2, -md / 2, mw, md);
    if (marker.type === "cross") {
      ctx.beginPath();
      ctx.moveTo(-6, 0);
      ctx.lineTo(6, 0);
      ctx.moveTo(0, -6);
      ctx.lineTo(0, 6);
      ctx.stroke();
    }
    if (marker.type === "mine") {
      ctx.beginPath();
      ctx.moveTo(0, -md / 2 - 4);
      ctx.lineTo(5, -md / 2 + 5);
      ctx.lineTo(-5, -md / 2 + 5);
      ctx.closePath();
      ctx.fillStyle = "#ffd34d";
      ctx.fill();
    }
    ctx.restore();
  }

  for (const bot of bots) {
    if (!bot.group.visible) continue;
    const p = radarPoint(bot.group.position);
    if (p.x < 4 || p.x > w - 4 || p.y < 4 || p.y > h - 4) continue;
    ctx.fillStyle = "#ff5555";
    ctx.fillRect(p.x - 3, p.y - 3, 6, 6);
  }

  for (const pickup of pickups) {
    const p = radarPoint(pickup.position);
    if (p.x < 4 || p.x > w - 4 || p.y < 4 || p.y > h - 4) continue;
    ctx.fillStyle = pickup.userData.type === "ammo" ? "#ffd34d" : pickup.userData.type === "armor" ? "#4db6ff" : "#67e06f";
    ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
  }
}

function drawTopdown2d() {
  if (viewMode !== "2d") return;
  const canvas = els.topdown;
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const targetW = Math.floor(innerWidth * dpr);
  const targetH = Math.floor(innerHeight * dpr);
  if (canvas.width !== targetW || canvas.height !== targetH) {
    canvas.width = targetW;
    canvas.height = targetH;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const width = innerWidth;
  const height = innerHeight;
  const scale = Math.min(width, height) / 72;
  const camX = player.position.x;
  const camZ = player.position.z;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  drawGrid(ctx, width, height, scale, camX, camZ);

  for (const obstacle of obstacles) drawObstacle2d(ctx, obstacle, camX, camZ, scale);
  for (const pickup of pickups) drawPickup2d(ctx, pickup, camX, camZ, scale);
  for (const crate of lootCrates) {
    if (!crate.userData.looted) drawPickup2d(ctx, crate, camX, camZ, scale);
  }
  for (const bot of bots) {
    if (bot.group.visible) drawFighter2d(ctx, bot.group.position, bot.group.rotation.y, "#ff6d6d", bot.hp, bot.maxHp, camX, camZ, scale, false);
  }
  drawFighter2d(ctx, player.position, yaw, "#4f86ff", hp, 100, camX, camZ, scale, true);
  drawAimLine2d(ctx, width, height);
}

function worldToScreen2d(position, camX, camZ, scale) {
  return {
    x: innerWidth / 2 + (position.x - camX) * scale,
    y: innerHeight / 2 + (position.z - camZ) * scale
  };
}

function drawGrid(ctx, width, height, scale, camX, camZ) {
  ctx.strokeStyle = "rgba(0,0,0,.07)";
  ctx.lineWidth = 1;
  const step = 4 * scale;
  const offsetX = width / 2 - camX * scale;
  const offsetY = height / 2 - camZ * scale;
  for (let x = offsetX % step; x < width; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = offsetY % step; y < height; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawObstacle2d(ctx, obstacle, camX, camZ, scale) {
  const box = new THREE.Box3().setFromObject(obstacle);
  const x = innerWidth / 2 + (box.min.x - camX) * scale;
  const y = innerHeight / 2 + (box.min.z - camZ) * scale;
  const w = Math.max(2, (box.max.x - box.min.x) * scale);
  const h = Math.max(2, (box.max.z - box.min.z) * scale);
  ctx.fillStyle = "#eceff3";
  ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = "#a6b0bc";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);
}

function drawPickup2d(ctx, pickup, camX, camZ, scale) {
  const p = worldToScreen2d(pickup.position, camX, camZ, scale);
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(performance.now() / 420);
  ctx.fillStyle = !pickup.userData.type ? "#d8c260" : pickup.userData.type === "ammo" ? "#ffd34d" : pickup.userData.type === "armor" ? "#4db6ff" : "#67e06f";
  ctx.fillRect(-7, -7, 14, 14);
  ctx.restore();
}

function drawFighter2d(ctx, position, angle, color, health, maxHealth, camX, camZ, scale, isPlayer) {
  const p = worldToScreen2d(position, camX, camZ, scale);
  const size = isPlayer ? 24 : 22;
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(-angle);

  ctx.fillStyle = "rgba(0,0,0,.42)";
  ctx.fillRect(-size * 0.58, -size * 0.38, size * 1.16, size * 0.92);
  ctx.fillStyle = color;
  ctx.fillRect(-size * 0.48, -size * 0.34, size * 0.96, size * 0.78);
  ctx.fillStyle = "#f2c7a6";
  ctx.fillRect(-size * 0.28, -size * 0.82, size * 0.56, size * 0.48);
  ctx.fillStyle = "#151718";
  ctx.fillRect(-size * 0.32, -size * 0.9, size * 0.64, size * 0.14);
  ctx.fillStyle = "#20252a";
  ctx.fillRect(size * 0.2, -size * 0.1, size * 0.92, size * 0.16);
  ctx.fillStyle = "#26334b";
  ctx.fillRect(-size * 0.42, size * 0.44, size * 0.3, size * 0.54);
  ctx.fillRect(size * 0.12, size * 0.44, size * 0.3, size * 0.54);
  ctx.restore();

  ctx.fillStyle = "rgba(0,0,0,.62)";
  ctx.fillRect(p.x - 28, p.y - size - 18, 56, 7);
  ctx.fillStyle = health > maxHealth * 0.35 ? "#44d17c" : "#ff7a7a";
  ctx.fillRect(p.x - 28, p.y - size - 18, 56 * clamp(health / maxHealth, 0, 1), 7);
  ctx.strokeStyle = "rgba(255,255,255,.45)";
  ctx.strokeRect(p.x - 28, p.y - size - 18, 56, 7);
}

function drawAimLine2d(ctx, width, height) {
  const cx = width / 2;
  const cy = height / 2;
  ctx.strokeStyle = "rgba(255,255,255,.28)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.sin(yaw) * 46, cy - Math.cos(yaw) * 46);
  ctx.stroke();
}

function makeHealthbar() {
  const bar = document.createElement("div");
  bar.className = "enemy-bar";
  bar.innerHTML = "<span></span>";
  botHud.append(bar);
  return bar;
}

function updateBotHealthbars(dt = 0) {
  const width = innerWidth;
  const height = innerHeight;
  for (const bot of bots) {
    bot.healthbarTimer = Math.max(0, (bot.healthbarTimer || 0) - dt);
    if (viewMode === "2d" || !bot.group.visible || bot.deadTimer > 0 || bot.healthbarTimer <= 0) {
      bot.healthbar.classList.add("hidden");
      continue;
    }
    const world = bot.group.position.clone();
    world.y += 2.55;
    const screen = world.project(camera);
    const behind = screen.z < -1 || screen.z > 1;
    const x = (screen.x * 0.5 + 0.5) * width;
    const y = (-screen.y * 0.5 + 0.5) * height;
    const visible = !behind && x > -80 && x < width + 80 && y > -40 && y < height + 80;
    bot.healthbar.classList.toggle("hidden", !visible);
    if (!visible) continue;
    bot.healthbar.style.transform = `translate(${Math.round(x - 34)}px, ${Math.round(y)}px)`;
    bot.healthbar.firstElementChild.style.width = `${clamp(bot.hp / bot.maxHp, 0, 1) * 100}%`;
  }
}

function updatePlayerModel() {
  if (!playerModel) return;
  const crouchDrop = sliding ? 0.55 : prone ? 0.38 : 0;
  playerModel.position.set(player.position.x, player.position.y - player.eyeHeight + BOT_STAND_HEIGHT - crouchDrop, player.position.z);
  playerModel.rotation.y = yaw;
  playerModel.rotation.x = sliding ? -0.18 : 0;
  playerModel.scale.set(1, sliding ? 0.68 : prone ? 0.78 : 1, 1);
  const head = playerModel.userData.head;
  if (head) head.rotation.x = clamp(pitch, -0.65, 0.55);
  animateCharacter(playerModel, player.velocity.length(), 0.016);
}

function animateCharacter(model, speed, dt) {
  if (!model?.userData.leftLeg) return;
  model.userData.walkPhase = (model.userData.walkPhase || 0) + speed * dt * 5.4;
  const moving = speed > 0.08;
  const swing = moving ? Math.sin(model.userData.walkPhase) * 0.72 : 0;
  const side = moving ? Math.cos(model.userData.walkPhase * 2) * 0.08 : 0;
  model.userData.leftLeg.rotation.x = swing;
  model.userData.rightLeg.rotation.x = -swing;
  model.userData.leftArm.rotation.x = -swing * 0.72;
  model.userData.rightArm.rotation.x = swing * 0.42;
  model.userData.body.rotation.z = side;
  model.userData.head.position.y = 0.92 + Math.abs(Math.sin(model.userData.walkPhase)) * (moving ? 0.045 : 0);
}

function toggleView() {
  viewMode = viewMode === "3d" ? "third" : viewMode === "third" ? "2d" : "3d";
  pitch = viewMode === "2d" ? -1 : -0.12;
  ads = false;
  if (viewMode === "2d") {
    document.exitPointerLock?.();
  } else {
    renderer.domElement.requestPointerLock?.();
  }
}

function togglePersonView() {
  viewMode = viewMode === "third" ? "3d" : "third";
  if (pitch <= -0.95) pitch = -0.12;
  ads = false;
  if (!mobileInput.enabled && started) renderer.domElement.requestPointerLock?.();
}

function togglePause() {
  if (!started) return;
  paused = !paused;
  mouseDown = false;
  cancelExtractHold();
  resetGrenadeAim();
  if (paused && document.pointerLockElement) document.exitPointerLock?.();
  if (!paused) renderer.domElement.requestPointerLock?.();
  if (paused) ads = false;
}

function startExtractHold() {
  if (!started || paused || extracting) return;
  extracting = true;
  extractHoldTimer = 0;
  mouseDown = false;
  ads = false;
  flashMessage("Hold EVAC 3s to extract");
  updateExtractButton();
}

function cancelExtractHold() {
  if (!extracting && extractHoldTimer <= 0) return;
  extracting = false;
  extractHoldTimer = 0;
  updateExtractButton();
}

function updateExtractHold(dt) {
  if (!extracting) return;
  extractHoldTimer += dt;
  updateExtractButton();
  if (extractHoldTimer < EXTRACT_HOLD_TIME) return;
  evacuateToLobby();
}

function updateExtractButton() {
  const progress = clamp(extractHoldTimer / EXTRACT_HOLD_TIME, 0, 1);
  els.mobileExtract?.style.setProperty("--extract-progress", `${Math.round(progress * 100)}%`);
  els.mobileExtract?.classList.toggle("extracting", extracting);
}

function evacuateToLobby() {
  started = false;
  paused = false;
  extracting = false;
  extractHoldTimer = 0;
  mouseDown = false;
  ads = false;
  knifeCharging = false;
  resetGrenadeAim();
  keys.clear();
  mobileInput.moveId = null;
  mobileInput.lookId = null;
  mobileInput.x = 0;
  mobileInput.z = 0;
  mobileInput.sprint = false;
  if (els.moveKnob) els.moveKnob.style.transform = "translate(0,0)";
  cleanupMatchObjects();
  respawnPlayer();
  if (multiplayer.remoteBot) {
    multiplayer.remoteBot.group.visible = false;
    multiplayer.remoteBot.healthbar.classList.add("hidden");
  }
  els.menu.classList.remove("hidden");
  document.exitPointerLock?.();
  updateExtractButton();
  renderLobby();
  flashMessage("Extracted");
}

function cleanupMatchObjects() {
  clearBots();
  for (let i = skillProjectiles.length - 1; i >= 0; i--) {
    scene.remove(skillProjectiles[i].mesh);
    skillProjectiles.splice(i, 1);
  }
  for (let i = tracers.length - 1; i >= 0; i--) {
    scene.remove(tracers[i]);
    tracers.splice(i, 1);
  }
  for (let i = impactMarks.length - 1; i >= 0; i--) {
    scene.remove(impactMarks[i]);
    impactMarks.splice(i, 1);
  }
  for (let i = pickups.length - 1; i >= 0; i--) {
    scene.remove(pickups[i]);
    pickups.splice(i, 1);
  }
  for (let i = shieldWalls.length - 1; i >= 0; i--) {
    const wall = shieldWalls[i];
    scene.remove(wall);
    const obstacleIndex = obstacles.indexOf(wall);
    if (obstacleIndex >= 0) obstacles.splice(obstacleIndex, 1);
    shieldWalls.splice(i, 1);
  }
}

function switchWeapon(index) {
  if (index === weaponIndex || reloadTimer > 0) return;
  knifeCharging = false;
  knifeChargeTimer = 0;
  weaponIndex = index;
  ads = false;
  fireTimer = 0.18;
  flashMessage(WEAPONS[weaponIndex].name);
  reshapeGun();
  updateHotbar();
}

function reshapeGun() {
  const weapon = WEAPONS[weaponIndex];
  const scale = weapon.name === "Pistol" ? [0.42, 0.46, 0.48]
    : weapon.name === "Knife" ? [0.86, 0.86, 0.86]
    : weapon.name === "Shotgun" ? [0.62, 0.58, 0.74]
      : weapon.name === "Sniper" ? [0.52, 0.5, 0.86]
        : [0.54, 0.52, 0.64];
  gun.scale.set(scale[0], scale[1], scale[2]);
  gun.rotation.set(weapon.name === "Knife" ? -0.28 : 0, weapon.name === "Knife" ? 0.18 : 0, weapon.name === "Knife" ? -0.62 : 0);
  for (const part of gun.userData.gunParts || []) part.visible = weapon.name !== "Knife";
  for (const part of gun.userData.knifeParts || []) part.visible = weapon.name === "Knife";
  for (const part of gun.userData.holoParts || []) part.visible = false;
  for (const part of gun.userData.scopeParts || []) part.visible = false;
  gun.userData.stockPart.visible = weapon.name !== "Pistol" && weapon.name !== "Knife";
  gun.userData.topRail.visible = weapon.name !== "Pistol" && weapon.name !== "Knife";
  if (weapon.name === "Knife") {
    for (const part of gun.userData.knifeParts || []) part.visible = true;
    return;
  }
  gun.userData.body.scale.set(
    weapon.name === "Knife" ? 0.22 : weapon.name === "Pistol" ? 0.74 : weapon.name === "Shotgun" ? 1.2 : 1,
    weapon.name === "Knife" ? 0.55 : weapon.name === "Pistol" ? 0.86 : 1,
    weapon.name === "Knife" ? 1.7 : weapon.name === "Pistol" ? 0.72 : weapon.name === "Sniper" ? 1.14 : weapon.name === "Shotgun" ? 1.1 : 1
  );
  gun.userData.barrel.scale.set(
    weapon.name === "Knife" ? 0.35 : weapon.name === "Shotgun" ? 1.55 : weapon.name === "Sniper" ? 0.9 : weapon.name === "Pistol" ? 0.58 : 1,
    weapon.name === "Knife" ? 0.35 : weapon.name === "Shotgun" ? 1.55 : weapon.name === "Sniper" ? 0.9 : weapon.name === "Pistol" ? 0.58 : 1,
    weapon.name === "Knife" ? 2.0 : weapon.name === "Pistol" ? 0.56 : weapon.name === "Sniper" ? 1.35 : weapon.name === "Shotgun" ? 1.18 : 1
  );
  gun.userData.grip.scale.set(weapon.name === "Knife" ? 0.72 : weapon.name === "Pistol" ? 0.9 : 1, weapon.name === "Pistol" ? 1.1 : 1, weapon.name === "Knife" ? 1.15 : weapon.name === "Pistol" ? 0.86 : 1);
  gun.userData.holoParts.forEach(part => part.visible = weapon.name === "Rifle");
  gun.userData.scopeParts.forEach(part => part.visible = weapon.name === "Sniper");
}

function cycleGunSkin() {
  gunSkinIndex = (gunSkinIndex + 1) % GUN_SKINS.length;
  applyGunSkin();
  flashMessage(`Gun skin: ${GUN_SKINS[gunSkinIndex].name}`);
}

function applyGunSkin() {
  const skin = GUN_SKINS[gunSkinIndex];
  gun.userData.metal.color.setHex(skin.metal);
  gun.userData.stock.color.setHex(skin.stock);
  gun.userData.flash.material.color.setHex(skin.accent);
}

function respawnPlayer() {
  hp = CHARACTERS[characterIndex]?.hp || 100;
  armor = 50;
  inventory = WEAPONS.map(weapon => ({ ammo: weapon.mag, reserve: weapon.reserve }));
  reloadTimer = 0;
  grenadeCooldown = 0;
  mouseDown = false;
  ads = false;
  prone = false;
  sliding = false;
  spearDashTimer = 0;
  spearDashCharge = 0;
  spearDashHits.clear();
  slideTimer = 0;
  slideDistance = 0;
  slideCooldown = 0;
  resetGrenadeAim();
  player.eyeHeight = STAND_EYE_HEIGHT;
  player.position.set(0, STAND_EYE_HEIGHT, 16);
  player.verticalVelocity = 0;
  player.grounded = true;
}

function spawnBots(count) {
  for (let i = 0; i < count; i++) {
    const bot = {
      group: makeCharacter(i),
      hitbox: null,
      healthbar: makeHealthbar(),
      hp: 75 + wave * 7,
      maxHp: 75 + wave * 7,
      fireTimer: rand(1.4, 2.8),
      wanderTimer: rand(0.4, 1.4),
      wanderAngle: rand(-Math.PI, Math.PI),
      walkPhase: rand(0, Math.PI * 2),
      deadTimer: 0,
      verticalVelocity: 0,
      grounded: true,
      healthbarTimer: 0
    };
    bot.hitbox = bot.group.userData.hitbox;
    respawnBot(bot);
    bots.push(bot);
    scene.add(bot.group);
  }
}

function respawnBot(bot) {
  bot.maxHp = 75 + wave * 7;
  bot.hp = bot.maxHp;
  bot.deadTimer = 0;
  bot.group.visible = true;
  bot.healthbar.classList.remove("hidden");
  const spawn = randomBotSpawn(bot);
  bot.verticalVelocity = 0;
  bot.grounded = true;
  bot.healthbarTimer = 0;
  bot.group.position.set(spawn.x, spawn.y + BOT_STAND_HEIGHT, spawn.z);
  keepOutOfObstacles(bot.group.position, 0.82, bot.group.position.y);
  keepBotInsidePlayableArea(bot);
}

function randomBotSpawn(ignoreBot = null) {
  const floors = [BASEMENT_Y, ...Array.from({ length: BUILDING_FLOORS + 1 }, (_, i) => i * FLOOR_HEIGHT)];
  const groundRange = selectedMap === "pubg" ? 260 : 140;
  const minAway = selectedMap === "pubg" ? 46 : 36;
  for (let i = 0; i < 180; i++) {
    const floor = floors[Math.floor(Math.random() * floors.length)];
    const upper = floor > 0;
    const basement = floor < 0;
    const x = upper ? rand(-TOWER_WIDTH / 2 + 2.2, TOWER_WIDTH / 2 - 2.2) : basement ? rand(-18, 18) : rand(-groundRange, groundRange);
    const z = upper ? rand(-6 - TOWER_DEPTH / 2 + 2.2, -6 + TOWER_DEPTH / 2 - 2.2) : basement ? rand(18, 46) : rand(-groundRange, groundRange);
    const away = Math.hypot(x - player.position.x, z - player.position.z);
    const position = new THREE.Vector3(x, floor + BOT_STAND_HEIGHT, z);
    if (collidesWithObstacle(position, 0.82, position.y)) continue;
    if (isBotSpawnTooClose(position, ignoreBot)) continue;
    if (away > minAway || Math.abs(floor + player.eyeHeight - player.position.y) > 3) return { x, y: floor, z };
  }
  for (let i = 0; i < 80; i++) {
    const x = rand(55, 140);
    const z = rand(55, 140);
    const position = new THREE.Vector3(x, BOT_STAND_HEIGHT, z);
    if (!isBotSpawnTooClose(position, ignoreBot) && !collidesWithObstacle(position, 0.82, position.y)) return { x, y: 0, z };
  }
  return { x: rand(85, 140), y: 0, z: rand(85, 140) };
}

function isBotSpawnTooClose(position, ignoreBot = null) {
  for (const bot of bots) {
    if (bot === ignoreBot || !bot.group.visible || bot.deadTimer > 0) continue;
    if (Math.abs(bot.group.position.y - position.y) > 2.2) continue;
    if (bot.group.position.distanceTo(position) < 20) return true;
  }
  return false;
}

function keepBotInsidePlayableArea(bot) {
  const footY = bot.group.position.y - BOT_STAND_HEIGHT;
  const towerFloor = footY > 0.5 && footY < FLOOR_HEIGHT * (BUILDING_FLOORS + 0.5);
  if (!towerFloor) return;
  bot.group.position.x = clamp(bot.group.position.x, -TOWER_WIDTH / 2 + 1.0, TOWER_WIDTH / 2 - 1.0);
  bot.group.position.z = clamp(bot.group.position.z, -6 - TOWER_DEPTH / 2 + 1.0, -6 + TOWER_DEPTH / 2 - 1.0);
}

function makeCharacter(index) {
  const group = new THREE.Group();
  const palette = CHARACTERS[Math.abs(index) % CHARACTERS.length] || CHARACTERS[0];
  const skin = new THREE.MeshStandardMaterial({ color: palette.skin, roughness: 0.72 });
  const shirt = new THREE.MeshStandardMaterial({ color: palette.shirt, roughness: 0.78 });
  const pants = new THREE.MeshStandardMaterial({ color: palette.pants, roughness: 0.82 });
  const dark = new THREE.MeshStandardMaterial({ color: palette.hair, roughness: 0.72 });
  const armorMat = new THREE.MeshStandardMaterial({ color: palette.armor, metalness: 0.18, roughness: 0.48 });

  const head = part(0.72, 0.72, 0.72, skin, 0, 0.92, 0);
  const hair = part(0.78, 0.18, 0.78, dark, 0, 1.29, -0.02);
  const body = part(0.86, 1.05, 0.42, shirt, 0, 0.12, 0);
  const leftArm = part(0.28, 0.95, 0.32, skin, -0.62, 0.12, 0);
  const rightArm = part(0.28, 0.95, 0.32, skin, 0.62, 0.12, 0);
  const leftLeg = part(0.34, 0.86, 0.34, pants, -0.22, -0.82, 0);
  const rightLeg = part(0.34, 0.86, 0.34, pants, 0.22, -0.82, 0);
  const vest = part(0.94, 0.62, 0.48, armorMat, 0, 0.16, -0.03);
  const helmet = part(0.82, 0.22, 0.82, armorMat, 0, 1.36, -0.02);
  const weapon = part(0.18, 0.18, 0.92, dark, 0.6, 0.18, 0.35);
  const hitboxMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
  hitboxMaterial.colorWrite = false;
  const hitbox = part(1.52, 2.66, 0.86, hitboxMaterial, 0, 0.1, 0.02);

  group.add(head, hair, body, vest, helmet, leftArm, rightArm, leftLeg, rightLeg, weapon, hitbox);
  group.userData.hitbox = hitbox;
  group.userData.head = head;
  group.userData.body = body;
  group.userData.leftArm = leftArm;
  group.userData.rightArm = rightArm;
  group.userData.leftLeg = leftLeg;
  group.userData.rightLeg = rightLeg;
  group.userData.materials = { skin, shirt, pants, hair: dark, armor: armorMat };
  return group;
}

function applyCharacterMaterials(model, index) {
  const palette = CHARACTERS[index] || CHARACTERS[0];
  const mats = model?.userData.materials;
  if (!mats || !palette) return;
  mats.skin.color.setHex(palette.skin);
  mats.shirt.color.setHex(palette.shirt);
  mats.pants.color.setHex(palette.pants);
  mats.hair.color.setHex(palette.hair);
  mats.armor.color.setHex(palette.armor);
}

function buildWorld() {
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(1200, 1200), materials.grass);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  floorColliders.push({ minX: -600, maxX: 600, minZ: -600, maxZ: 600, y: 0 });

  for (let x = -240; x <= 240; x += 7) {
    for (let z = -240; z <= 240; z += 7) {
      const gx = x + rand(-1, 1);
      const gz = z + rand(-1, 1);
      if (Math.hypot(gx + 17, gz - 3.5) < 8) continue;
      if (Math.random() > 0.78) addGrassPatch(gx, gz);
    }
  }

  addWall(0, -28, 34, 3, 4, materials.stone);
  addWall(-25, 2, 3, 32, 4, materials.stone);
  addWall(24, 9, 3, 26, 4, materials.wood);
  addWall(0, 8, 16, 3, 3, materials.wood);
  addCrates(-10, -8);
  addCrates(13, -7);
  addCrates(4, 19);
  addTower(-18, 19);
  addFloorBuilding();
  addMineBasement();
  addPubgMapDetails();
}

function addPubgMapDetails() {
  addRoad(0, 0, 7, 260, Math.PI / 2);
  addRoad(-28, 30, 6, 190, 0.42);
  addRoad(55, -45, 5, 150, -0.2);
  const homes = [
    [-88, -80, 12, 10], [88, -76, 10, 12], [-102, 70, 11, 10], [96, 86, 12, 12]
  ];
  for (const [x, z, w, d] of homes) addHouse(x, z, w, d, 3.4);
  addContainerYard(35, 8);
  addContainerYard(-72, -42);
  for (let i = 0; i < 150; i++) {
    const x = rand(-260, 260);
    const z = rand(-260, 260);
    if (Math.hypot(x, z) < 18) continue;
    addTree(x, z);
  }
}

function addPubgExpansion() {
  pubgExpanded = true;
  const occupied = [];
  const canPlace = (x, z, radius = 30) => {
    if (Math.hypot(x, z) < 48) return false;
    return occupied.every(item => Math.hypot(item.x - x, item.z - z) > Math.max(radius, item.radius));
  };
  const remember = (x, z, radius) => occupied.push({ x, z, radius });

  const guaranteedBlocks = [
    [-220, -220], [-110, -220], [0, -220], [110, -220], [220, -220],
    [-220, -110], [-110, -110], [110, -110], [220, -110],
    [-220, 0], [-110, 0], [110, 0], [220, 0],
    [-220, 110], [-110, 110], [0, 110], [110, 110], [220, 110],
    [-220, 220], [-110, 220], [0, 220], [110, 220], [220, 220]
  ];

  for (let i = 0; i < guaranteedBlocks.length; i++) {
    const [cx, cz] = guaranteedBlocks[i];
    const x = cx + rand(-24, 24);
    const z = cz + rand(-24, 24);
    if (!canPlace(x, z, 34)) continue;
    if (i % 5 === 0 || i % 7 === 0) {
      addApartmentBlock(x, z, rand(18, 26), rand(16, 22), rand(10, 17));
      remember(x, z, 40);
    } else if (i % 4 === 0) {
      addContainerYard(x, z);
      remember(x, z, 34);
    } else {
      addHouse(x, z, rand(9.5, 13.5), rand(9, 12.5), 3.4);
      remember(x, z, 31);
    }
  }

  for (let i = 0; i < 28; i++) {
    const x = rand(-270, 270);
    const z = rand(-270, 270);
    if (!canPlace(x, z, 26)) continue;
    if (i % 6 === 0) addLowHill(x, z, rand(9, 16), rand(0.9, 1.8));
    else if (i % 4 === 0) addCrates(x, z);
    else addHouseSupplies(x, z, 12, 12);
    remember(x, z, 24);
  }
  flashMessage("Battle map loaded");
}

function addLowHill(x, z, radius, height) {
  const hill = new THREE.Mesh(new THREE.ConeGeometry(radius, height, 8), materials.hill);
  hill.position.set(x, height / 2 - 0.04, z);
  hill.scale.z = rand(0.75, 1.25);
  hill.rotation.y = rand(0, Math.PI);
  hill.receiveShadow = true;
  hill.castShadow = true;
  scene.add(hill);
  mapMarkers.push({ x, z, w: radius * 1.6, d: radius * 1.4, type: "house" });
}

function addApartmentBlock(x, z, w, d, h) {
  mapMarkers.push({ x, z, w, d, type: "tower" });
  const base = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), materials.house);
  base.position.set(x, h / 2, z);
  base.castShadow = true;
  base.receiveShadow = true;
  scene.add(base);
  obstacles.push(base);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(w + 1.2, 0.35, d + 1.2), materials.roof);
  roof.position.set(x, h + 0.2, z);
  roof.castShadow = true;
  scene.add(roof);
  for (let floor = 1; floor < Math.floor(h / 3); floor++) {
    const y = floor * 3;
    for (let ix = -1; ix <= 1; ix++) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.1, 0.08), new THREE.MeshBasicMaterial({ color: 0x9fd7ff }));
      win.position.set(x + ix * (w * 0.24), y + 0.8, z - d / 2 - 0.05);
      scene.add(win);
    }
  }
}

function addRoad(x, z, w, d, rot) {
  const road = new THREE.Mesh(new THREE.BoxGeometry(w, 0.04, d), materials.road);
  road.position.set(x, 0.025, z);
  road.rotation.y = rot;
  road.receiveShadow = true;
  scene.add(road);
}

function addHouse(x, z, w, d, h) {
  mapMarkers.push({ x, z, w, d, type: "house" });
  const floor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.12, d), materials.houseFloor);
  floor.position.set(x, 0.07, z);
  floor.receiveShadow = true;
  scene.add(floor);
  addWall(x, z + d / 2, w, 0.35, h, materials.house);
  addWall(x - w / 2, z, 0.35, d, h, materials.house);
  addWall(x + w / 2, z, 0.35, d, h, materials.house);
  addWall(x - w * 0.28, z - d / 2, w * 0.44, 0.35, h, materials.house);
  addWall(x + w * 0.36, z - d / 2, w * 0.28, 0.35, h, materials.house);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(Math.max(w, d) * 0.72, 1.7, 4), materials.roof);
  roof.position.set(x, h + 0.9, z);
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  scene.add(roof);
  const doorWidth = Math.max(1.9, w * 0.3);
  const door = new THREE.Mesh(new THREE.BoxGeometry(doorWidth, 2.35, 0.18), materials.door);
  door.position.set(x + w * 0.08, 1.18, z - d / 2 - 0.09);
  door.userData.open = false;
  door.userData.closedPosition = door.position.clone();
  door.userData.closedRotationY = door.rotation.y;
  door.userData.openOffset = new THREE.Vector3(doorWidth + 0.35, 0, 0);
  door.castShadow = true;
  scene.add(door);
  doors.push(door);
  obstacles.push(door);
  addLootCrate(x + rand(-w * 0.25, w * 0.25), z + rand(-d * 0.15, d * 0.25));
  if (Math.random() > 0.45) addLootCrate(x + rand(-w * 0.3, w * 0.3), z + rand(-d * 0.3, d * 0.3));
  addHouseSupplies(x, z, w, d);
}

function addHouseSupplies(x, z, w, d) {
  const types = ["ammo", "med", "armor"];
  for (let i = 0; i < 3; i++) {
    const item = buildPickupMesh(types[i]);
    item.position.set(x + rand(-w * 0.28, w * 0.28), 0.42, z + rand(-d * 0.22, d * 0.22));
    item.userData.type = types[i];
    item.userData.baseY = item.position.y;
    item.castShadow = true;
    pickups.push(item);
    scene.add(item);
  }
}

function addLootCrate(x, z) {
  const crate = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 1.0), materials.loot);
  crate.position.set(x, 0.38, z);
  crate.castShadow = true;
  crate.userData.looted = false;
  const lid = new THREE.Mesh(new THREE.BoxGeometry(1.28, 0.12, 1.08), materials.door);
  lid.position.set(0, 0.42, 0);
  const strapA = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.76, 1.12), materials.road);
  strapA.position.set(-0.32, 0.04, 0);
  const strapB = strapA.clone();
  strapB.position.x = 0.32;
  const latch = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.18, 0.08), materials.road);
  latch.position.set(0, 0.08, -0.54);
  crate.add(lid, strapA, strapB, latch);
  scene.add(crate);
  lootCrates.push(crate);
}

function addContainerYard(x, z) {
  for (let i = 0; i < 5; i++) {
    const c = new THREE.Mesh(new THREE.BoxGeometry(5.5, 2.2, 2.2), i % 2 ? materials.containerBlue : materials.containerRed);
    c.position.set(x + (i % 2) * 5.8, 1.1, z + Math.floor(i / 2) * 3);
    c.rotation.y = i % 2 ? 0 : Math.PI / 2;
    c.castShadow = true;
    c.receiveShadow = true;
    scene.add(c);
    obstacles.push(c);
  }
}

function addTree(x, z) {
  const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.55, 2.1, 0.55), materials.trunk);
  trunk.position.set(x, 1.05, z);
  trunk.castShadow = true;
  scene.add(trunk);
  obstacles.push(trunk);
  const crown = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.8, 2.8), materials.tree);
  crown.position.set(x, 3.05, z);
  crown.castShadow = true;
  scene.add(crown);
}

function addFloorBuilding() {
  const w = TOWER_WIDTH;
  const d = TOWER_DEPTH;
  const x = 0;
  const z = -6;
  mapMarkers.push({ x, z, w, d, type: "tower" });
  for (let i = 1; i <= BUILDING_FLOORS; i++) {
    const y = i * FLOOR_HEIGHT;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(w, 0.35, d), materials.concrete);
    slab.position.set(x, y, z);
    slab.castShadow = true;
    slab.receiveShadow = true;
    scene.add(slab);
    slab.userData.floorSlab = true;
    obstacles.push(slab);
    floorColliders.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2, y });
    addFloorEdgeRailings(x, z, w, d, y + 0.24);
  }
  for (const px of [x - w / 2 + 1.2, x + w / 2 - 1.2]) {
    for (const pz of [z - d / 2 + 1.0, z + d / 2 - 1.0]) {
      addWall(px, pz, 1.1, 1.1, FLOOR_HEIGHT * BUILDING_FLOORS + 1, materials.concrete);
    }
  }
  addWall(x, z - d / 2 - 0.8, w - 2.0, 0.8, 1.1, materials.concrete);
  for (let i = 0; i < BUILDING_FLOORS; i++) {
    const xOffset = i % 2 === 0 ? -5.2 : 5.2;
    const zOffset = z - d / 2 + 1.8;
    addStairVisual(xOffset, zOffset, i * FLOOR_HEIGHT, (i + 1) * FLOOR_HEIGHT, i, i + 1);
    addStairOpeningMarker(xOffset, zOffset + 9.9, (i + 1) * FLOOR_HEIGHT + 0.2);
  }
  addStairVisual(-17, 3.5, 0, BASEMENT_Y, 0, -1, 26);
}

function addFloorEdgeRailings(x, z, w, d, y) {
  const railMat = materials.road;
  const railY = y + 0.64;
  const pieces = [
    [x, z - d / 2 + 0.18, w - 1.2, 0.16],
    [x, z + d / 2 - 0.18, w - 1.2, 0.16],
    [x - w / 2 + 0.18, z, 0.16, d - 1.2],
    [x + w / 2 - 0.18, z, 0.16, d - 1.2]
  ];
  for (const [rx, rz, rw, rd] of pieces) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(rw, 0.18, rd), railMat);
    rail.position.set(rx, railY, rz);
    rail.castShadow = true;
    rail.receiveShadow = true;
    addLowBarrier(rail);
  }
  for (const px of [x - w / 2 + 0.18, x + w / 2 - 0.18]) {
    for (let pz = z - d / 2 + 1.2; pz <= z + d / 2 - 1.2; pz += 3.0) addRailingPost(px, pz, y, railMat);
  }
  for (const pz of [z - d / 2 + 0.18, z + d / 2 - 0.18]) {
    for (let px = x - w / 2 + 1.2; px <= x + w / 2 - 1.2; px += 3.0) addRailingPost(px, pz, y, railMat);
  }
}

function addRailingPost(x, z, y, material) {
  const post = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.72, 0.18), material);
  post.position.set(x, y + 0.36, z);
  post.castShadow = true;
  addLowBarrier(post);
}

function addLowBarrier(mesh) {
  mesh.userData.visualRailing = true;
  mesh.userData.lowBarrier = true;
  obstacles.push(mesh);
  scene.add(mesh);
}

function addVisualRailing(mesh) {
  mesh.userData.visualRailing = true;
  scene.add(mesh);
}

function addStairOpeningMarker(x, z, y) {
  const hole = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.08, 4.8), new THREE.MeshBasicMaterial({ color: 0x141719, transparent: true, opacity: 0.82 }));
  hole.position.set(x, y, z);
  scene.add(hole);

  const stripeMat = new THREE.MeshBasicMaterial({ color: 0xffd34d });
  const outline = [
    [0, -2.42, 6.7, 0.1],
    [-3.35, 0, 0.1, 4.55],
    [3.35, 0, 0.1, 4.55],
    [0, 2.22, 6.7, 0.1]
  ];
  for (const [ox, oz, ow, od] of outline) {
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(ow, 0.1, od), stripeMat);
    stripe.position.set(x + ox, y + 0.09, z + oz);
    scene.add(stripe);
  }
}

function addStairVisual(x, z, y1, y2, fromFloor, toFloor, customLength = null) {
  const steps = customLength ? 14 : 9;
  const length = customLength || steps * 1.15;
  const startZ = z - 0.7;
  const endZ = z + length;
  const ramp = new THREE.Mesh(new THREE.BoxGeometry(customLength ? 7.2 : 3.8, 0.28, length + 1.4), materials.wood);
  ramp.position.set(x, (y1 + y2) / 2 + 0.06, (startZ + endZ) / 2);
  ramp.rotation.x = -Math.atan2(y2 - y1, length + 1.4);
  ramp.castShadow = true;
  ramp.receiveShadow = true;
  scene.add(ramp);
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1);
    const step = new THREE.Mesh(new THREE.BoxGeometry(customLength ? 7.4 : 4.0, 0.16, 0.5), materials.concrete);
    step.position.set(x, y1 + t * (y2 - y1) + 0.24, z + t * length);
    step.castShadow = true;
    step.receiveShadow = true;
    scene.add(step);
  }
  addStairSideRails(x, z, y1, y2, length, customLength ? 4.25 : 2.35);
  const minZ = Math.min(startZ, endZ);
  const maxZ = Math.max(startZ, endZ);
  const halfWidth = customLength ? 4.2 : 2.65;
  stairZones.push({ minX: x - halfWidth, maxX: x + halfWidth, minZ: minZ - 0.9, maxZ: maxZ + 0.9, startZ, endZ, fromFloor, toFloor, fromY: y1, toY: y2 });
  stairZones.push({ minX: x - halfWidth, maxX: x + halfWidth, minZ: minZ - 0.9, maxZ: maxZ + 0.9, startZ: endZ, endZ: startZ, fromFloor: toFloor, toFloor: fromFloor, fromY: y2, toY: y1 });
}

function addStairSideRails(x, z, y1, y2, length, halfWidth) {
  const railMat = materials.road;
  for (const side of [-1, 1]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, length + 0.8), railMat);
    rail.position.set(x + side * halfWidth, (y1 + y2) / 2 + 0.78, z + length / 2);
    rail.rotation.x = -Math.atan2(y2 - y1, length);
    rail.castShadow = true;
    addVisualRailing(rail);
    for (let i = 0; i <= 5; i++) {
      const t = i / 5;
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.72, 0.18), railMat);
      post.position.set(x + side * halfWidth, y1 + (y2 - y1) * t + 0.44, z + t * length);
      post.castShadow = true;
      addVisualRailing(post);
    }
  }
}

function addMineBasement() {
  mapMarkers.push({ x: -17, z: 8, w: 14, d: 16, type: "mine" });
  const floor = new THREE.Mesh(new THREE.BoxGeometry(44, 0.25, 34), materials.stone);
  floor.position.set(0, BASEMENT_Y, 35);
  floor.receiveShadow = true;
  scene.add(floor);
  floorColliders.push({ minX: -22, maxX: 22, minZ: 15, maxZ: 55, y: BASEMENT_Y });
  addWall(-17, 14.5, 10, 0.8, 3.1, materials.stone, BASEMENT_Y);
  addWall(17, 14.5, 10, 0.8, 3.1, materials.stone, BASEMENT_Y);
  addWall(-22, 35, 0.8, 40, 3.1, materials.stone, BASEMENT_Y);
  addWall(22, 35, 0.8, 40, 3.1, materials.stone, BASEMENT_Y);
  addWall(0, 55.5, 44, 0.8, 3.1, materials.stone, BASEMENT_Y);
  addMineMarker(-17, 3.5);
  for (let i = -2; i <= 2; i++) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 28), materials.road);
    rail.position.set(i * 1.8, BASEMENT_Y + 0.12, 35);
    scene.add(rail);
  }
  for (let z = 26; z <= 51; z += 8) addCrates(rand(-4, 14), z, BASEMENT_Y);
}

function addMineMarker(x, z) {
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xffd34d, transparent: true, opacity: 0.72 });
  const beacon = new THREE.Mesh(new THREE.BoxGeometry(0.65, 11.0, 0.65), beaconMat);
  beacon.position.set(x, 5.5, z - 1.2);
  scene.add(beacon);

  const warning = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.08, 5.8), materials.loot);
  warning.position.set(x, 0.08, z - 0.6);
  warning.receiveShadow = true;
  scene.add(warning);

  const darkHole = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.1, 3.6), new THREE.MeshBasicMaterial({ color: 0x14100c }));
  darkHole.position.set(x, 0.13, z + 0.9);
  scene.add(darkHole);

  for (const side of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.2, 0.42), materials.wood);
    post.position.set(x + side * 4.2, 1.6, z);
    post.castShadow = true;
    scene.add(post);
  }
  const beam = new THREE.Mesh(new THREE.BoxGeometry(9.0, 0.42, 0.42), materials.wood);
  beam.position.set(x, 3.1, z);
  beam.castShadow = true;
  scene.add(beam);

  const sign = new THREE.Mesh(new THREE.BoxGeometry(5.4, 1.4, 0.2), materials.loot);
  sign.position.set(x, 2.05, z - 0.35);
  sign.castShadow = true;
  scene.add(sign);

  const arrow = new THREE.Mesh(new THREE.ConeGeometry(1.25, 1.8, 4), materials.loot);
  arrow.position.set(x, 1.05, z + 2.4);
  arrow.rotation.y = Math.PI / 4;
  arrow.castShadow = true;
  scene.add(arrow);

  const railL = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 6.8), materials.road);
  const railR = railL.clone();
  railL.position.set(x - 1.4, 0.22, z + 1.7);
  railR.position.set(x + 1.4, 0.22, z + 1.7);
  scene.add(railL, railR);
}

function addWall(x, z, w, d, h, material, baseY = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, baseY + h / 2, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  obstacles.push(mesh);
  scene.add(mesh);
}

function addCrates(x, z, baseY = 0) {
  for (let i = 0; i < 5; i++) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.4, 2.2), materials.crate);
    mesh.position.set(x + (i % 2) * 2.35, baseY + 0.7 + Math.floor(i / 2) * 1.4, z + Math.floor(i % 3) * 1.8);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.stepTop = true;
    floorColliders.push({
      minX: mesh.position.x - 1.1,
      maxX: mesh.position.x + 1.1,
      minZ: mesh.position.z - 1.1,
      maxZ: mesh.position.z + 1.1,
      y: mesh.position.y + mesh.geometry.parameters.height / 2
    });
    obstacles.push(mesh);
    scene.add(mesh);
  }
}

function addTower(x, z) {
  addWall(x, z, 5, 5, 6, materials.stone);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(4.2, 2.4, 4), materials.roof);
  roof.position.set(x, 7.25, z);
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  scene.add(roof);
}

function addGrassPatch(x, z) {
  for (let i = 0; i < 5; i++) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, rand(0.3, 0.8), 0.08), materials.blade);
    blade.position.set(x + rand(-1, 1), blade.geometry.parameters.height / 2, z + rand(-1, 1));
    blade.rotation.y = rand(0, Math.PI);
    scene.add(blade);
  }
}

function buildGun() {
  const group = new THREE.Group();
  const skin = GUN_SKINS[gunSkinIndex];
  const metal = new THREE.MeshStandardMaterial({ color: skin.metal, metalness: 0.35, roughness: 0.44 });
  const stock = new THREE.MeshStandardMaterial({ color: skin.stock, roughness: 0.72 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x112022, metalness: 0.12, roughness: 0.18, transparent: true, opacity: 0.62 });
  const bladeMat = new THREE.MeshStandardMaterial({ color: 0xe9eef4, metalness: 0.7, roughness: 0.22 });
  const edgeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.35, roughness: 0.18 });
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x4a2a17, roughness: 0.78 });
  const body = part(0.22, 0.18, 0.74, metal, 0, 0, 0);
  const grip = part(0.18, 0.2, 0.28, stock, -0.02, -0.17, 0.2);
  const barrel = part(0.09, 0.09, 0.62, metal, 0.02, 0.02, -0.55);
  const topRail = part(0.24, 0.04, 0.48, stock, 0, 0.13, -0.04);
  const stockPart = part(0.22, 0.12, 0.34, stock, 0, -0.02, 0.48);
  group.add(body, grip, barrel, topRail, stockPart);
  const sightBase = part(0.28, 0.08, 0.22, metal, 0, 0.22, -0.12);
  const holoFrame = part(0.34, 0.28, 0.06, metal, 0, 0.39, -0.2);
  const holoGlass = part(0.24, 0.18, 0.025, glass, 0, 0.39, -0.235);
  const scopeTube = part(0.24, 0.24, 0.58, metal, 0, 0.33, -0.08);
  const scopeLens = part(0.2, 0.2, 0.035, glass, 0, 0.33, -0.39);
  group.add(sightBase, holoFrame, holoGlass, scopeTube, scopeLens);
  group.userData.holoParts = [holoFrame, holoGlass];
  group.userData.scopeParts = [scopeTube, scopeLens];
  const knifeBlade = makeKnifeBladeMesh(0.17, 0.9, bladeMat);
  knifeBlade.rotation.x = -Math.PI / 2;
  knifeBlade.position.set(0.02, 0.02, -0.45);
  const knifeEdge = part(0.018, 0.035, 0.68, edgeMat, 0.1, 0.04, -0.45);
  const knifeGuard = part(0.42, 0.055, 0.075, metal, 0.02, -0.02, 0.04);
  const knifeHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 0.52, 10), handleMat);
  knifeHandle.rotation.x = Math.PI / 2;
  knifeHandle.position.set(0.02, -0.08, 0.34);
  const handlePommel = part(0.18, 0.18, 0.08, metal, 0.02, -0.08, 0.62);
  group.add(knifeBlade, knifeEdge, knifeGuard, knifeHandle, handlePommel);
  group.userData.knifeParts = [knifeBlade, knifeEdge, knifeGuard, knifeHandle, handlePommel];
  group.userData.gunParts = [body, grip, barrel, topRail, stockPart, sightBase, holoFrame, holoGlass, scopeTube, scopeLens];
  const flash = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.52, 8), new THREE.MeshBasicMaterial({ color: 0xffd06b, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  flash.rotation.x = -Math.PI / 2;
  flash.position.set(0.02, 0.02, -0.9);
  group.add(flash);
  group.userData.flash = flash;
  group.userData.metal = metal;
  group.userData.stock = stock;
  group.userData.body = body;
  group.userData.grip = grip;
  group.userData.barrel = barrel;
  group.userData.topRail = topRail;
  group.userData.stockPart = stockPart;
  camera.add(group);
  return group;
}

function part(w, h, d, material, x, y, z) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function keepOutOfObstacles(position, radius, y = position.y) {
  for (const obstacle of obstacles) {
    if (obstacle.userData.floorSlab) continue;
    if (obstacle.userData.shieldWall && obstacle.userData.owner === "self") continue;
    const box = new THREE.Box3().setFromObject(obstacle);
    if (obstacle.userData.lowBarrier && (y < box.min.y - LOW_BARRIER_LOWER_MARGIN || y > box.max.y + LOW_BARRIER_CLEARANCE)) continue;
    if (obstacle.userData.stepTop && y >= box.max.y - 0.08) continue;
    if (!obstacle.userData.lowBarrier && (y < box.min.y - 0.2 || y > box.max.y + 1.4)) continue;
    const closestX = clamp(position.x, box.min.x, box.max.x);
    const closestZ = clamp(position.z, box.min.z, box.max.z);
    const dx = position.x - closestX;
    const dz = position.z - closestZ;
    const distance = Math.hypot(dx, dz);
    if (distance > 0 && distance < radius) {
      position.x += (dx / distance) * (radius - distance);
      position.z += (dz / distance) * (radius - distance);
    } else if (distance === 0) {
      const pushLeft = Math.abs(position.x - box.min.x);
      const pushRight = Math.abs(box.max.x - position.x);
      const pushBack = Math.abs(position.z - box.min.z);
      const pushForward = Math.abs(box.max.z - position.z);
      const minPush = Math.min(pushLeft, pushRight, pushBack, pushForward);
      if (minPush === pushLeft) position.x = box.min.x - radius;
      else if (minPush === pushRight) position.x = box.max.x + radius;
      else if (minPush === pushBack) position.z = box.min.z - radius;
      else position.z = box.max.z + radius;
    }
  }
}

function moveWithCollision(position, dx, dz, radius, y) {
  let moved = false;
  const nextX = position.clone();
  nextX.x += dx;
  if (!collidesWithObstacle(nextX, radius, y)) {
    position.x = nextX.x;
    moved = moved || Math.abs(dx) > 0.0001;
  }

  const nextZ = position.clone();
  nextZ.z += dz;
  if (!collidesWithObstacle(nextZ, radius, y)) {
    position.z = nextZ.z;
    moved = moved || Math.abs(dz) > 0.0001;
  }
  return moved;
}

function collidesWithObstacle(position, radius, y) {
  for (const obstacle of obstacles) {
    if (obstacle.userData.open || obstacle.userData.floorSlab) continue;
    if (obstacle.userData.shieldWall && obstacle.userData.owner === "self") continue;
    const box = new THREE.Box3().setFromObject(obstacle);
    if (obstacle.userData.lowBarrier && (y < box.min.y - LOW_BARRIER_LOWER_MARGIN || y > box.max.y + LOW_BARRIER_CLEARANCE)) continue;
    const onOrAboveTop = y >= box.max.y - 0.08;
    if (obstacle.userData.stepTop && onOrAboveTop) continue;
    if (!obstacle.userData.lowBarrier && (y < box.min.y - 0.2 || y > box.max.y + 1.0)) continue;
    const closestX = clamp(position.x, box.min.x, box.max.x);
    const closestZ = clamp(position.z, box.min.z, box.max.z);
    const dx = position.x - closestX;
    const dz = position.z - closestZ;
    if (dx * dx + dz * dz < radius * radius) return true;
  }
  return false;
}

function makeMaterials() {
  return {
    grass: new THREE.MeshStandardMaterial({ map: texture("grass"), roughness: 0.95 }),
    stone: new THREE.MeshStandardMaterial({ map: texture("stone"), roughness: 0.88 }),
    wood: new THREE.MeshStandardMaterial({ map: texture("wood"), roughness: 0.82 }),
    concrete: new THREE.MeshStandardMaterial({ map: texture("stone"), roughness: 0.86 }),
    road: new THREE.MeshStandardMaterial({ map: texture("road"), roughness: 0.92 }),
    house: new THREE.MeshStandardMaterial({ map: texture("plaster"), roughness: 0.86 }),
    houseFloor: new THREE.MeshStandardMaterial({ map: texture("wood"), roughness: 0.9 }),
    door: new THREE.MeshStandardMaterial({ map: texture("door"), roughness: 0.82 }),
    loot: new THREE.MeshStandardMaterial({ color: 0xd8c260, roughness: 0.72 }),
    containerBlue: new THREE.MeshStandardMaterial({ map: texture("containerBlue"), roughness: 0.78 }),
    containerRed: new THREE.MeshStandardMaterial({ map: texture("containerRed"), roughness: 0.78 }),
    trunk: new THREE.MeshStandardMaterial({ color: 0x57351f, roughness: 0.9 }),
    tree: new THREE.MeshStandardMaterial({ color: 0x315f32, roughness: 0.96 }),
    crate: new THREE.MeshStandardMaterial({ color: 0x8b5b2b, roughness: 0.82 }),
    roof: new THREE.MeshStandardMaterial({ color: 0x734236, roughness: 0.78 }),
    hill: new THREE.MeshStandardMaterial({ color: 0x6f8f5c, roughness: 0.96 }),
    blade: new THREE.MeshStandardMaterial({ color: 0x4f7a30, roughness: 0.95 })
  };
}

function texture(kind) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const palettes = {
    grass: ["#4f8438", "#6fa34d", "#385f2c"],
    stone: ["#8c918c", "#a5aaa4", "#6d746e"],
    wood: ["#7b5433", "#9a6b40", "#4b3322"],
    road: ["#2d3337", "#3c4449", "#1d2225"],
    plaster: ["#a98d68", "#c1aa85", "#80684b"],
    door: ["#3a271d", "#604129", "#231811"],
    containerBlue: ["#24597f", "#37749d", "#173a56"],
    containerRed: ["#87352d", "#a94b3f", "#5c241f"]
  };
  const colors = palettes[kind] || palettes.wood;
  ctx.fillStyle = colors[0];
  ctx.fillRect(0, 0, 128, 128);
  for (let y = 0; y < 128; y += 16) {
    for (let x = 0; x < 128; x += 16) {
      ctx.fillStyle = colors[(x / 16 + y / 16) % colors.length];
      ctx.globalAlpha = rand(0.18, 0.42);
      ctx.fillRect(x, y, 16, 16);
    }
  }
  ctx.globalAlpha = 1;
  if (["wood", "door"].includes(kind)) {
    for (let y = 8; y < 128; y += 14) {
      ctx.strokeStyle = "rgba(20,12,7,.28)";
      ctx.beginPath();
      ctx.moveTo(0, y + rand(-2, 2));
      ctx.lineTo(128, y + rand(-2, 2));
      ctx.stroke();
    }
  }
  if (kind.startsWith("container")) {
    ctx.strokeStyle = "rgba(255,255,255,.22)";
    for (let x = 10; x < 128; x += 18) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 128);
      ctx.stroke();
    }
  }
  if (kind === "stone" || kind === "plaster") {
    ctx.strokeStyle = "rgba(40,40,40,.18)";
    for (let y = 0; y < 128; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(128, y);
      ctx.stroke();
    }
  }
  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;
  map.repeat.set(8, 8);
  return map;
}

function updateRoomStatus(text, tone = "") {
  if (!els.roomStatus) return;
  els.roomStatus.textContent = text;
  els.roomStatus.className = `room-status ${tone}`.trim();
}

function socketUrl() {
  const configured = String(globalThis.BLOCK_BATTLE_SERVER_URL || "").trim();
  if (configured && !configured.includes("PASTE_RENDER")) {
    return configured
      .replace(/^https:/, "wss:")
      .replace(/^http:/, "ws:")
      .replace(/\/$/, "");
  }
  const protocol = location.protocol === "https:" ? "wss:" : "ws:";
  return `${protocol}//${location.host}`;
}

function connectSocket() {
  if (multiplayer.socket && [WebSocket.OPEN, WebSocket.CONNECTING].includes(multiplayer.socket.readyState)) return;
  try {
    multiplayer.socket = new WebSocket(socketUrl());
  } catch (error) {
    updateRoomStatus("Server connection failed. Check the Render WebSocket URL in config.js.", "bad");
    return;
  }
  multiplayer.socket.addEventListener("open", () => {
    multiplayer.connected = true;
    updateRoomStatus("Server connected. You can create or join a room.", "ok");
    if (multiplayer.pending) {
      const pending = multiplayer.pending;
      multiplayer.pending = null;
      sendSocket(pending);
    }
  });
  multiplayer.socket.addEventListener("close", () => {
    multiplayer.connected = false;
    multiplayer.opponentReady = false;
    updateRoomStatus("Server disconnected. Refresh the page; Render may still be waking up.", "bad");
  });
  multiplayer.socket.addEventListener("error", () => updateRoomStatus("WebSocket failed. The GitHub Pages version needs the Render URL in config.js.", "bad"));
  multiplayer.socket.addEventListener("message", event => {
    try { handleSocketMessage(JSON.parse(event.data)); }
    catch (error) { console.warn("Bad socket message", error); }
  });
}

function sendSocket(payload) {
  if (!multiplayer.socket || multiplayer.socket.readyState !== WebSocket.OPEN) return false;
  multiplayer.socket.send(JSON.stringify(payload));
  return true;
}

function createRoom() {
  const payload = { type: "create", characterIndex, gunSkinIndex };
  connectSocket();
  if (!sendSocket(payload)) multiplayer.pending = payload;
  updateRoomStatus("Creating room...", "warn");
}

function joinRoom(code) {
  const clean = String(code).replace(/\D/g, "").slice(0, 6);
  if (!clean) {
    updateRoomStatus("Enter the room code from your friend.", "bad");
    return;
  }
  const payload = { type: "join", roomCode: clean, characterIndex, gunSkinIndex };
  connectSocket();
  if (!sendSocket(payload)) multiplayer.pending = payload;
  updateRoomStatus(`Joining room ${clean}...`, "warn");
}

function handleSocketMessage(data) {
  if (data.type === "roomCreated") {
    multiplayer.roomCode = data.roomCode;
    multiplayer.playerId = data.playerId;
    multiplayer.role = data.role;
    multiplayer.players = data.players || {};
    multiplayer.opponentReady = false;
    if (els.roomCodeInput) els.roomCodeInput.value = data.roomCode;
    updateRoomStatus(`Room code: ${data.roomCode}. Send this code to your friend.`, "ok");
    return;
  }
  if (data.type === "joined" || data.type === "roomUpdate") {
    multiplayer.roomCode = data.roomCode || multiplayer.roomCode;
    multiplayer.playerId = data.playerId || multiplayer.playerId;
    multiplayer.role = data.role || multiplayer.role;
    multiplayer.players = data.players || multiplayer.players;
    multiplayer.opponentReady = Object.keys(multiplayer.players).length >= 2;
    ensureRemoteBot();
    updateRemoteFromPlayers();
    updateRoomStatus(multiplayer.opponentReady ? `Room ${multiplayer.roomCode} is full. Start 1V1 when ready.` : `Room ${multiplayer.roomCode}: waiting for opponent.`, multiplayer.opponentReady ? "ok" : "warn");
    return;
  }
  if (data.type === "state") {
    multiplayer.players[data.playerId] = data.state;
    updateRemoteFromPlayers();
    return;
  }
  if (data.type === "hit") {
    if (isProtectedFromRemoteHit()) return;
    applyDamage(Number(data.damage) || 0);
    if (data.knock) applyPlayerKnockback(data.knock, 1);
    return;
  }
  if (data.type === "action") {
    if (data.action === "shieldWall") deployShieldWall("enemy", data.wall || {});
    return;
  }
  if (data.type === "score") {
    kills = data.kills?.[multiplayer.playerId] || kills;
    flashMessage(data.text || "Opponent down");
    return;
  }
  if (data.type === "error") {
    updateRoomStatus(data.message || "Room error", "bad");
    flashMessage(data.message || "Room error");
  }
}

function isProtectedFromRemoteHit() {
  const remoteId = getRemotePlayerId();
  const state = remoteId ? multiplayer.players[remoteId] : null;
  if (!state) return false;
  const stateY = Number.isFinite(Number(state.y)) ? Number(state.y) : 0;
  const origin = new THREE.Vector3(Number(state.x) || 0, stateY + 0.8, Number(state.z) || 0);
  const target = player.position.clone().add(new THREE.Vector3(0, 0.8, 0));
  const direction = target.clone().sub(origin);
  const distance = direction.length();
  if (distance <= 0) return false;
  direction.normalize();
  return isBlocked(origin, direction, distance, "incomingShot");
}

function getRemotePlayerId() {
  return Object.keys(multiplayer.players).find(id => id !== multiplayer.playerId) || "";
}

function ensureRemoteBot() {
  if (multiplayer.remoteBot) return multiplayer.remoteBot;
  const bot = {
    group: makeCharacter(1),
    hitbox: null,
    healthbar: makeHealthbar(),
    hp: 100,
    maxHp: 100,
    fireTimer: 0,
    wanderTimer: 0,
    wanderAngle: 0,
    walkPhase: 0,
    deadTimer: 0,
    verticalVelocity: 0,
    grounded: true,
    healthbarTimer: 999,
    isRemote: true
  };
  bot.hitbox = bot.group.userData.hitbox;
  bot.group.visible = false;
  bot.group.position.set(0, BOT_STAND_HEIGHT, -16);
  bot.healthbar.classList.add("hidden");
  multiplayer.remoteBot = bot;
  bots.push(bot);
  scene.add(bot.group);
  return bot;
}

function clearBots() {
  for (let i = bots.length - 1; i >= 0; i--) {
    if (bots[i].isRemote) continue;
    bots[i].healthbar?.remove();
    scene.remove(bots[i].group);
    bots.splice(i, 1);
  }
}

function setPlayerSpawn(slot) {
  const spawn = slot === 1 ? new THREE.Vector3(0, STAND_EYE_HEIGHT, 18) : new THREE.Vector3(0, STAND_EYE_HEIGHT, -34);
  player.position.copy(spawn);
  yaw = slot === 1 ? Math.PI : 0;
  pitch = -0.12;
  player.verticalVelocity = 0;
  player.grounded = true;
}

function updateRemoteFromPlayers() {
  const remoteId = getRemotePlayerId();
  if (!remoteId) return;
  const state = multiplayer.players[remoteId];
  if (!state) return;
  const bot = ensureRemoteBot();
  bot.group.visible = true;
  bot.deadTimer = 0;
  bot.hp = Math.max(0, Number(state.hp) || 0);
  bot.maxHp = Number(state.maxHp) || 100;
  bot.healthbarTimer = 999;
  applyCharacterMaterials(bot.group, Number(state.characterIndex) || 0);
  bot.group.position.set(Number(state.x) || 0, Number(state.y) || BOT_STAND_HEIGHT, Number(state.z) || 0);
  bot.group.rotation.y = Number(state.yaw) || 0;
  animateCharacter(bot.group, Number(state.speed) || 0, 0.016);
}

function updateMultiplayer(dt) {
  ensureRemoteBot();
  const now = performance.now();
  if (now - multiplayer.lastSend > 50) {
    multiplayer.lastSend = now;
    sendSocket({
      type: "state",
      state: {
        x: player.position.x,
        y: player.position.y - player.eyeHeight + BOT_STAND_HEIGHT,
        z: player.position.z,
        yaw,
        pitch,
        hp,
        maxHp: CHARACTERS[characterIndex]?.hp || 100,
        armor,
        weaponIndex,
        characterIndex,
        gunSkinIndex,
        speed: player.velocity.length(),
        started
      }
    });
  }
  updateRemoteFromPlayers();
}

updateRoomStatus("Choose Solo Practice, or create/join a room for Online 1V1.", "warn");

function flashMessage(text) {
  els.message.textContent = text;
  messageTimer = 1.1;
}

function resize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}
