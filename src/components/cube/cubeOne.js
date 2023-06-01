import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './cube.css'
const CubeComponent = ({ analyser }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        canvasRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhysicalMaterial({
            color: '#ffffff',
            transparent: true,
            opacity: 0.8,
            metalness: 0.9,
            roughness: 0,
            transmission: 0.1,
            ior: 1,
        });

        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function animate() {
            requestAnimationFrame(animate);

            analyser.getByteFrequencyData(dataArray);

            const average = getAverageVolume(dataArray);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.scale.set(1 + average / 100, 1 + average / 100, 1 + average / 100);

            renderer.render(scene, camera);
        }

        animate();

        return () => {
            canvasRef.current.removeChild(renderer.domElement);
        };
    }, [analyser]);

    // Function to calculate the average volume from the frequency data
    function getAverageVolume(array) {
        let values = 0;
        const length = array.length;

        for (let i = 0; i < length; i++) {
            values += array[i];
        }

        return values / length;
    }

    return <div ref={canvasRef} className="cube-container" />;
};

export default CubeComponent;