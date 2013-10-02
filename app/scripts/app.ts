/// <reference path="../reference.ts"/>
class App {
  INTERSECTED : THREE.Object3D
  projector : THREE.Projector

  renderer : any
  scene : THREE.Scene
  camera : THREE.PerspectiveCamera
  mesh : THREE.Mesh
  mouse : THREE.Vector2

  constructor() {}
  
  init() {
    // Renderer
    if(Modernizr.webgl)
      this.renderer = new THREE.WebGLRenderer()
    else
      this.renderer = new THREE.CanvasRenderer()

    this.renderer.setSize( AppInfos.WIDTH, AppInfos.HEIGHT )
    document.getElementById('main').appendChild( this.renderer.domElement )

    // Scene
    this.scene = new THREE.Scene()

    // Camera
    this.camera = new THREE.PerspectiveCamera(50, AppInfos.WIDTH / AppInfos.HEIGHT, 1, 10000 )
    this.camera.position.set(0, 0, 1000)
    this.scene.add( this.camera )

    // Light
    var light : THREE.PointLight = new THREE.PointLight(0xffffff)
    light.position.set(0,0,1000)
    this.scene.add(light)
    //var ambientLight : THREE.AmbientLight = new THREE.AmbientLight(0x00ff00)
    //this.scene.add(ambientLight)
    
    var shape : THREE.TextGeometry = new THREE.TextGeometry("Works", {font:'fff freedom condensed'})
    var wrapper : any = new THREE.MeshLambertMaterial({color: 0x888888})
    var words : THREE.Mesh = new THREE.Mesh(shape, wrapper)

    var geometry = new THREE.CubeGeometry( 20, 20, 20 )
    var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xff0000 } ) )
    object.position.x = -200
    this.scene.add(object)

    //words.scale.z = 3
    this.scene.add(words)

    this.mouse = new THREE.Vector2(1000000,0)
    this.projector = new THREE.Projector()
    this.animate()

    this.renderer.domElement.addEventListener( "click", (event: MouseEvent)=>this.globalClick(event), false )
    this.renderer.domElement.addEventListener( "mousemove", (event: MouseEvent)=>this.globalMove(event), false )
  }

  globalMove(event) {
    this.getMousePos(event)
  }

  globalClick(event) {
    this.getMousePos(event)
  }

  getMousePos(event) {
    var parentOffset = $(event.target).parent().offset()
    this.mouse.x = ( (event.pageX - parentOffset.left) / AppInfos.WIDTH ) * 2 - 1
    this.mouse.y = -( (event.pageY - parentOffset.top) / AppInfos.HEIGHT ) * 2 + 1
  }

  animate() {
    this.update()
    this.render()
    window.requestAnimationFrame( ()=>this.animate() )
  }

  render() {
    this.renderer.render( this.scene, this.camera )
  }

  overObject(object:any) {
    object.material.emissive.setHex( 0xff0000 );
  }

  outObject(object:any) {
    object.material.emissive.setHex( 0x00ff00 );
  }

  update() {
    //console.log(this.mouse.x+" "+this.mouse.y)
    // find intersections
    // create a Ray with origin at the mouse position and direction into the scene (camera direction)
    var vector = new THREE.Vector3( this.mouse.x, this.mouse.y, 1 )
    this.projector.unprojectVector( vector, this.camera )
    var ray = new THREE.Raycaster( this.camera.position, vector.sub( this.camera.position ).normalize() )

    // create an array containing all objects in the scene with which the ray intersects
    var intersects = ray.intersectObjects( this.scene.children )

    // INTERSECTED = the object in the scene currently closest to the camera 
    //    and intersected by the Ray projected from the mouse position  
    
    // if there is one (or more) intersections
    if ( intersects.length > 0 ) {

      // if the closest object intersected is not the currently stored intersection object
      if ( intersects[0].object != this.INTERSECTED )  {

        // restore previous intersection object (if it exists) to its original color
        if( this.INTERSECTED ) 
          this.outObject(this.INTERSECTED)
          
        // store reference to closest object as current intersection object
        this.INTERSECTED = intersects[0].object
        this.overObject(this.INTERSECTED)
      }
    } else {
      if( this.INTERSECTED ) 
        this.outObject(this.INTERSECTED)

      this.INTERSECTED = null
    }
  }
}