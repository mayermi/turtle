var MenuState = {
  preload: function() {
    this.load.spritesheet('player', '/img/sprites/turtle.png', 32, 64);
  },

  create: function() {
    var game = this.game,
        imprintLabel,
        player,
        playLabel;

    this.stage.backgroundColor = '#00a844';

    helper.addText(4, 8, 'TURTLE', { fontSize: 32 });
    helper.addText(4, 12, 'A fun little game about a fun little turtle.');

    playLabel = helper.addText(1, 1, 'Play');
    playLabel.inputEnabled = true;
    playLabel.events.onInputUp.add(function() {
      game.state.start('play');
    });

    imprintLabel = helper.addText(25, 1, 'Imprint');
    imprintLabel.inputEnabled = true;
    imprintLabel.events.onInputUp.add(function() {
      game.state.start('imprint');
    });

    player = new Player(this.game, 6.5, 8, 0);
  }
};
