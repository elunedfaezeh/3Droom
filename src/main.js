import * as THREE from 'Three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader, GLTFLoader, TextGeometry } from 'three/examples/jsm/Addons.js';
import { sin } from 'three/tsl';
const Scene = new THREE.Scene()
const loader = new GLTFLoader()
const gridhelper = new THREE.GridHelper(80, 80)
// Scene.add(gridhelper)
Scene.background = new THREE.Color(0x00000)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(-22, 19, 22)
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
const controls = new OrbitControls(camera, renderer.domElement)

const pointLight = new THREE.PointLight(0xffffff, 1400, 1400)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
pointLight.position.set(-7, 25, 6)
Scene.add(pointLight)
Scene.add(pointLightHelper)

const rightLight = new THREE.DirectionalLight(0xffffff, 1)
const rightLightHelper = new THREE.DirectionalLightHelper(rightLight, 1)
rightLight.position.set(16, 25, 14)
Scene.add(rightLight)
Scene.add(rightLightHelper)



const geometry = new THREE.BoxGeometry(1, 1, 1);

const textureLoader = new THREE.TextureLoader()
const woodColorTexture = textureLoader.load('./textures/Wood037_1K-JPG_Color.jpg')
const woodRoughnessTexture = textureLoader.load('./textures/Wood037_1K-JPG_Roughness.jpg')
const woodNormalTexture = textureLoader.load('./textures/Wood037_1K-JPG_NormalGL.jpg')


const material = new THREE.MeshStandardMaterial({
    map: woodColorTexture,
    roughnessMap: woodRoughnessTexture,
    normalMap: woodNormalTexture
})


const cube = new THREE.Mesh(geometry, material);
cube.position.x = -1
// Scene.add(cube)



cube.scale.set(2, 3, 2)

const floorGeometry = new THREE.PlaneGeometry(50, 50)


const floorColorTexture = textureLoader.load('./textures/WoodFloor024_1K-JPG_Color.jpg')
const floorRoughnessTexture = textureLoader.load('./textures/WoodFloor024_1K-JPG_Roughness.jpg')
const floorNormalTexture = textureLoader.load('./textures/WoodFloor024_1K-JPG_NormalGL.jpg')

const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorColorTexture,
    roughnessMap: floorRoughnessTexture,
    normalMap: floorNormalTexture,

})


const floor = new THREE.Mesh(floorGeometry, floorMaterial)

floor.rotation.x = -Math.PI / 2
floor.position.y = -0.5
Scene.add(floor)

const fontLoader = new FontLoader()

