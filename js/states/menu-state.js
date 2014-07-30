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
