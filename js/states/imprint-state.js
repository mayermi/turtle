var ImprintState = {
    fx: null,

  create: function() {
    var textLabel,
        menuLabel;

    this.stage.backgroundColor = config.colors.lightGreen;

    this.fx = game.add.audio('menu');
    this.fx.addMarker('menu', 0, 12, 1, true);
    this.fx.play('menu');

    menuLabel = helper.addText(0.5, 1, '← Menu');
    menuLabel.inputEnabled = true;

    var that = this;
    menuLabel.events.onInputUp.add(function() {
      that.fx.pause('menu');
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
