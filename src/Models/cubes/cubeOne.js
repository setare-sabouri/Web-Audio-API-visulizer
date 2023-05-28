

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function CubeOne({ audioFile }) {

    const globalGeometry = new THREE.BoxGeometry(2, 2, 2)
    const globalMaterial = new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.8,
        metalness: 0.9,
        roughness: 0,
        transmission: 0.1,
        ior: 1,
    })

    const cubeRef = useRef();
    const audioElementRef = useRef();


    useEffect(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser(); // Create an analyser node
        analyser.fftSize = 512;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        console.log(audioElementRef);

        const audioElement = audioElementRef.current;
        audioElementRef.current = audioFile;
        // audioElement.src = audioFile;

    }, [audioFile]);

    const getAverage = (array) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum / array.length;
    };



    return (
        <>
            {/* <audio ref={audioElementRef} controls /> */}
            <mesh
                ref={cubeRef}
                position={[0, 0, 0]}
                geometry={globalGeometry}
                material={globalMaterial}
            />
        </>

    );
}
export default CubeOne; 