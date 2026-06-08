import * as THREE from './vendor/three.module.min.js';

const WELCOME = ``;

const scenes = [
  {
    "id": "entrance",
    "title": "Tervetuloa Pystyv\u00e4\u00e4n kotiin.",
    "subtitle": "Tutustu Pystyv\u00e4n kodin ymp\u00e4rist\u00f6\u00f6n",
    "texture": "assets/pystyva-koti-entrance.jpg",
    "introduction": "Tutustu Pystyv\u00e4n kodin ymp\u00e4rist\u00f6\u00f6n ja hyvinvointiteknologiaan. Aloitamme sis\u00e4ll\u00f6n rakentamisen yhdest\u00e4 testikohteesta.",
    "tasks": [
      "L\u00f6yd\u00e4 palvelurobotti, joka voi opastaa ihmisi\u00e4 rakennuksessa.",
      "L\u00f6yd\u00e4 l\u00e4\u00e4keannostelurobotti, joka tukee l\u00e4\u00e4kehoidon turvallisuutta.",
      "L\u00f6yd\u00e4 hyljerobotti, joka voi tukea vuorovaikutusta ja rauhoittumista."
    ],
    "hotspots": [
      {
        "type": "visible",
        "yaw": 145.0,
        "pitch": -27.0,
        "label": "\u00c4ly-wc",
        "title": "\u00c4lyk\u00e4s pesev\u00e4 wc-istuin",
        "text": "\u00c4lyk\u00e4s pesev\u00e4 wc-istuin voi tukea arjen omatoimisuutta, hygieniaa, yksityisyytt\u00e4 ja ihmisarvoa. Ennen k\u00e4ytt\u00f6\u00f6nottoa on arvioitava esimerkiksi siirtymisen turvallisuus, istuma-asento, toimintakyky, kognitio, s\u00e4\u00e4t\u00f6jen ymm\u00e4rt\u00e4minen, veden l\u00e4mp\u00f6tila ja se, kuka vastaa laitteen puhdistuksesta ja yll\u00e4pidosta."
      },
      {
        "type": "hidden",
        "task": "L\u00f6yd\u00e4 palvelurobotti, joka voi opastaa ihmisi\u00e4 rakennuksessa.",
        "yaw": 44.0,
        "pitch": -21.0,
        "hitWidth": 220,
        "hitHeight": 220,
        "title": "Cruzr-palvelurobotti",
        "text": "Cruzr on palvelurobotti, joka sopii esimerkiksi kauppakeskusten, lentokenttien tai sairaaloiden k\u00e4ytt\u00f6\u00f6n. Se on rakenteeltaan isokokoinen ja pystyy liikkumaan karttaohjelman avulla. Robotti voi esimerkiksi toivottaa tervetulleeksi ja opastaa rakennuksen sis\u00e4ll\u00e4 kulkemisessa.\n\nPohdittavaa: millaisissa tilanteissa palvelurobotti tukee asiakkaan itsen\u00e4ist\u00e4 liikkumista, ja milloin tarvitaan edelleen ihmisen antamaa ohjausta?"
      },
      {
        "type": "hidden",
        "task": "L\u00f6yd\u00e4 l\u00e4\u00e4keannostelurobotti, joka tukee l\u00e4\u00e4kehoidon turvallisuutta.",
        "yaw": -16.0,
        "pitch": -6.5,
        "hitWidth": 280,
        "hitHeight": 220,
        "title": "Evondos-l\u00e4\u00e4keannostelurobotti",
        "text": "Evondos-l\u00e4\u00e4keannostelurobotti parantaa l\u00e4\u00e4kehoidon turvallisuutta. Se v\u00e4hent\u00e4\u00e4 l\u00e4\u00e4kehoidon vaaratilanteita ja poikkeamia, tukee asiakkaiden itsen\u00e4isyytt\u00e4 sek\u00e4 v\u00e4hent\u00e4\u00e4 kotihoidon hoitajien ty\u00f6kuormaa. Evondos varmistaa oikean l\u00e4\u00e4keannoksen oikeaan aikaan oikealle henkil\u00f6lle.\n\nPohdittavaa: miten varmistetaan, ett\u00e4 asiakas ymm\u00e4rt\u00e4\u00e4 laitteen viestit ja ett\u00e4 poikkeamiin reagoidaan ajoissa?"
      },
      {
        "type": "hidden",
        "task": "L\u00f6yd\u00e4 hyljerobotti, joka voi tukea vuorovaikutusta ja rauhoittumista.",
        "yaw": -91.0,
        "pitch": -29.0,
        "hitWidth": 240,
        "hitHeight": 200,
        "title": "PARO-hyljerobotti",
        "text": "PARO-hyljerobotti tukee vuorovaikutusta ja kontaktin ottamista. Se aktivoi ja toimii virikkeen\u00e4. Hylje reagoi \u00e4\u00e4neen sek\u00e4 kosketukseen. Se \u00e4\u00e4ntelee ja antaa hoivaa, mik\u00e4 voi rauhoittaa ja rentouttaa sek\u00e4 v\u00e4hent\u00e4\u00e4 ahdistusta.\n\nPohdittavaa: kenelle hyljerobotti voisi olla mielek\u00e4s tuki, ja miten varmistetaan, ett\u00e4 sen k\u00e4ytt\u00f6 tuntuu asiakkaasta arvokkaalta ja hyv\u00e4ksytt\u00e4v\u00e4lt\u00e4?"
      }
    ]
  },
  {
    "id": "centre",
    "title": "Centre view",
    "subtitle": "Client-centred technology selection",
    "texture": "assets/pystyva-koti-centre.jpg",
    "introduction": "This scene is ready for the next content design step.",
    "tasks": [],
    "hotspots": []
  }
];

