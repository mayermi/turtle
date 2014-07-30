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

    this.physics.startSystem(Phaser.Physics.ARCADE);

    cursorKeys = this.input.keyboard.createCursorKeys();

    this.input.keyboard.addKeyCapture([
        cursorKeys.up,
        cursorKeys.down,
        cursorKeys.Left,
        cursorKeys.right
    ]);

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
