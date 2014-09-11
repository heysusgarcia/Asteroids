Function.prototype.inherits = function(object) {
  function Surrogate() {};
  Surrogate.prototype = object.prototype;
  this.prototype = new Surrogate();
};

(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, vel, game) {
    this.game = game;
    this.life = 2000;
    Asteroids.MovingObject.call(this, pos, vel, Bullet.RADIUS, Bullet.COLOR);
  };

  Bullet.RADIUS = 4;
  Bullet.COLOR = "green";

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.hitAsteroids = function() {
    var bullet = this;
    bullet.game.asteroids.forEach( function (ast) {
      if(bullet.isCollidedWith(ast)) {
        bullet.game.removeBullet(bullet);
        bullet.game.removeAsteroid(ast);
      }
    });
  };

  Bullet.prototype.runStep = function() {
    this.hitAsteroids();
  };

})(this);
