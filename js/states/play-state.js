var PlayState = {
  healthLabel: null,
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

    this.healthLabel = this.add.text(380, 10, 'Health');
    this.healthLabel.fixedToCamera = true;

    this.menuLabel = this.add.text(10, 10, 'Menu');
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
