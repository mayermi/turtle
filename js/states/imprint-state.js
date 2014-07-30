var ImprintState = {
  create: function() {
    var textLabel,
        menuLabel;

    this.stage.backgroundColor = '#BFEFFF';

    menuLabel = this.add.text(10, 10, 'Menu');
    menuLabel.inputEnabled = true;
    menuLabel.events.onInputUp.add(function() {
      game.state.start('menu');
    });

    textLabel = this.add.text(10, 40, 'This game was created by:\nAstrid Wühr\nDominik Habersack\nJudith Steigemann\nMiriam Mayer');
  }
};
