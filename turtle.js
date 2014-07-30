;(function() {
  'use strict';

var Link = (function() {
  function Link(game, x, y) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'link');

    this.animations.add('walk-north', [0, 1, 2, 3, 4, 5, 6, 7], 12.5, true);
    this.animations.add('walk-east', [8, 9, 10, 11, 12, 13, 14, 15], 12.5, true);
    this.animations.add('walk-south', [16, 17, 18, 19, 20, 21, 22, 23], 12.5, true);
    this.animations.add('walk-west', [24, 25, 26, 27, 28, 29, 30, 31], 12.5, true);

    this.animations.play('walk-east');

    game.add.existing(this);
  }

  Link.prototype = Object.create(Phaser.Sprite.prototype);
  Link.prototype.constructor = Link;

  Link.prototype.turnNorth = function() {
    this.animations.play('walk-north');
  };

  Link.prototype.turnEast = function() {
    this.animations.play('walk-east');
  };

  Link.prototype.turnSouth = function() {
    this.animations.play('walk-south');
  };

  Link.prototype.turnWest = function() {
    this.animations.play('walk-west');
  };

  return Link;
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
  link: null,
  menuLabel: null,

  preload: function() {
    this.load.image('forest-tiles', '/img/tiles/forest.png');

    this.load.spritesheet('link', '/img/sprites/link.png', 24, 24);

    this.load.tilemap('forest-tilemap', '/img/tiles/forest.json', null, Phaser.Tilemap.TILED_JSON);
  },

  create: function() {
    var layer,
        tilemap;

    tilemap = this.add.tilemap('forest-tilemap');
    tilemap.addTilesetImage('forest-tiles');
    tilemap.setCollision([1, 2, 3, 4, 12, 13, 14, 15]);

    layer = tilemap.createLayer('layer-1');
    layer.resizeWorld();

    this.link = new Link(this.game, 9, 5, 0);

    this.menuLabel = this.add.text(10, 10, 'Menu', { 'font': '24px Lato' });
    this.menuLabel.fixedToCamera = true;
    this.menuLabel.inputEnabled = true;
    this.menuLabel.events.onInputUp.add(function() {
      game.state.start('menu');
    });

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.input.keyboard.addKeyCapture([
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT
    ]);

    var upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(this.link.turnNorth, this.link);

    var downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(this.link.turnSouth, this.link);

    var rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(this.link.turnEast, this.link);

    var leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(this.link.turnWest, this.link);
  },

  update: function() {
    // this.checkKeys();
  },

  // checkKeys: function() {
  //   var cursorKeys = this.input.keyboard.createCursorKeys();

  //   if (cursorKeys.up.isDown) {
  //   }

  //   if (cursorKeys.down.isDown) {
  //   }

  //   if (cursorKeys.left.isDown) {
  //   }

  //   if (cursorKeys.right.isDown) {
  //   }
  // }
};

var game;

game = new Phaser.Game(480, 320, Phaser.AUTO, 'turtle');

game.state.add('imprint', ImprintState);
game.state.add('menu', MenuState);
game.state.add('play', PlayState);

game.state.start('play');
}).call(this);