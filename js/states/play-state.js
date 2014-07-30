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
