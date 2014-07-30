var Turtle = (function() {
  function Turtle(game, x, y) {
    var animations,
        firstFrame,
        framesPerAnimation,
        framesRange,
        lastFrame;

    Phaser.Sprite.call(this, game, x * 32, y * 32, 'turtle');

    this.walkVelocity = 200;
    this.walkDrag = 800;
    this.jumpVelocity = -400;
    this.currentJumpCount = 0;
    this.maximumJumpCount = 2;

    animations = [
      // 'cheer',
      'walk-right',
      // 'die',
      // 'walk-left'
    ];
    framesPerAnimation = 10;

    for (var i = 0, l = animations.length; i < l; i += 1) {
      firstFrame = framesPerAnimation * i;
      lastFrame = firstFrame + framesPerAnimation;
      framesRange = _.range(firstFrame, lastFrame);

      this.animations.add(animations[i], framesRange, 12.5, true);
    }

    this.animations.play('walk-right');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);

    this.body.collideWorldBounds = true;
    this.body.checkCollision.up = false;
    // this.body.checkCollision.right = true;
    this.body.drag.x = this.walkDrag;
  }

  Turtle.prototype = Object.create(Phaser.Sprite.prototype);
  Turtle.prototype.constructor = Turtle;

  Turtle.prototype.update = function() {
    if (this.body.velocity.y === 0) {
      this.currentJumpCount = 0;
    }
  };

  Turtle.prototype.cheer = function() {
    this.animations.play('cheer');
  };

  Turtle.prototype.die = function() {
    this.animations.play('die');
  };

  Turtle.prototype.jump = function() {
    if (this.currentJumpCount < this.maximumJumpCount) {
      this.currentJumpCount += 1;
      this.body.velocity.y = this.jumpVelocity;
    }
  };

  Turtle.prototype.moveLeft = function() {
    this.body.velocity.x = -1 * this.walkVelocity;
  };

  Turtle.prototype.moveRight = function() {
    this.body.velocity.x = this.walkVelocity;
  };

  Turtle.prototype.turnLeft = function() {
    this.animations.play('walk-left');
  };

  Turtle.prototype.turnRight = function() {
    this.animations.play('walk-right');
  };

  return Turtle;
})();
