import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'


//analyser

let analyser = null;
const mediaStreamRef = { current: null };

const audioFileInput = document.getElementById('audio');

const initializeAnalyser = async () => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioElement = audioFileInput
        const source = audioContext.createMediaElementSource(audioElement);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        await audioElement.play();
        mediaStreamRef.current = audioElement;

    } catch (error) {
        console.log(error.message);
    }
};

audioFileInput.addEventListener('change', initializeAnalyser);
initializeAnalyser();

window.addEventListener('beforeunload', () => {
    if (analyser) {
        analyser.context.close();
    }
    if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
});



THREE.ColorManagement.enabled = false
/**
 * Base
 */


// Debug
const gui = new dat.GUI()

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

const matCapTextureText = textureLoader.load('/textures/matcaps/3.png')
const matCapTextureObjs = textureLoader.load('/textures/matcaps/7.png')

const MatCapmaterialText = new THREE.MeshMatcapMaterial({
    matcap: matCapTextureText
})

const MatCapmaterialObjs = new THREE.MeshMatcapMaterial({
    matcap: matCapTextureObjs
})

/**
 * Font setup
 */

const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/optimer_bold.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry('Audio',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4

            }
        )
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, MatCapmaterialText)
        scene.add(text)
    }
)

/**
 * Objects
 */
const donutGeo = new THREE.TorusGeometry(0.5, 0.3, 20, 45)
for (let i = 0; i < 50; i++) {
    const donut = new THREE.Mesh(donutGeo, MatCapmaterialObjs)
    donut.position.set((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, ((Math.random() - 0.5) * 15))
    donut.rotation.set((Math.random() * Math.PI), (Math.random() * Math.PI), (Math.random() * Math.PI))
    donut.name = 'donut'
    const scale = Math.random()
    donut.scale.set(scale, scale, scale)
    scene.add(donut)
}
/**
 * gui
 */


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




//


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
        console.log(analyser);
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


