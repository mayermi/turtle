var Player = (function() {
  function Player(game, x, y, walkDrag, jumpVelocity, hasShell, isUnderWater, isSanta) {
    var firstFrame,
        framesRange,
        lastFrame;

    Phaser.Sprite.call(this, game, x * 32, y * 32, 'player');

    this.wahoo = game.add.audio('wahoo',1);
    this.aua = game.add.audio('aua',1);
    this.gulp = game.add.audio('gulp',1);
    this.woo = game.add.audio('woo',1);

    this.facing = Phaser.RIGHT;
    this.walkVelocity = 200;
    this.walkDrag = walkDrag;
    this.isCheering = false;
    this.isUnderWater = isUnderWater;
    this.jumpVelocity = jumpVelocity;
    this.currentJumpCount = 0;
    this.maximumJumpCount = 2;
    this.health = 3;
    this.hasShell = hasShell;
    this.isInHazardousTerrain = false;
    this.auInterval = null;
    this.deathAnimation = null;
    this.isDying = false;

    if (isSanta) {
      this.isSanta = isSanta;
    } else {
      this.isSanta = false;
    }

    this.isWalking = true;
    this.isJumping = false;
    this.isOnSlidingTerrain = false;

    this.animationNames = [
      'walk-right',
      'walk-left',
      'walk-right-naked',
      'walk-left-naked',
      'eat-right',
      'eat-right-naked',
      'jump-right',
      'jump-right-naked',
      'jump-left',
      'jump-left-naked',
      'eat-left',
      'eat-left-naked',
      'die-right',
      'die-left',
      'die-right-naked',
      'die-left-naked',
      'cheer',
      'swim-right',
      'swim-left',
      'eat-right-underwater',
      'eat-left-underwater',
      'cheer-underwater',
      'die-left-underwater',
      'die-right-underwater',
      'walk-right-santa',
      'walk-left-santa',
      'eat-right-santa',
      'eat-left-santa',
      'jump-right-santa',
      'jump-left-santa',
      'die-right-santa',
      'die-left-santa',
      'cheer-santa'
    ];
    this.framesPerAnimation = 10;

    for (var i = 0, l = this.animationNames.length; i < l; i += 1) {
      firstFrame = this.framesPerAnimation * i;
      lastFrame = firstFrame + this.framesPerAnimation;
      framesRange = _.range(firstFrame, lastFrame);

      this.animations.add(this.animationNames[i], framesRange, 12.5, true);
    }

    if (this.isSanta) {
      this.animations.play('walk-right-santa');
    } else if (this.isUnderWater) {
      this.animations.play('swim-right');
    } else if (this.hasShell) {
      this.animations.play('walk-right');
    } else {
      this.animations.play('walk-right-naked');
    }

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.x = this.walkDrag;
    this.body.collideWorldBounds = true;

    this.events.onKilled.add(this.die, this);

    game.add.existing(this);
  }

  Player.prototype = Object.create(Phaser.Sprite.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.update = function() {
    var currentAnimation,
        indexOfSuffix,
        isEatingAnimation,
        isNakedAnimation,
        nakedSuffix,
        newAnimation;

    currentAnimation = this.animations.currentAnim.name;
    isEatingAnimation = currentAnimation.indexOf('eat-') === 0;

    if (!isEatingAnimation) {
      nakedSuffix = '-naked';
      indexOfSuffix = currentAnimation.indexOf(nakedSuffix, 0);
      isNakedAnimation = indexOfSuffix !== -1;

      if (this.hasShell && isNakedAnimation) {
        newAnimation = currentAnimation.substring(0, indexOfSuffix);
        this.animations.play(newAnimation);
      }
    }

    if ((this.body.facing === Phaser.LEFT && this.facing !== Phaser.LEFT) ||
        (this.body.facing === Phaser.RIGHT && this.facing !== Phaser.RIGHT)) {
      this.facing = this.body.facing;
    }

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

  Player.prototype.addBooleanEffect = function(property, value, duration) {
    var that;

    that = this;

    that[property] = value;

    if (duration) {
      setTimeout(function() {
        that[property] = !value;
      }, duration);
    }
  };

  Player.prototype.cheer = function() {
    var animation,
        that;

    animation = 'cheer';
    that = this;

    if (!this.isCheering) {
      this.isCheering = true;

      this.body.collideWorldBounds = false;
      this.body.velocity.x = this.walkVelocity;
      this.body.drag.x = that.walkVelocity;

      if (this.isSanta) {
        animation += '-santa';
      } else if (this.isUnderWater) {
        animation += '-underwater';
      }

      setTimeout(function() {
        that.animations.play(animation);

        setTimeout(function() {
          if (that.isUnderWater) {
            that.animations.play('swim-right');
          } else {
            if (that.isSanta) {
              that.animations.play('walk-right-santa');
            } else {
              if (!that.hasShell) {
                that.animations.play('walk-right-naked');
              } else {
                that.animations.play('walk-right');
              }
            }
          }

          that.body.velocity.x = that.walkVelocity / 2;
          that.body.drag.x = 0;
        }, 3750);
      }, 1000);
    }
  };

  Player.prototype.die = function() {
    var finalFrameIndex = this.animationNames.indexOf(this.deathAnimation) * this.framesPerAnimation + this.framesPerAnimation - 1;

    this.visible = true;
    this.frame = finalFrameIndex;
  };

  Player.prototype.eatGoody = function(goody) {
    if (!this.isCheering && !this.isDying) {
      var animation,
          effect,
          effects,
          previousAnimation;

      animation = 'eat-';
      this.gulp.play();
      previousAnimation = this.animations.currentAnim.name;

      animation += this.facing === Phaser.LEFT ? 'left' : 'right';

      if (this.isSanta) {
        animation += '-santa';
      } else if (this.isUnderWater) {
        animation += '-underwater';
      }

      if (!this.hasShell) {
        animation += '-naked';
      }

      this.animations.play(animation, null, false);

      effects = config.goodies[goody.name].effects;

      for (var i = 0, l = effects.length; i < l; i += 1) {
        effect = effects[i];

        if (effect.addShell) {
          this.addBooleanEffect('hasShell', effect.addShell, effect.duration);
        }

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

      var wasMoving = previousAnimation.indexOf('walk') === 0 || previousAnimation.indexOf('swim') === 0;
      var that = this;

      if (wasMoving) {
        this.events.onAnimationComplete.add(function() {
          that.animations.play(previousAnimation);
        });
      }
    }
  };

  Player.prototype.hitGround = function() {
    if (this.isInHazardousTerrain) {
      if (!this.body.blocked.left && !this.body.blocked.right && !this.body.blocked.down){
        this.isInHazardousTerrain = false;
        this.au();
      }
    }
  };

  Player.prototype.fallIntoHazardousTerrain = function() {
    if (this.alive){
      if (!this.isInHazardousTerrain) {
        if (this.body.blocked.down) {
          this.takeDamage(1);
          this.isInHazardousTerrain = true;
          this.au();
        }
      }
    }
  };

  Player.prototype.au = function() {
    var that;

    that = this;

    if (this.isInHazardousTerrain) {
      this.auInterval = setInterval(function() {
        if (that.alive) {
          that.takeDamage(1);
        }
      }, 1000);
    } else {
      clearInterval(this.auInterval);
    }
  };

  Player.prototype.takeDamage = function(hits) {
    if (!this.isCheering && !this.isDying) {
      if (this.health - hits <= 0) {
        this.isDying = true;
        this.body.immovable = true;

        this.health = 0;
        this.deathAnimation = 'die-';

        this.deathAnimation += (this.facing === Phaser.LEFT) ? 'left' : 'right';

        if (this.isSanta) {
          this.deathAnimation += '-santa';
        } else if (this.isUnderWater) {
          this.deathAnimation += '-underwater';
        }

        if (!this.hasShell) {
          this.deathAnimation += '-naked';
        }

        this.animations.play(this.deathAnimation, null, false, true);
      } else {
        this.aua.play();
        this.damage(hits);
      }
    }
  };

  Player.prototype.jump = function() {
    if (!this.isCheering && !this.isDying) {
      if (!this.isUnderWater) {
        var animation,
            previousAnimation,
            that,
            wasWalking;

        animation = 'jump-';
        that = this;

        wasWalking = this.animations.currentAnim.name.indexOf('walk') === 0;
        if (wasWalking) {
          previousAnimation = this.animations.currentAnim;
        }

        if (this.currentJumpCount < this.maximumJumpCount) {
          this.animations.stop();

          if (this.currentJumpCount === 0){
            this.woo.play();
          } else if (this.currentJumpCount === 1) {
            this.wahoo.play();
          }

          this.body.velocity.y = this.jumpVelocity;
          this.currentJumpCount += 1;

          animation += (this.facing === Phaser.LEFT) ? 'left' : 'right';

          if (this.isSanta) {
            animation += '-santa';
          } else if (!this.hasShell) {
            animation += '-naked';
          }

          this.animations.play(animation, null, false);

          if (previousAnimation) {
            this.events.onAnimationComplete.add(function() {
              that.animations.play(previousAnimation.name);
            });
          }
        }
      } else {
        this.body.velocity.y = this.jumpVelocity;
      }
    }
  };

  Player.prototype.moveLeft = function() {
    if (!this.isCheering && !this.isDying) {
      this.body.velocity.x = -1 * this.walkVelocity;
    }
  };

  Player.prototype.moveRight = function() {
    if (!this.isCheering && !this.isDying) {
      this.body.velocity.x = this.walkVelocity;
    }
  };

  Player.prototype.resetSlide = function() {
    if (this.isOnSlidingTerrain) {
      this.isOnSlidingTerrain = false;

      this.body.drag.x = this.walkDrag;
    }
  };

  Player.prototype.slide = function() {
    if (!this.isOnSlidingTerrain) {
      this.isOnSlidingTerrain = true;

      this.body.drag.x = this.walkDrag / 5;
    }
  };

  Player.prototype.turnLeft = function() {
    if (!this.isCheering && !this.isDying) {
      var animation;

      animation = this.isUnderWater ? 'swim' : 'walk';
      animation += '-left';

      if (this.isSanta) {
        animation += '-santa';
      } else if (!this.hasShell) {
        animation += '-naked';
      }

      this.animations.play(animation);
      this.facing = Phaser.LEFT;
    }
  };

  Player.prototype.turnRight = function() {
    if (!this.isCheering && !this.isDying) {
      var animation;

      animation = this.isUnderWater ? 'swim' : 'walk';
      animation += '-right';

      if (this.isSanta) {
        animation += '-santa';
      } else if (!this.hasShell) {
        animation += '-naked';
      }

      this.animations.play(animation);
      this.facing = Phaser.RIGHT;
    }
  };

  return Player;
})();
