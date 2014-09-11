(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.canvas = ctx;
    this.asteroids = [];
    this.addAsteroids(7);
    this.ship = new Asteroids.Ship([(Game.DIM_X)/2, (Game.DIM_Y)/2], [0, 0],                                                                          this);
    this.bullets = [];
    this.score = 0;
  };

  Game.DIM_X =700;
  Game.DIM_Y = 700;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (var i = 0; i < numAsteroids; i++) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y, this));
    }
  };

  Game.prototype.drawScore = function() {
    this.canvas.fillStyle = "white";
    this.canvas.font = "bold "+ 35 +"pt Arial ";
    this.canvas.fillText("SCORE" + " " + this.score, 0, 100);
  };

  Game.prototype.draw = function() {
    var game = this;
    game.canvas.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
    game.ship.draw(game.canvas);
    game.drawScore();
    game.asteroids.forEach(function(ast) {
      ast.draw(game.canvas);
    });
    game.bullets.forEach(function(b) {
      b.draw(game.canvas);
    });
  };

  Game.prototype.move = function() {
    this.ship.move();
    var game = this;
    var bullets = this.bullets;
    this.bullets.forEach(function(b) {
      b.step();
    });

    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.step = function() {
    var game = this;
    game.move();

    if (game.asteroids.length < 5) {
      game.addAsteroids(2);
      }
    game.checkCollisions();
    game.draw();
  };

  Game.prototype.checkCollisions = function() {
    var game = this;
    game.asteroids.forEach(function(ast) {
      if (game.ship.isCollidedWith(ast)) {
        alert("Game Over!");
        game.stop();
        location.reload();
      }
    });
  };

  Game.prototype.fireBullet = function () {
    var bullet = this.ship.fireBullet();
    this.bullets.push(bullet);
    var that = this;
    window.setTimeout(function() {that.removeBullet(bullet)}, 700);
  };

  Game.prototype.removeAsteroid = function(asteroid) {
    for (var i = 0; i < this.asteroids.length; i++){
      if (this.asteroids[i] === asteroid) {
        this.asteroids.splice(i, 1);
        this.score ++;
      }
    }
  };

  Game.prototype.removeBullet = function(bullet) {
    for (var i = 0; i < this.bullets.length; i++){
      if (this.bullets[i] === bullet) {
        this.bullets.splice(i, 1);
      }
    }
  };

  Game.prototype.bindKeyHandlers = function() {
    var game = this;
    key('a', function() {
      game.ship.power([-1, 0]);
    });
    key('d', function() {
      game.ship.power([1, 0]);
    });
    key('w', function() {
      game.ship.power([0, -1]);
    });
    key('s', function() {
      game.ship.power([0, 1]);
    });
    key('space', function() {
      game.fireBullet();
    });
  }

  var interID;

  Game.prototype.start = function() {
    var game = this;
    game.bindKeyHandlers();
    game.draw();
    interID = setInterval(function() {game.step();}, Game.FPS);
  };

  Game.prototype.stop = function() {
    clearInterval(interID);
  };

})(this);
