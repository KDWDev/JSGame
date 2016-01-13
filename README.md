# JSGame

TODO

1. Rendering
	* Rendering is a little janky atm, maybe due to my hacking threejs into working. play about with this some.
2. Physics
	* rework gravity formula. for now it works on an 'attracting bodies to an arbitrary point' level, but...
		a) fadein/fadeout is terribad. further from planet, faster you approach; closer, the slower your approach becomes. should be inverted
		b) attempt to rework underlying grav system to allow for a gravity variable on multiple objects, and not just an arbitrary point in space