import * as THREE from './vendor/three.module.min.js';
import { scenes } from './scene-data.js';

const viewer = document.querySelector('#viewer');
const hotspotLayer = document.querySelector('#hotspot-layer');
const loading = document.querySelector('#loading');
const sceneSelect = document.querySelector('#scene-select');
const previousSceneButton = document.querySelector('#previous-scene');
const nextSceneButton = document.querySelector('#next-scene');
const sceneTitle = document.querySelector('#scene-title');
const sceneSubtitle = document.querySelector('#scene-subtitle');
const sceneIntroduction = document.querySelector('#scene-introduction');
const taskList = document.querySelector('#task-list');
const progressText = document.querySelector('#progress-text');
const progressBar = document.querySelector('#progress-bar');
const completion = document.querySelector('#completion');
const revealButton = document.querySelector('#reveal-remaining');
const resetSceneButton = document.querySelector('#reset-scene');
const resetViewButton = document.querySelector('#reset-view');
const zoomInButton = document.querySelector('#zoom-in');
const zoomOutButton = document.querySelector('#zoom-out');
const togglePanelButton = document.querySelector('#toggle-panel');
const simulationLayout = document.querySelector('.simulation-layout');
const lessonPanel = document.querySelector('#lesson-panel');
const dialog = document.querySelector('#hotspot-dialog');
const closeDialogButton = document.querySelector('#close-dialog');
const dialogLabel = document.querySelector('#dialog-label');
const dialogTitle = document.querySelector('#dialog-title');
const dialogText = document.querySelector('#dialog-text');
const dialogReflection = document.querySelector('#dialog-reflection');
const debugReadout = document.querySelector('#debug-readout');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
viewer.prepend(renderer.domElement);

const world = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(72, 1, 0.1, 1100);
const geometry = new THREE.SphereGeometry(500, 96, 48);
geometry.scale(-1, 1, 1);
const sphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));
world.add(sphere);

const textureLoader = new THREE.TextureLoader();
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const state = {
  sceneIndex: 0,
  yaw: 0,
  pitch: 0,
  found: new Set(),
  revealed: false,
  hotspotViews: [],
  dragging: false,
  moved: false,
  pointerType: 'mouse',
  startX: 0,
  startY: 0,
  startYaw: 0,
  startPitch: 0
};

function yawPitchToVector(yaw, pitch, radius = 450) {
  const phi = THREE.MathUtils.degToRad(90 - pitch);
  const theta = THREE.MathUtils.degToRad(yaw);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi),
    -radius * Math.sin(phi) * Math.cos(theta)
  );
}

function updateCamera() {
  state.pitch = Math.max(-78, Math.min(78, state.pitch));
  camera.lookAt(yawPitchToVector(state.yaw, state.pitch, 500));
}

function setFov(value) {
  camera.fov = Math.max(38, Math.min(85, value));
  camera.updateProjectionMatrix();
}

function createHotspotView(hotspot) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = hotspot.type === 'visible' ? 'hotspot visible' : 'hotspot hidden-hotspot';
  button.setAttribute('aria-label', hotspot.type === 'visible' ? hotspot.label : `Tutki panoraaman aluetta: ${hotspot.task}`);
  button.innerHTML = hotspot.type === 'visible'
    ? `<span aria-hidden="true">●</span><span>${hotspot.label}</span>`
    : '<span aria-hidden="true">?</span>';
  button.addEventListener('click', () => openHotspot(hotspot));
  hotspotLayer.append(button);
  return { hotspot, button, position: yawPitchToVector(hotspot.yaw, hotspot.pitch) };
}

function renderHotspots() {
  state.hotspotViews.forEach(({ hotspot, button }) => {
    const found = state.found.has(hotspot.id);
    button.classList.toggle('revealed', hotspot.type === 'hidden' && state.revealed && !found);
    button.classList.toggle('found', found);
    if (hotspot.type === 'hidden') button.innerHTML = `<span aria-hidden="true">${found ? '✓' : '?'}</span>`;
  });
}

