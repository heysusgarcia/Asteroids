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

  Asteroid.COLOR = "#4682B4";
  Asteroid.RADIUS =  15;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function(dimX, dimY, game) {
    var rX = Math.floor(Math.random() * dimX);
    var rY;
    if (rX !== 0) {
      rY = 0;
    }
    var rPos = [rX, rY];
    var rVel = [((Math.random() * 4) - Math.random()), ((Math.random() * 4) - Math.random())];
    return new Asteroid(rPos, rVel, game);
  };

})(this);
