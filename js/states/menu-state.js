var MenuState = {
  fx: null,

  preload: function() {
    this.load.spritesheet('player', '/img/sprites/turtle.png', 32, 64);
  },

  create: function() {
    var game = this.game,
        imprintLabel,
        player,
        playLabel;

    this.fx = game.add.audio('menu');
    this.fx.addMarker('menu', 0, 12, 1, true);
    this.fx.play('menu');

    this.stage.backgroundColor = config.colors.lightYellow;

    helper.addText(4, 4, 'TURTLE', { fontSize: 32, fill: config.colors.green });
    helper.addText(4, 8, 'A fun little game about a fun little turtle.');

    playLabel = helper.addText(3, 12, '→ Play');
    playLabel.inputEnabled = true;

    var that = this;
    playLabel.events.onInputUp.add(function() {
      that.fx.pause('menu');
      game.state.start('play');
    });

    imprintLabel = helper.addText(3, 14, '→ Imprint');
    imprintLabel.inputEnabled = true;
    imprintLabel.events.onInputUp.add(function() {
      that.fx.pause('menu');
      game.state.start('imprint');
    });

    player = new Player(this.game, 7, 8, 0);
  }
};
