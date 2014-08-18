Function.prototype.inherits = function(object) {
  function Surrogate() {};
  Surrogate.prototype = object.prototype;
  this.prototype = new Surrogate();
};

(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos, vel, game) {
    this.game = game;
    Asteroids.MovingObject.call(this, pos, vel, Ship.RADIUS, Ship.COLOR);
  };

  Ship.RADIUS = 6;
  Ship.COLOR = "#FFFFF0";


  Ship.inherits(Asteroids.MovingObject);


  Ship.prototype.power = function(impulse) {
    this.vel[0] += impulse[0] * 0.15;
    this.vel[1] += impulse[1] * 0.15;
  }

  Ship.prototype.removeShip = function () {

  };

  Ship.prototype.fireBullet = function() {
    var ship = this;
    var bulletTrajec = function() {
      var velX = ship.vel[0];
      var velY = ship.vel[1];
      var speed = Math.sqrt((velX * velX) + (velY * velY));
      return [(velX * 25) / speed, (velY * 25) / speed ];
    };

    // if (ship.vel[0] !== 0 || ship.vel[1] !== 0) {
      return new Asteroids.Bullet(ship.pos, bulletTrajec(), ship.game);
    // }
  };

})(this);
