// The spaghetti code masterpiece
var game = {
	canvas: document.getElementById('canvas'),
	context: this.canvas.getContext('2d', {alpha: false}),
	counter: document.getElementById('counter'),
	textures: new Image(),
	drawPending: false,
	score: 0,
	backgrounds: {
			'sky': {
				image: new Image(),
				loaded: false
			},
			'trees': {
				image: new Image(),
				loaded: false
			}
	},
	sounds: {
		jump: new Audio('sounds/jump.wav')
	},
	options: {
		texturesPath: "textures.png",
		tileWidth: 24,
		tileHeight: 24,
		canvasWidth: window.innerWidth / 3,
		canvasHeight: window.innerHeight / 3
	},
	pressedKeys: {},
	init: function (onInit) {
		this.canvas.width = this.options.canvasWidth
		this.canvas.height = this.options.canvasHeight
		this.context.imageSmoothingEnabled = false

    this.backgrounds['sky'].image.src = "heaven.jpg"
		this.backgrounds['trees'].image.src = "angel.jpg"

		for (var key in this.backgrounds) {
			this.backgrounds[key].image.onload = function (currentKey) {
				this.backgrounds[currentKey].loaded = true
			}.bind(this, key)
		}

		this.textures.src = this.options.texturesPath
		this.textures.onload = onInit
	},
	map: {
		structures: []
	},
	isOver: false
}
function updateScore(points) {
	game.score += points;
	document.getElementById('score').innerText = "Score: " + game.score;
  }
  
  // Example: Increment score when the player jumps
  game.sounds.jump.addEventListener('play', function() {
	updateScore(10);
  });