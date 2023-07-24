import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader()
export const texturesList = {
    matCapTextureText: textureLoader.load('/textures/matcaps/7.png'),
    matCapTextureObjs: textureLoader.load('/textures/matcaps/7.png')
}
