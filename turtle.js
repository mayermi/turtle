;(function() {
  'use strict';

var Turtle = (function() {
  function Turtle(game, x, y) {
    var animations,
        firstFrame,
        framesPerAnimation,
        framesRange,
        lastFrame;

    Phaser.Sprite.call(this, game, x * 32, y * 32, 'turtle');

    animations = [
      'cheer',
      'walk-right',
      'die',
      'walk-left'
    ];
    framesPerAnimation = 8;

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

var ImprintState = {
  create: function() {
    var textLabel,
        menuLabel;

    this.stage.backgroundColor = '#BFEFFF';

    menuLabel = this.add.text(10, 10, 'Menu');
    menuLabel.inputEnabled = true;
    menuLabel.events.onInputUp.add(function() {
      game.state.start('menu');
    });

    textLabel = this.add.text(10, 40, 'This game was created by:\nAstrid Wühr\nDominik Habersack\nJudith Steigemann\nMiriam Mayer');
  }
};

var MenuState = {
  preload: function() {
  },

  create: function() {
    var game = this.game,
        imprintLabel,
        playLabel;

    this.stage.backgroundColor = '#BFEFFF';

    playLabel = this.add.text(10, 10, 'Play');
    playLabel.inputEnabled = true;
    playLabel.events.onInputUp.add(function() {
      game.state.start('play');
    });

    imprintLabel = this.add.text(380, 10, 'Imprint');
    imprintLabel.inputEnabled = true;
    imprintLabel.events.onInputUp.add(function() {
      game.state.start('imprint');
    });

  },

  update: function() {
  }
};

var PlayState = {
  turtle: null,
  menuLabel: null,

  preload: function() {
    this.load.image('forest-tiles', '/img/tiles/forest.png');

    this.load.spritesheet('turtle', '/img/sprites/turtle.png', 24, 24);

    this.load.tilemap('forest-tilemap', '/img/tiles/forest.json', null, Phaser.Tilemap.TILED_JSON);
  },

  create: function() {
    var cursorKeys,
        layer,
        tilemap;

    tilemap = this.add.tilemap('forest-tilemap');
    tilemap.addTilesetImage('forest-tiles');
    tilemap.setCollision([1, 2, 3, 4, 12, 13, 14, 15]);

    layer = tilemap.createLayer('layer-1');
    layer.resizeWorld();

    this.turtle = new Turtle(this.game, 1, 8, 0);

    this.menuLabel = this.add.text(10, 10, 'Menu', { 'font': '24px Lato' });
    this.menuLabel.fixedToCamera = true;
    this.menuLabel.inputEnabled = true;
    this.menuLabel.events.onInputUp.add(function() {
      game.state.start('menu');
    });

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;

    cursorKeys = this.input.keyboard.createCursorKeys();

    this.input.keyboard.addKeyCapture([
        cursorKeys.up,
        cursorKeys.down,
        cursorKeys.Left,
        cursorKeys.right,

        Phaser.Keyboard.SPACEBAR
    ]);

    var jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    jumpButton.onDown.add(this.turtle.jump, this.turtle);

    cursorKeys.right.onDown.add(this.turtle.turnRight, this.turtle);
    cursorKeys.left.onDown.add(this.turtle.turnLeft, this.turtle);
  },

  update: function() {
    this.checkKeys();
  },

  checkKeys: function() {
    var cursorKeys;

    cursorKeys = this.input.keyboard.createCursorKeys();

    if (cursorKeys.left.isDown) {
      this.turtle.moveLeft();
    }

    if (cursorKeys.right.isDown) {
      this.turtle.moveRight();
    }
  }
};

var game;

game = new Phaser.Game(480, 320, Phaser.AUTO, 'turtle');

game.state.add('imprint', ImprintState);
game.state.add('menu', MenuState);
game.state.add('play', PlayState);

game.state.start('play');
}).call(this);