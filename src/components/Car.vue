<template>
	<div class="sidebar">
		<input type="text"
		       v-model="arabaBoyutu">
		<button @click="onAddCarClick">
			araba ekle
		</button>
		<button @click="onAddSquareClick">
			kare ekle
		</button>
		<button @click="onAddRectangleClick">
			dikdörtgen ekle
		</button>
		<label for="gravity-x">x-axis</label>
		<input id="gravity-x"
		       type="range"
		       value="0"
		       min="-1"
		       max="1"
		       step=".1"
		       v-model="gravity.x" />
		<span for="gravity-x"
		      id="x-val"
		      class="output">{{gravity.x}}</span>
		<label for="gravity-y">y-axis</label>
		<input id="gravity-y"
		       type="range"
		       value="0"
		       min="-1"
		       max="1"
		       step=".1"
		       v-model="gravity.y" />
		<span for="gravity-y"
		      id="y-val"
		      class="output">{{gravity.y}}</span>
	</div>
</template>

<script>
	import Matter from 'matter-js';
	var Engine = Matter.Engine,
		Render = Matter.Render,
		World = Matter.World,
		MouseConstraint = Matter.MouseConstraint,
		Mouse = Matter.Mouse,
		Composites = Matter.Composites,
		Bodies = Matter.Bodies;
	// module aliases

	// create an engine
	var engine = Engine.create();

	// create a renderer
	var render = Render.create({
		element: document.body,
		engine: engine,
		options: {
			// width: 800,
			// height: 600,
			wireframes: true,
			showAngleIndicator: true
		}
	});
	export default {
		name: 'Car',
		data: function () {
			return {
				arabaBoyutu: 1.6,
				gravity: {
					x: 0,
					y: 1
				}
			};
		},
		mounted: function () {

			// create two boxes and a ground
			var top = Bodies.rectangle(400, 0, 810, 60, { isStatic: true });
			var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
			var left = Bodies.rectangle(0, 200, 50, 810, { isStatic: true });
			var right = Bodies.rectangle(810, 200, 50, 810, { isStatic: true });

			// add all of the bodies to the world
			World.add(engine.world, [this.kare(), this.dikdortgen(), ground, left, top, right, this.araba()]);

			// add mouse control
			var mouse = Mouse.create(render.canvas),
				mouseConstraint = MouseConstraint.create(engine, {
					mouse: mouse,
					constraint: {
						stiffness: 0.2,
						render: {
							visible: false
						}
					}
				});

			World.add(engine.world, mouseConstraint);

			// keep the mouse in sync with rendering
			render.mouse = mouse;

			// run the engine
			Engine.run(engine);

			// run the renderer
			Render.run(render);
		},
		methods: {
			onAddCarClick: function () {
				World.add(engine.world, this.araba());
			},
			onAddRectangleClick: function () {
				World.add(engine.world, this.dikdortgen());
			},
			onAddSquareClick: function () {
				World.add(engine.world, this.kare());
			},
			araba () {
				return Composites.car(150, 100, 150 * this.arabaBoyutu, 30 * this.arabaBoyutu, 30 * this.arabaBoyutu);
			},
			kare () {
				return Bodies.rectangle(400, 200, this.arabaBoyutu * 50, this.arabaBoyutu * 50, { friction: 1 });
			},
			dikdortgen () {
				return Bodies.rectangle(450, 50, this.arabaBoyutu * 100, this.arabaBoyutu * 20, { friction: 1 });
			}
		},
		beforeDestroy: function () {
			window.location.href = window.location.href;
		},
		watch: {
			gravity: {
				handler () {
					console.log(this.gravity);
					engine.world.gravity.x = this.gravity.x;
					engine.world.gravity.y = this.gravity.y;
				},
				deep: true
			}
		}
	}
</script>

<style>
	.sidebar {
	  position: fixed;
	  top: 0;
	  bottom: 0;
	  width: 400px;
	  right: 0;
	  background: pink;
	  display: block;
	}
</style>