function updateHotspotPositions() {
  const width = viewer.clientWidth;
  const height = viewer.clientHeight;
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);
  state.hotspotViews.forEach(({ position, button }) => {
    const facingCamera = cameraDirection.dot(position.clone().normalize()) > 0.08;
    const projected = position.clone().project(camera);
    const onScreen = facingCamera && projected.z > -1 && projected.z < 1;
    button.style.display = onScreen ? '' : 'none';
    if (onScreen) {
      button.style.left = `${(projected.x * .5 + .5) * width}px`;
      button.style.top = `${(-projected.y * .5 + .5) * height}px`;
    }
  });
}

function renderTasks() {
  const scene = scenes[state.sceneIndex];
  const hiddenHotspots = scene.hotspots.filter((hotspot) => hotspot.type === 'hidden');
  taskList.innerHTML = '';
  scene.tasks.forEach((task) => {
    const hotspot = hiddenHotspots.find((item) => item.task === task);
    const found = hotspot && state.found.has(hotspot.id);
    const item = document.createElement('li');
    item.classList.toggle('found', found);
    item.innerHTML = `<span class="task-state" aria-hidden="true">${found ? '&#9745;' : '&#9744;'}</span>${task}${found ? '<span class="sr-only"> Löydetty.</span>' : ''}`;
    taskList.append(item);
  });
  const foundCount = hiddenHotspots.filter((hotspot) => state.found.has(hotspot.id)).length;
  progressText.textContent = `Löydetty ${foundCount}/${hiddenHotspots.length}`;
  progressBar.style.width = `${hiddenHotspots.length ? (foundCount / hiddenHotspots.length) * 100 : 0}%`;
  completion.hidden = foundCount !== hiddenHotspots.length;
}

function openHotspot(hotspot) {
  if (hotspot.type === 'hidden') state.found.add(hotspot.id);
  renderHotspots();
  renderTasks();
  dialogLabel.textContent = hotspot.type === 'hidden' ? 'Löydetty oppimiskohde' : hotspot.label;
  dialogTitle.textContent = hotspot.title;
  dialogText.textContent = hotspot.text;
  dialogReflection.textContent = hotspot.reflection;
  if (!dialog.open) dialog.showModal();
}

function closeDialog() {
  if (dialog.open) dialog.close();
}

function loadScene(index) {
  state.sceneIndex = (index + scenes.length) % scenes.length;
  const scene = scenes[state.sceneIndex];
  state.yaw = scene.initialView.yaw;
  state.pitch = scene.initialView.pitch;
  setFov(scene.initialView.fov);
  state.found.clear();
  state.revealed = false;
  state.hotspotViews.forEach(({ button }) => button.remove());
  state.hotspotViews = scene.hotspots.map(createHotspotView);
  sceneTitle.textContent = scene.title;
  sceneSubtitle.textContent = scene.subtitle;
  sceneIntroduction.textContent = scene.introduction;
  sceneSelect.value = scene.id;
  loading.hidden = false;
  loading.textContent = 'Ladataan 360-näkymää…';
  textureLoader.load(
    scene.texture,
    (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      sphere.material.map?.dispose();
      sphere.material.map = texture;
      sphere.material.needsUpdate = true;
      loading.hidden = true;
    },
    undefined,
    () => {
      loading.hidden = false;
      loading.innerHTML = 'Panoraamaa ei voitu ladata. Käytä <a href="./accessible.html">tekstivaihtoehtoa</a> tai käynnistä paikallinen HTTP-palvelin.';
    }
  );
  previousSceneButton.disabled = scenes.length < 2;
  nextSceneButton.disabled = scenes.length < 2;
  renderHotspots();
  renderTasks();
  updateCamera();
}

function resize() {
  const width = viewer.clientWidth;
  const height = viewer.clientHeight;
  renderer.setSize(width, height, false);
  camera.aspect = width / Math.max(height, 1);
  camera.updateProjectionMatrix();
}

function animate() {
  updateCamera();
  updateHotspotPositions();
  renderer.render(world, camera);
}

sceneSelect.innerHTML = scenes.map((scene) => `<option value="${scene.id}">${scene.title}</option>`).join('');
sceneSelect.addEventListener('change', () => loadScene(scenes.findIndex((scene) => scene.id === sceneSelect.value)));
previousSceneButton.addEventListener('click', () => loadScene(state.sceneIndex - 1));
nextSceneButton.addEventListener('click', () => loadScene(state.sceneIndex + 1));

