;(function() {
  'use strict';

var Helper = (function() {
  function Helper(game) {
    this.game = game;
    this.defaultStyle = {
      fontFamily: 'Uni',
      fontSize: 16
    };
  }

  Helper.prototype.addText = function(x, y, text, style) {
    var attribute,
        combinedStyle;

    combinedStyle = {};

    for (attribute in this.defaultStyle) {
      if (this.defaultStyle.hasOwnProperty(attribute)) {
        combinedStyle[attribute] = this.defaultStyle[attribute];
      }
    }

    for (attribute in style) {
      if (style.hasOwnProperty(attribute)) {
        combinedStyle[attribute] = style[attribute];
      }
    }

    combinedStyle.font = combinedStyle.fontSize + 'px ' + combinedStyle.fontFamily;
    delete combinedStyle.fontSize;
    delete combinedStyle.fontFamily;

    return this.game.add.text(x * 16, y * 8, text, combinedStyle);
  };

  return Helper;
})();

var goodies = {
  'bubble': {
    'name': 'bubble',
    'effects': [
      {
        'jumpHeightIncrease': -100,
        'duration': 4000
      }
    ]
  },
  'candy': {
    'name': 'candy',
    'effects': [
      {
        'addShell': true
      }
    ]
  },
  'chili': {
    'name': 'chili',
    'effects': [
      {
        'speedIncrease': 100,
        'duration': 4000
      }
    ]
  },
  'ice': {
    'name': 'ice',
    'effects': [
      {
        'speedIncrease': -150,
        'duration': 2000
      }
    ]
  },
  'salad': {
    'name': 'salad',
    'effects': [
    ]
  },
  'strawberry': {
    'name': 'strawberry',
    'effects': [
      {
        'healthIncrease': 1
      }
    ]
  }
};

var levelOne = {
  'name': 'Level 1: Overworld',
  'goal': {
    'position': {
      'x': 64,
      'y': 8,
    },
    'height': 8
  },
  'goodies': [
    {
      'goody': 'bubble',
      'positions': [
        {
          'x': 41,
          'y': 5
        }
      ]
    },
    {
      'goody': 'candy',
      'positions': [
        {
          'x': 7,
          'y': 4
        }
      ]
    },
    {
      'goody': 'chili',
      'positions': [
        {
          'x': 12,
          'y': 5
        },
        {
          'x': 14,
          'y': 8
        }
      ]
    },
    {
      'goody': 'ice',
      'positions': [
        {
          'x': 16,
          'y': 5
        }
      ]
    },
    {
      'goody': 'strawberry',
      'positions': [
        {
          'x': 16,
          'y': 8
        }
      ]
    }
  ],
  'platforms': [
    {
      'start': {
        'x': 4,
        'y': 7
      },
      'length': 6
    },
    {
      'start': {
        'x': 16,
        'y': 4
      },
      'length': 2
    }
  ]
};

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

    this.game = game;
    this.walkVelocity = 200;
    this.walkDrag = 800;
    this.isCheering = false;
    this.jumpVelocity = -400;
    this.currentJumpCount = 0;
    this.maximumJumpCount = 2;
    this.health = 3;
    this.hasShell = false;
    this.isInHazardousTerrain = false;
    this.auInterval = null;

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

    this.animations.play('walk-right-naked');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.x = this.walkDrag;
    this.body.collideWorldBounds = true;

    game.add.existing(this);
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
    if (!this.isCheering) {
      this.isCheering = true;

      this.animations.play('walk-right');

      this.body.collideWorldBounds = false;
      this.body.drag.x = 0;
      this.body.velocity.x = this.walkVelocity;
    }
  };

  Player.prototype.die = function() {
    this.animations.play('die');
  };

  Player.prototype.eatGoody = function(goody) {
    if (!this.isCheering) {
      var effect,
          effects;

      if (this.hasShell) {
        this.animations.play('eat', null, false);
      } else {
        this.animations.play('eat-naked', null, false);
      }

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
    }
  };

  Player.prototype.hitGround = function() {
    if (this.isInHazardousTerrain) {
      // this.animations.play('walk-right');

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
          this.damage(1);
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
          that.damage(1);
        }
      }, 1000);
    } else {
      clearInterval(this.auInterval);
    }
  };

  Player.prototype.jump = function() {
    if (!this.isCheering) {
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

        if (this.hasShell) {
          this.animations.play('jump', null, false);
        } else {
          this.animations.play('jump-naked', null, false);
        }

        if (previousAnimation) {
          this.events.onAnimationComplete.add(function() {
            that.animations.play(previousAnimation.name);
          });
        }
      }
    }
  };

  Player.prototype.moveLeft = function() {
    if (!this.isCheering) {
      this.body.velocity.x = -1 * this.walkVelocity;
    }
  };

  Player.prototype.moveRight = function() {
    if (!this.isCheering) {
      this.body.velocity.x = this.walkVelocity;
    }
  };

  Player.prototype.turnLeft = function() {
    if (!this.isCheering) {
      if (this.hasShell) {
        this.animations.play('walk-left');
      } else {
        this.animations.play('walk-left-naked');
      }
    }
  };

  Player.prototype.turnRight = function() {
    if (!this.isCheering) {
      if (this.hasShell) {
        this.animations.play('walk-right');
      } else {
        this.animations.play('walk-right-naked');
      }
    }
  };

  return Player;
})();

