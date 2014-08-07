var Player = (function() {
  function Player(game, x, y, walkDrag, jumpVelocity, hasShell, isUnderWater, isSanta) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'player');

    this.aua = game.add.audio('aua', 0.3);
    this.gulp = game.add.audio('gulp', 0.3);
    this.wahoo = game.add.audio('wahoo', 0.3);
    this.whoop = game.add.audio('whoop', 0.3);
    this.woo = game.add.audio('woo', 0.3);


    this.damageInterval = null;
    this.currentJumpCount = 0;
    this.deathAnimation = null;
    this.facing = Phaser.RIGHT;
    this.hasShell = false;
    this.health = 3;
    this.isCheering = false;
    this.isDying = false;
    this.isInHazardousTerrain = false;
    this.isInHazardousWater = false;
    this.isOnSlidingTerrain = false;
    this.isSanta = false;
    this.isUnderWater = false;
    this.jumpVelocity = jumpVelocity;
    this.maximumJumpCount = 2;
    this.walkDrag = walkDrag;
    this.walkVelocity = 200;

    if (hasShell) {
      this.hasShell = hasShell;
    }

    if (isSanta) {
      this.isSanta = isSanta;
    }

    if (isUnderWater) {
      this.isUnderWater = isUnderWater;
    }

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

    helper.addAnimationsToSprite(this, this.animationNames, this.framesPerAnimation);

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

  Player.prototype.eatGoody = function(goodyName) {
    if (!this.isCheering && !this.isDying) {
      var animation,
          effect,
          effects,
          goody,
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

      goody = goodies[goodyName.name];
      effects = goody.effects;

      for (var i = 0, l = effects.length; i < l; i += 1) {
        effect = effects[i];

        if (effect.addShell) {
          this.addBooleanEffect('hasShell', effect.addShell, goody.duration);
        }

        if (effect.healthIncrease) {
          this.addEffect('health', effect.healthIncrease, goody.duration);
        }

        if (effect.speedIncrease) {
          this.addEffect('walkVelocity', effect.speedIncrease, goody.duration);
        }

        if (effect.jumpHeightIncrease) {
          this.addEffect('jumpVelocity', effect.jumpHeightIncrease, goody.duration);
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

  Player.prototype.enterHazardousTerrain = function() {
    if (!this.isInHazardousTerrain) {
      this.isInHazardousTerrain = true;
      this.takeDamage(1);

      this.setDamageInterval();
    }
  };

  Player.prototype.leaveHazardousTerrain = function() {
    if (this.isInHazardousTerrain) {
      this.isInHazardousTerrain = false;

      this.clearDamageInterval();
    }
  };

  Player.prototype.enterHazardousWater = function() {
    if (!this.isInHazardousWater) {
      this.isInHazardousWater = true;
      this.takeDamage(1);

      this.setDamageInterval();
    }
  };

  Player.prototype.leaveHazardousWater = function() {
    if (this.isInHazardousWater) {
      this.isInHazardousWater = false;

      this.clearDamageInterval();
    }
  };
  Player.prototype.clearDamageInterval = function() {
    clearInterval(this.damageInterval);
  };

  Player.prototype.setDamageInterval = function() {
    var that;

    that = this;

    this.damageInterval = setInterval(function() {
      that.takeDamage(1);
    }, 1000);
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
        this.whoop.play('', 0.2, 1, false);
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
