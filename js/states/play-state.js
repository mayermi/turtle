var PlayState = {
  clouds: null,
  currentLevel: null,
  fx: null,
  goal: null,
  goodies: null,
  isLevelComplete: null,
  isShowingCompleteMessage: null,
  levelNameLabel: null,
  label: null,
  layer: null,
  level: null,
  lifeGroup: null,
  minions: null,
  backgroundMusic: null,
  platforms: null,
  player: null,
  slidingTerrain: null,
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
    game.load.audio('happy', 'music/Happy.mp3');
    game.load.audio('aua', 'music/Aua.mp3');
    game.load.audio('wahoo', 'music/Wahoo.mp3');
    game.load.audio('gulp', 'music/Gulp.mp3');
    game.load.audio('woo', 'music/Woo.mp3');
    game.load.audio('dring', 'music/Dring.mp3');
    game.load.audio('plop', 'music/Plop.mp3');
    game.load.audio('music', 'music/Backgroundmusic.wav');

    this.load.image('cloud', '/img/images/cloud.png');
    this.load.image('forest-tiles', '/img/tiles/forest.png');
    this.load.image('sea-tiles', '/img/tiles/sea.png');
    this.load.image('winter-tiles', '/img/tiles/winter.png');
    this.load.image('life', '/img/images/life.png');
    this.load.image('platform', '/img/images/platform.png');

    this.load.spritesheet('player', '/img/sprites/turtle.png', 32, 64);
    this.load.spritesheet('stork', '/img/sprites/stork.png', 144, 144);
    this.load.spritesheet('worm', '/img/sprites/worm.png', 48, 16);

    this.load.spritesheet('world', '/img/tiles/forest.png', 32, 32);

    this.load.tilemap('forest-tilemap', '/img/tiles/forest.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('sea-tilemap', '/img/tiles/sea.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('winter-tilemap', '/img/tiles/winter.json', null, Phaser.Tilemap.TILED_JSON);
  },

  create: function() {
    this.fx = game.add.audio('music');
    this.fx.addMarker('cave', 0, 15, 1, true);
    this.fx.addMarker('sea', 14.95, 16.05, 1, true);
    this.fx.addMarker('happy', 33, 16, 1, true);
    this.fx.addMarker('lava', 50, 13, 1, true);
    this.fx.addMarker('final', 64, 5, 1, false);

    this.currentLevel = 0;
    this.startLevel(this.currentLevel);
  },

  update: function() {
    var lifeGroup,
        newLife,
        newPosition,
        playerHealth;

    lifeGroup = this.lifeGroup;
    playerHealth = this.player.health;

    this.checkPlayerCollisions();
    this.checkMinionCollisions();

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

  checkMinionCollisions: function() {
    var arcade;

    arcade = this.game.physics.arcade;

    arcade.collide(this.minions, this.layer);
    arcade.collide(this.minions, this.platforms);
  },

  checkPlayerCollisions: function() {
    var arcade,
        that;

    arcade = this.game.physics.arcade;
    that = this;

    arcade.overlap(this.player, this.goal, function(player) {
      that.isLevelComplete = true;

      player.cheer();

      that.fx.pause();
      that.fx.play('final');
      that.showCompleteMessage();
      player.checkWorldBounds = true;

      return false;
    });

    arcade.collide(this.player, this.goodies, function(player, goody) {
      player.eatGoody(goody);
      goody.kill();
    });

    arcade.collide(this.player, this.layer, function(player) {
      player.resetSlide();
    });

    arcade.collide(this.player, this.minions, function(player, minion) {
      minion.hit(player);
    });

    arcade.collide(this.player, this.platforms, function(player) {
      player.resetSlide();
    });

    arcade.collide(this.player, this.slidingTerrain, function(player) {
      player.slide();
    });

    arcade.collide(this.player, this.stork, function(player, stork) {
      stork.hit(player);
    });
  },

  initializeBeforePlayer: function() {
    this.initializeGoal();
    this.initializePhysics();
    this.initializePlatforms();
    this.initializeSlidingTerrain();
  },

  initializeAfterPlayer: function() {
    this.initializeCamera();
    this.initializeClouds();
    this.initializeGoodies();
    this.initializeHealthBar();
    this.initializeKeyboard();
    this.initializeLabels();
    this.initializeMinions();
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
      pole = this.goal.create(goal.position.x * 32, (goal.position.y - i) * 32, 'world', 11);
      this.game.physics.enable(pole, Phaser.Physics.ARCADE);
      pole.body.allowGravity = false;
      pole.body.immovable = true;
    }

    top = this.goal.create(goal.position.x * 32, (goal.position.y - goal.height + 1) * 32, 'world', 7);
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

  initializeMinions: function() {
    this.minions = this.game.add.group();

    // for (var j = 0; j < 8; j += 1) {
    this.minions.add(new Minion(this.game, 12, 8, 'worm'));
    this.minions.add(new Minion(this.game, 16, 8, 'worm'));
    // }
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
    var menuLabel,
        that = this;

    menuLabel = helper.addText(1, 1, 'Menu');
    menuLabel.fixedToCamera = true;
    menuLabel.inputEnabled = true;

    menuLabel.events.onInputUp.add(function() {
      that.fx.stop();
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

      for (var j = 0, k = entry.length; j < k; j += 1) {
        var tileIndex = 4;
        if (j > 0) {
          tileIndex = 5;
        }
        if (j === k) {
          tileIndex = 6;
        }

        platform = this.platforms.create((platformStart.x + j) * 32, platformStart.y * 32, 'world', tileIndex);

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
    this.game.physics.arcade.gravity.y = this.level.physics.gravity;
  },

  initializeSlidingTerrain: function() {
    if (this.level.slidingTerrain) {
      var entry,
          terrain,
          terrainStart;

      this.slidingTerrain = this.game.add.group();
      this.slidingTerrain.enableBody = true;
      this.slidingTerrain.physicsBodyType = Phaser.Physics.ARCADE;

      for (var i = 0, l = this.level.slidingTerrain.length; i < l; i += 1) {
        entry = this.level.slidingTerrain[i];

        terrainStart = entry.start;

        for (var j = 0; j < entry.length; j += 1) {
          terrain = this.slidingTerrain.create((terrainStart.x + j) * 32, terrainStart.y * 32, 'world', 10);

          this.game.physics.enable(terrain, Phaser.Physics.ARCADE);

          terrain.body.allowGravity = false;
          terrain.body.checkCollision.left = false;
          terrain.body.checkCollision.right = false;
          terrain.body.checkCollision.down = false;
          terrain.body.immovable = true;
        }
      }
    }
  },

  initializeTitle: function() {
    this.levelNameLabel = helper.addText(1, 4, this.level.name, { fill: config.colors.gray });
  },

  startLevel: function(id) {
    var playerConfiguration;

    if (this.clouds) {
      this.clouds.destroy();
    }

    if (this.goal) {
      this.goal.destroy();
    }

    if (this.goodies) {
      this.goodies.destroy();
    }

    if (this.label) {
      this.label.destroy();
    }

    if (this.layer) {
      this.layer.destroy();
    }

    if (this.levelNameLabel) {
      this.levelNameLabel.destroy();
    }

    if (this.lifeGroup) {
      this.lifeGroup.destroy();
    }

    if (this.minions) {
      this.minions.destroy();
    }

    if (this.platforms) {
      this.platforms.destroy();
    }

    this.player = null;
    this.stork = null;
    this.tilemap = null;

    this.isLevelComplete = false;
    this.isShowingCompleteMessage = false;

    this.level = config.levels[id];

    this.stage.backgroundColor = config.colors.lightBlue;
    this.fx.stop();
    this.fx.play(this.level.backgroundMusic, true);

    this.tilemap = this.game.add.tilemap(this.level.tilemap);
    this.tilemap.addTilesetImage(this.level.tilemapImage);

    this.layer = this.tilemap.createLayer('layer-1');
    this.layer.resizeWorld();

    this.initializeBeforePlayer();

    playerConfiguration = this.level.player;
    this.player = new Player(this.game, 1, 7, playerConfiguration.walkDrag, playerConfiguration.jumpVelocity, playerConfiguration.hasShell, playerConfiguration.isUnderWater, playerConfiguration.isSanta);
    this.stork = new Stork(this.game, 58, 5, 'stork');

    this.player.checkWorldBounds = false;
    var that = this;
    this.player.events.onOutOfBounds.add(function() {
      if ((that.currentLevel += 1) < config.levels.length) {
        that.startLevel(that.currentLevel);
      } else {
        game.state.start('game-complete');
      }
    });

    this.tilemap.setCollision([9, 10]);
    this.tilemap.setTileIndexCallback([9, 10], function() {
      this.player.hitGround();
      return true;
    }, this);

    this.tilemap.setTileIndexCallback(3, this.player.fallIntoHazardousTerrain, this.player);

    this.initializeAfterPlayer();
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
      this.label = helper.addText(2, 8, 'Congratulations!', { fill: config.colors.lightYellow, fontSize: 48 });
      this.label.fixedToCamera = true;

      this.isShowingCompleteMessage = true;
    }
  }
};
