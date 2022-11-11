import { useState, useEffect } from "react";
import "./App.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import front from "./model/heaven/front.jpg";
import back from "./model/heaven/back.jpg";
import top from "./model/heaven/top.jpg";
import bottom from "./model/heaven/bottom.jpg";
import left from "./model/heaven/left.jpg";
import right from "./model/heaven/right.jpg";

function App() {
  useEffect(() => {
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(
    //   35,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );
    // // camera.position.z = 96;
    // camera.position.set(0, 0, 25);

    // const canvas = document.getElementById("myThreeJsCanvas");
    // const renderer = new THREE.WebGLRenderer({
    //   canvas,
    //   antialias: true,
    // });
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // ambientLight.castShadow = true;
    // scene.add(ambientLight);
    // const spotLight = new THREE.SpotLight(0xffffff, 1);
    // spotLight.castShadow = true;
    // spotLight.position.set(0, 64, 32);
    // scene.add(spotLight);

    // const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // scene.add(boxMesh);
    // const animate = () => {
    //   boxMesh.rotation.x += 0.01;
    //   boxMesh.rotation.y += 0.01;
    //   renderer.render(scene, camera);
    //   window.requestAnimationFrame(animate);
    // };
    // animate();

    const canvas = document.getElementById("myThreeJsCanvas");

    // showing fps
    const stats = new Stats();
    document.body.appendChild(stats.domElement);

    // Scene Setup
    const scene = new THREE.Scene();
    console.log(scene);

    // Camera Setup
    const fov = 35;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;

    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 25);
    scene.add(camera);
    console.log(camera);

    
    // Render Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1
    );
    renderer.autoClear = false;
    renderer.setClearColor = (0x000000, 0.0);
    console.log(renderer);

    // Adding orbit controls
    let controls = new OrbitControls(camera, renderer.domElement);

    controls.minDistance = 10;
    controls.maxDistance = 40;

    // loader for loading texture
    let loader = new THREE.TextureLoader();

    // array for holding all texutre
    let textureArray = [];

    // all texture
    let frontTexture = loader.load(front);
    let backTexture = loader.load(back);
    let topTexture = loader.load(top);
    let bottomTexture = loader.load(bottom);
    let rightTexture = loader.load(left);
    let leftTexture = loader.load(right);

    textureArray.push(new THREE.MeshBasicMaterial({ map: frontTexture }));
    textureArray.push(new THREE.MeshBasicMaterial({ map: backTexture }));
    textureArray.push(new THREE.MeshBasicMaterial({ map: topTexture }));
    textureArray.push(new THREE.MeshBasicMaterial({ map: bottomTexture }));
    textureArray.push(new THREE.MeshBasicMaterial({ map: rightTexture }));
    textureArray.push(new THREE.MeshBasicMaterial({ map: leftTexture }));

    for (let i = 0; i < textureArray.length; i++) {
      textureArray[i].side = THREE.BackSide;
    }

    // making cube
    const cubeGeometry = new THREE.BoxGeometry(100, 100, 100);
    const skyBox = new THREE.Mesh(cubeGeometry, textureArray);
    scene.add(skyBox);

    // render function to render the scene
    const render = () => {
      renderer.render(scene, camera);
    };

    // Recursion function for animation
    const animate = () => {
      requestAnimationFrame(animate);
      render();
      stats.update();
    };
    animate();

    // Resizing window to make responsive
    const windowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    };

    window.addEventListener("resize", windowResize, false);
  }, []);
  return (
    <div className="App">
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
