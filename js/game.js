/**
	Body Factory adapted from matter-js to splice a mesh into a given shape
 **/
var Bodies = {
	
	circle: function(x,y,r,opts){
		var shape, material, geometry;
		
		var radius = r,
			segments = 32;

		shape = Matter.Bodies.circle(x,y,r);
		material = new THREE.MeshBasicMaterial({ color: 0x0000ff });			
		geometry = new THREE.CircleGeometry( radius, segments );
		
		shape.mesh = new THREE.Mesh( geometry, material );
		
		for (arg in opts) { // dumb ass hack to get isstatic to stick, I'm better than this :(
			if (opts["isStatic"] == true) {
				Matter.Body.set(shape,'isStatic',true);
			}
		}

		return shape;
	}
}

/**
	game engine / interface
 **/
function game(){
	
	// Matter-js engine setup
	this.engine = Matter.Engine.create(document.body, {
			enabled: true,
			enableSleeping: false,
			positionIterations: 6,
			velocityIterations: 4,
		});
	this.rs = new RenderShim();
}
game.prototype.constructor = game;

game.prototype.update = function() { // temp testing code
	//var Bodies = Matter.Bodies;
	var boxA = Bodies.circle(150, 150, 15);
	var boxB = Bodies.circle(-110, 500, 15);
	var ground = Bodies.circle(0,0,40, {isStatic: true});
	this.engine.world.gravity = {x: 0, y: 0};

	Matter.World.add(this.engine.world, [boxA,boxB,ground]);
}

game.prototype.run = function(){
	Matter.Engine.update(this.engine, 1000/6, 0);
	var bodies = Matter.Composite.allBodies(this.engine.world);
	for (body in bodies) {
		if (this.rs.scene.getObjectById(bodies[body].mesh.id) != undefined) {
			bodies[body].mesh.position.x = bodies[body].position.x;
			bodies[body].mesh.position.y = bodies[body].position.y;
		} else {
			this.rs.scene.add(bodies[body].mesh);
		}
	}
	//console.log(this.specTag.position)
	requestAnimationFrame( this.run );
	this.rs.renderer.render(this.rs.scene,this.rs.camera);
}

game.prototype.init = function() {
	this.update();
	this.run = this.run.bind(this); // lolwhoops fix the fuxed scope
	this.run();
//	Matter.Engine.run(this.engine);
}
