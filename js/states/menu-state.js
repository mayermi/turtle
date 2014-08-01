var MenuState = {
  create: function() {
    var game = this.game,
        imprintLabel,
        playLabel,
        titleLabel;

    this.stage.backgroundColor = '#00a844';

    titleLabel = helper.addText(5, 5, 'TURTLE');

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
  }
};
