/**
 * 3D Floating Virtual Space for ALL 7 Semester-5 Experiments
 * Creates floating 3D apparatus pedestals in WebGL virtual space.
 * Source: C:\Users\saisi\OneDrive\Documents\machineslabmaterials-sem-5
 */
import * as THREE from 'three';
export const EXPERIMENT_3D_CONFIGS = [
    {
        id: 'exp2',
        name: 'EXP 2: Induction Motor Circle Diagram',
        category: 'induction',
        facility: 'motor',
        gridCoordinates: { x: -14, y: 0, z: -4 },
        accentColor: 0xeab308, // Gold
        colorHex: '#eab308',
        badgeText: 'Circle Diagram // 2.2 kW',
        components: [
            { name: 'Induction Motor', type: 'machine', positionOffset: [0, 1.0, 0] },
            { name: 'Mechanical Brake Drum', type: 'machine', positionOffset: [1.8, 0.9, 0] },
            { name: 'Auto-Transformer Variac', type: 'variac', positionOffset: [-1.8, 0.6, 0] },
            { name: 'Twin Wattmeter Meter Bank', type: 'meter', positionOffset: [0, 0.5, 1.4] }
        ]
    },
    {
        id: 'exp3',
        name: 'EXP 3: Motor Speed Control Bench',
        category: 'induction',
        facility: 'motor',
        gridCoordinates: { x: -9, y: 0, z: 6 },
        accentColor: 0x38bdf8, // Sky Blue
        colorHex: '#38bdf8',
        badgeText: 'Pole / Voltage / Rotor R',
        components: [
            { name: 'Slip-Ring Induction Motor', type: 'machine', positionOffset: [0, 1.0, 0] },
            { name: 'Pole Changing Switchbox', type: 'switch', positionOffset: [-1.6, 0.8, 0] },
            { name: '3φ Rotor Rheostat Bank', type: 'rheostat', positionOffset: [1.6, 0.7, 0] },
            { name: 'Stator Variac Unit', type: 'variac', positionOffset: [0, 0.6, 1.4] }
        ]
    },
    {
        id: 'exp5',
        name: 'EXP 5: Alternator Load Test Bench',
        category: 'synchronous',
        facility: 'alternator',
        gridCoordinates: { x: 0, y: 0, z: -8 },
        accentColor: 0xf59e0b, // Amber
        colorHex: '#f59e0b',
        badgeText: 'Direct Loading // 3.5 kVA',
        components: [
            { name: 'Salient Alternator', type: 'machine', positionOffset: [0.9, 1.0, 0] },
            { name: 'DC Prime Mover', type: 'machine', positionOffset: [-0.9, 1.0, 0] },
            { name: '3-Phase Lamp Load Bank', type: 'load_bank', positionOffset: [0, 0.8, 1.8] },
            { name: 'Field Exciter Rheostat', type: 'rheostat', positionOffset: [2.0, 0.6, 0] }
        ]
    },
    {
        id: 'exp6_a',
        name: 'EXP 6A: Alternator EMF & MMF Bench',
        category: 'synchronous',
        facility: 'alternator',
        gridCoordinates: { x: 0, y: 0, z: 6 },
        accentColor: 0x10b981, // Emerald
        colorHex: '#10b981',
        badgeText: 'OCC & SCC // Zs Analysis',
        components: [
            { name: 'Alternator & DC Motor Set', type: 'machine', positionOffset: [0, 1.0, 0] },
            { name: 'Field Ammeter & Rheostat', type: 'meter', positionOffset: [-1.8, 0.7, 0] },
            { name: 'Armature Shorting Switch', type: 'switch', positionOffset: [1.8, 0.6, 0] }
        ]
    },
    {
        id: 'exp6_b',
        name: 'EXP 6B: Induction Generator Bench',
        category: 'induction',
        facility: 'generator',
        gridCoordinates: { x: 9, y: 0, z: -6 },
        accentColor: 0x06b6d4, // Cyan
        colorHex: '#06b6d4',
        badgeText: 'Super-Synchronous Gen',
        components: [
            { name: 'Induction Machine', type: 'machine', positionOffset: [0.9, 1.0, 0] },
            { name: 'DC Prime Mover Motor', type: 'machine', positionOffset: [-0.9, 1.0, 0] },
            { name: '3φ Delta Capacitor Bank', type: 'capacitor_bank', positionOffset: [0, 0.7, 1.6] },
            { name: 'Active Load Bank', type: 'load_bank', positionOffset: [2.0, 0.7, 0] }
        ]
    },
    {
        id: 'exp7',
        name: 'EXP 7: Alternator ZPF / Potier Bench',
        category: 'synchronous',
        facility: 'alternator',
        gridCoordinates: { x: 14, y: 0, z: 4 },
        accentColor: 0xa855f7, // Purple
        colorHex: '#a855f7',
        badgeText: 'Potier Triangle & Xl',
        components: [
            { name: 'Alternator Coupled Set', type: 'machine', positionOffset: [0, 1.0, 0] },
            { name: 'Pure Inductive Choke Bank', type: 'load_bank', positionOffset: [0, 0.8, 1.6] },
            { name: 'DC Field Exciter Panel', type: 'rheostat', positionOffset: [-1.8, 0.7, 0] }
        ]
    },
    {
        id: 'exp8',
        name: 'EXP 8: Infinite Bus Synchronizer',
        category: 'synchronous',
        facility: 'alternator',
        gridCoordinates: { x: 0, y: 0, z: 14 },
        accentColor: 0xf43f5e, // Rose
        colorHex: '#f43f5e',
        badgeText: '3-Lamp Synch & V-Curves',
        components: [
            { name: 'Alternator Coupled Set', type: 'machine', positionOffset: [0, 1.0, 0] },
            { name: '3-Dark Lamp Array Panel', type: 'lamp_array', positionOffset: [0, 1.2, 1.6] },
            { name: 'Infinite Bus Switchgear', type: 'switch', positionOffset: [1.8, 0.8, 0] },
            { name: 'Field Controller & Voltmeter', type: 'meter', positionOffset: [-1.8, 0.7, 0] }
        ]
    }
];
export class VirtualSpaceManager {
    scene;
    camera;
    renderer;
    controls; // OrbitControls
    bundles = [];
    raycaster;
    mouse;
    animationFrameId = 0;
    clock;
    container;
    onSelectCallback;
    onHoverCallback;
    constructor(container, options) {
        this.container = container;
        this.onSelectCallback = options.onSelect;
        this.onHoverCallback = options.onHover;
        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || 600;
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x060c18, 0.018);
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(0, 22, 28);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        container.innerHTML = '';
        container.appendChild(this.renderer.domElement);
        // OrbitControls
        const OrbitControls = window.THREE?.OrbitControls || THREE.OrbitControls;
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.maxPolarAngle = Math.PI / 2 - 0.04;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 60;
        this.controls.target.set(0, 1, 0);
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2(-999, -999);
        this.clock = new THREE.Clock();
        this.setupLighting();
        this.setupFloorGrid();
        this.buildExperimentPlatforms();
        this.bindEvents();
        this.startAnimation();
    }
    setupLighting() {
        this.scene.add(new THREE.AmbientLight(0xffffff, 1.4));
        const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
        keyLight.position.set(20, 35, 20);
        this.scene.add(keyLight);
        const blueBackLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
        blueBackLight.position.set(-20, 20, -20);
        this.scene.add(blueBackLight);
        const goldFillLight = new THREE.PointLight(0xf59e0b, 1.0, 40);
        goldFillLight.position.set(0, 10, 0);
        this.scene.add(goldFillLight);
    }
    setupFloorGrid() {
        // Sci-fi laboratory grid floor
        const grid = new THREE.GridHelper(100, 100, 0x4f46e5, 0x0f172a);
        grid.position.y = -0.01;
        this.scene.add(grid);
        // Glowing central floor ring
        const centerGeom = new THREE.RingGeometry(24, 24.4, 64);
        const centerMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
        const centerRing = new THREE.Mesh(centerGeom, centerMat);
        centerRing.rotation.x = Math.PI / 2;
        centerRing.position.y = 0.02;
        this.scene.add(centerRing);
    }
    buildExperimentPlatforms() {
        EXPERIMENT_3D_CONFIGS.forEach((config) => {
            const group = new THREE.Group();
            group.position.set(config.gridCoordinates.x, config.gridCoordinates.y, config.gridCoordinates.z);
            // 1. Floating Holographic Pedestal Base
            const baseGeom = new THREE.CylinderGeometry(3.0, 3.2, 0.4, 32);
            const baseMat = new THREE.MeshStandardMaterial({
                color: 0x0f172a,
                metalness: 0.85,
                roughness: 0.25,
                emissive: 0x09101d
            });
            const pedestal = new THREE.Mesh(baseGeom, baseMat);
            pedestal.position.y = 0.2;
            group.add(pedestal);
            // Glowing Halo Ring around pedestal
            const haloGeom = new THREE.RingGeometry(3.1, 3.35, 48);
            const haloMat = new THREE.MeshBasicMaterial({
                color: config.accentColor,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.85
            });
            const halo = new THREE.Mesh(haloGeom, haloMat);
            halo.rotation.x = Math.PI / 2;
            halo.position.y = 0.41;
            group.add(halo);
            // Sub-floor glow light
            const podLight = new THREE.PointLight(config.accentColor, 1.5, 8);
            podLight.position.y = 1.0;
            group.add(podLight);
            // 2. Machine Stator & Rotor
            const statorGeom = new THREE.CylinderGeometry(0.85, 0.85, 1.8, 24);
            const statorMat = new THREE.MeshStandardMaterial({
                color: config.category === 'induction' ? 0x1e3a8a : 0x78350f,
                metalness: 0.8,
                roughness: 0.3
            });
            const stator = new THREE.Mesh(statorGeom, statorMat);
            stator.rotation.x = Math.PI / 2;
            stator.position.y = 1.1;
            group.add(stator);
            // Rotor & Shaft
            const rotorGeom = new THREE.CylinderGeometry(0.55, 0.55, 1.9, 16);
            const rotorMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
            const rotor = new THREE.Mesh(rotorGeom, rotorMat);
            rotor.rotation.x = Math.PI / 2;
            rotor.position.y = 1.1;
            group.add(rotor);
            const shaftGeom = new THREE.CylinderGeometry(0.12, 0.12, 2.5, 16);
            const shaftMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.95 });
            const shaft = new THREE.Mesh(shaftGeom, shaftMat);
            shaft.rotation.x = Math.PI / 2;
            shaft.position.y = 1.1;
            group.add(shaft);
            // 3. Rotating Magnetic Flux Rings
            const fluxGroup = new THREE.Group();
            for (let i = 0; i < 3; i++) {
                const ringGeom = new THREE.TorusGeometry(0.7, 0.02, 8, 32);
                const ringMat = new THREE.MeshBasicMaterial({
                    color: config.accentColor,
                    transparent: true,
                    opacity: 0.65,
                    blending: THREE.AdditiveBlending
                });
                const ring = new THREE.Mesh(ringGeom, ringMat);
                ring.position.z = -0.4 + i * 0.4;
                fluxGroup.add(ring);
            }
            fluxGroup.rotation.x = Math.PI / 2;
            fluxGroup.position.y = 1.1;
            group.add(fluxGroup);
            // 4. Secondary Auxiliary Apparatus Models
            config.components.forEach((comp) => {
                if (comp.type === 'variac') {
                    const vGeom = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16);
                    const vMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.7 });
                    const variacMesh = new THREE.Mesh(vGeom, vMat);
                    variacMesh.position.set(...comp.positionOffset);
                    group.add(variacMesh);
                    // Red dial knob
                    const knobGeom = new THREE.CylinderGeometry(0.15, 0.15, 0.15, 12);
                    const knobMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
                    const knob = new THREE.Mesh(knobGeom, knobMat);
                    knob.position.set(comp.positionOffset[0], comp.positionOffset[1] + 0.35, comp.positionOffset[2]);
                    group.add(knob);
                }
                else if (comp.type === 'load_bank' || comp.type === 'capacitor_bank') {
                    const bankGeom = new THREE.BoxGeometry(0.9, 0.8, 0.6);
                    const bankMat = new THREE.MeshStandardMaterial({
                        color: comp.type === 'capacitor_bank' ? 0x0284c7 : 0x475569,
                        metalness: 0.6
                    });
                    const bankMesh = new THREE.Mesh(bankGeom, bankMat);
                    bankMesh.position.set(...comp.positionOffset);
                    group.add(bankMesh);
                }
                else if (comp.type === 'lamp_array') {
                    // Three synchronizing lamps
                    for (let l = -1; l <= 1; l++) {
                        const bulbGeom = new THREE.SphereGeometry(0.14, 16, 16);
                        const bulbMat = new THREE.MeshStandardMaterial({
                            color: 0xfde047,
                            emissive: 0xf59e0b,
                            emissiveIntensity: 0.8
                        });
                        const bulb = new THREE.Mesh(bulbGeom, bulbMat);
                        bulb.position.set(comp.positionOffset[0] + l * 0.4, comp.positionOffset[1], comp.positionOffset[2]);
                        group.add(bulb);
                    }
                }
            });
            // 5. Floating Label Canvas Billboard
            const labelCanvas = document.createElement('canvas');
            labelCanvas.width = 512;
            labelCanvas.height = 140;
            const ctx = labelCanvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'rgba(6, 12, 24, 0.88)';
                ctx.strokeStyle = config.colorHex;
                ctx.lineWidth = 4;
                const x = 8, y = 8, w = 496, h = 124, r = 16;
                ctx.beginPath();
                ctx.moveTo(x + r, y);
                ctx.arcTo(x + w, y, x + w, y + h, r);
                ctx.arcTo(x + w, y + h, x, y + h, r);
                ctx.arcTo(x, y + h, x, y, r);
                ctx.arcTo(x, y, x + w, y, r);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 24px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(config.name, 256, 48);
                ctx.fillStyle = config.colorHex;
                ctx.font = 'italic 16px sans-serif';
                ctx.fillText(config.badgeText, 256, 85);
            }
            const labelTex = new THREE.CanvasTexture(labelCanvas);
            const labelSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: labelTex, transparent: true }));
            labelSprite.scale.set(4.8, 1.3, 1);
            labelSprite.position.set(0, 3.2, 0);
            group.add(labelSprite);
            // 6. Hitbox for Raycaster Clicks
            const hitboxGeom = new THREE.CylinderGeometry(3.2, 3.2, 3.8, 16);
            const hitboxMat = new THREE.MeshBasicMaterial({ visible: false });
            const hitbox = new THREE.Mesh(hitboxGeom, hitboxMat);
            hitbox.position.y = 1.9;
            group.add(hitbox);
            this.scene.add(group);
            this.bundles.push({
                config,
                group,
                hitbox,
                halo,
                rotorMeshes: [rotor, shaft],
                fluxMeshes: [fluxGroup],
                labelSprite
            });
        });
    }
    bindEvents() {
        const onPointerMove = (e) => {
            const rect = this.renderer.domElement.getBoundingClientRect();
            this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };
        const onClick = () => {
            this.raycaster.setFromCamera(this.mouse, this.camera);
            const hitboxes = this.bundles.map((b) => b.hitbox);
            const intersects = this.raycaster.intersectObjects(hitboxes);
            if (intersects.length > 0) {
                const hit = intersects[0].object;
                const bundle = this.bundles.find((b) => b.hitbox === hit);
                if (bundle) {
                    this.focusOnExperiment(bundle.config.id);
                    if (this.onSelectCallback) {
                        this.onSelectCallback(bundle.config.id);
                    }
                }
            }
        };
        const onResize = () => {
            const w = this.container.clientWidth;
            const h = this.container.clientHeight || 600;
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(w, h);
        };
        this.renderer.domElement.addEventListener('mousemove', onPointerMove);
        this.renderer.domElement.addEventListener('click', onClick);
        window.addEventListener('resize', onResize);
    }
    focusOnExperiment(id) {
        const bundle = this.bundles.find((b) => b.config.id === id);
        if (!bundle)
            return;
        const targetPos = new THREE.Vector3(bundle.config.gridCoordinates.x, bundle.config.gridCoordinates.y + 3.0, bundle.config.gridCoordinates.z + 6.0);
        const targetLookAt = new THREE.Vector3(bundle.config.gridCoordinates.x, bundle.config.gridCoordinates.y + 1.2, bundle.config.gridCoordinates.z);
        const gsap = window.gsap;
        if (gsap) {
            gsap.to(this.camera.position, {
                x: targetPos.x,
                y: targetPos.y,
                z: targetPos.z,
                duration: 1.2,
                ease: 'power3.out',
                onUpdate: () => this.controls.update()
            });
            gsap.to(this.controls.target, {
                x: targetLookAt.x,
                y: targetLookAt.y,
                z: targetLookAt.z,
                duration: 1.2,
                ease: 'power3.out'
            });
        }
        else {
            this.camera.position.copy(targetPos);
            this.controls.target.copy(targetLookAt);
            this.controls.update();
        }
    }
    resetOverviewCamera() {
        const gsap = window.gsap;
        if (gsap) {
            gsap.to(this.camera.position, {
                x: 0,
                y: 22,
                z: 28,
                duration: 1.2,
                ease: 'power3.out',
                onUpdate: () => this.controls.update()
            });
            gsap.to(this.controls.target, {
                x: 0,
                y: 1,
                z: 0,
                duration: 1.2,
                ease: 'power3.out'
            });
        }
    }
    startAnimation() {
        const animate = () => {
            this.animationFrameId = requestAnimationFrame(animate);
            const time = this.clock.getElapsedTime();
            // Animate rotors, halos, and flux rings
            this.bundles.forEach((bundle) => {
                // Rotor spin
                bundle.rotorMeshes.forEach((mesh) => {
                    mesh.rotation.y = time * 4.0;
                });
                // Flux rotation
                bundle.fluxMeshes.forEach((group) => {
                    group.rotation.z = time * 2.5;
                });
                // Pulsating halo base
                bundle.halo.scale.setScalar(1 + 0.05 * Math.sin(time * 3.5 + bundle.config.gridCoordinates.x));
            });
            // Hover Detection
            this.raycaster.setFromCamera(this.mouse, this.camera);
            const hitboxes = this.bundles.map((b) => b.hitbox);
            const intersects = this.raycaster.intersectObjects(hitboxes);
            if (intersects.length > 0) {
                const hit = intersects[0].object;
                const hovered = this.bundles.find((b) => b.hitbox === hit) || null;
                this.renderer.domElement.style.cursor = 'pointer';
                if (this.onHoverCallback)
                    this.onHoverCallback(hovered);
            }
            else {
                this.renderer.domElement.style.cursor = 'default';
                if (this.onHoverCallback)
                    this.onHoverCallback(null);
            }
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
    dispose() {
        cancelAnimationFrame(this.animationFrameId);
        this.renderer.dispose();
        this.scene.traverse((obj) => {
            if (obj.geometry)
                obj.geometry.dispose();
            if (obj.material) {
                if (Array.isArray(obj.material))
                    obj.material.forEach((m) => m.dispose());
                else
                    obj.material.dispose();
            }
        });
        if (this.container && this.renderer.domElement) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
}
//# sourceMappingURL=floatingModels.js.map