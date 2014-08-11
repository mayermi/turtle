var GameCompleteState = {
  preload: function() {
    this.load.spritesheet('player', 'img/sprites/turtle.png', 32, 64);
  },

  create: function() {
    var game,
        menuLabel,
        player,
        restartLabel,
        that;

    game = this.game;
    that = this;

    this.fx = game.add.audio('gameover');
    this.fx.addMarker('gameover', 0, 24, 1, true);
    this.fx.play('gameover');

    this.stage.backgroundColor = config.colors.gray;

    helper.addText(4, 4, 'GAME COMPLETE', { fontSize: 32, fill: config.colors.red });
    helper.addText(4, 9, 'That. Was. AWESOME!');

    player = new Player(this.game, 7, 8, 0);
    player.animations.play('cheer');

    menuLabel = helper.addText(0.5, 1, '← Menu');
    menuLabel.inputEnabled = true;
    menuLabel.events.onInputUp.add(function() {
      that.fx.pause('gameover');
      game.state.start('menu');
    });

    restartLabel = helper.addText(8, 28, '→ I WANT TO GO AGAIN!');
    restartLabel.inputEnabled = true;
    restartLabel.events.onInputUp.add(function() {
      that.fx.pause('gameover');

      localStorage.setItem('turtle', JSON.stringify({ currentLevel: 0 }));
      game.state.start('play');
    });
  }
};
