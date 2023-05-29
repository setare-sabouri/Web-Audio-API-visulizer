import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import CubeOne from './cubes/cubeOne';

function ModelOne() {
    const [audioFile, setAudioFile] = useState('./summer.mp3');
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;

        const handleAudioLoad = () => {
            console.log('Audio loaded');
            // You can perform actions when the audio is loaded, such as playing it
            audio.play();
        };

        audio.addEventListener('load', handleAudioLoad);

        return () => {
            // Clean up the event listener when the component is unmounted
            audio.removeEventListener('load', handleAudioLoad);
        };
    }, []);
    return (
        <div id='canvas-container' className='vh-100'>
            <audio src={audioFile} controls ref={audioRef}></audio>
            <button id="startButton">Play</button>
            <Canvas shadows camera={{ position: [2, 3, 0] }}>
                <spotLight intensity={0.4} angle={0.2} penumbra={1} position={[0, 0, 2]} castShadow />
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={1} />
                <Environment preset="night" />
                <CubeOne audioFile={audioFile} />
            </Canvas>
        </div>
    );
}

export default ModelOne;
