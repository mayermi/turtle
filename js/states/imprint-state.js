var ImprintState = {
  create: function() {
    var textLabel,
        menuLabel;

    this.stage.backgroundColor = '#BFEFFF';

    menuLabel = helper.addText(0.5, 1, 'Menu', { fill: '#ff0000' });
    menuLabel.inputEnabled = true;
    menuLabel.events.onInputUp.add(function() {
      game.state.start('menu');
    });

    textLabel = helper.addText(3, 6,
        'This game was created by:\n' +
        '· Astrid Wühr\n' +
        '· Dominik Habersack\n' +
        '· Judith Steigemann\n' +
        '· Miriam Mayer'
    );
  }
};
