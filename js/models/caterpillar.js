var Caterpillar = (function() {
  function Caterpillar(game, x, y) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'caterpillar');

    this.hasHitPlayer = false;
    this.walkVelocity = 80;

    this.plop = game.add.audio('plop',1.75);

    helper.addAnimationsToSprite(this, [
      'default'
    ], 4);
    this.animations.play('default');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.x = 1;
    this.body.immovable = true;
    this.body.velocity.x = -this.walkVelocity;
    this.scale.x *= -1;

    this.anchor.setTo(0.5, 1);

    this.facing = this.body.facing;

    game.add.existing(this);
  }

  Caterpillar.prototype = Object.create(Phaser.Sprite.prototype);
  Caterpillar.prototype.constructor = Caterpillar;

  Caterpillar.prototype.update = function() {
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

  Caterpillar.prototype.hit = function(sprite) {
    var that;

    if (this.body.touching.up) {
      this.plop.play();
      this.kill();
    } else {
      if (!this.hasHitPlayer) {
        sprite.takeDamage(1);
        this.hasHitPlayer = true;
        that = this;

        setTimeout(function() {
          that.hasHitPlayer = false;
        }, 500);
      }
    }
  };

  Caterpillar.prototype.turnAround = function() {
    this.scale.x *= -1;
  };

  return Caterpillar;
})();