fontLoader.load('./fonts/Yo te amo pero en secreto_Regular.json', function (font) {
    const textGeometry = new TextGeometry('ice cream', {
        font: font,
        size: 2,
        depth: 0.7,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.01,
        bevelOffset: 0,
        bevelSegments: 5,
        curveSegments: 12,
    })

    const textMatrial = new THREE.MeshStandardMaterial({
        color: 0xFFBE98,
        metalness: 0.7,
        roughness: 0.2
    })
    const textMesh = new THREE.Mesh(textGeometry, textMatrial)
    textGeometry.center()
    textMesh.position.set(0, 8, 3)
    // Scene.add(textMesh)




    const pillowColorTexture = textureLoader.load('./textures/sofa/Fabric/Fabric022_1K-JPG_Color.jpg')
    const pillowNormalTexture = textureLoader.load('./textures/sofa/Fabric/Fabric022_1K-JPG_NormalGL.jpg')
    const pillowRoughnessTexture = textureLoader.load('./textures/sofa/Fabric/Fabric022_1K-JPG_Roughness.jpg')
    const pillowDispexture = textureLoader.load('./textures/sofa/Fabric/Fabric022_1K-JPG_Displacement.jpg')

    const fabricColorTexture = textureLoader.load('./textures/WoodFloor048_1K-JPG_Color.jpg')
    const fabricRoughnessTexture = textureLoader.load('./textures/WoodFloor048_1K-JPG_Roughness.jpg')
    const fabricNormalTexture = textureLoader.load('./textures/WoodFloor0048_1K-JPG_NormalGL.jpg')
    const fabricDispexture = textureLoader.load('./textures/WoodFloor0048_1K-JPG_Displacement.jpg')

    loader.load('./models/Bed.glb', function (gltf) {
        const orginalModel = gltf.scene
        function createSofa(position, rotation) {
            const model = orginalModel.clone()
            model.scale.set(10, 10, 10)
            model.position.copy(position)
            model.rotation.y = rotation
            model.traverse((child) => {

                if (child.isMesh) {

                    console.log(child.name)
                    if (child.name === 'SM_Bed_IC01_base') {
                        child.material = new THREE.MeshStandardMaterial({
                            map: fabricColorTexture,
                            roughnessMap: fabricRoughnessTexture,
                            normalMap: fabricNormalTexture,
                            displacementMap: fabricDispexture,
                            displacementScale: 0.1
                        })

                    }
                    if (child.name === 'SM_Bed_IC01_pillow') {
                        child.material = new THREE.MeshStandardMaterial({
                            map: pillowColorTexture,
                            roughnessMap: pillowRoughnessTexture,
                            normalMap: pillowNormalTexture,
                            displacementMap: pillowDispexture,
                            displacementScale: 0.01
                        })
                    }
                }

            })
            return model
        }
        const sofa1 = createSofa(new THREE.Vector3(14, -0.5, -15), -Math.PI / 2)

        Scene.add(sofa1)

    })


    // document.addEventListener('keydown',(e) => {    
    //     console.log(e.key)
    // })//اسم کلید رو بر میگردونه

    const moveSpeed = 0.3 //سرعت حرکت دوربین
    const rotateSpeed = 0.05 //سرعت چرخش دوربین

    const initialCameraPosition = new THREE.Vector3(0, 12, 20)
    const initialTarget = new THREE.Vector3(0, 0, 0)

    document.addEventListener('keydown', (e) => { //هر بار کلیدی فشار داده می‌شه، این کد اجرا می‌شه.
        const forward = new THREE.Vector3()   // جلو/عقب
        const right = new THREE.Vector3()      //راست/چپ
        forward.y = 0
        forward.normalize() //یکسان سازی
        camera.getWorldDirection(forward)  //جهت فعلی دوربین
        right.crossVectors(forward, camera.up) //جهت نگاه دوربین رو بدست میاره

        switch (e.key) {
            case 'w':
                camera.position.addScaledVector(forward, moveSpeed)
                controls.target.addScaledVector(forward, moveSpeed)
                break

            case 's':
                camera.position.addScaledVector(forward, -moveSpeed)
                controls.target.addScaledVector(forward, -moveSpeed) //ا ضریب منفی، حرکت به عقب.
                break

            case 'a':
                camera.position.addScaledVector(right, -moveSpeed)
                controls.target.addScaledVector(right, -moveSpeed)
                break

            case 'd':
                camera.position.addScaledVector(right, moveSpeed)
                controls.target.addScaledVector(right, moveSpeed)
                break

            case 'r':
                camera.position.copy(initialCameraPosition)
                controls.target.copy(initialTarget)
                controls.update()
                //و چون مقدارش ثابت و مشخصه، باید مستقیم کپی بشه، نه "اضافه بشه" به موقعیت فعلی.
                break

            case 'q':
                const cos = Math.cos(rotateSpeed)
                const sin = Math.sin(rotateSpeed)

                const x = camera.position.x
                const z = camera.position.z

                camera.position.x = x * cos - z * sin
                camera.position.z = x * sin + z * cos

                const targetX = controls.target.x
                const targetZ = controls.target.z

                controls.target.x = targetX * cos - targetZ * sin
                controls.target.z = targetX * sin + targetZ * cos
                break
        }
        controls.update()
        //در پایان هر بار فشار کلید، موقعیت جدید به orbitControls اطلاع داده می‌شه.
    })




    const wallColorTexture = textureLoader.load('./textures/Onyx001_1K-JPG_Color.jpg')
    const wallRoughnessTexture = textureLoader.load('./textures/Onyx001_1K-JPG_Roughness.jpg')
    const wallNormalTexture = textureLoader.load('./textures/Onyx001_1K-JPG_NormalGL.jpg')

    const wallHeight = 30
    const wallGeometry = new THREE.BoxGeometry(50, wallHeight, 0.2) //عرض ارتفاع ضخامت
    const wallGeometryX = new THREE.BoxGeometry(0.2, wallHeight, 50) //عرض ارتفاع ضخامت
    const wallMaterial = new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        roughnessMap: wallRoughnessTexture,
        normalMap: wallNormalTexture,

    })

    const frontWall = new THREE.Mesh(wallGeometry, wallMaterial)
    frontWall.position.set(0, wallHeight / 2 - 0.5, 25)

    const backWall = new THREE.Mesh(wallGeometry, wallMaterial)
    backWall.position.set(0, wallHeight / 2 - 0.5, -25)

    const rightWall = new THREE.Mesh(wallGeometryX, wallMaterial)
    rightWall.position.set(25, wallHeight / 2 - 0.5, 0)

    const leftWall = new THREE.Mesh(wallGeometryX, wallMaterial)
    leftWall.position.set(-25, wallHeight / 2 - 0.5, 0)

    const ceilingGeometry = new THREE.PlaneGeometry(50, 50)
    const ceilingMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        roughness: 0.7,
        metalness: 0.1,
        side: THREE.DoubleSide


    })

    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial)
    ceiling.rotation.x = -Math.PI / 2
    ceiling.position.y = wallHeight - 0.5

    Scene.add(frontWall, backWall, rightWall, leftWall, ceiling)



    let originalMaterial, targetWallLight, isClick = false  // متغیرها برای ذخیره‌ی متریال اولیه، شیء لامپ دیواری، و وضعیت کلیک

    // بارگذاری مدل لامپ دیواری
    loader.load('./models/wall_light.glb', ({ scene }) => {
        scene.scale.set(0.1, 0.1, 0.1)          // تنظیم مقیاس مدل
        scene.position.set(8, 14, -24)          // تنظیم موقعیت مدل در صحنه

        scene.traverse(child => {
            // بررسی اینکه آیا این گره یک مش (Mesh) هست و اسمش همون چیزی هست که دنبال‌ش هستیم
            if (child.isMesh && child.name === 'WallLight_lambert1_0') {
                targetWallLight = child                      // ذخیره کردن مش مورد نظر
                originalMaterial = child.material.clone()    // ذخیره کردن متریال اصلی برای استفاده‌ی بعدی
            }
        })

        Scene.add(scene)  // اضافه کردن مدل به صحنه
    })

    // بارگذاری مدل کلید چراغ
    loader.load('./models/light_switch.glb', ({ scene }) => {
        scene.scale.set(22, 22, 22)         // تنظیم مقیاس کلید
        scene.position.set(20, 13, -25)     // تنظیم موقعیت کلید

        // چاپ نام تمام مش‌ها برای دیباگ (در صورت نیاز)
        scene.traverse(child => child.isMesh && console.log(child.name))

        Scene.add(scene)  // اضافه کردن کلید به صحنه

        // تعریف raycaster برای بررسی برخورد کلیک موس با اشیاء سه‌بعدی
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()

        // رویداد کلیک ماوس روی صفحه
        window.addEventListener('click', (event) => {
            // تبدیل مختصات کلیک ماوس به محدوده‌ی [-1,1] برای WebGL
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

            // تولید پرتوی (Ray) از دوربین به نقطه‌ی کلیک شده
            raycaster.setFromCamera(mouse, camera)

            // بررسی برخورد پرتو با مدل کلید
            const hits = raycaster.intersectObject(scene, true)

            // اگر برخوردی انجام شده بود
            if (hits.length > 0) {
                // console.log('light_switch')  // برای دیباگ

                rightLight.visible = !rightLight.visible  // خاموش/روشن کردن نور

                // تغییر متریال لامپ دیواری براساس وضعیت کلیک
                targetWallLight.material = isClick
                    ? originalMaterial   // اگر قبلاً کلیک شده بود، متریال اصلی برمی‌گرده
                    : new THREE.MeshStandardMaterial({ color: 0x131210 }) // در غیر این‌صورت متریال خاموش

                console.log(isClick)   // برای دیباگ وضعیت
                isClick = !isClick     // وضعیت کلیک رو برعکس می‌کنیم برای بار بعدی
            }
        })
    })


    loader.load('./models/books.glb', ({ scene }) => {
        scene.scale.set(0.8, 0.8, 0.8)        
        scene.position.set(1, 11, -24) 
        scene.rotation.y= Math.PI / 2    
    
        scene.traverse(child => {
            // console.log(child.name)
        })
    
        Scene.add(scene)   // اینجا Scene با S بزرگ باید همون صحنه اصلی باشه که ساختی
    })
    
    loader.load('./models/cat.glb', ({ scene }) => {
        scene.scale.set(15,15, 15)        
        scene.position.set(10,8.5, -14) 
        // scene.rotation.y= Math.PI / 2    
    
        scene.traverse(child => {
            console.log(child.name)
        })
    
        Scene.add(scene)   // اینجا Scene با S بزرگ باید همون صحنه اصلی باشه که ساختی
    })
    



    function animate() {
        textMesh.rotation.y += 0.02
        requestAnimationFrame(animate)
        // camera.position.set(5, 5, 8)
        controls.update()
        renderer.render(Scene, camera)
    }
    animate()

})
