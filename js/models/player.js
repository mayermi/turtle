var Player = (function() {
  function Player(game, x, y) {
    var animations,
        firstFrame,
        framesPerAnimation,
        framesRange,
        lastFrame;

    Phaser.Sprite.call(this, game, x * 32, y * 32, 'player');

    this.walkVelocity = 200;
    this.walkDrag = 800;
    this.jumpVelocity = -400;
    this.currentJumpCount = 0;
    this.maximumJumpCount = 2;
    this.health = 3;
    this.isInHazardousTerrain = false;

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

  Player.prototype = Object.create(Phaser.Sprite.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.update = function() {
    if (this.body.velocity.y === 0) {
      this.currentJumpCount = 0;
    }
  };

  /* Custom methods */
  Player.prototype.cheer = function() {
    this.animations.play('cheer');

  };

  Player.prototype.die = function() {
    this.animations.play('die');
  };

  Player.prototype.hitGround = function() {
    if (this.isInHazardousTerrain) {
      if (!this.body.blocked.left && !this.body.blocked.right && !this.body.blocked.down){
        console.log('nicht wasser');
        this.isInHazardousTerrain = false;
      }
    }
  };

  Player.prototype.fallIntoHazardousTerrain = function() {
    if (!this.isInHazardousTerrain) {
      if (this.body.blocked.down) {
        console.log('auauauauau');
        this.isInHazardousTerrain = true;
      }
    }
  };

  Player.prototype.jump = function() {
    if (this.currentJumpCount < this.maximumJumpCount) {
      this.currentJumpCount += 1;
      this.body.velocity.y = this.jumpVelocity;
    }
  };

  Player.prototype.moveLeft = function() {
    this.body.velocity.x = -1 * this.walkVelocity;
  };

  Player.prototype.moveRight = function() {
    this.body.velocity.x = this.walkVelocity;
  };

  Player.prototype.turnLeft = function() {
    this.animations.play('walk-left');
  };

  Player.prototype.turnRight = function() {
    this.animations.play('walk-right');
  };

  return Player;
})();
