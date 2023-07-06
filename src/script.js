import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { initializeAnalyser, analyser } from './scripts/analyser'

initializeAnalyser();
THREE.ColorManagement.enabled = false
/**
 * Base
 */


// Debug
const gui = new dat.GUI()

const parameters = {
    textColor: 0xffffff,
    objectsColor: 0xffffff,
    textSize: 0.5
}


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)



/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matCapTextureText = textureLoader.load('/textures/matcaps/7.png')
const matCapTextureObjs = textureLoader.load('/textures/matcaps/7.png')
const textMatCapmaterial = new THREE.MeshMatcapMaterial({
    matcap: matCapTextureText,
    color: parameters.textColor
})

const objectsMatCapmaterial = new THREE.MeshMatcapMaterial({
    matcap: matCapTextureObjs,
    color: parameters.objectsColor
})

/**
 * Font setup
 */
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




// size gui not working
// gui.add(parameters, 'textSize').min(0.5).max(2).onChange((value) => {
//     textMesh.geometry.parameters.size = value
//     console.log(textMesh.geometry.parameters.size);
//     textMesh.needsUpdate = true
//     textMesh.updateMatrix();
// })

/**
 * Objects
 */
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

const updateDonutScale = () => {
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

    //


    updateDonutScale();


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


