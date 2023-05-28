import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';


function Model() {
    const globalGeometry = new THREE.BoxGeometry(2, 2, 2)
    const globalMaterial = new THREE.MeshBasicMaterial({ color: 'red' })
    return (
        <div id='canvas-container'>
            <h1>model </h1>
            <Canvas shadows camera={{ position: [2, 3, 0] }}>
                <spotLight intensity={0.4} angle={0.2} penumbra={1} position={[0, 0, 2]} castShadow />
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={1} />
                <Environment preset="city" />
                <ContactShadows position={[0, -0.6, 0]} opacity={0.5} scale={8} blur={2} far={2} color={'#FFEF32'} />   {/*yellow*/}
                <ContactShadows position={[0, -0.6, 0]} opacity={0.7} scale={8} blur={3} far={0.9} color={'#120099'} />   {/* blue */}
                <directionalLight castShadow color={"red"} far={5} />
                <mesh geometry={globalGeometry} material={globalMaterial} />
            </Canvas>

        </div >
    );
}
export default Model;