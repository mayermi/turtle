;(function() {
  'use strict';

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

  Player.prototype.cheer = function() {
    this.animations.play('cheer');
  };

  Player.prototype.die = function() {
    this.animations.play('die');
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
  layer: null,
  menuLabel: null,
  player: null,
  walls: null,

  preload: function() {
    this.load.image('forest-tiles', '/img/tiles/forest.png');
    this.load.image('wall', '/img/images/wall.png');

    this.load.spritesheet('player', '/img/sprites/gehen-groesser.png', 32, 48);

    this.load.tilemap('forest-tilemap', '/img/tiles/forest.json', null, Phaser.Tilemap.TILED_JSON);
  },

  create: function() {
    var cursorKeys,
        tilemap;

    tilemap = this.game.add.tilemap('forest-tilemap');
    tilemap.addTilesetImage('forest-tiles');

    this.layer = tilemap.createLayer('layer-1');
    this.layer.resizeWorld();

    this.player = new Player(this.game, 1, 6, 0);

    tilemap.setCollision(2);
    tilemap.setTileIndexCallback(2, function() {
      console.log('hit');
      return true;
    });

    this.menuLabel = this.add.text(10, 10, 'Menu', { 'font': '24px Lato' });
    this.menuLabel.fixedToCamera = true;
    this.menuLabel.inputEnabled = true;
    this.menuLabel.events.onInputUp.add(function() {
      game.state.start('menu');
    });

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;
    this.game.physics.enable(this.player);

    this.game.camera.follow(this.player);

    cursorKeys = this.input.keyboard.createCursorKeys();

    this.input.keyboard.addKeyCapture([
        cursorKeys.up,
        cursorKeys.down,
        cursorKeys.Left,
        cursorKeys.right,

        Phaser.Keyboard.SPACEBAR
    ]);

    var jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    jumpButton.onDown.add(this.player.jump, this.player);

    cursorKeys.right.onDown.add(this.player.turnRight, this.player);
    cursorKeys.left.onDown.add(this.player.turnLeft, this.player);

    this.walls = this.game.add.group();
    this.walls.enableBody = true;
    this.walls.physicsBodyType = Phaser.Physics.ARCADE;

    var wall = this.walls.create(128, 256, 'wall');
    wall.body.immovable = true;
    wall.body.allowGravity = false;
  },

  update: function() {
    this.game.physics.arcade.collide(this.player, this.layer);
    this.game.physics.arcade.collide(this.player, this.walls);

    this.checkKeys();
  },

  checkKeys: function() {
    var cursorKeys;

    cursorKeys = this.input.keyboard.createCursorKeys();

    if (cursorKeys.left.isDown) {
      this.player.moveLeft();
    }

    if (cursorKeys.right.isDown) {
      this.player.moveRight();
    }
  }
};

var game,
    states;

game = new Phaser.Game(480, 320, Phaser.AUTO, 'turtle');

states = {
  'imprint': ImprintState,
  'menu': MenuState,
  'play': PlayState
};

for (var key in states) {
  if (states.hasOwnProperty(key)) {
    game.state.add(key, states[key]);
  }
}

game.state.start('play');
}).call(this);