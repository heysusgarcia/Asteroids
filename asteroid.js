Function.prototype.inherits = function(object) {
  function Surrogate() {};
  Surrogate.prototype = object.prototype;
  this.prototype = new Surrogate();
};

(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, game) {
    this.game = game;
    Asteroids.MovingObject.call(this, pos, vel, Asteroid.RADIUS, Asteroid.COLOR)
  };

  Asteroid.COLOR = "red";
  Asteroid.RADIUS =  15;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY, game) {
    var rPos = [(dimX * Math.random()), (dimY * Math.random())];
    var rVel = [((Math.random() * 2) - 1), ((Math.random() * 2) - 1)];
    return new Asteroid(rPos, rVel, game);
  };

  // Asteroid.prototype.removeAsteroid = function(asteroid) {
  //   var asteroids = this.game.asteroids;
  //   for (var i = 0; i < asteroids.length; i++){
  //     if (asteroids[i] === asteroid) {
  //       asteroids.splice(i, 1);
  //     }
  //   }
  // };

})(this);
