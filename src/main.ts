import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
const controls = new OrbitControls(camera, renderer.domElement);

// 조명 추가
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffaa00, 1, 100);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// 양초 생성
const candleGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
const candleMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
const candle = new THREE.Mesh(candleGeometry, candleMaterial);
candle.position.set(0, 1, 0);
scene.add(candle);

// 불꽃 쉐이더
const flameVertexShader = `
   varying vec3 vPosition;
   void main() {
     vPosition = position;
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
   }
 `;

const flameFragmentShader = `
   uniform float time;
   varying vec3 vPosition;
   void main() {
     float y = vPosition.y;
     float flicker = sin(time * 10.0 + y * 5.0) * 0.1;
     float intensity = smoothstep(0.0, 1.0, 1.0 - y);
     vec3 color = mix(vec3(1.0, 0.5, 0.0), vec3(1.0, 0.0, 0.0), y);
     gl_FragColor = vec4(color * intensity, 1.0 - y);
   }
 `;

const flameUniforms = {
  time: { value: 0.0 },
};

const flameMaterial = new THREE.ShaderMaterial({
  vertexShader: flameVertexShader,
  fragmentShader: flameFragmentShader,
  uniforms: flameUniforms,
  transparent: true,
  blending: THREE.AdditiveBlending,
});

const flameGeometry = new THREE.ConeGeometry(0.2, 1, 32);
const flame = new THREE.Mesh(flameGeometry, flameMaterial);
flame.position.set(0, 2.5, 0);
scene.add(flame);

camera.position.z = 5;

// 애니메이션 루프
function animate() {
  requestAnimationFrame(animate);
  controls.update();

  // 시간 업데이트
  flameUniforms.time.value = performance.now() * 0.001;

  // 렌더링
  renderer.render(scene, camera);
}
