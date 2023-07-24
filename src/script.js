import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { initializeAnalyser, analyser } from './scripts/analyser'
import { gui, parameters } from './scripts/debug'
import { texturesList } from './scripts/textures'
initializeAnalyser();
THREE.ColorManagement.enabled = false

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
export const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

/**
 * Textures
 */


/**
 * lights
 */
export const lights = {
    ambLight: new THREE.AmbientLight(0xffffff, 0.5),
    dirctLight: new THREE.DirectionalLight(0x0000ff, 0.3),
    HemiLight: new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
}

lights.dirctLight.position.set(0, 2, 0)
scene.add(lights.ambLight, lights.dirctLight, lights.HemiLight)


//helpers
const HemiHelpLight = new THREE.HemisphereLightHelper(lights.HemiLight, 0.2)
const directHelpLight = new THREE.DirectionalLightHelper(lights.dirctLight)
scene.add(HemiHelpLight, directHelpLight)


gui.add(lights.ambLight, 'intensity').min(0).max(3).name("ambient light Intensity")
gui.add(lights.dirctLight, 'intensity', 0, 3).name("directional light intensity")
gui.add(lights.HemiLight.position, 'x', -2, 2).name('X light')
gui.add(lights.HemiLight.position, 'y', -2, 2).name('Y light')
gui.add(lights.HemiLight.position, 'z', -2, 3).name('Z light')
gui.addColor(parameters, 'lightDircColor').onChange(() => {
    lights.dirctLight.color.set(parameters.lightDircColor)
}).name('direct color')

/**
 * Font setup
 */

const textMatCapmaterial = new THREE.MeshStandardMaterial({
    map: texturesList.matCapTextureText,
    color: parameters.textColor
})
let textMesh;
const fontLoader = new FontLoader()
fontLoader.load('/fonts/optimer_bold.typeface.json', (font) => {
    const textGeometry = new TextGeometry('Audio',
        {
            font: font,
            size: parameters.textSize,
            height: 0.2,
            curveSegments: 5,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 4,

        }
    )
    textGeometry.center()
    const text = new THREE.Mesh(textGeometry, textMatCapmaterial)
    scene.add(text)
    textMesh = text
    LoadTextMesh()
}
)
const LoadTextMesh = () => {
    (textMesh ? console.log(textMesh) : LoadTextMesh)

}

gui.addColor(parameters, 'textColor').onChange(() => {
    textMesh.material.color.set(parameters.textColor)
}).name('Text Color')



/**
 * Objects
 */
const objectsMatCapmaterial = new THREE.MeshStandardMaterial({
    map: texturesList.matCapTextureObjs,
    color: parameters.objectsColor
})

const donutGeo = new THREE.TorusGeometry(0.5, 0.3, 20, 45)
const count = 50
const donut = Array(count)
for (let i = 0; i < count; i++) {
    donut[i] = new THREE.Mesh(donutGeo, objectsMatCapmaterial)
    donut[i].position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, ((Math.random() - 0.5) * 15))
    donut[i].rotation.set((Math.random() * Math.PI), (Math.random() * Math.PI), (Math.random() * Math.PI))
    donut[i].name = 'donut'
    const scale = Math.random()
    donut[i].scale.set(scale, scale, scale)
    scene.add(donut[i])
}

gui.addColor(parameters, 'objectsColor').onChange(() => {
    for (let i = 0; i < count; i++) {
        donut[i].material.color.set(parameters.objectsColor)
    }
}).name('Objects Color')



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


