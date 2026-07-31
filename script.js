const loading = document.getElementById("loading");

window.addEventListener("load", () => {
  setTimeout(() => {
    loading.style.opacity = "0";
    setTimeout(() => {
      loading.style.display = "none";
    }, 1500);
  }, 2500);
});

const canvas = document.getElementById("bg");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;

const stars = [];
const geometry = new THREE.SphereGeometry(0.25, 8, 8);

for (let i = 0; i < 1800; i++) {
  const material = new THREE.MeshBasicMaterial({
    color: Math.random() > 0.5 ? 0xff4fa3 : 0xffffff
  });

  const star = new THREE.Mesh(geometry, material);

  const r = Math.random() * 180;
  const a = Math.random() * Math.PI * 2;

  star.position.x = Math.cos(a) * r;
  star.position.y = (Math.random() - 0.5) * 120;
  star.position.z = Math.sin(a) * r;

  scene.add(star);
  stars.push(star);
}

function animate() {
  requestAnimationFrame(animate);

  scene.rotation.y += 0.0008;
  scene.rotation.x += 0.0002;

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
