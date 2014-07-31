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
      'walk-right',
      'walk-left',
      'walk-right-naked',
      'walk-left-naked',
      'eat',
      'eat-naked',
      'jump',
      'jump-naked'
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
  Player.prototype.addEffect = function(property, valueChange, duration) {
    var that;

    that = this;

    that[property] += valueChange;

    if (duration) {
      setTimeout(function() {
        that[property] -= valueChange;
      }, duration);
    }
  };

  Player.prototype.cheer = function() {
    this.animations.play('cheer');

  };

  Player.prototype.die = function() {
    this.animations.play('die');
  };

  Player.prototype.eatGoody = function(goody) {
    var effect,
        effects;

    this.animations.play('eat', null, false);

    effects = config.goodies[goody.name].effects;

    for (var i = 0, l = effects.length; i < l; i += 1) {
      effect = effects[i];

      if (effect.healthIncrease) {
        this.addEffect('health', effect.healthIncrease, effect.duration);
      }

      if (effect.speedIncrease) {
        this.addEffect('walkVelocity', effect.speedIncrease, effect.duration);
      }

      if (effect.jumpHeightIncrease) {
        this.addEffect('jumpVelocity', effect.jumpHeightIncrease, effect.duration);
      }
    }
  };

  Player.prototype.hitGround = function() {
    if (this.isInHazardousTerrain) {
      console.log('nicht wasser');
      this.isInHazardousTerrain = false;
      this.animations.play('walk-right');
    }
  };

  Player.prototype.fallIntoHazardousTerrain = function() {
    if (!this.isInHazardousTerrain) {
      console.log('auauauauau');
      this.isInHazardousTerrain = true;
    }
  };

  Player.prototype.jump = function() {
    var previousAnimation,
        that,
        wasWalking;

    that = this;

    wasWalking = this.animations.currentAnim.name.indexOf('walk') === 0;
    if (wasWalking) {
      previousAnimation = this.animations.currentAnim;
    }

    if (this.currentJumpCount < this.maximumJumpCount) {
      this.animations.stop();

      this.body.velocity.y = this.jumpVelocity;
      this.currentJumpCount += 1;

      this.animations.play('jump', null, false);
      if (previousAnimation) {
        this.events.onAnimationComplete.add(function() {
          that.animations.play(previousAnimation.name);
        });
      }
    }
  };

  Player.prototype.moveLeft = function() {
    this.body.velocity.x = -1 * this.walkVelocity;
  };

  Player.prototype.moveRight = function() {
    this.body.velocity.x = this.walkVelocity;
  };

  Player.prototype.turnLeft = function() {
    console.log('turn left');
    this.animations.play('walk-left');
  };

  Player.prototype.turnRight = function() {
    this.animations.play('walk-right');
  };

  return Player;
})();
