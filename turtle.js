;(function() {
  'use strict';

var Config = (function() {
  function Config() {
    var goody,
        that = this;

    this.goodies = {};

    $.getJSON('/config/goodies.json', function(goodies) {
      for (var i = 0, l = goodies.length; i < l; i += 1) {
        goody = goodies[i];
        that.goodies[goody.name] = goody;
      }
    });
  }

  return Config;
})();

var Goody = (function() {
  function Goody(game, x, y, sprite, effects) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, sprite);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = false;

    this.name = sprite;
    this.effects = effects;
  }

  Goody.prototype = Object.create(Phaser.Sprite.prototype);
  Goody.prototype.constructor = Goody;

  return Goody;
})();

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
    this.auInterval = null;

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

    effects = config.goodies[goody.name].effects;

    for (var i = 0, l = effects.length; i < l; i += 1) {
      effect = effects[i];

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
      if (!this.body.blocked.left && !this.body.blocked.right && !this.body.blocked.down){
        console.log('nicht wasser');
        this.isInHazardousTerrain = false;
        this.au();
      }
    }
  };

  Player.prototype.fallIntoHazardousTerrain = function() {
    if (!this.isInHazardousTerrain) {
      if (this.body.blocked.down) {
        console.log('auauauauau');
        this.isInHazardousTerrain = true;
        this.au();
      }
    }
  };

  Player.prototype.au = function() {
    if (this.isInHazardousTerrain){
          this.auInterval = setInterval(this.hurt, 1000);
    } else {
      clearInterval(this.auInterval);
    }
  };

  Player.prototype.hurt = function() {
    console.log('eiei');
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
  clouds: null,
  goodies: null,
  healthLabel: null,
  layer: null,
  level: null,
  player: null,

  preload: function() {
    var goodies,
        goody;

    goodies = config.goodies;

    for (goody in goodies) {
      if (goodies.hasOwnProperty(goody)) {
        this.load.image(goody, '/img/goodies/' + goody + '.png');
      }
    }

    this.load.image('forest-tiles', '/img/tiles/forest.png');
    this.load.image('cloud', '/img/images/cloud.png');

    this.load.spritesheet('player', '/img/sprites/gehen-groesser.png', 32, 48);

    this.load.tilemap('forest-tilemap', '/img/tiles/forest.json', null, Phaser.Tilemap.TILED_JSON);

    this.level = new Level(game, 1);
  },

  create: function() {
    var tilemap;

    tilemap = this.game.add.tilemap('forest-tilemap');
    tilemap.addTilesetImage('forest-tiles');

    this.layer = tilemap.createLayer('layer-1');
    this.layer.resizeWorld();

    this.player = new Player(this.game, 1, 7, 0);

    tilemap.setCollision(2);
    tilemap.setTileIndexCallback(2, function() {
      this.player.hitGround();
      return true;
    }, this);

    tilemap.setTileIndexCallback(3, this.player.fallIntoHazardousTerrain, this.player);

    this.healthLabel = this.add.text(380, 10, 'Health');
    this.healthLabel.fixedToCamera = true;

    this.menuLabel = this.add.text(10, 10, 'Menu');
    this.menuLabel.fixedToCamera = true;
    this.menuLabel.inputEnabled = true;
    this.menuLabel.events.onInputUp.add(function() {
      game.state.start('menu');
    });

    this.initialize();
  },

  update: function() {
    this.game.physics.arcade.collide(this.player, this.layer);
    this.game.physics.arcade.collide(this.player, this.goodies, function(player, goody) {
      player.eatGoody(goody);
      goody.kill();
    });

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
  },

  initialize: function() {
    this.initializeCamera();
    this.initializeClouds();
    this.initializeGoodies();
    this.initializeKeyboard();
    this.initializeLabels();
    this.initializePhysics();
  },

  initializeCamera: function() {
    this.game.camera.follow(this.player);
  },

  initializeClouds: function() {
    this.clouds = this.game.add.group();
    this.clouds.enableBody = true;
    this.clouds.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0, l = 8; i < l; i += 1) {
      this.addCloud(_.random(0, this.world.bounds.width / 32) * 32);
    }
  },

  initializeGoodies: function() {
    var goodiesEntry,
        position,
        positions;

    this.goodies = this.game.add.group();
    this.goodies.enableBody = true;
    this.goodies.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0, l = this.level.goodies.length; i < l; i += 1) {
      goodiesEntry = this.level.goodies[i];
      positions = goodiesEntry.positions;

      for (var j = 0, k = positions.length; j < k; j += 1) {
        position = positions[j];

        this.goodies.add(new Goody(this.game, position.x, position.y, goodiesEntry.goody));
      }
    }
  },

  initializeKeyboard: function() {
    var cursorKeys;

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
  },

  initializeLabels: function() {
    var menuLabel;

    menuLabel = this.add.text(10, 10, 'Menu');
    menuLabel.fixedToCamera = true;
    menuLabel.inputEnabled = true;

    menuLabel.events.onInputUp.add(function() {
      game.state.start('menu');
    });

    this.healthLabel = this.add.text(380, 10, 'Health');
    this.healthLabel.fixedToCamera = true;
  },

  initializePhysics: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;
    this.game.physics.enable(this.player);
  },

  addCloud: function(x) {
    var cloud,
        that = this;

    if (typeof x === 'undefined') {
      x = this.world.bounds.width;
    }

    cloud = this.clouds.create(x, _.random(1, 3) * 32, 'cloud');
    cloud.body.velocity.x = -1 * _.random(1, 2) * 32;
    cloud.body.allowGravity = false;
    cloud.checkWorldBounds = true;
    cloud.events.onKilled.add(function() {
      that.addCloud();
    });
    cloud.outOfBoundsKill = true;
  }
};

var Level = (function() {
  function Level(game, id) {
    var that = this;

    this.goodies = [];

    $.getJSON('/config/levels/level-' + id + '.json', function(level) {
      that.name = level.name;
      that.goodies = level.goodies;
    });
  }

  return Level;
})();

var config,
    game,
    states;

config = new Config();

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