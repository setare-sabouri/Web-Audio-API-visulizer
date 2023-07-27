import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initializeAnalyser, analyser } from './scripts/analyser'
import { texturesList } from './scripts/textures'
import { lights } from './scripts/lights'
import { setText } from './scripts/objects'

export const { VITE_CLIENTSECRET, VITE_CLIENTID } = import.meta.env;

initializeAnalyser();
THREE.ColorManagement.enabled = false

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
export const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

//lights
scene.add(lights.ambLight, lights.dirctLight, lights.HemiLight)


//helpers
const HemiHelpLight = new THREE.HemisphereLightHelper(lights.HemiLight, 0.2)
const directHelpLight = new THREE.DirectionalLightHelper(lights.dirctLight)
scene.add(HemiHelpLight, directHelpLight)

let textMesh
setText().then((readyMesh) => {
    scene.add(readyMesh)
    textMesh = readyMesh
}).catch((error) => {
    console.error('Error loading textMesh:', error);
});


/**
 * Objects
 */
const objectsMatCapmaterial = new THREE.MeshStandardMaterial({
    map: texturesList.matCapTextureObjs,
    color: 0xffffff
})

const donutGeo = new THREE.TorusGeometry(0.5, 0.3, 20, 45)

export const count = 50
export const donut = Array(count)
for (let i = 0; i < count; i++) {
    donut[i] = new THREE.Mesh(donutGeo, objectsMatCapmaterial)
    donut[i].position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, ((Math.random() - 0.5) * 15))
    donut[i].rotation.set((Math.random() * Math.PI), (Math.random() * Math.PI), (Math.random() * Math.PI))
    donut[i].name = 'donut'
    const scale = Math.random()
    donut[i].scale.set(scale, scale, scale)
    scene.add(donut[i])
}




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

export const updateDonutScale = () => {
    if (analyser) {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        const donuts = scene.children.filter((child) => child.type === 'Mesh' && child.name === 'donut');
        const scaleMultiplier = 1;
        for (let i = 0; i < donuts.length; i++) {
            const donut = donuts[i];
            const frequencyValue = dataArray[i % dataArray.length] / 255; // Normalize the frequency value
            const scale = (frequencyValue ? (frequencyValue * scaleMultiplier) : 0.5);
            donut.scale.set(scale, scale, scale);
        }
    }
};


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    updateDonutScale();
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


