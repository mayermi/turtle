var GameCompleteState = {
  preload: function() {
    this.load.spritesheet('player', '/img/sprites/turtle.png', 32, 64);
  },

  create: function() {
    var game,
        player;

    game = this.game;

    this.stage.backgroundColor = config.colors.gray;

    helper.addText(4, 4, 'GAME COMPLETE', { fontSize: 32, fill: config.colors.red });
    helper.addText(4, 9, 'You are done. Good job!\nBut that also means the game is over.\n\nToo bad.');

    player = new Player(this.game, 7, 8, 0);
    player.animations.play('cheer');
  }
};
