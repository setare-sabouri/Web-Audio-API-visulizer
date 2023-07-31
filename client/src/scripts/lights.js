import * as THREE from 'three'


export const lights = {
    ambLight: new THREE.AmbientLight(0xffffff, 0.5),
    dirctLight: new THREE.DirectionalLight(0x0000ff, 0.3),
    HemiLight: new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
}

lights.dirctLight.position.set(0, 2, 0)