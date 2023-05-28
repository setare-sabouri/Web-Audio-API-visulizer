import React from 'react';

import * as THREE from 'three';


function CubeTwo() {
    const globalGeometry = new THREE.BoxGeometry(2, 2, 2)
    const globalMaterial = new THREE.MeshPhysicalMaterial({
        color: '#ffaa22',
        transparent: true,
        opacity: 0.8,
        metalness: 0.9,
        roughness: 0,
        transmission: 0.1,
        ior: 1,
    })

    return (
        <mesh position={[0, 1, -2]} geometry={globalGeometry} material={globalMaterial} />
    );
}
export default CubeTwo; 