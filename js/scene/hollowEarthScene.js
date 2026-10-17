import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';
import {
  LAKE_CATEGORIES,
  TAIWAN_OUTLINE_COORDS,
  PENGHU_OUTLINE_COORDS,
  LANYU_OUTLINE_COORDS
} from '../data/taiwanLakes.js';

/**
 * 經緯度轉換為 3D 台灣地底劇場座標系
 * 中心基準點：北緯 23.65°, 東經 120.95° (台灣地理中心附近)
 */
const CENTER_LAT = 23.65;
const CENTER_LNG = 120.95;
const SCALE_XZ = 24.0; // 每度經緯度對應之 3D 世界單位

export function latLngToWorld(lat, lng, y = 0) {
  const x = (lng - CENTER_LNG) * SCALE_XZ * Math.cos((CENTER_LAT * Math.PI) / 180);
  const z = -(lat - CENTER_LAT) * SCALE_XZ;
  return new THREE.Vector3(x, y, z);
}

export function worldToLatLng(pos) {
  const lat = CENTER_LAT - pos.z / SCALE_XZ;
  const lng = CENTER_LNG + pos.x / (SCALE_XZ * Math.cos((CENTER_LAT * Math.PI) / 180));
  return { lat, lng };
}

export class HollowEarthScene {
  constructor(container, callbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x030812);
    this.scene.fog = new THREE.FogExp2(0x030812, 0.0042);

