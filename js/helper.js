var Helper = (function() {
  function Helper(game) {
    this.game = game;
    this.defaultStyle = {
      fontFamily: 'Uni',
      fontSize: 16
    };
  }

  Helper.prototype.addText = function(x, y, text, style) {
    var attribute,
        combinedStyle;

    combinedStyle = {};

    for (attribute in this.defaultStyle) {
      if (this.defaultStyle.hasOwnProperty(attribute)) {
        combinedStyle[attribute] = this.defaultStyle[attribute];
      }
    }

    for (attribute in style) {
      if (style.hasOwnProperty(attribute)) {
        combinedStyle[attribute] = style[attribute];
      }
    }

    combinedStyle.font = combinedStyle.fontSize + 'px ' + combinedStyle.fontFamily;
    delete combinedStyle.fontSize;
    delete combinedStyle.fontFamily;

    return this.game.add.text(x * 16, y * 8, text, combinedStyle);
  };

  return Helper;
})();
