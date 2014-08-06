var Stork = (function() {
  function Stork(game, x, y) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'stork');

    this.hasHitPlayer = false;

    this.plop = game.add.audio('plop', 1.75);

    helper.addAnimationsToSprite(this, [
      'peck'
    ], 8);
    this.animations.play('peck');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;

    game.add.existing(this);
  }

  Stork.prototype = Object.create(Phaser.Sprite.prototype);
  Stork.prototype.constructor = Stork;

  Stork.prototype.hit = function(sprite) {
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

  return Stork;
})();
