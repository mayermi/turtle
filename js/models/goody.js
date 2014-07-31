var Goody = (function() {
  function Goody(game, x, y, sprite, effects) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, sprite);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = false;

    this.name = sprite;
    this.effects = effects;
  }

  Goody.prototype = Object.create(Phaser.Sprite.prototype);
  Goody.prototype.constructor = Goody;

  return Goody;
})();