const $ = id => document.getElementById(id);
const renderer = new THREE.WebGLRenderer({ canvas: $('viewer'), antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const scene3d = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 1, 1100);
const sphere = new THREE.Mesh(new THREE.SphereGeometry(500, 96, 48).scale(-1,1,1), new THREE.MeshBasicMaterial({ color: 0x222222 }));
scene3d.add(sphere);
const loader = new THREE.TextureLoader();

let sceneIndex = 0, lon = 0, lat = 0, fov = 75, isDown = false, startX = 0, startY = 0, startLon = 0, startLat = 0, debug = false;
const progress = Object.fromEntries(scenes.map(s => [s.id, { found: new Set(), revealed: false }]));

function init() {
  $('sceneSelect').innerHTML = scenes.map((s,i)=>`<option value="${i}">${s.title}</option>`).join('');
  $('sceneSelect').addEventListener('change', e => loadScene(+e.target.value));
  $('prevScene').onclick = () => loadScene((sceneIndex + scenes.length - 1) % scenes.length);
  $('nextScene').onclick = () => loadScene((sceneIndex + 1) % scenes.length);
  $('resetScene').onclick = resetScene;
  $('revealRemaining').onclick = revealRemaining;
  $('panelToggle').onclick = togglePanel;
  $('closePopup').onclick = closePopup;
  $('popup').addEventListener('click', e => { if (e.target === $('popup')) closePopup(); });
  $('copyReflection').onclick = async () => { await navigator.clipboard.writeText($('reflectionText').value); toast('Pohdinta kopioitu.'); };
  addInput(); addKeyboard(); loadScene(0); resize(); animate();
}

function loadScene(i) {
  sceneIndex = i; const s = scenes[i]; $('sceneSelect').value = i;
  $('sceneTitle').textContent = s.title; $('sceneSubtitle').textContent = s.subtitle; $('sceneIntro').textContent = i === 0 ? WELCOME + '\n\n' + s.introduction : s.introduction;
  loader.load(s.texture, tex => { sphere.material.map = tex; sphere.material.color.set(0xffffff); sphere.material.needsUpdate = true; }, undefined, () => toast('Kuvaa ei voitu ladata: ' + s.texture));
  renderTasks(); renderHotspots(); updateFinal(); closePopup();
}
function renderTasks() {
  const s = scenes[sceneIndex], p = progress[s.id];
  $('taskList').innerHTML = s.tasks.map(t => `<li class="${p.found.has(t)?'found':''}"><span>${p.found.has(t)?'&#9745;':'&#9744;'}</span><span>${t}</span></li>`).join('');
  $('foundCounter').textContent = `L\u00f6ydetty ${p.found.size}/${s.tasks.length}`;
}
function renderHotspots() {
  const s = scenes[sceneIndex], p = progress[s.id]; $('hotspotLayer').innerHTML = '';
  s.hotspots.forEach((h, idx) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = `hotspot ${h.type}`; b.dataset.idx = idx; b.setAttribute('aria-label', h.type === 'visible' ? h.label : h.task);
    if (h.type === 'visible') b.textContent = h.label;
    if (h.type === 'hidden' && (p.revealed || p.found.has(h.task))) b.classList.add('revealed');
    if (h.type === 'hidden' && p.found.has(h.task)) b.classList.add('found');
    b.style.width = (h.hitWidth || 80) + 'px'; b.style.height = (h.hitHeight || 56) + 'px';
    b.onclick = () => activateHotspot(h); $('hotspotLayer').appendChild(b);
  });
}
function activateHotspot(h) {
  if (h.type === 'hidden') { progress[scenes[sceneIndex].id].found.add(h.task); renderTasks(); renderHotspots(); updateFinal(); openPopup('Havainto l\u00f6ydetty', h.title, h.text); }
  else openPopup('Oppimiskohde', h.title, h.text);
}
function revealRemaining() { progress[scenes[sceneIndex].id].revealed = true; renderHotspots(); toast('J\u00e4ljell\u00e4 olevat kohteet n\u00e4ytet\u00e4\u00e4n. Suorita teht\u00e4v\u00e4 ja lue selitys napsauttamalla korostettua aluetta.'); }
function resetScene() { const p = progress[scenes[sceneIndex].id]; p.found.clear(); p.revealed = false; renderTasks(); renderHotspots(); updateFinal(); toast('N\u00e4kym\u00e4n eteneminen nollattu.'); }
function updateFinal() { $('finalPanel').hidden = !scenes.every(s => progress[s.id].found.size === s.tasks.length); }
function openPopup(k,t,x){ $('popupKicker').textContent=k; $('popupTitle').textContent=t; $('popupText').textContent=x; $('popup').showModal(); }
function closePopup(){ if ($('popup').open) $('popup').close(); }
function toast(msg){ $('toast').textContent=msg; clearTimeout(toast.t); toast.t=setTimeout(()=>$('toast').textContent='', 3600); }
function togglePanel(){ const p=$('lessonPanel'); const open=!p.classList.toggle('open') ? false : true; $('panelToggle').setAttribute('aria-expanded', String(open)); }

