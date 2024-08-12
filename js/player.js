game.player = {
    x: 54,
    y: 0,
    height: 24,
    highestY: 0,
    direction: "left",
    isInAir: false,
    startedJump: false,
    moveInterval: null,
    jumpCount: 0, 
    fallTimeout: function(startingY, time, maxHeight) {
        setTimeout(function () {
            if (this.isInAir) {
                this.y = startingY - maxHeight + Math.pow((-time / 3 + 11), 2);
                if (this.y < this.highestY) {
                    this.highestY = this.y;
                }
                if (time > 37) {
                    this.startedJump = false;
                    game.checkCollisions();
                }
                if (time < 150) {
                    time++;
                    this.fallTimeout(startingY, time, maxHeight);
                } else {
                    game.isOver = true;
                }
                if (this.y > 40) {
                    game.isOver = true;
                }
                game.requestRedraw();
            }
        }.bind(this, startingY, time, maxHeight), 12);
    },
    animationFrameNumber: 0,
    collidesWithGround: true,
    animations: {
        left: [{tileColumn: 4, tileRow: 0}, {tileColumn: 5, tileRow: 0}, {tileColumn: 4, tileRow: 0}, {tileColumn: 6, tileRow: 0}],
        right: [{tileColumn: 9, tileRow: 0}, {tileColumn: 8, tileRow: 0}, {tileColumn: 9, tileRow: 0}, {tileColumn: 7, tileRow: 0}]
    },
    jump: function (type) {
        if (this.jumpCount < 2) {
            clearInterval(this.fallInterval);
            game.sounds.jump.play();
            this.isInAir = true;
            this.jumpCount++;
            this.startedJump = true;
            var startingY = this.y;
            var time = 1;
            var maxHeight = 121;
            if (type == "fall") {
                time = 30;
                maxHeight = 0;
            }
            this.fallTimeout(startingY, time, maxHeight);
        }
    },
    land: function () {
        this.isInAir = false;
        this.jumpCount = 0;
    }
};

game.checkCollisions = function () {
    var groundLevel = 0;

    // Kiểm tra nếu người chơi chạm đất
    if (game.player.y >= groundLevel) {
        game.player.land();
        return true;
    }

    // Kiểm tra va chạm với dao rơi
    for (var i = 0; i < game.map.structures.length; i++) {
        var structure = game.map.structures[i];
        if (structure.name === "fallingKnife" && game.player.x === structure.x && game.player.y === structure.y) {
            game.isOver = true;
            return true;
        }
    }

    // Kiểm tra va chạm với nham thạch
    for (var i = 0; i < game.map.structures.length; i++) {
        var structure = game.map.structures[i];
        if (structure.name === "chasingLava" && game.player.x === structure.x && game.player.y === structure.y) {
            game.isOver = true;
            return true;
        }
    }

    return false;
};