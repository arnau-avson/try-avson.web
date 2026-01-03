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
        camera.position.z = 2;

        /* RENDERER */
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        /* PLANE */
        const geometry = new THREE.PlaneGeometry(4, 4);

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;

        // Ruido barato
        float noise(vec2 p) {
          return sin(p.x) * sin(p.y);
        }

        void main() {
          vec2 uv = vUv;

          // Distorsión suave en X e Y
          float t = uTime * 0.15;
          uv.x += sin(uv.y * 4.0 + t) * 0.04;
          uv.y += cos(uv.x * 3.0 + t) * 0.03;

          // Ruido muy sutil
          float n = noise(uv * 8.0 + t) * 0.02;

          vec3 colorTop = vec3(0.07, 0.10, 0.18);   // slate-800
          vec3 colorBottom = vec3(0.02, 0.04, 0.08); // slate-950

          float mixValue = clamp(uv.y + n, 0.0, 1.0);
          vec3 color = mix(colorBottom, colorTop, mixValue);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        /* RESIZE */
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        /* ANIMATION */
        const animate = () => {
            material.uniforms.uTime.value += 0.01;
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
