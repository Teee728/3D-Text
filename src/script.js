import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base
 */
// Debug
//const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Fonts
 */
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'T\'\Challa',
            {
                font,
                size: 0.5,
                depth: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4

            }
        )

        const textMaterial = new THREE.MeshMatcapMaterial({
            matcap: matcapTexture
        })
    // textGeometry.computeBoundingBox()
    // textGeometry.translate(
    //     -(textGeometry.boundingBox.max.x - 0.02)  * 0.5,
    //     -(textGeometry.boundingBox.max.y - 0.02)  * 0.5,
    //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
    // )
    textGeometry.center()
        const text = new THREE.Mesh(textGeometry, textMaterial)
        scene.add(text)
       // text.position.x = -1
        //gui.add(textGeometry, 'curveSegments').min(0).max(10).step(0.001)
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        const donutMaterial = new THREE.MeshMatcapMaterial({matcap: 
            textureLoader.load('/textures/matcaps/3.png')})

        for (let i = 0; i < 300; i++) {
            const donutMesh = new THREE.Mesh(donutGeometry, donutMaterial)

            donutMesh.position.x = (Math.random() - 0.5) * 10
            donutMesh.position.y = (Math.random() - 0.5) * 10
            donutMesh.position.z = (Math.random() - 0.5) * 10

            donutMesh.rotation.x = Math.PI * Math.random()
            donutMesh.rotation.y = Math.PI * Math.random()

            const scale = Math.random()
            donutMesh.scale.set(scale, scale, scale)

            scene.add(donutMesh)
        }

    }
)





/**
 * Object
 */


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
// Base camera
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
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()