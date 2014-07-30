var Link = (function() {
  function Link(game, x, y) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'link');

    this.animations.add('walk-north', [0, 1, 2, 3, 4, 5, 6, 7], 12.5, true);
    this.animations.add('walk-east', [8, 9, 10, 11, 12, 13, 14, 15], 12.5, true);
    this.animations.add('walk-south', [16, 17, 18, 19, 20, 21, 22, 23], 12.5, true);
    this.animations.add('walk-west', [24, 25, 26, 27, 28, 29, 30, 31], 12.5, true);

    this.animations.play('walk-east');

    game.add.existing(this);
  }

  Link.prototype = Object.create(Phaser.Sprite.prototype);
  Link.prototype.constructor = Link;

  Link.prototype.turnNorth = function() {
    this.animations.play('walk-north');
  };

  Link.prototype.turnEast = function() {
    this.animations.play('walk-east');
  };

  Link.prototype.turnSouth = function() {
    this.animations.play('walk-south');
  };

  Link.prototype.turnWest = function() {
    this.animations.play('walk-west');
  };

  return Link;
})();
