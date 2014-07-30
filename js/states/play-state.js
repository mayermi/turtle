var PlayState = {
  layer: null,
  turtle: null,
  menuLabel: null,

  preload: function() {
    this.load.image('forest-tiles', '/img/tiles/forest.png');

    this.load.spritesheet('turtle', '/img/sprites/turtle.png', 24, 24);

    this.load.tilemap('forest-tilemap', '/img/tiles/forest.json', null, Phaser.Tilemap.TILED_JSON);
  },

  create: function() {
    var cursorKeys,
        tilemap;

    tilemap = this.game.add.tilemap('forest-tilemap');
    tilemap.addTilesetImage('forest-tiles');
    tilemap.setCollision(2);

    this.layer = tilemap.createLayer('layer-1');
    this.layer.resizeWorld();

    this.turtle = new Turtle(this.game, 1, 6, 0);

    this.menuLabel = this.add.text(10, 10, 'Menu', { 'font': '24px Lato' });
    this.menuLabel.fixedToCamera = true;
    this.menuLabel.inputEnabled = true;
    this.menuLabel.events.onInputUp.add(function() {
      game.state.start('menu');
    });

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1200;

    this.game.camera.follow(this.turtle);

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
    this.game.physics.arcade.collide(this.turtle, this.layer);
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
