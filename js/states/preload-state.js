var PreloadState = {
  preload: function() {
    this.ready = false;

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

    game.load.audio('aua', 'music/aua.mp3');
    game.load.audio('backgroundmusic', 'music/backgroundmusic.mp3');
    game.load.audio('dring', 'music/dring.mp3');
    game.load.audio('dying', 'music/dying.mp3');
    game.load.audio('gameover', 'music/gameover.mp3');
    game.load.audio('gulp', 'music/gulp.mp3');
    game.load.audio('menu', 'music/menu.mp3');

    game.load.spritesheet('player', '/img/sprites/turtle.png', 32, 64);
  },

  create: function() {
    game.scale.maxWidth = 960;
    game.scale.maxHeight = 640;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setShowAll();
    game.scale.refresh();

  },

  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },

  onLoadComplete: function() {
    this.ready = true;
  }
};
