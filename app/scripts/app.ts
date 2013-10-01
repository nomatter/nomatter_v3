/// <reference path="../reference.ts"/>
class App {
  renderer : THREE.WebGLRenderer
  scene : THREE.Scene
  camera : THREE.PerspectiveCamera
  mesh : THREE.Mesh

  constructor() {}
  
  init() {
    // on initialise le moteur de rendu
    this.renderer = new THREE.WebGLRenderer();

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new CanvasRenderer();
    this.renderer.setSize( AppInfos.WIDTH, AppInfos.HEIGHT );
    document.getElementById('main').appendChild( this.renderer.domElement );

    // // on initialise la scène
    this.scene = new THREE.Scene();

    // // on initialise la camera que l’on place ensuite sur la scène
    this.camera = new THREE.PerspectiveCamera(50, AppInfos.WIDTH / AppInfos.HEIGHT, 1, 10000 );
    this.camera.position.set(0, 0, 1000);
    this.scene.add( this.camera );
    
    // // on créé un  cube au quel on définie un matériau puis on l’ajoute à la scène 
    var geometry : THREE.CubeGeometry = new THREE.CubeGeometry( 200, 200, 200 );
    var material : THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    this.mesh = new THREE.Mesh( geometry, material );
    this.scene.add( this.mesh );

    // // on effectue le rendu de la scène
    this.renderer.render( this.scene, this.camera );

  }
}