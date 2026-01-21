// SHAM v5 Pro - 3D Subsurface Visualization
// WebGL voxel rendering for underground structures

class SubsurfaceViewer3D {
    constructor(containerId) {
        this.containerId = containerId;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.anomalyMeshes = [];
        this.config = {
            voxelSize: 10,
            depthScale: 2,
            colors: { void: 0xff4444, stone: 0xd4a574, anomaly: 0xffff00 }
        };
    }

    async init() {
        await this.loadThreeJS();
        this.setupScene();
        this.animate();
    }

    async loadThreeJS() {
        if (typeof THREE !== 'undefined') return;
        return new Promise(r => {
            const s = document.createElement('script');
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            s.onload = r;
            document.head.appendChild(s);
        });
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0f);

        const container = document.getElementById(this.containerId);
        const w = container?.clientWidth || 800;
        const h = container?.clientHeight || 600;

        this.camera = new THREE.PerspectiveCamera(60, w / h, 1, 5000);
        this.camera.position.set(300, 200, 300);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(w, h);
        container?.appendChild(this.renderer.domElement);

        // Lighting
        this.scene.add(new THREE.AmbientLight(0x404040, 0.5));
        const sun = new THREE.DirectionalLight(0xffffff, 1);
        sun.position.set(100, 200, 100);
        this.scene.add(sun);

        // Ground
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000),
            new THREE.MeshStandardMaterial({ color: 0xf5deb3 })
        );
        ground.rotation.x = -Math.PI / 2;
        this.scene.add(ground);
    }

    renderFusionData(fusionResults) {
        this.clearVoxels();
        const grid = fusionResults.grid;
        const geo = new THREE.BoxGeometry(8, 8, 8);

        grid.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell.probability > 0.5) {
                    for (let k = 0; k < 5; k++) {
                        const prob = cell.probability * (1 - k * 0.15);
                        if (prob > 0.4) {
                            const mat = new THREE.MeshStandardMaterial({
                                color: this.getColor(prob),
                                transparent: true,
                                opacity: 0.4 + prob * 0.4
                            });
                            const voxel = new THREE.Mesh(geo, mat);
                            voxel.position.set(
                                (i - 25) * 10,
                                -k * 20,
                                (j - 25) * 10
                            );
                            this.scene.add(voxel);
                            this.anomalyMeshes.push(voxel);
                        }
                    }
                }
            });
        });
    }

    getColor(prob) {
        if (prob > 0.9) return 0xff0000;
        if (prob > 0.7) return 0xff8800;
        if (prob > 0.5) return 0x00ff88;
        return 0x0088ff;
    }

    clearVoxels() {
        this.anomalyMeshes.forEach(m => this.scene.remove(m));
        this.anomalyMeshes = [];
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.camera.position.x = 300 * Math.cos(Date.now() * 0.0002);
        this.camera.position.z = 300 * Math.sin(Date.now() * 0.0002);
        this.camera.lookAt(0, -50, 0);
        this.renderer?.render(this.scene, this.camera);
    }
}

window.SubsurfaceViewer3D = SubsurfaceViewer3D;
