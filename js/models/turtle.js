var Turtle = (function() {
  function Turtle(game, x, y) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'turtle');

    this.animations.add('walk-right', [8, 9, 10, 11, 12, 13, 14, 15], 12.5, true);
    this.animations.add('walk-left', [24, 25, 26, 27, 28, 29, 30, 31], 12.5, true);

    this.animations.play('walk-right');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    game.add.existing(this);

    this.body.collideWorldBounds = true;

    this.speed = 4;
    this.jumpVelocity = -400;
    this.currentJumpCount = 0;
    this.maximumJumpCount = 2;
  }

  Turtle.prototype = Object.create(Phaser.Sprite.prototype);
  Turtle.prototype.constructor = Turtle;

  Turtle.prototype.update = function() {
    if (this.body.velocity.y === 0) {
      this.currentJumpCount = 0;
    }
  };

  Turtle.prototype.jump = function() {
    if (this.currentJumpCount < this.maximumJumpCount) {
      this.currentJumpCount += 1;
      this.body.velocity.y = this.jumpVelocity;
    }
  };

  Turtle.prototype.moveLeft = function() {
    this.body.x -= this.speed;
  };

  Turtle.prototype.moveRight = function() {
    this.body.x += this.speed;
  };

  Turtle.prototype.turnLeft = function() {
    this.animations.play('walk-left');
  };

  Turtle.prototype.turnRight = function() {
    this.animations.play('walk-right');
  };

  return Turtle;
})();
