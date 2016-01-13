// adapted body-factory
var Bodies = {
	circle: function(x,y,r,opts){
		circle = Matter.Bodies.circle(x,y,r);
		
		var material = new THREE.MeshBasicMaterial({
			color: 0x0000ff
		});

		var radius = r;
		var segments = 32;
		var circleGeometry = new THREE.CircleGeometry( radius, segments );
		
		circle.mesh = new THREE.Mesh( circleGeometry, material );
		
		for (arg in opts) {
			//this.arg = opts[arg];
			if (opts["isStatic"] == true) {
				Matter.Body.set(circle,'isStatic',true);
			}
		}
		circle.position.x = x;
		circle.position.y = y;
		
		console.log(this);
		return circle
	}
}

function game(){
	// Matter-js engine setup
	this.engine = Matter.Engine.create(document.body, {
			enabled: true,
			enableSleeping: false,
			positionIterations: 6,
			velocityIterations: 4,
			/*
			render: {
				element: document.canvas,
				controller: RenderShim,
			},*/
		});
	this.rs = new RenderShim();
}
game.prototype.constructor = game;

game.prototype.update = function() {
	//var Bodies = Matter.Bodies;
	var boxA = Bodies.circle(150, 150, 15);
	var boxB = Bodies.circle(-110, 500, 15);
	var ground = Bodies.circle(0,0,40, {isStatic: true});
	this.engine.world.gravity = {x: 0, y: 0};
	//this.specTag = ground;
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
	this.run = this.run.bind(this);
	this.run();
//	Matter.Engine.run(this.engine);
}