var Stork = (function() {
  function Stork(game, x, y, sprite) {
    var animations,
        firstFrame,
        framesPerAnimation,
        framesRange,
        lastFrame;

    Phaser.Sprite.call(this, game, x * 32, y * 32, sprite);

    this.hasHitPlayer = false;

    animations = [
      'peck'
    ];
    framesPerAnimation = 8;

    for (var i = 0, l = animations.length; i < l; i += 1) {
      firstFrame = framesPerAnimation * i;
      lastFrame = firstFrame + framesPerAnimation;
      framesRange = _.range(firstFrame, lastFrame);

      this.animations.add(animations[i], framesRange, 12.5, true);
    }

    this.animations.play('peck');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.body.bounce.setTo(1, 1);

    game.add.existing(this);
  }

  Stork.prototype = Object.create(Phaser.Sprite.prototype);
  Stork.prototype.constructor = Stork;


  Stork.prototype.hit = function(sprite) {
    if (!sprite.hasShell) {
      if (!this.hasHitPlayer) {
        sprite.damage(1);
        this.hasHitPlayer = true;
        var that = this;

        setTimeout( function() {
          that.hasHitPlayer = false;
        }, 500);
      } 
    } else {
      if (this.body.touching.up) {
        this.kill();
      }
    }

  };

  return Stork;
})();

var ImprintState = {
  create: function() {
    var textLabel,
        menuLabel;

    this.stage.backgroundColor = config.colors.lightGreen;

    menuLabel = helper.addText(0.5, 1, '← Menu');
    menuLabel.inputEnabled = true;
    menuLabel.events.onInputUp.add(function() {
      game.state.start('menu');
    });

    textLabel = helper.addText(3, 6,
        'This game was created by:\n' +
        '· Astrid Wühr\n' +
        '· Dominik Habersack\n' +
        '· Judith Steigemann\n' +
        '· Miriam Mayer'
    );
  }
};

var MenuState = {
  preload: function() {
    this.load.spritesheet('player', '/img/sprites/turtle.png', 32, 64);
  },

  create: function() {
    var game = this.game,
        imprintLabel,
        player,
        playLabel;

    this.stage.backgroundColor = config.colors.lightYellow;

    helper.addText(4, 4, 'TURTLE', { fontSize: 32, fill: config.colors.green });
    helper.addText(4, 8, 'A fun little game about a fun little turtle.');

    playLabel = helper.addText(3, 12, '→ Play');
    playLabel.inputEnabled = true;
    playLabel.events.onInputUp.add(function() {
      game.state.start('play');
    });

    imprintLabel = helper.addText(3, 14, '→ Imprint');
    imprintLabel.inputEnabled = true;
    imprintLabel.events.onInputUp.add(function() {
      game.state.start('imprint');
    });

    player = new Player(this.game, 6.5, 8, 0);
  }
};

