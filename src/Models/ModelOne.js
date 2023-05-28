import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import CubeOne from './cubes/cubeOne';

function Modelone() {

    return (
        <div id='canvas-container' className='vh-100'>
            <Canvas shadows camera={{ position: [2, 3, 0] }} >
                <spotLight intensity={0.4} angle={0.2} penumbra={1} position={[0, 0, 2]} castShadow />
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={1} />
                <Environment preset="city" />
                <CubeOne />
            </Canvas>

        </div >
    );
}
export default Modelone; 