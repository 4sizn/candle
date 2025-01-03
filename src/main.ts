import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

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
  renderer.render(scene, camera);
}