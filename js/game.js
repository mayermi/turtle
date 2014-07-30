var game;

game = new Phaser.Game(480, 320, Phaser.AUTO, 'turtle');

game.state.add('imprint', ImprintState);
game.state.add('menu', MenuState);
game.state.add('play', PlayState);

game.state.start('play');
