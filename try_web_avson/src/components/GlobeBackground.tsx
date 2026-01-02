import * as THREE from "three";
import { useEffect, useRef } from "react";

const GlobeBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        const baseGeometry = new THREE.SphereGeometry(1, 64, 64);
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0x111827,
            roughness: 1,
            metalness: 0,
            transparent: true,
            opacity: 0.25,
        });

        const baseSphere = new THREE.Mesh(baseGeometry, baseMaterial);
        scene.add(baseSphere);

        const pointsGeometry = new THREE.SphereGeometry(1.01, 64, 64);
        const pointsMaterial = new THREE.PointsMaterial({
            color: 0x94a3b8,
            size: 0.015,
            transparent: true,
            opacity: 0.7,
        });

        const pointsSphere = new THREE.Points(pointsGeometry, pointsMaterial);
        scene.add(pointsSphere);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        const animate = () => {
            baseSphere.rotation.y += 0.001;
            pointsSphere.rotation.y += 0.001;
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            container.removeChild(renderer.domElement);

            baseGeometry.dispose();
            baseMaterial.dispose();
            pointsGeometry.dispose();
            pointsMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="
      fixed inset-0 -z-10 pointer-events-none
      bg-black
      bg-[radial-gradient(circle_at_25%_25%,rgba(249,115,22,0.18),transparent_35%),radial-gradient(circle_at_75%_75%,rgba(59,130,246,0.18),transparent_35%)]
      opacity-95
    "
        />
    );


};

export default GlobeBackground;
