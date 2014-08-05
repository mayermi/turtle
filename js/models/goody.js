var Goody = (function() {
  function Goody(game, x, y, sprite, effects) {
    var that = this;

    Phaser.Sprite.call(this, game, x * 32, y * 32, sprite);

    this.dring = game.add.audio('dring',0.3);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = false;

    this.name = sprite;
    this.effects = effects;

    this.events.onKilled.add(function () {that.dring.play();});
  }

  Goody.prototype = Object.create(Phaser.Sprite.prototype);
  Goody.prototype.constructor = Goody;

  return Goody;
})();