var PlayState = {
  clouds: null,
  goal: null,
  goodies: null,
  isLevelComplete: null,
  isShowingCompleteMessage: null,
  layer: null,
  level: null,
  lifeGroup: null,
  platforms: null,
  player: null,
  stork: null,
  tilemap: null,

  preload: function() {
    var goodies,
        goody;

    goodies = config.goodies;
    for (goody in goodies) {
      if (goodies.hasOwnProperty(goody)) {
        this.load.image(goody, '/img/goodies/' + goody + '.png');
      }
    }

    this.load.image('cloud', '/img/images/cloud.png');
    this.load.image('forest-tiles', '/img/tiles/forest.png');
    this.load.image('life', '/img/images/life.png');
    this.load.image('platform', '/img/images/platform.png');

    this.load.spritesheet('player', '/img/sprites/turtle.png', 32, 64);
    this.load.spritesheet('stork', '/img/sprites/stork.png', 144, 144);

    this.load.spritesheet('world', '/img/tiles/forest.png', 32, 32);

    this.load.tilemap('forest-tilemap', '/img/tiles/forest.json', null, Phaser.Tilemap.TILED_JSON);
  },

  create: function() {
    this.level = config.levels[1];

    this.stage.backgroundColor = config.colors.lightBlue;

    this.tilemap = this.game.add.tilemap('forest-tilemap');
    this.tilemap.addTilesetImage('forest-tiles');

    this.layer = this.tilemap.createLayer('layer-1');
    this.layer.resizeWorld();

    this.initializeBeforePlayer();

    this.player = new Player(this.game, 1, 7);
    this.stork = new Stork(this.game, 58, 5, 'stork');

    this.tilemap.setCollision(2);
    this.tilemap.setTileIndexCallback(2, function() {
      this.player.hitGround();
      return true;
    }, this);

    this.tilemap.setTileIndexCallback(3, this.player.fallIntoHazardousTerrain, this.player);

    this.initializeAfterPlayer();
  },

  update: function() {
    var arcade,
        lifeGroup,
        newLife,
        newPosition,
        playerHealth,
        that;

    that = this;

    arcade = this.game.physics.arcade;

    lifeGroup = this.lifeGroup;
    playerHealth = this.player.health;

    arcade.collide(this.player, this.layer);

    arcade.overlap(this.player, this.goal, function(player) {
      that.isLevelComplete = true;

      player.cheer();
      that.showCompleteMessage();

      return false;
    });

    arcade.collide(this.player, this.goodies, function(player, goody) {
      player.eatGoody(goody);
      goody.kill();
    });

    arcade.collide(this.player, this.platforms);

    arcade.collide(this.player, this.stork, function(player, stork) {
      stork.hit(player);
    });

    if (playerHealth >= 0) {
     if (playerHealth < lifeGroup.length) {
        lifeGroup.getAt(playerHealth).destroy();
      } else if (playerHealth > lifeGroup.length) {
        newPosition = this.stage.bounds.width - playerHealth * 32;
        newLife = game.add.sprite(newPosition, 16, 'life');
        lifeGroup.addAt(newLife, lifeGroup.length);
      }
    }

    if (!this.isLevelComplete) {
      this.checkKeys();
    }
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

  initializeBeforePlayer: function() {
    this.initializeGoal();
    this.initializePlatforms();
  },

  initializeAfterPlayer: function() {
    this.initializeCamera();
    this.initializeClouds();
    this.initializeGoodies();
    this.initializeHealthBar();
    this.initializeKeyboard();
    this.initializeLabels();
    this.initializePhysics();
    this.initializeTitle();

    this.isLevelComplete = false;
  },

  initializeCamera: function() {
    this.game.camera.follow(this.player);
  },

  initializeGoal: function() {
    var goal,
        pole,
        top;

    goal = this.level.goal;

    this.goal = this.game.add.group();
    this.goal.enableBody = true;
    this.goal.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < goal.height - 1; i += 1) {
      pole = this.goal.create(goal.position.x * 32, (goal.position.y - i) * 32, 'world', 9);
      this.game.physics.enable(pole, Phaser.Physics.ARCADE);
      pole.body.allowGravity = false;
      pole.body.immovable = true;
    }

    top = this.goal.create(goal.position.x * 32, (goal.position.y - goal.height + 1) * 32, 'world', 10);
    this.game.physics.enable(top, Phaser.Physics.ARCADE);
    top.body.allowGravity = false;
    top.body.immovable = true;
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

  initializeHealthBar: function() {
    this.lifeGroup = game.add.group();
    this.lifeGroup.fixedToCamera = true;

    for (var i = 0; i < this.player.health; i += 1) {
      this.lifeGroup.create(this.stage.bounds.width - (i + 1) * 32, 16, 'life');
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

    menuLabel = helper.addText(1, 1, 'Menu');
    menuLabel.fixedToCamera = true;
    menuLabel.inputEnabled = true;

    menuLabel.events.onInputUp.add(function() {
      game.state.start('menu');
    });
  },

  initializePlatforms: function() {
    var entry,
        platform,
        platformStart;

    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;
    this.platforms.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0, l = this.level.platforms.length; i < l; i += 1) {
      entry = this.level.platforms[i];

      platformStart = entry.start;

      for (var j = 0; j < entry.length; j += 1) {
        platform = this.platforms.create((platformStart.x + j) * 32, platformStart.y * 32, 'world', 7);

        this.game.physics.enable(platform, Phaser.Physics.ARCADE);

        platform.body.allowGravity = false;
        platform.body.checkCollision.left = false;
        platform.body.checkCollision.right = false;
        platform.body.checkCollision.down = false;
        platform.body.immovable = true;
      }
    }
  },

  initializePhysics: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;
    this.game.physics.enable(this.player);
  },

  initializeTitle: function() {
    helper.addText(1, 4, config.levels[1].name, { fill: config.colors.gray });
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
  },

  showCompleteMessage: function() {
    if (!this.isShowingCompleteMessage) {
      var label = helper.addText(2, 8, 'Congratulations!', { fill: config.colors.lightYellow, fontSize: 48 });
      label.fixedToCamera = true;

      this.isShowingCompleteMessage = true;
    }
  }
};

var Config = (function() {
  function Config() {
    this.colors = {
      gray: '#bcbcbc',
      lightBlue: '#0078f8',
      blue: '#0058f8',
      purple: '#6844fc',
      magenta: '#d800cc',
      red: '#e40058',
      green: '#00a800',
      lightGreen: '#00b800',
      lightYellow: '#d8F878'
    };

    this.goodies = goodies;

    this.levels = {
      1: levelOne
    };
  }

  return Config;
})();

var config,
    game,
    helper,
    states;

config = new Config();

game = new Phaser.Game(480, 320, Phaser.AUTO, 'turtle');

helper = new Helper(game);

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