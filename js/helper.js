var Helper = (function() {
  function Helper(game) {
    this.game = game;
  }

  Helper.prototype.addText = function(x, y, text) {
    return this.game.add.text(x * 16, y * 8, text, { font: '16px Uni' });
  };

  return Helper;
})();
