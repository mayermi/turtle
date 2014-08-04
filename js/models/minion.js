var Minion = (function() {
  function Minion(game, x, y, sprite) {
    var animations,
        firstFrame,
        framesPerAnimation,
        framesRange,
        lastFrame;

    Phaser.Sprite.call(this, game, x * 32, y * 32, sprite);

    this.hasHitPlayer = false;
    this.walkVelocity = 120;

    this.plop = game.add.audio('plop',1);

    animations = [
      'walk'
    ];
    framesPerAnimation = 4;

    for (var i = 0, l = animations.length; i < l; i += 1) {
      firstFrame = framesPerAnimation * i;
      lastFrame = firstFrame + framesPerAnimation;
      framesRange = _.range(firstFrame, lastFrame);

      this.animations.add(animations[i], framesRange, 12.5, true);
    }

    this.animations.play('walk');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.bounce.x = 1;
    this.body.immovable = true;
    this.body.velocity.x = this.walkVelocity;

    this.anchor.setTo(0.5, 1);

    this.facing = this.body.facing;

    game.add.existing(this);
  }

  Minion.prototype = Object.create(Phaser.Sprite.prototype);
  Minion.prototype.constructor = Minion;

  Minion.prototype.update = function() {
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

  Minion.prototype.hit = function(sprite) {
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

  Minion.prototype.turnAround = function() {
    this.scale.x *= -1;
  };

  return Minion;
})();