    this.camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.5,
      600
    );
    this.camera.position.set(-18, 28, 62);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.maxDistance = 240;
    this.controls.minDistance = 8;
    this.controls.target.set(0, -6, 0);

    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    // 狀態管理
    this.lakes = [];
    this.aquiferLinks = [];
    this.lakeNodeMap = new Map(); // id -> { lake, surfacePos, cavernPos, surfaceMesh, cavernMesh, columnMesh, ringMesh }
    this.interactiveMeshes = [];
    this.aquiferPulses = []; // 沿水脈流動之發光能量粒子
    this.sonarWaves = []; // 聲納擴散光環

    this.selectedLakeId = null;
    this.hoveredLakeId = null;
    this.missionTargetLakeId = null;
    this.cameraFollowSub = false;
    this.aquiferVisible = true;
    this.crustOpacity = 0.58;

    // 潛艇物理與操控狀態
    this.subState = {
      position: new THREE.Vector3(0, -9.5, 6),
      velocity: new THREE.Vector3(),
      yaw: Math.PI, // 朝向北方 (-Z)
      pitch: 0,
      speed: 0,
      targetY: -9.5,
      isSurfaced: false,
      autopilotActive: false,
      autopilotTween: null
    };

    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false,
      boost: false
    };

    // 圖層群組
    this.worldGroup = new THREE.Group();
    this.hollowGlobeGroup = new THREE.Group();
    this.taiwanCrustGroup = new THREE.Group();
    this.lakesGroup = new THREE.Group();
    this.aquiferGroup = new THREE.Group();
    this.fxGroup = new THREE.Group();

    this.worldGroup.add(this.hollowGlobeGroup);
    this.worldGroup.add(this.taiwanCrustGroup);
    this.worldGroup.add(this.aquiferGroup);
    this.worldGroup.add(this.lakesGroup);
    this.worldGroup.add(this.fxGroup);
    this.scene.add(this.worldGroup);

    this.setupLights();
    this.buildHollowEarthCore();
    this.buildTaiwanTectonicCrust();
    this.buildSubmarine();
    this.buildAmbientParticles();
    this.bindEvents();
  }

  setupLights() {
    const ambient = new THREE.AmbientLight(0x1e3a5f, 1.35);
    this.scene.add(ambient);

    const skyLight = new THREE.DirectionalLight(0x7dd3fc, 1.4);
    skyLight.position.set(30, 80, 40);
    this.scene.add(skyLight);

    // 地心熔岩核散發的暖橘色與水脈青色雙點光源
    this.coreLight = new THREE.PointLight(0xff5e1a, 4.5, 180, 1.2);
    this.coreLight.position.set(0, -54, 0);
    this.scene.add(this.coreLight);

    this.aquiferLight = new THREE.PointLight(0x00f2fe, 2.8, 120, 1.4);
    this.aquiferLight.position.set(0, -14, 0);
    this.scene.add(this.aquiferLight);
  }

  /**
   * 建立空心地球地殼透視層、地函斷層環與地心熔岩太陽
   */
  buildHollowEarthCore() {
    // 1. 地心熔岩內核 (Inner Molten Core at y = -56)
    const coreGeo = new THREE.IcosahedronGeometry(9.5, 4);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xff4500,
      emissive: 0xff5500,
      emissiveIntensity: 1.6,
      roughness: 0.3,
      metalness: 0.2,
      wireframe: false
    });
    this.innerCoreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.innerCoreMesh.position.set(0, -56, 0);
    this.hollowGlobeGroup.add(this.innerCoreMesh);

    // 地心外層能量晶格籠
    const coreCageGeo = new THREE.IcosahedronGeometry(12.2, 2);
    const coreCageMat = new THREE.MeshBasicMaterial({
      color: 0xffaa33,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });
    this.coreCageMesh = new THREE.Mesh(coreCageGeo, coreCageMat);
    this.coreCageMesh.position.set(0, -56, 0);
    this.hollowGlobeGroup.add(this.coreCageMesh);

    // 2. 地心引力磁場光環 (3 道傾斜旋轉能量環)
    this.coreRings = [];
    const ringRadii = [18, 26, 36];
    const ringColors = [0xff6b35, 0x00f2fe, 0x818cf8];
    ringRadii.forEach((radius, idx) => {
      const rGeo = new THREE.TorusGeometry(radius, 0.14, 12, 96);
      const rMat = new THREE.MeshBasicMaterial({
        color: ringColors[idx],
        transparent: true,
        opacity: 0.35
      });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.position.set(0, -56, 0);
      ring.rotation.x = Math.PI / 2 + (idx - 1) * 0.35;
      ring.rotation.y = idx * 0.5;
      this.hollowGlobeGroup.add(ring);
      this.coreRings.push(ring);
    });

    // 3. 空心地球外層半透明地殼球體 (Hollow Earth Planetary Sphere centered at y = -56, radius = 56)
    // 使得球體北極頂點正好切齊台灣地表 (y = 0)！
    const globeGeo = new THREE.SphereGeometry(56, 48, 36);
    const globeWireMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    this.globeWireMesh = new THREE.Mesh(globeGeo, globeWireMat);
    this.globeWireMesh.position.set(0, -56, 0);
    this.hollowGlobeGroup.add(this.globeWireMesh);

    // 地底水脈深層等深線座標環 (y = -8, -16, -24)
    [-8, -16, -24].forEach((depthY, i) => {
      const gridRingGeo = new THREE.RingGeometry(28 + i * 8, 28.25 + i * 8, 64);
      const gridRingMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.16 - i * 0.03
      });
      const ring = new THREE.Mesh(gridRingGeo, gridRingMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = depthY;
      this.hollowGlobeGroup.add(ring);
    });
  }

  /**
   * 建立台灣本島、澎湖、蘭嶼與金門 3D 半透明地殼岩層與地底斷層根部
   */
  buildTaiwanTectonicCrust() {
    this.crustMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a2740,
      emissive: 0x041628,
      emissiveIntensity: 0.7,
      roughness: 0.25,
      metalness: 0.1,
      transmission: 0.35,
      transparent: true,
      opacity: this.crustOpacity,
      side: THREE.DoubleSide
    });

    this.subCrustMaterial = new THREE.MeshStandardMaterial({
      color: 0x061526,
      emissive: 0x00334e,
      emissiveIntensity: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });

    const createIslandMesh = (coords, extrudeDepth = 2.6, yOffset = -2.2) => {
      const shape = new THREE.Shape();
      coords.forEach(([lat, lng], idx) => {
        const pt = latLngToWorld(lat, lng, 0);
        // Shape 位於 XY 平面，稍後旋轉 -90 度至 XZ 平面 (因此 Y 對應 -Z)
        if (idx === 0) {
          shape.moveTo(pt.x, -pt.z);
        } else {
          shape.lineTo(pt.x, -pt.z);
        }
      });
      shape.closePath();

      const extrudeSettings = {
        steps: 2,
        depth: extrudeDepth,
        bevelEnabled: true,
        bevelThickness: 0.35,
        bevelSize: 0.25,
        bevelSegments: 2
      };

      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.rotateX(-Math.PI / 2);

      const mesh = new THREE.Mesh(geo, this.crustMaterial);
      mesh.position.y = yOffset;
      this.taiwanCrustGroup.add(mesh);

      // 海岸線發光霓虹邊框
      const linePoints = coords.map(([lat, lng]) => latLngToWorld(lat, lng, 0.45));
      linePoints.push(linePoints[0].clone());
      const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.85
      });
      const coastLine = new THREE.Line(lineGeo, lineMat);
      this.taiwanCrustGroup.add(coastLine);

      // 地底深層板塊根部網格 (向下延伸至地函層)
      const rootGeo = new THREE.ExtrudeGeometry(shape, {
        steps: 3,
        depth: 14,
        bevelEnabled: false
      });
      rootGeo.rotateX(-Math.PI / 2);
      const rootMesh = new THREE.Mesh(rootGeo, this.subCrustMaterial);
      rootMesh.position.y = -15.5;
      rootMesh.scale.set(0.88, 1, 0.88);
      this.taiwanCrustGroup.add(rootMesh);
    };

    // 1. 台灣本島
    createIslandMesh(TAIWAN_OUTLINE_COORDS, 2.6, -2.2);
    // 2. 澎湖群島
    createIslandMesh(PENGHU_OUTLINE_COORDS, 1.6, -1.6);
    // 3. 蘭嶼火山島
    createIslandMesh(LANYU_OUTLINE_COORDS, 1.8, -1.8);

    // 4. 金門島地殼底座 (位於台灣海峽西側)
    const kinmenCoords = [
      [24.51, 118.31],
      [24.52, 118.47],
      [24.40, 118.46],
      [24.39, 118.30]
    ];
    createIslandMesh(kinmenCoords, 1.5, -1.5);

    // 中央山脈脊樑能量稜線 (象徵台灣高山分水嶺與深層水脈源頭)
    const spineCoords = [
      [24.85, 121.65, 2.2],
      [24.45, 121.42, 3.6],
      [24.12, 121.25, 4.1],
      [23.75, 121.18, 3.9],
      [23.47, 120.95, 4.5], // 玉山主峰高度象徵
      [23.28, 121.03, 3.8],
      [22.86, 120.86, 3.1],
      [22.35, 120.75, 1.8]
    ];
    const spinePts = spineCoords.map(([lat, lng, h]) => latLngToWorld(lat, lng, h));
    const spineCurve = new THREE.CatmullRomCurve3(spinePts);
    const spineGeo = new THREE.TubeGeometry(spineCurve, 48, 0.22, 8, false);
    const spineMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.35,
      wireframe: true
    });
    this.taiwanCrustGroup.add(new THREE.Mesh(spineGeo, spineMat));
  }

  /**
   * 建立或重建所有湖泊、水庫、埤塘与潟湖 3D 節點與地底水脈通道
   * 支援動態新增擴充節點後即時重繪！
   */
  rebuildLakeNodes(lakes, aquiferLinks, unlockedIds = new Set(), purifiedIds = new Set()) {
    this.lakes = lakes;
    this.aquiferLinks = aquiferLinks;

    // 清除舊節點
    while (this.lakesGroup.children.length > 0) {
      this.lakesGroup.remove(this.lakesGroup.children[0]);
    }
    while (this.aquiferGroup.children.length > 0) {
      this.aquiferGroup.remove(this.aquiferGroup.children[0]);
    }
    this.lakeNodeMap.clear();
    this.interactiveMeshes = [];
    this.aquiferPulses = [];

    // 1. 建立每座湖泊的「地表標記」、「垂直地底水脈井」與「地底水脈晶穴」
    for (const lake of lakes) {
      const catInfo = LAKE_CATEGORIES[lake.category] || LAKE_CATEGORIES.natural;
      const surfaceY = 0.75 + Math.min(3.8, (lake.elevation || 0) / 850);
      const cavernY = -Math.max(4.2, Math.min(26, (lake.aquiferDepth || 10) * 0.85));

      const surfacePos = latLngToWorld(lake.lat, lake.lng, surfaceY);
      const cavernPos = latLngToWorld(lake.lat, lake.lng, cavernY);

      const isUnlocked = unlockedIds.has(lake.id);
      const isPurified = purifiedIds.has(lake.id);

      const nodeGroup = new THREE.Group();

      // A. 地表湖泊寶石結晶 (Octahedron / Cylinder)
      const surfaceGeo = new THREE.OctahedronGeometry(isPurified ? 0.92 : 0.76, 1);
      const surfaceMat = new THREE.MeshStandardMaterial({
        color: catInfo.hex,
        emissive: catInfo.hex,
        emissiveIntensity: isPurified ? 1.8 : isUnlocked ? 1.15 : 0.65,
        roughness: 0.15,
        metalness: 0.3
      });
      const surfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
      surfaceMesh.position.copy(surfacePos);
      surfaceMesh.userData = { lakeId: lake.id, type: 'surface' };
      nodeGroup.add(surfaceMesh);
      this.interactiveMeshes.push(surfaceMesh);

      // 地表湖泊水平波紋光環
      const ringGeo = new THREE.RingGeometry(1.05, 1.42, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: catInfo.hex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: isUnlocked ? 0.78 : 0.38
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(surfacePos);
      ringMesh.position.y -= 0.18;
      ringMesh.rotation.x = -Math.PI / 2;
      nodeGroup.add(ringMesh);

      // B. 垂直地底水脈導管 (連接地表湖泊與地底水脈深處)
      const colHeight = surfacePos.y - cavernPos.y;
      const colGeo = new THREE.CylinderGeometry(0.16, 0.28, colHeight, 12, 1, true);
      const colMat = new THREE.MeshBasicMaterial({
        color: catInfo.hex,
        transparent: true,
        opacity: isUnlocked ? 0.45 : 0.22,
        side: THREE.DoubleSide
      });
      const columnMesh = new THREE.Mesh(colGeo, colMat);
      columnMesh.position.set(
        surfacePos.x,
        cavernPos.y + colHeight / 2,
        surfacePos.z
      );
      nodeGroup.add(columnMesh);

      // C. 地底水脈晶球節點 (供地底潛艇停靠共鳴)
      const cavernGeo = new THREE.SphereGeometry(0.68, 20, 20);
      const cavernMat = new THREE.MeshStandardMaterial({
        color: catInfo.hex,
        emissive: catInfo.hex,
        emissiveIntensity: isPurified ? 1.6 : 0.85,
        transparent: true,
        opacity: 0.9
      });
      const cavernMesh = new THREE.Mesh(cavernGeo, cavernMat);
      cavernMesh.position.copy(cavernPos);
      cavernMesh.userData = { lakeId: lake.id, type: 'cavern' };
      nodeGroup.add(cavernMesh);
      this.interactiveMeshes.push(cavernMesh);

      // D. 地底至地心深處的微光引力絲線
      const coreVec = new THREE.Vector3(0, -56, 0);
      const rootLineGeo = new THREE.BufferGeometry().setFromPoints([cavernPos, coreVec]);
      const rootLineMat = new THREE.LineBasicMaterial({
        color: catInfo.hex,
        transparent: true,
        opacity: 0.08
      });
      nodeGroup.add(new THREE.Line(rootLineGeo, rootLineMat));

      this.lakesGroup.add(nodeGroup);
      this.lakeNodeMap.set(lake.id, {
        lake,
        surfacePos,
        cavernPos,
        surfaceMesh,
        cavernMesh,
        columnMesh,
        ringMesh,
        catInfo
      });
    }

    // 2. 建立地底水脈連通網路 (Subterranean Aquifer Conduits)
    const pulseGeo = new THREE.SphereGeometry(0.24, 8, 8);

    for (const [idA, idB] of aquiferLinks) {
      const nodeA = this.lakeNodeMap.get(idA);
      const nodeB = this.lakeNodeMap.get(idB);
      if (!nodeA || !nodeB) continue;

      const mid = new THREE.Vector3()
        .addVectors(nodeA.cavernPos, nodeB.cavernPos)
        .multiplyScalar(0.5);
      // 讓水脈通道往地底深處微幅下彎，呈現自然地下伏流弧度
      mid.y -= 2.8;

      const curve = new THREE.QuadraticBezierCurve3(
        nodeA.cavernPos,
        mid,
        nodeB.cavernPos
      );

      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.11, 6, false);
      const isBothUnlocked = unlockedIds.has(idA) && unlockedIds.has(idB);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: isBothUnlocked ? 0x38bdf8 : 0x0284c7,
        transparent: true,
        opacity: isBothUnlocked ? 0.42 : 0.18
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      this.aquiferGroup.add(tubeMesh);

      // 在水脈管線上加入流動能量光點
      const pulseMat = new THREE.MeshBasicMaterial({
        color: isBothUnlocked ? 0x7dd3fc : 0x00f2fe
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      this.aquiferGroup.add(pulseMesh);

      this.aquiferPulses.push({
        mesh: pulseMesh,
        curve,
        t: Math.random(),
        speed: 0.12 + Math.random() * 0.14
      });
    }
  }

  /**
   * 更新單一湖泊的解鎖 / 淨化視覺狀態
   */
  updateLakeVisualState(unlockedIds, purifiedIds) {
    for (const [id, node] of this.lakeNodeMap.entries()) {
      const isUnlocked = unlockedIds.has(id);
      const isPurified = purifiedIds.has(id);
      node.surfaceMesh.material.emissiveIntensity = isPurified ? 1.9 : isUnlocked ? 1.2 : 0.65;
      node.cavernMesh.material.emissiveIntensity = isPurified ? 1.7 : 0.85;
      node.ringMesh.material.opacity = isUnlocked ? 0.82 : 0.38;
      node.columnMesh.material.opacity = isUnlocked ? 0.48 : 0.22;
    }
  }

  /**
   * 建立 3D 地底探勘潛艇 (Nautilus-TW 台灣水脈探勘號)
   */
  buildSubmarine() {
    this.submarineGroup = new THREE.Group();

    // 潛艇主船體 (膠囊流線型)
    const hullGeo = new THREE.CapsuleGeometry(0.62, 1.45, 12, 24);
    hullGeo.rotateX(Math.PI / 2);
    const hullMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xb45309,
      emissiveIntensity: 0.35,
      roughness: 0.25,
      metalness: 0.65
    });
    const hullMesh = new THREE.Mesh(hullGeo, hullMat);
    this.submarineGroup.add(hullMesh);

    // 生物發光玻璃座艙罩 (前端 -Z 方向)
    const domeGeo = new THREE.SphereGeometry(0.56, 20, 20);
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 1.5,
      roughness: 0.1
    });
    const domeMesh = new THREE.Mesh(domeGeo, domeMat);
    domeMesh.position.set(0, 0.08, -0.82);
    this.submarineGroup.add(domeMesh);

    // 潛望鏡指揮塔 (Conning Tower)
    const towerGeo = new THREE.CylinderGeometry(0.24, 0.34, 0.65, 12);
    const towerMesh = new THREE.Mesh(towerGeo, hullMat);
    towerMesh.position.set(0, 0.65, -0.1);
    this.submarineGroup.add(towerMesh);

    // 左右水翼 (Hydroplane Fins)
    const finGeo = new THREE.BoxGeometry(1.9, 0.08, 0.48);
    const finMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6
    });
    const finMesh = new THREE.Mesh(finGeo, finMat);
    finMesh.position.set(0, 0, -0.15);
    this.submarineGroup.add(finMesh);

    // 尾部螺旋槳
    this.propellerGroup = new THREE.Group();
    this.propellerGroup.position.set(0, 0, 1.32);
    const bladeGeo = new THREE.BoxGeometry(0.85, 0.14, 0.06);
    const bladeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const blade1 = new THREE.Mesh(bladeGeo, bladeMat);
    const blade2 = new THREE.Mesh(bladeGeo, bladeMat);
    blade2.rotation.z = Math.PI / 2;
    this.propellerGroup.add(blade1, blade2);
    this.submarineGroup.add(this.propellerGroup);

    // 潛艇深海探照燈光束 (Volumetric Cone)
    const beamGeo = new THREE.ConeGeometry(2.4, 7.5, 24, 1, true);
    beamGeo.translate(0, -3.75, 0);
    beamGeo.rotateX(Math.PI / 2);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    this.subHeadlightBeam = new THREE.Mesh(beamGeo, beamMat);
    this.subHeadlightBeam.position.set(0, 0, -1.1);
    this.submarineGroup.add(this.subHeadlightBeam);

    // 潛艇外部聲納導航環
    const navRingGeo = new THREE.RingGeometry(1.15, 1.32, 32);
    const navRingMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55
    });
    this.subNavRing = new THREE.Mesh(navRingGeo, navRingMat);
    this.subNavRing.rotation.x = -Math.PI / 2;
    this.subNavRing.position.y = -0.55;
    this.submarineGroup.add(this.subNavRing);

    this.submarineGroup.position.copy(this.subState.position);
    this.scene.add(this.submarineGroup);
  }

  /**
   * 建立地底生物發光浮游粒子與地熱氣泡
   */
  buildAmbientParticles() {
    const count = 420;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const cCyan = new THREE.Color(0x00f2fe);
    const cPurple = new THREE.Color(0xc084fc);
    const cAmber = new THREE.Color(0xff6b35);

    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 65;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = -Math.random() * 54 + 4;
      positions[i * 3 + 2] = Math.sin(theta) * r;

      const y = positions[i * 3 + 1];
      const c = y < -34 ? cAmber : y > -10 ? cCyan : cPurple;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.42,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.ambientParticles = new THREE.Points(pGeo, pMat);
    this.fxGroup.add(this.ambientParticles);
  }

  /**
   * 發射 3D 聲納探測波光環
   */
  emitSonarWave(origin = this.subState.position, colorHex = 0x00f2fe) {
    const waveGeo = new THREE.RingGeometry(0.6, 1.1, 48);
    const waveMat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.position.copy(origin);
    waveMesh.rotation.x = -Math.PI / 2;
    this.fxGroup.add(waveMesh);

    this.sonarWaves.push({
      mesh: waveMesh,
      age: 0,
      maxAge: 1.6
    });
  }

  /**
   * 自動導航潛艇至指定湖泊節點（支援地底潛行抵達後浮出湖面）
   */
  autopilotToLake(lakeId, surfaceOnArrival = true, onComplete = null) {
    const node = this.lakeNodeMap.get(lakeId);
    if (!node) return;

    this.selectedLakeId = lakeId;
    if (this.subState.autopilotTween) {
      this.subState.autopilotTween.kill();
    }

    this.subState.autopilotActive = true;
    const startPos = this.subState.position.clone();
    const targetCavern = node.cavernPos.clone();
    const targetSurface = node.surfacePos.clone();
    targetSurface.y += 0.9;

    // 計算朝向目標的航向角 (Yaw)
    const dx = targetCavern.x - startPos.x;
    const dz = targetCavern.z - startPos.z;
    if (Math.hypot(dx, dz) > 0.2) {
      this.subState.yaw = Math.atan2(-dx, -dz);
    }

    // 先下潛至地底水脈高度，沿水脈巡航至目標湖泊正下方，再浮出湖面
    const midPos = new THREE.Vector3(
      (startPos.x + targetCavern.x) * 0.5,
      Math.min(startPos.y, targetCavern.y) - 3.0,
      (startPos.z + targetCavern.z) * 0.5
    );

    const endPos = surfaceOnArrival ? targetSurface : targetCavern;
    const progressObj = { t: 0 };
    const curve = new THREE.CatmullRomCurve3([
      startPos,
      midPos,
      targetCavern,
      endPos
    ]);

    this.emitSonarWave(startPos, node.catInfo.hex);

    this.subState.autopilotTween = gsap.to(progressObj, {
      t: 1,
      duration: 2.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        const pt = curve.getPointAt(progressObj.t);
        const tangent = curve.getTangentAt(progressObj.t);
        this.subState.position.copy(pt);
        if (Math.hypot(tangent.x, tangent.z) > 0.01) {
          this.subState.yaw = Math.atan2(-tangent.x, -tangent.z);
        }
        this.subState.pitch = Math.asin(Math.max(-0.7, Math.min(0.7, tangent.y)));
        this.subState.speed = 28;
      },
      onComplete: () => {
        this.subState.autopilotActive = false;
        this.subState.pitch = 0;
        this.subState.speed = 0;
        this.subState.isSurfaced = surfaceOnArrival;
        this.subState.targetY = endPos.y;
        this.emitSonarWave(endPos, node.catInfo.hex);
        if (onComplete) onComplete(node.lake);
      }
    });

    // 同步平滑移動攝影機焦點
    gsap.to(this.controls.target, {
      x: targetCavern.x,
      y: surfaceOnArrival ? targetSurface.y - 3 : targetCavern.y,
      z: targetCavern.z,
      duration: 1.8,
      ease: 'power2.out'
    });
  }

  /**
   * 切換潛艇「浮出地表湖泊」或「下潛地底水脈」
   */
  toggleSurfaceOrDive() {
    const nearest = this.getNearestLake();
    if (!nearest) return null;

    const node = this.lakeNodeMap.get(nearest.lake.id);
    if (!node) return null;

    if (this.subState.position.y < -1.5) {
      // 由地底浮出至最近湖泊水面
      this.autopilotToLake(nearest.lake.id, true, lake => {
        if (this.callbacks.onLakeSurfaced) {
          this.callbacks.onLakeSurfaced(lake, nearest.distanceKm);
        }
      });
      return { action: 'surface', lake: nearest.lake };
    } else {
      // 由地表下潛回地底水脈層
      this.subState.isSurfaced = false;
      gsap.to(this.subState.position, {
        y: node.cavernPos.y,
        duration: 1.1,
        ease: 'power2.inOut'
      });
      this.emitSonarWave(this.subState.position, 0x00f2fe);
      return { action: 'dive', lake: nearest.lake };
    }
  }

  /**
   * 計算潛艇目前距離最近的台灣湖泊節點與對應距離 (公里)
   */
  getNearestLake() {
    let bestLake = null;
    let minHorizDist = Infinity;

    for (const [id, node] of this.lakeNodeMap.entries()) {
      const dx = this.subState.position.x - node.surfacePos.x;
      const dz = this.subState.position.z - node.surfacePos.z;
      const dist = Math.hypot(dx, dz);
      if (dist < minHorizDist) {
        minHorizDist = dist;
        bestLake = node.lake;
      }
    }

    if (!bestLake) return null;
    // 1 單位約對應 4.6 公里
    const distanceKm = +(minHorizDist * 4.6).toFixed(1);
    return { lake: bestLake, distanceUnits: minHorizDist, distanceKm };
  }

  /**
   * 設定視角預設模式
   */
  setCameraPreset(preset = 'taiwan') {
    this.cameraFollowSub = preset === 'sub';
    if (preset === 'taiwan') {
      gsap.to(this.camera.position, {
        x: -18,
        y: 28,
        z: 62,
        duration: 1.5,
        ease: 'power2.inOut'
      });
      gsap.to(this.controls.target, {
        x: 0,
        y: -6,
        z: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      });
    } else if (preset === 'globe') {
      // 空心地球全景透視視角
      gsap.to(this.camera.position, {
        x: -48,
        y: -12,
        z: 135,
        duration: 1.8,
        ease: 'power2.inOut'
      });
      gsap.to(this.controls.target, {
        x: 0,
        y: -38,
        z: 0,
        duration: 1.8,
        ease: 'power2.inOut'
      });
    }
  }

  setCrustOpacity(opacity) {
    this.crustOpacity = opacity;
    if (this.crustMaterial) {
      this.crustMaterial.opacity = opacity;
    }
  }

  setAquiferVisible(visible) {
    this.aquiferVisible = visible;
    this.aquiferGroup.visible = visible;
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      if (!this.container) return;
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    });

    this.renderer.domElement.addEventListener('pointermove', e => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(this.interactiveMeshes, false);
      if (intersects.length > 0) {
        const hitLakeId = intersects[0].object.userData.lakeId;
        this.hoveredLakeId = hitLakeId;
        this.renderer.domElement.style.cursor = 'pointer';
        if (this.callbacks.onLakeHover) {
          const node = this.lakeNodeMap.get(hitLakeId);
          this.callbacks.onLakeHover(node ? node.lake : null, e.clientX, e.clientY);
        }
      } else {
        this.hoveredLakeId = null;
        this.renderer.domElement.style.cursor = 'grab';
        if (this.callbacks.onLakeHover) {
          this.callbacks.onLakeHover(null, 0, 0);
        }
      }
    });

    let pointerDownPos = { x: 0, y: 0 };
    this.renderer.domElement.addEventListener('pointerdown', e => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    });

    this.renderer.domElement.addEventListener('pointerup', e => {
      const moveDist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (moveDist > 6) return; // 拖曳旋轉鏡頭時不觸發點擊

      const rect = this.renderer.domElement.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(this.interactiveMeshes, false);
      if (intersects.length > 0) {
        const hitLakeId = intersects[0].object.userData.lakeId;
        if (this.callbacks.onLakeClick) {
          const node = this.lakeNodeMap.get(hitLakeId);
          if (node) this.callbacks.onLakeClick(node.lake);
        }
      }
    });
  }

  /**
   * 每一幀更新潛艇物理、地心自轉、水脈粒子與聲納波
   */
  update() {
    const dt = Math.min(this.clock.getDelta(), 0.1);
    const elapsed = this.clock.getElapsedTime();

    // 1. 地心熔岩核與磁場環旋轉動畫
    if (this.innerCoreMesh) {
      this.innerCoreMesh.rotation.y = elapsed * 0.25;
      this.innerCoreMesh.rotation.x = Math.sin(elapsed * 0.4) * 0.15;
      const coreScale = 1 + Math.sin(elapsed * 2.2) * 0.04;
      this.innerCoreMesh.scale.setScalar(coreScale);
    }
    if (this.coreCageMesh) {
      this.coreCageMesh.rotation.y = -elapsed * 0.18;
      this.coreCageMesh.rotation.z = elapsed * 0.12;
    }
    this.coreRings.forEach((ring, idx) => {
      ring.rotation.z += dt * (0.18 + idx * 0.07) * (idx % 2 === 0 ? 1 : -1);
    });

    // 2. 地底水脈能量粒子流動
    for (const p of this.aquiferPulses) {
      p.t = (p.t + dt * p.speed) % 1;
      const pos = p.curve.getPointAt(p.t);
      p.mesh.position.copy(pos);
    }

    // 3. 湖泊地表寶石懸浮旋轉與波紋呼吸燈
    for (const [id, node] of this.lakeNodeMap.entries()) {
      const isSelected = id === this.selectedLakeId || id === this.hoveredLakeId;
      node.surfaceMesh.rotation.y += dt * (isSelected ? 2.6 : 0.9);
      const s = isSelected ? 1.38 + Math.sin(elapsed * 5) * 0.12 : 1.0 + Math.sin(elapsed * 2 + node.surfacePos.x) * 0.06;
      node.surfaceMesh.scale.setScalar(s);

      const ringScale = 1 + ((elapsed * 0.8 + Math.abs(node.surfacePos.z) * 0.1) % 1) * 0.65;
      node.ringMesh.scale.setScalar(ringScale);
    }

    // 4. 手動鍵盤/虛擬搖桿駕駛潛艇物理
    if (!this.subState.autopilotActive) {
      const turnSpeed = 1.95;
      const maxSpeed = this.keys.boost ? 24.0 : 14.0;
      const vertSpeed = 10.5;

      if (this.keys.left) this.subState.yaw += turnSpeed * dt;
      if (this.keys.right) this.subState.yaw -= turnSpeed * dt;

      let targetForwardSpeed = 0;
      if (this.keys.forward) targetForwardSpeed = maxSpeed;
      else if (this.keys.backward) targetForwardSpeed = -maxSpeed * 0.6;

      this.subState.speed = THREE.MathUtils.lerp(this.subState.speed, targetForwardSpeed, dt * 5);

      const forwardDir = new THREE.Vector3(
        -Math.sin(this.subState.yaw),
        0,
        -Math.cos(this.subState.yaw)
      );

      this.subState.position.addScaledVector(forwardDir, this.subState.speed * dt);

      if (this.keys.up) {
        this.subState.position.y = Math.min(4.2, this.subState.position.y + vertSpeed * dt);
        this.subState.pitch = THREE.MathUtils.lerp(this.subState.pitch, 0.3, dt * 6);
      } else if (this.keys.down) {
        this.subState.position.y = Math.max(-42.0, this.subState.position.y - vertSpeed * dt);
        this.subState.pitch = THREE.MathUtils.lerp(this.subState.pitch, -0.3, dt * 6);
      } else {
        this.subState.pitch = THREE.MathUtils.lerp(this.subState.pitch, 0, dt * 5);
      }

      // 邊界保護：限制在台灣與離島海域範圍內
      this.subState.position.x = THREE.MathUtils.clamp(this.subState.position.x, -68, 42);
      this.subState.position.z = THREE.MathUtils.clamp(this.subState.position.z, -48, 48);
      this.subState.isSurfaced = this.subState.position.y >= -0.5;
    }

    // 同步潛艇 3D 模型位置與姿態
    if (this.submarineGroup) {
      this.submarineGroup.position.copy(this.subState.position);
      this.submarineGroup.rotation.set(this.subState.pitch, this.subState.yaw, 0, 'YXZ');
      // 螺旋槳依速度旋轉
      this.propellerGroup.rotation.z += dt * (4 + Math.abs(this.subState.speed) * 1.4);
      const navScale = 1 + Math.sin(elapsed * 4) * 0.08;
      this.subNavRing.scale.setScalar(navScale);
    }

    // 5. 若開啟「潛艇追尾視角 (Sub Chase Cam)」
    if (this.cameraFollowSub) {
      const offset = new THREE.Vector3(0, 6.5, 16.5);
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.subState.yaw);
      const desiredCamPos = this.subState.position.clone().add(offset);
      this.camera.position.lerp(desiredCamPos, dt * 4.2);
      this.controls.target.lerp(this.subState.position, dt * 6.0);
    }

    // 6. 聲納波擴散動畫
    for (let i = this.sonarWaves.length - 1; i >= 0; i--) {
      const w = this.sonarWaves[i];
      w.age += dt;
      const ratio = w.age / w.maxAge;
      if (ratio >= 1) {
        this.fxGroup.remove(w.mesh);
        w.mesh.geometry.dispose();
        w.mesh.material.dispose();
        this.sonarWaves.splice(i, 1);
      } else {
        const scale = 1 + ratio * 16;
        w.mesh.scale.setScalar(scale);
        w.mesh.material.opacity = (1 - ratio) * 0.85;
      }
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