function addInput() {
  const c = $('viewer');
  c.addEventListener('pointerdown', e => { isDown = true; startX=e.clientX; startY=e.clientY; startLon=lon; startLat=lat; c.setPointerCapture(e.pointerId); });
  c.addEventListener('pointermove', e => { if (!isDown) return; lon = startLon - (e.clientX-startX)*0.12; lat = startLat + (e.clientY-startY)*0.12; });
  c.addEventListener('pointerup', () => isDown = false); c.addEventListener('pointercancel', () => isDown = false);
  c.addEventListener('wheel', e => { e.preventDefault(); fov = THREE.MathUtils.clamp(fov + e.deltaY * 0.03, 35, 95); camera.fov=fov; camera.updateProjectionMatrix(); }, { passive:false });
  c.addEventListener('click', e => { if(debug) { const yp = screenToYawPitch(e.clientX, e.clientY); console.log(`yaw:${yp.yaw.toFixed(1)}, pitch:${yp.pitch.toFixed(1)}`); } });
}
function addKeyboard(){ addEventListener('keydown', e => { if(e.key==='Escape') closePopup(); if(e.key==='ArrowLeft') lon-=6; if(e.key==='ArrowRight') lon+=6; if(e.key==='ArrowUp') lat+=4; if(e.key==='ArrowDown') lat-=4; if(e.key.toLowerCase()==='d') { debug=!debug; $('debugReadout').hidden=!debug; toast('Virheenkorjaustila ' + (debug?'k\u00e4yt\u00f6ss\u00e4':'pois käytöstä')); } }); }
function resize(){ renderer.setSize(innerWidth, innerHeight); camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); }
addEventListener('resize', resize);

function animate(){ requestAnimationFrame(animate); lat = THREE.MathUtils.clamp(lat, -85, 85); const phi = THREE.MathUtils.degToRad(90-lat), theta = THREE.MathUtils.degToRad(lon); camera.lookAt(500*Math.sin(phi)*Math.cos(theta), 500*Math.cos(phi), 500*Math.sin(phi)*Math.sin(theta)); renderer.render(scene3d, camera); positionHotspots(); if(debug) $('debugReadout').textContent = `n\u00e4kym\u00e4: yaw ${normYaw(lon).toFixed(1)}, pitch ${lat.toFixed(1)} | D vaihtaa tilan`; }
function positionHotspots(){ document.querySelectorAll('.hotspot').forEach(el => { const h = scenes[sceneIndex].hotspots[+el.dataset.idx]; const v = yawPitchToVector(h.yaw, h.pitch); const pos = v.project(camera); const visible = pos.z < 1; el.style.left = ((pos.x + 1) / 2 * innerWidth) + 'px'; el.style.top = ((-pos.y + 1) / 2 * innerHeight) + 'px'; el.style.display = visible ? 'grid' : 'none'; }); }
function yawPitchToVector(yaw, pitch){ const phi=THREE.MathUtils.degToRad(90-pitch), theta=THREE.MathUtils.degToRad(yaw); return new THREE.Vector3(500*Math.sin(phi)*Math.cos(theta), 500*Math.cos(phi), 500*Math.sin(phi)*Math.sin(theta)); }
function normYaw(y){ return ((y + 180) % 360 + 360) % 360 - 180; }
function screenToYawPitch(x,y){ const mouse = new THREE.Vector2((x/innerWidth)*2-1, -(y/innerHeight)*2+1); const ray = new THREE.Raycaster(); ray.setFromCamera(mouse, camera); const d = ray.ray.direction.normalize(); return { yaw: normYaw(THREE.MathUtils.radToDeg(Math.atan2(d.z, d.x))), pitch: THREE.MathUtils.radToDeg(Math.asin(d.y)) }; }

init();
