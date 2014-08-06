var Jellyfish = (function() {
  function Jellyfish(game, x, y) {
    var that;

    Phaser.Sprite.call(this, game, x * 32, y * 32, 'jellyfish');

    this.hasHitPlayer = false;
    this.jumpVelocity = 100;
    this.walkVelocity = 100;

    this.plop = game.add.audio('plop', 1.75);

    helper.addAnimationsToSprite(this, [
      'default'
    ], 6);
    this.animations.play('default');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.x = 1;
    this.body.immovable = true;
    this.body.velocity.x = -this.walkVelocity;
    this.body.velocity.y = -this.jumpVelocity;
    this.scale.x *= -1;

    this.anchor.setTo(0.5, 1);

    this.facing = this.body.facing;

    that = this;
    setInterval(function() {
      that.body.velocity.y = -100;
    }, 1000);

    game.add.existing(this);
  }

  Jellyfish.prototype = Object.create(Phaser.Sprite.prototype);
  Jellyfish.prototype.constructor = Jellyfish;

  Jellyfish.prototype.update = function() {
    var LEFT,
        RIGHT;

    LEFT = Phaser.LEFT;
    RIGHT = Phaser.RIGHT;

    if (this.body.facing === LEFT && this.facing !== LEFT) {
      this.facing = LEFT;
      this.turnAround();
    } else if (this.body.facing === RIGHT && this.facing !== RIGHT) {
      this.facing = RIGHT;
      this.turnAround();
    }
  };

  Jellyfish.prototype.hit = function(sprite) {
    var that;

    if (!this.hasHitPlayer) {
      sprite.takeDamage(1);
      this.hasHitPlayer = true;
      that = this;

       setTimeout(function() {
         that.hasHitPlayer = false;
       }, 500);
    }

    if (this.body.touching.up) {
      this.plop.play();
      this.kill();
    }
  };

  Jellyfish.prototype.turnAround = function() {
    this.scale.x *= -1;
  };

  return Jellyfish;
})();
