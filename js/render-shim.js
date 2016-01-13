function RenderShim(){
	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	this.scene = new THREE.Scene();
	this.renderer = new THREE.WebGLRenderer();
	
	this.camera.position.x = 0;
	this.camera.position.y = 0;
	this.camera.position.z = 400;
	this.camera.lookAt({x: 0, y: 0, z: 0});
	
	
	this.renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( this.renderer.domElement );
	
}
RenderShim.prototype.constructor = RenderShim;




/*
			var geometry = new THREE.BoxGeometry( 1, 1, 1 );
			var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			var cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			camera.position.z = 5;

			var render = function () {
				requestAnimationFrame( render );

				cube.rotation.x += 0.1;
				cube.rotation.y += 0.1;

				renderer.render(scene, camera);
			};

			render();
			*/