var Lanternfish = (function() {
  function Lanternfish(game, x, y) {
    var that;

    that = this;

    Phaser.Sprite.call(this, game, x * 32, y * 32, 'lanternfish');

    this.hasHitPlayer = false;

    this.plop = game.add.audio('plop', 1.75);

    helper.addAnimationsToSprite(this, [
      'default'
    ], 6);

    this.animations.play('default');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.body.bounce.y = 1;

    setInterval(function() {
      that.body.velocity.y = -200;
    }, 1000);

    game.add.existing(this);
  }

  Lanternfish.prototype = Object.create(Phaser.Sprite.prototype);
  Lanternfish.prototype.constructor = Lanternfish;

  Lanternfish.prototype.hit = function(sprite) {
    var that;

    if (!sprite.hasShell) {
      if (!this.hasHitPlayer) {
        sprite.takeDamage(1);
        this.hasHitPlayer = true;

        that = this;
        setTimeout(function() {
          that.hasHitPlayer = false;
        }, 500);
      }
    } else if (this.body.touching.up) {
      this.plop.play();
      this.kill();
    }
  };

  return Lanternfish;
})();
