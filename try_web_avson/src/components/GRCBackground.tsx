import * as THREE from "three";
import { useEffect, useRef } from "react";

const GRCBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        /* SCENE */
        const scene = new THREE.Scene();

        /* CAMERA */
        const camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        camera.position.z = 3;

        /* RENDERER */
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        /* ICOSAHEDRON */
        const geometry = new THREE.IcosahedronGeometry(1, 3);
        const material = new THREE.MeshStandardMaterial({
            color: 0x0f172a,
            flatShading: true,
            roughness: 0.9,
            metalness: 0.1,
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        /* LIGHTS */
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const directional = new THREE.DirectionalLight(0xffffff, 0.6);
        directional.position.set(5, 5, 5);
        scene.add(directional);

        /* RESIZE */
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        /* ANIMATION */
        const clock = new THREE.Clock();

        const animate = () => {
            const time = clock.getElapsedTime();

            mesh.rotation.y += 0.002;
            mesh.rotation.x += 0.001;

            const position = geometry.attributes.position;
            for (let i = 0; i < position.count; i++) {
                const x = position.getX(i);
                const y = position.getY(i);
                const z = position.getZ(i);

                const noise =
                    Math.sin(time + x * 2.0 + y * 2.0 + z * 2.0) * 0.002;

                position.setXYZ(
                    i,
                    x + x * noise,
                    y + y * noise,
                    z + z * noise
                );
            }
            position.needsUpdate = true;

            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", onResize);
            container.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-10 pointer-events-none"
        />
    );
};

export default GRCBackground;