viewer.addEventListener('pointerdown', (event) => {
  if (event.target.closest('.hotspot')) return;
  state.dragging = true;
  state.moved = false;
  state.pointerType = event.pointerType;
  state.startX = event.clientX;
  state.startY = event.clientY;
  state.startYaw = state.yaw;
  state.startPitch = state.pitch;
  viewer.classList.add('is-dragging');
  viewer.setPointerCapture(event.pointerId);
});

viewer.addEventListener('pointermove', (event) => {
  if (!state.dragging) return;
  const deltaX = event.clientX - state.startX;
  const deltaY = event.clientY - state.startY;
  state.moved ||= Math.abs(deltaX) + Math.abs(deltaY) > 4;
  const touchMultiplier = state.pointerType === 'touch' ? -1 : 1;
  state.yaw = state.startYaw - deltaX * .12 * touchMultiplier;
  state.pitch = state.startPitch + deltaY * .1 * touchMultiplier;
});

function endDrag(event) {
  if (!state.dragging) return;
  state.dragging = false;
  viewer.classList.remove('is-dragging');
  if (viewer.hasPointerCapture(event.pointerId)) viewer.releasePointerCapture(event.pointerId);
}
viewer.addEventListener('pointerup', endDrag);
viewer.addEventListener('pointercancel', endDrag);

viewer.addEventListener('wheel', (event) => {
  event.preventDefault();
  setFov(camera.fov + event.deltaY * .035);
}, { passive: false });

viewer.addEventListener('keydown', (event) => {
  const actions = {
    ArrowLeft: () => { state.yaw -= 4; },
    ArrowRight: () => { state.yaw += 4; },
    ArrowUp: () => { state.pitch += 3; },
    ArrowDown: () => { state.pitch -= 3; },
    '+': () => setFov(camera.fov - 5),
    '=': () => setFov(camera.fov - 5),
    '-': () => setFov(camera.fov + 5)
  };
  if (actions[event.key]) {
    event.preventDefault();
    actions[event.key]();
  }
});

zoomInButton.addEventListener('click', () => setFov(camera.fov - 7));
zoomOutButton.addEventListener('click', () => setFov(camera.fov + 7));
resetViewButton.addEventListener('click', () => {
  const view = scenes[state.sceneIndex].initialView;
  state.yaw = view.yaw;
  state.pitch = view.pitch;
  setFov(view.fov);
  viewer.focus();
});
revealButton.addEventListener('click', () => {
  state.revealed = true;
  renderHotspots();
  revealButton.textContent = 'Kohteet paljastettu';
});
resetSceneButton.addEventListener('click', () => {
  const index = state.sceneIndex;
  loadScene(index);
  revealButton.textContent = 'Paljasta jäljellä olevat';
});
togglePanelButton.addEventListener('click', () => {
  const expanded = togglePanelButton.getAttribute('aria-expanded') === 'true';
  togglePanelButton.setAttribute('aria-expanded', String(!expanded));
  togglePanelButton.textContent = expanded ? 'Näytä tehtävät' : 'Piilota tehtävät';
  lessonPanel.hidden = expanded;
  simulationLayout.classList.toggle('panel-collapsed', expanded);
  requestAnimationFrame(resize);
});
closeDialogButton.addEventListener('click', closeDialog);
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeDialog();
});

if (new URLSearchParams(window.location.search).has('debug')) {
  debugReadout.hidden = false;
  debugReadout.textContent = 'Debug: kaksoisnapsauta kohtaa';
  viewer.addEventListener('dblclick', (event) => {
    const rect = viewer.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const direction = raycaster.ray.direction.normalize();
    const yaw = THREE.MathUtils.radToDeg(Math.atan2(direction.x, -direction.z));
    const pitch = THREE.MathUtils.radToDeg(Math.asin(direction.y));
    debugReadout.textContent = `yaw ${yaw.toFixed(1)}, pitch ${pitch.toFixed(1)}`;
    console.log(`yaw:${yaw.toFixed(1)}, pitch:${pitch.toFixed(1)}`);
  });
}

new ResizeObserver(resize).observe(viewer);
renderer.setAnimationLoop(animate);
loadScene(0);
