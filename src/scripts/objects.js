import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { texturesList } from './textures'


const textMatCapmaterial = new THREE.MeshStandardMaterial({
    map: texturesList.matCapTextureText,
    color: 0xffffff
})

export let textMesh
let textGeometry

const fontLoader = new FontLoader()


export const setText = () => {
    return new Promise((resolve, reject) => {

        fontLoader.load('/fonts/optimer_bold.typeface.json', (font) => {
            const textGeometry = new TextGeometry('Audio', {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4,
            });

            textGeometry.center();
            const textMesh = new THREE.Mesh(textGeometry, textMatCapmaterial);

            resolve(textMesh);
        }, undefined, reject);
    });
};




