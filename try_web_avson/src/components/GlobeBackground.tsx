import * as THREE from "three";
import { useEffect, useRef } from "react";

interface GlobeBackgroundProps {
    mousePosition: {
        x: number;
        y: number;
    };
}

const GlobeBackground: React.FC<GlobeBackgroundProps> = ({ mousePosition }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const mouseRef = useRef({ x: 50, y: 50 });

    useEffect(() => {
        mouseRef.current = mousePosition;
    }, [mousePosition]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        /* ---------- SCENE ---------- */
        const scene = new THREE.Scene();

        /* ---------- CAMERA ---------- */
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            3000
        );
        camera.position.set(0, 0, 3);

        /* ---------- RENDERER ---------- */
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        /* ---------- GLOBE ---------- */
        const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0x111827,
            roughness: 1,
            metalness: 0,
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        scene.add(sphere);

        /* ---------- BORDERS ---------- */
        const borderGroup = new THREE.Group();
        scene.add(borderGroup);

        fetch("/border-world.json")
            .then((r) => r.json())
            .then((data) => {
                const borderMaterial = new THREE.LineBasicMaterial({
                    color: 0x0074ff,
                });

                const convertCoords = (coords: number[][]) =>
                    coords.map(([lon, lat]) => {
                        const phi = (90 - lat) * (Math.PI / 180);
                        const theta = (lon + 180) * (Math.PI / 180);
                        return new THREE.Vector3(
                            Math.sin(phi) * Math.cos(theta),
                            Math.cos(phi),
                            Math.sin(phi) * Math.sin(theta)
                        );
                    });

                data.geometries.forEach((g: any) => {
                    const drawRing = (ring: number[][]) => {
                        const geo = new THREE.BufferGeometry().setFromPoints(
                            convertCoords(ring)
                        );
                        borderGroup.add(new THREE.Line(geo, borderMaterial));
                    };

                    if (g.type === "LineString") drawRing(g.coordinates);
                    if (g.type === "Polygon") g.coordinates.forEach(drawRing);
                    if (g.type === "MultiPolygon")
                        g.coordinates.forEach((p: any) => p.forEach(drawRing));
                });
            });

        /* ---------- LIGHTS ---------- */
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        /* ---------- STARS ---------- */
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 1,
        });
        const starsVertices: number[] = [];

        for (let i = 0; i < 10000; i++) {
            starsVertices.push(
                (Math.random() - 0.5) * 3000,
                (Math.random() - 0.5) * 3000,
                (Math.random() - 0.5) * 3000
            );
        }

        starsGeometry.setAttribute(
            "position",
            new THREE.Float32BufferAttribute(starsVertices, 3)
        );

        const stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);

        /* ---------- RESIZE ---------- */
        const resize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", resize);

        /* ---------- ANIMATION LOOP ---------- */
        const animate = () => {
            const { x, y } = mouseRef.current;

            const nx = (x - 50) / 50;
            const ny = (y - 50) / 50;

            /* 🌍 ROTACIÓN AUTOMÁTICA DEL GLOBO */
            sphere.rotation.y += 0.002;
            borderGroup.rotation.y = sphere.rotation.y;

            /* 🌌 PARALLAX DEL BACKGROUND */
            camera.position.x += (nx * 0.3 - camera.position.x) * 0.05;
            camera.position.y += (-ny * 0.3 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            /* ✨ PARALLAX EXTRA EN ESTRELLAS */
            stars.position.x = nx * 20;
            stars.position.y = -ny * 20;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            container.removeChild(renderer.domElement);
            sphereGeometry.dispose();
            sphereMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-10 pointer-events-none bg-black"
        />
    );
};

export default GlobeBackground;
