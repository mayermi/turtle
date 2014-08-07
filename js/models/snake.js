var Snake = (function() {
  function Snake(game, x, y) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'snake');

    this.hasHitPlayer = false;

    this.plop = game.add.audio('plop', 1.75);

    helper.addAnimationsToSprite(this, [
      'slither'
    ], 15);
    this.animations.play('slither');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;

    game.add.existing(this);
  }

  Snake.prototype = Object.create(Phaser.Sprite.prototype);
  Snake.prototype.constructor = Snake;

  Snake.prototype.hit = function(sprite) {
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

  return Snake;
})();
