var MenuState = {
  preload: function() {
  },

  create: function() {
    var game = this.game,
        playLabel;

    this.stage.backgroundColor = '#779933';

    playLabel = this.add.text(10, 10, 'Play');
    playLabel.inputEnabled = true;
    playLabel.events.onInputUp.add(function() {
      game.state.start('play');
    });
  },

  update: function() {
  }
};
