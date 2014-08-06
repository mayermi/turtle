var Pufferfish = (function() {
  function Pufferfish(game, x, y) {
    var that;

    Phaser.Sprite.call(this, game, x * 32, y * 32, 'pufferfish');

    this.hasHitPlayer = false;
    this.jumpVelocity = 103;
    this.walkVelocity = 120;

    this.plop = game.add.audio('plop', 1.75);

    helper.addAnimationsToSprite(this, [
      'default'
    ], 6);
    this.animations.play('default');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.bounce.x = 1;
    this.body.immovable = true;
    this.body.velocity.x = -1 * this.walkVelocity;
    this.body.velocity.y = -1 * this.jumpVelocity;
    this.scale.x = -1;

    this.anchor.setTo(0.5, 1);

    this.facing = this.body.facing;

    that = this;
    setInterval(function() {
      that.body.velocity.y = -1 * that.jumpVelocity;
    }, 500);

    game.add.existing(this);
  }

  Pufferfish.prototype = Object.create(Phaser.Sprite.prototype);
  Pufferfish.prototype.constructor = Pufferfish;

  Pufferfish.prototype.update = function() {
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

  Pufferfish.prototype.hit = function(sprite) {
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

  Pufferfish.prototype.turnAround = function() {
    this.scale.x *= -1;
  };

  return Pufferfish;
})();
