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

// Create a Candle Object
const candleGeometry = new THREE.CylinderGeometry(2, 2, 2, 32);
const candleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const candleMesh = new THREE.Mesh(candleGeometry, candleMaterial);
scene.add(candleMesh);

camera.position.z = 5;

function animate() {
  controls.update();
  renderer.render(scene, camera);
}
