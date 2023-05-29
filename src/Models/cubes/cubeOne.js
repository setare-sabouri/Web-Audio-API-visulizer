import React, { useEffect } from 'react';
import * as THREE from 'three';


function CubeOne() {

    const globalGeometry = new THREE.BoxGeometry(2, 2, 2);
    const globalMaterial = new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.8,
        metalness: 0.9,
        roughness: 0,
        transmission: 0.1,
        ior: 1,
    });

    return (
        <mesh

            position={[0, 0, 0]}
            geometry={globalGeometry}
            material={globalMaterial}
        />
    );
}

export default CubeOne;
