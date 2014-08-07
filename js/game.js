var config,
    game,
    helper,
    states;

config = new Config();

game = new Phaser.Game(480, 320, Phaser.AUTO, 'turtle', null, false, false);

helper = new Helper(game);

states = {
  'game-complete': GameCompleteState,
  'imprint': ImprintState,
  'menu': MenuState,
  'play': PlayState,
  'preload': PreloadState
};

for (var key in states) {
  if (states.hasOwnProperty(key)) {
    game.state.add(key, states[key]);
  }
}

game.state.start('preload');
