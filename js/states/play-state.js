var PlayState = {
  clouds: null,
  currentLevel: null,
  fx: null,
  goal: null,
  goodies: null,
  hasRestartedLevel: null,
  hazardousTerrain: null,
  hazardousWater: null,
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
  snake: null,
  stork: null,
  tilemap: null,

  preload: function() {
    var goodies,
        goody,
        level,
        levels;

    goodies = config.goodies;
    for (goody in goodies) {
      if (goodies.hasOwnProperty(goody)) {
        this.load.image(goody, '/img/goodies/' + goody + '.png');
      }
    }

    game.load.audio('aua', 'music/aua.mp3');
    game.load.audio('backgroundmusic', 'music/backgroundmusic.mp3');
    game.load.audio('dring', 'music/dring.mp3');
    game.load.audio('dying', 'music/dying.mp3');
    game.load.audio('gameover', 'music/gameover.mp3');
    game.load.audio('gulp', 'music/gulp.mp3');
    game.load.audio('plop', 'music/plop.mp3');
    game.load.audio('wahoo', 'music/wahoo.mp3');
    game.load.audio('whoop', 'music/whoop.mp3');
    game.load.audio('woo', 'music/woo.mp3');

    game.load.image('desert-tiles', '/img/tiles/desert.png');
    game.load.image('forest-tiles', '/img/tiles/forest.png');
    game.load.image('sea-tiles', '/img/tiles/sea.png');
    game.load.image('winter-tiles', '/img/tiles/winter.png');
    game.load.image('life', '/img/images/life.png');

    game.load.spritesheet('lanternfish', '/img/sprites/lanternfish.png', 80, 80);
    game.load.spritesheet('caterpillar', '/img/sprites/caterpillar.png', 48, 16);
    game.load.spritesheet('jellyfish', '/img/sprites/jellyfish.png', 32, 48);
    game.load.spritesheet('penguin', '/img/sprites/penguin.png', 32, 28);
    game.load.spritesheet('player', '/img/sprites/turtle.png', 32, 64);
    game.load.spritesheet('polarbaer', '/img/sprites/polarbaer.png', 72, 72);
    game.load.spritesheet('pufferfish', '/img/sprites/pufferfish.png', 32, 32);
    game.load.spritesheet('scorpion', '/img/sprites/scorpion.png', 32, 18);
    game.load.spritesheet('snake', '/img/sprites/snake.png', 82, 80);
    game.load.spritesheet('stork', '/img/sprites/stork.png', 144, 132);
    game.load.spritesheet('worm', '/img/sprites/worm.png', 48, 16);

    game.load.spritesheet('desert-spritesheet', '/img/tiles/desert.png', 32, 32);
    game.load.spritesheet('forest-spritesheet', '/img/tiles/forest.png', 32, 32);
    game.load.spritesheet('sea-spritesheet', '/img/tiles/sea.png', 32, 32);
    game.load.spritesheet('winter-spritesheet', '/img/tiles/winter.png', 32, 32);

    levels = ['1-1', '1-2', '1-3', '2-1', '2-2', '2-3', '3-1', '3-2', '3-3', '4-1', '4-2', '4-3'];
    for (var i = 0, l = levels.length; i < l; i += 1) {
      level = levels[i];

      game.load.tilemap(level + '-tilemap', '/img/tiles/' + level + '.json', null, Phaser.Tilemap.TILED_JSON);
    }
  },

  create: function() {
    this.fx = game.add.audio('backgroundmusic');
    this.fx.addMarker('happy', 0, 16, 1, true);
    this.fx.addMarker('sea', 18, 16, 0.8, true);
    this.fx.addMarker('ice', 70, 16, 1, true);
    this.fx.addMarker('desert', 52, 8, 0.9, true);
    this.fx.addMarker('final', 63.5, 7, 1, false);

    this.dying = game.add.audio('dying', 0.5);

    if (!localStorage.getItem('turtle')) {
      localStorage.setItem('turtle', JSON.stringify({ currentLevel: 0 }));
    }

    this.startLevel();
  },

  update: function() {
    var lifeGroup,
        newLife,
        newPosition,
        playerHealth;

    lifeGroup = this.lifeGroup;
    playerHealth = this.player.health;

    this.checkBossCollisions();
    this.checkMinionCollisions();
    this.checkPlayerCollisions();

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

  checkBossCollisions: function() {
    if (this.boss) {
      var arcade;

      arcade = this.game.physics.arcade;

      arcade.collide(this.boss, this.layer);
      arcade.collide(this.boss, this.platforms);
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

    arcade.collide(this.player, this.boss, function(player, boss) {
      boss.hit(player);

      if (player.health <= 0) {
        that.restartLevel();
      }
    });

    arcade.overlap(this.player, this.goal, function(player) {
      that.isLevelComplete = true;

      player.cheer();

      that.fx.stop();
      that.fx.play('final');
      that.showCompleteMessage();
      player.checkWorldBounds = true;

      return false;
    });

    arcade.collide(this.player, this.goodies, function(player, goody) {
      var duration;

      player.eatGoody(goody);
      goody.kill();

      duration = goodies[goody.name].duration;

      if (duration){
        setTimeout(function() {
          that.goodies.add(new Goody(that.game, goody.originalX, goody.originalY, goody.name));
        }, duration);
      }
    });

    var inHazardousTerrain = arcade.overlap(this.player, this.hazardousTerrain, function(player) {
      player.enterHazardousTerrain();

      if (player.health <= 0) {
        that.restartLevel();
      }
    });

    if (!inHazardousTerrain) {
      this.player.leaveHazardousTerrain();
    }

    var inHazardousWater = arcade.overlap(this.player, this.hazardousWater, function(player) {
      player.enterHazardousWater();
    
      if (player.health <= 0) {
        that.restartLevel();
      }
    });

    if (!inHazardousWater) {
      this.player.leaveHazardousWater();
    }

    arcade.collide(this.player, this.layer, function(player) {
      player.resetSlide();
    });

    arcade.collide(this.player, this.minions, function(player, minion) {
      minion.hit(player);
    
      if (player.health <= 0) {
        that.restartLevel();
      }
    });

    arcade.collide(this.player, this.platforms, function(player) {
      player.resetSlide();
    });

    arcade.collide(this.player, this.slidingTerrain, function(player) {
      player.slide();
    });
  },

  initializeBeforePlayer: function() {
    this.initializeGoal();
    this.initializeHazardousTerrain();
    this.initializeHazardousWater();
    this.initializePhysics();
    this.initializePlatforms();
    this.initializeSlidingTerrain();
  },

  initializeAfterPlayer: function() {
    this.initializeBoss();
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

  initializeBoss: function() {
    if (this.level.boss) {
      if (this.level.boss.type === 'stork') {
        this.boss = new Stork(this.game, this.level.boss.position.x, this.level.boss.position.y);
      } else if (this.level.boss.type === 'lanternfish') {
        this.boss = new Lanternfish(this.game, this.level.boss.position.x, this.level.boss.position.y);
      } else if (this.level.boss.type === 'snake') {
        this.boss = new Snake(this.game, this.level.boss.position.x, this.level.boss.position.y);
      } else if (this.level.boss.type === 'polarbaer') {
        this.boss = new Polarbaer(this.game, this.level.boss.position.x, this.level.boss.position.y);
      }
    }
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
      pole = this.goal.create(goal.position.x * 32, (goal.position.y - i) * 32, this.level.type + '-spritesheet', 11);
      this.game.physics.enable(pole, Phaser.Physics.ARCADE);
      pole.body.allowGravity = false;
      pole.body.immovable = true;
    }

    top = this.goal.create(goal.position.x * 32, (goal.position.y - goal.height + 1) * 32, this.level.type + '-spritesheet', 7);
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
    if (this.level.goodies) {
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

          this.goodies.add(new Goody(this.game, position.x, position.y, goodiesEntry.type));
        }
      }
    }
  },

  initializeMinions: function() {
    if (this.level.minions) {
      var minion,
          minionsEntry,
          position,
          positions;

      this.minions = this.game.add.group();

      for (var i = 0, l = this.level.minions.length; i < l; i += 1) {
        minionsEntry = this.level.minions[i];
        positions = minionsEntry.positions;

        for (var j = 0, k = positions.length; j < k; j += 1) {
          position = positions[j];

          switch (minionsEntry.type) {
            case 'caterpillar':
              minion = new Caterpillar(this.game, position.x, position.y);
              break;
            case 'jellyfish':
              minion = new Jellyfish(this.game, position.x, position.y);
              break;
            case 'penguin':
              minion = new Penguin(this.game, position.x, position.y);
              break;
            case 'pufferfish':
              minion = new Pufferfish(this.game, position.x, position.y);
              break;
            case 'scorpion':
              minion = new Scorpion(this.game, position.x, position.y);
              break;
            case 'worm':
              minion = new Worm(this.game, position.x, position.y);
              break;
          }

          this.minions.add(minion);
        }
      }
    }
  },

  initializeHazardousTerrain: function() {
    if (this.level.hazardousTerrain) {
      var entry,
          terrain,
          terrainStart;

      this.hazardousTerrain = this.game.add.group();
      this.hazardousTerrain.enableBody = true;
      this.hazardousTerrain.physicsBodyType = Phaser.Physics.ARCADE;

      for (var i = 0, l = this.level.hazardousTerrain.length; i < l; i += 1) {
        entry = this.level.hazardousTerrain[i];

        terrainStart = entry.start;

        for (var j = 0; j < entry.length; j += 1) {
          terrain = this.hazardousTerrain.create((terrainStart.x + j) * 32, terrainStart.y * 32, this.level.type + '-spritesheet', 14);

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

  initializeHazardousWater: function() {
    if (this.level.hazardousWater) {
      var entry,
          terrain,
          terrainStart;

      this.hazardousWater = this.game.add.group();
      this.hazardousWater.enableBody = true;
      this.hazardousWater.physicsBodyType = Phaser.Physics.ARCADE;

      for (var i = 0, l = this.level.hazardousWater.length; i < l; i += 1) {
        entry = this.level.hazardousWater[i];

        terrainStart = entry.start;

        for (var j = 0; j < entry.length; j += 1) {
          terrain = this.hazardousWater.create((terrainStart.x + j) * 32, terrainStart.y * 32, this.level.type + '-spritesheet', 15);

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
    if (this.level.platforms) {
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
          if (j + 1 === k) {
            tileIndex = 6;
          }

          platform = this.platforms.create((platformStart.x + j) * 32, platformStart.y * 32, this.level.type + '-spritesheet', tileIndex);

          this.game.physics.enable(platform, Phaser.Physics.ARCADE);

          platform.body.allowGravity = false;
          platform.body.checkCollision.left = false;
          platform.body.checkCollision.right = false;
          platform.body.checkCollision.down = false;
          platform.body.immovable = true;
        }
      }
    }
  },

  initializePhysics: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = this.level.physics.gravity;

    // prevent tunneling
    this.game.time.deltaCap = 0.02;
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
          terrain = this.slidingTerrain.create((terrainStart.x + j) * 32, terrainStart.y * 32, this.level.type + '-spritesheet', 10);

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
    this.levelNameLabel = helper.addText(1, 4, this.level.id + ': ' + this.level.name, { fill: config.colors.gray });
  },

  restartLevel: function() {
    var that;

    that = this;

    if (!this.hasRestartedLevel) {
      that.fx.pause();
      that.dying.play();
      setTimeout(function() {
        game.state.restart();
      }, 3100);

      this.hasRestartedLevel = true;
    }
  },

  startLevel: function() {
    var currentLevel,
        playerConfiguration;

    currentLevel = JSON.parse(localStorage.getItem('turtle')).currentLevel;

    this.hasRestartedLevel = false;

    if (this.boss) {
      this.boss.destroy();
    }

    if (this.clouds) {
      this.clouds.destroy();
    }

    if (this.goal) {
      this.goal.destroy();
    }

    if (this.goodies) {
      this.goodies.destroy();
    }

    if (this.hazardousTerrain) {
      this.hazardousTerrain.destroy();
    }

    if (this.hazardousWater) {
      this.hazardousWater.destroy();
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

    if (this.tilemap) {
      this.tilemap.destroy();
    }

    this.isLevelComplete = false;
    this.isShowingCompleteMessage = false;

    this.level = config.levels[currentLevel];

    this.stage.backgroundColor = config.colors.lightBlue;
    this.fx.play(this.level.backgroundMusic, true);

    this.tilemap = this.game.add.tilemap(this.level.id + '-tilemap');
    this.tilemap.addTilesetImage(this.level.type + '-tiles');

    this.layer = this.tilemap.createLayer('layer-1');
    this.layer.resizeWorld();

    this.initializeBeforePlayer();

    playerConfiguration = this.level.player;
    this.player = new Player(
        this.game,
        playerConfiguration.position.x,
        playerConfiguration.position.y,
        playerConfiguration.walkDrag,
        playerConfiguration.jumpVelocity,
        playerConfiguration.hasShell,
        playerConfiguration.isUnderWater,
        playerConfiguration.isSanta
    );

    this.player.checkWorldBounds = false;
    var that = this;

    this.player.events.onOutOfBounds.add(function() {
      currentLevel += 1;
      localStorage.setItem('turtle', JSON.stringify({ currentLevel: currentLevel }));

      if (currentLevel < config.levels.length) {
        that.startLevel();
      } else {
        localStorage.setItem('turtle', JSON.stringify({ currentLevel: 0 }));
        game.state.start('game-complete');
      }
    });

    this.tilemap.setCollision([9, 10]);

    this.initializeAfterPlayer();
  },

  addCloud: function(x) {
    var cloud,
        that = this;

    if (typeof x === 'undefined') {
      x = this.world.bounds.width;
    }

    cloud = this.clouds.create(x, _.random(1, 3) * 32, this.level.type + '-spritesheet', 0);
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
