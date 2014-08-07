var Polarbaer = (function() {
  function Polarbaer(game, x, y) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'polarbaer');

    this.hasHitPlayer = false;

    this.plop = game.add.audio('plop', 1.75);

    helper.addAnimationsToSprite(this, [
      'rawr'
    ], 9);
    this.animations.play('rawr');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;

    game.add.existing(this);
  }

  Polarbaer.prototype = Object.create(Phaser.Sprite.prototype);
  Polarbaer.prototype.constructor = Polarbaer;

  Polarbaer.prototype.hit = function(sprite) {
    if (!sprite.hasShell) {
      if (!this.hasHitPlayer) {
        sprite.takeDamage(1);
        this.hasHitPlayer = true;
        var that = this;

        setTimeout( function() {
          that.hasHitPlayer = false;
        }, 500);
      }
    } else if (this.body.touching.up) {
      this.plop.play();
      this.kill();
    }
  };

  return Polarbaer;
})();
