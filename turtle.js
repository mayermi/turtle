;(function() {
  'use strict';

var Helper = (function() {
  function Helper(game) {
    this.game = game;
    this.defaultStyle = {
      fontFamily: 'Uni',
      fontSize: 16
    };
  }

  Helper.prototype.addAnimationsToSprite = function(sprite, animations, framesPerAnimation) {
    var firstFrame,
        lastFrame,
        framesRange;

    for (var i = 0, l = animations.length; i < l; i += 1) {
      firstFrame = framesPerAnimation * i;
      lastFrame = firstFrame + framesPerAnimation;
      framesRange = _.range(firstFrame, lastFrame);

      sprite.animations.add(animations[i], framesRange, 12.5, true);
    }
  };

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

var goodies = {
  'bubble': {
    'name': 'bubble',
    'effects': [
      {
        'jumpHeightIncrease': -100
      }
    ],
    'duration': 4000
  },
  'candy': {
    'name': 'candy',
    'effects': [
      {
        'addShell': true
      }
    ]
  },
  'chili': {
    'name': 'chili',
    'effects': [
      {
        'speedIncrease': 100
      }
    ],
    'duration': 4000
  },
  'ice': {
    'name': 'ice',
    'effects': [
      {
        'speedIncrease': -150
      }
    ],
    'duration': 2000
  },
  'salad': {
    'name': 'salad',
    'effects': [
    ]
  },
  'strawberry': {
    'name': 'strawberry',
    'effects': [
      {
        'healthIncrease': 1
      }
    ]
  }
};

var levelOneOne = {
  'id': '1-1',
  'name': 'Welcome to the world',
  'backgroundMusic': 'happy',
  'type': 'forest',
  'goal': {
    'position': {
      'x': 144,
      'y': 8,
    },
    'height': 8
  },
  'goodies': [
    {
      'type': 'candy',
      'positions': [
        {
          'x': 39,
          'y': 8
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 80,
          'y': 6
        },
        {
          'x': 114,
          'y': 4
        }
      ]
    },
    {
      'type': 'salad',
      'positions': [
        {
          'x': 54,
          'y': 4
        }
      ]
    },
    {
      'type': 'strawberry',
      'positions': [
        {
          'x': 10,
          'y': 6
        }
      ]
    }
  ],
  'hazardousWater': [
    {
      'start': {
        'x': 24,
        'y': 9
      },
      'length': 2
    }
  ],
  'hazardousTerrain': [
    {
      'start': {
        'x': 36,
        'y': 8
      },
      'length': 1
    }
  ],
  'minions': [
    {
      'type': 'caterpillar',
      'positions': [
        {
          'x': 68,
          'y': 8
        },
        {
          'x': 72,
          'y': 8
        },
        {
          'x': 76,
          'y': 8
        },
        {
          'x': 100,
          'y': 8
        }
      ]
    },
    {
      'type': 'worm',
      'positions': [
        {
          'x': 125,
          'y': 8
        }
      ]
    }
  ],
  'platforms': [
    {
      'start': {
        'x': 9,
        'y': 7
      },
      'length': 3
    },
    {
      'start': {
        'x': 49,
        'y': 6
      },
      'length': 4
    },
    {
      'start': {
        'x': 53,
        'y': 5
      },
      'length': 3
    },
    {
      'start': {
        'x': 56,
        'y': 6
      },
      'length': 3
    },
    {
      'start': {
        'x': 67,
        'y': 7
      },
      'length': 2
    },
    {
      'start': {
        'x': 108,
        'y': 7
      },
      'length': 2
    },
    {
      'start': {
        'x': 110,
        'y': 6
      },
      'length': 3
    },
    {
      'start': {
        'x': 113,
        'y': 5
      },
      'length': 3
    }
  ],
  'player': {
    'jumpVelocity' : -400,
    'walkDrag' : 800,
    'position': {
      'x': 1,
      'y': 7
    }
  },
  'physics': {
    'gravity' : 1200
  }
};

var levelOneTwo = {
  'id': '1-2',
  'name': 'We need to go deeper',
  'backgroundMusic': 'happy',
  'type': 'forest',
  'goal': {
    'position': {
      'x': 144,
      'y': 8,
    },
    'height': 8
  },
  'goodies': [
    {
      'type': 'candy',
      'positions': [
        {
          'x': 51,
          'y': 8
        }
      ]
    },
    {
      'type': 'ice',
      'positions': [
        {
          'x': 79,
          'y': 8
        },
        {
          'x': 134,
          'y': 4
        }
      ]
    },
    {
      'type': 'salad',
      'positions': [
        {
          'x': 19,
          'y': 4
        },
        {
          'x': 65,
          'y': 8
        }
      ]
    },
    {
      'type': 'strawberry',
      'positions': [
        {
          'x': 106,
          'y': 8
        }
      ]
    }
  ],
  'hazardousWater': [
    {
      'start': {
        'x': 62,
        'y': 9
      },
      'length': 2
    },
    {
      'start': {
        'x': 67,
        'y': 9
      },
      'length': 7
    },
    {
      'start': {
        'x': 65,
        'y': 9
      },
      'length': 2
    }
  ],
  'hazardousTerrain': [
    {
      'start': {
        'x': 25,
        'y': 8
      },
      'length': 1
    },
    {
      'start': {
        'x': 49,
        'y': 8
      },
      'length': 1
    },
    {
      'start': {
        'x': 53,
        'y': 8
      },
      'length': 1
    },
    {
      'start': {
        'x': 115,
        'y': 8
      },
      'length': 1
    }
  ],
  'minions': [
    {
      'type': 'caterpillar',
      'positions': [
        {
          'x': 77,
          'y': 8
        },
        {
          'x': 82,
          'y': 8
        },
        {
          'x': 130,
          'y': 8
        }
      ]
    }
  ],
  'platforms': [
    {
      'start': {
        'x': 11,
        'y': 7
      },
      'length': 2
    },
    {
      'start': {
        'x': 14,
        'y': 6
      },
      'length': 2
    },
    {
      'start': {
        'x': 18,
        'y': 5
      },
      'length': 2
    },
    {
      'start': {
        'x': 68,
        'y': 7
      },
      'length': 2
    },
    {
      'start': {
        'x': 72,
        'y': 6
      },
      'length': 2
    },
    {
      'start': {
        'x': 92,
        'y': 5
      },
      'length': 2
    },
    {
      'start': {
        'x': 95,
        'y': 6
      },
      'length': 2
    },
    {
      'start': {
        'x': 129,
        'y': 7
      },
      'length': 2
    },
    {
      'start': {
        'x': 131,
        'y': 6
      },
      'length': 2
    },
    {
      'start': {
        'x': 133,
        'y': 5
      },
      'length': 5
    }
  ],
  'slidingTerrain': [
    {
      'start': {
        'x': 28,
        'y': 9
      },
      'length': 10
    },
    {
      'start': {
        'x': 112,
        'y': 9
      },
      'length': 15
    }
  ],
  'player': {
    'jumpVelocity' : -400,
    'walkDrag' : 800,
    'position': {
      'x': 1,
      'y': 7
    }
  },
  'physics': {
    'gravity' : 1200
  }
};

var levelOneThree = {
  'id': '1-3',
  'name': 'Happy Birthday!',
  'backgroundMusic': 'happy',
  'type': 'forest',
  'goal': {
    'position': {
      'x': 144,
      'y': 8,
    },
    'height': 8
  },
  'boss': {
    'type': 'stork',
    'position': {
      'x': 128,
      'y': 4
    }
  },
  'goodies': [
    {
      'type': 'candy',
      'positions': [
        {
          'x': 45,
          'y': 8
        },
        {
          'x': 74,
          'y': 2
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 46,
          'y': 5
        }
      ]
    },
    {
      'type': 'ice',
      'positions': [
        {
          'x': 113,
          'y': 8
        }
      ]
    },
    {
      'type': 'salad',
      'positions': [
        {
          'x': 63,
          'y': 6
        }
      ]
    },
    {
      'type': 'strawberry',
      'positions': [
        {
          'x': 36,
          'y': 5
        }
      ]
    }
  ],
  'hazardousWater': [
    {
      'start': {
        'x': 8,
        'y': 9
      },
      'length': 6
    },
    {
      'start': {
        'x': 61,
        'y': 9
      },
      'length':18
    }
  ],
  'hazardousTerrain': [
    {
      'start': {
        'x': 20,
        'y': 8
      },
      'length': 4
    },
    {
      'start': {
        'x': 26,
        'y': 8
      },
      'length': 4
    },
    {
      'start': {
        'x': 45,
        'y': 4
      },
      'length': 1
    },
    {
      'start': {
        'x': 85,
        'y': 8
      },
      'length': 1
    },
    {
      'start': {
        'x': 90,
        'y': 8
      },
      'length': 1
    },
    {
      'start': {
        'x': 95,
        'y': 8
      },
      'length': 1
    },
    {
      'start': {
        'x': 100,
        'y': 8
      },
      'length': 1
    },
    {
      'start': {
        'x': 105,
        'y': 7
      },
      'length': 3
    }
  ],
  'minions': [
    {
      'type': 'caterpillar',
      'positions': [
        {
          'x': 47,
          'y': 8
        },
        {
          'x': 54,
          'y': 8
        },
        {
          'x': 92,
          'y': 8
        },
        {
          'x': 96,
          'y': 8
        },
        {
          'x': 113,
          'y': 8
        }
      ]
    }
  ],
  'platforms': [
    {
      'start': {
        'x': 11,
        'y': 6
      },
      'length': 2
    },
    {
      'start': {
        'x': 62,
        'y': 7
      },
      'length': 2
    },
    {
      'start': {
        'x': 66,
        'y': 6
      },
      'length': 2
    },
    {
      'start': {
        'x': 70,
        'y': 5
      },
      'length': 2
    },
    {
      'start': {
        'x': 77,
        'y': 4
      },
      'length': 2
    },
    {
      'start': {
        'x': 124,
        'y': 6
      },
      'length': 3
    }
  ],
  'player': {
    'jumpVelocity' : -400,
    'walkDrag' : 800,
    'position': {
      'x': 1,
      'y': 7
    }
  },
  'physics': {
    'gravity' : 1200
  },
  'slidingTerrain': [
    {
      'start': {
        'x': 18,
        'y': 9
      },
      'length': 12
    }
  ]
};

var levelTwoOne = {
  'id': '2-1',
  'name': 'Under the sea',
  'backgroundMusic': 'sea',
  'type': 'sea',
  'boss': {
    'type': 'lanternfish',
    'position': {
      'x': 58,
      'y': 5
    }
  },
  'goal': {
    'position': {
      'x': 64,
      'y': 8,
    },
    'height': 8
  },
  'goodies': [
    {
      'type': 'bubble',
      'positions': [
        {
          'x': 41,
          'y': 5
        }
      ]
    },
    {
      'type': 'candy',
      'positions': [
        {
          'x': 10,
          'y': 4
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 12,
          'y': 5
        },
        {
          'x': 14,
          'y': 8
        }
      ]
    },
    {
      'type': 'ice',
      'positions': [
        {
          'x': 16,
          'y': 5
        }
      ]
    },
    {
      'type': 'strawberry',
      'positions': [
        {
          'x': 16,
          'y': 8
        }
      ]
    }
  ],
  'minions': [
    {
      'type': 'jellyfish',
      'positions': [
        {
          'x': 12,
          'y': 9
        },
        {
          'x': 14,
          'y': 9
        }
      ]
    },
    {
      'type': 'pufferfish',
      'positions': [
        {
          'x': 40,
          'y': 7
        }
      ]
    }
  ],
  'player': {
    'hasShell': true,
    'isUnderWater': true,
    'jumpVelocity' : -200,
    'walkDrag' : 800,
    'position': {
      'x': 1,
      'y': 7
    }
  },
  'physics': {
    'gravity' : 400
  }
};

var levelTwoTwo = {
  'id': '2-2',
  'name': 'Message in a bottle',
  'backgroundMusic': 'sea',
  'type': 'sea',
  'goal': {
    'position': {
      'x': 144,
      'y': 8,
    },
    'height': 8
  },
  'goodies': [
    {
      'type': 'bubble',
      'positions': [
        {
          'x': 12,
          'y': 7
        },
        {
          'x': 76,
          'y': 1
        },
        {
          'x': 102,
          'y': 2
        }
      ]
    },
    {
      'type': 'candy',
      'positions': [
        {
          'x': 33,
          'y': 8
        },
        {
          'x': 83,
          'y': 1
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 8,
          'y': 4
        },
        {
          'x': 23,
          'y': 8
        },
        {
          'x': 36,
          'y': 1
        },
        {
          'x': 65,
          'y': 8
        },
        {
          'x': 69,
          'y': 7
        },
        {
          'x': 76,
          'y': 8
        },
        {
          'x': 110,
          'y': 3
        }
      ]
    },
    {
      'type': 'ice',
      'positions': [
        {
          'x': 50,
          'y': 8
        },
        {
          'x': 91,
          'y': 2
        },
        {
          'x': 116,
          'y': 2
        }
      ]
    }
  ],
  'hazardousTerrain': [
    {
      'start': {
        'x': 17,
        'y': 2
      },
      'length': 2
    },
    {
      'start': {
        'x': 31,
        'y': 6
      },
      'length': 1
    },
    {
      'start': {
        'x': 52,
        'y': 2
      },
      'length': 2
    },
    {
      'start': {
        'x': 107,
        'y': 8
      },
      'length': 2
    },
    {
      'start': {
        'x': 114,
        'y': 8
      },
      'length': 2
    }
  ],
  'player': {
    'hasShell': true,
    'isUnderWater': true,
    'jumpVelocity' : -200,
    'walkDrag' : 800,
    'position': {
      'x': 1,
      'y': 7
    }
  },
  'physics': {
    'gravity' : 400
  }
};

var levelThreeOne = {
  'id': '3-1',
  'name': 'Winter Wonderland',
  'backgroundMusic': 'ice',
  'type': 'winter',
  'goal': {
    'position': {
      'x': 64,
      'y': 8,
    },
    'height': 8
  },
  'goodies': [
    {
      'type': 'bubble',
      'positions': [
        {
          'x': 41,
          'y': 5
        }
      ]
    },
    {
      'type': 'candy',
      'positions': [
        {
          'x': 7,
          'y': 4
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 12,
          'y': 5
        },
        {
          'x': 14,
          'y': 8
        }
      ]
    },
    {
      'type': 'ice',
      'positions': [
        {
          'x': 16,
          'y': 5
        }
      ]
    },
    {
      'type': 'strawberry',
      'positions': [
        {
          'x': 16,
          'y': 8
        }
      ]
    }
  ],
  'player': {
    'isSanta': true,
    'jumpVelocity' : -400,
    'walkDrag' : 800,
    'position': {
      'x': 1,
      'y': 7
    }
  },
  'physics': {
    'gravity' : 1200
  },
  'slidingTerrain': [
    {
      'start': {
        'x': 25,
        'y': 9
      },
      'length': 12
    },
  ]
};

var levelFourOne = {
  'id': '4-1',
  'name': 'Horse with no name',
  'backgroundMusic': 'desert',
  'type': 'desert',
  'goal': {
    'position': {
      'x': 144,
      'y': 8,
    },
    'height': 8
  },
  'goodies': [
    {
      'type': 'bubble',
      'positions': [
        {
          'x': 37,
          'y': 2
        },
        {
          'x': 82,
          'y': 7
        },
        {
          'x': 108,
          'y': 8
        },
        {
          'x': 118,
          'y': 8
        },
        {
          'x': 128,
          'y': 8
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 10,
          'y': 8
        },
        {
          'x': 51,
          'y': 9
        },
        {
          'x': 64,
          'y': 8
        }
      ]
    },
    {
      'type': 'strawberry',
      'positions': [
        {
          'x': 47,
          'y': 1
        },
        {
          'x': 104,
          'y': 1
        }
      ]
    }
  ],
  'hazardousWater': [
    {
      'start': {
        'x': 39,
        'y': 9
      },
      'length': 4
    },
    {
      'start': {
        'x': 61,
        'y': 9
      },
      'length': 2
    },
    {
      'start': {
        'x': 65,
        'y': 9
      },
      'length': 2
    }
  ],
  'hazardousTerrain': [
    {
      'start': {
        'x': 11,
        'y': 9
      },
      'length': 5
    },
    {
      'start': {
        'x': 69,
        'y': 8
      },
      'length': 2
    },
    {
      'start': {
        'x': 72,
        'y': 8
      },
      'length': 7
    },
    {
      'start': {
        'x': 80,
        'y': 5
      },
      'length': 1
    },
    {
      'start': {
        'x': 83,
        'y': 6
      },
      'length': 1
    },
    {
      'start': {
        'x': 84,
        'y': 8
      },
      'length': 3
    },
    {
      'start': {
        'x': 89,
        'y': 8
      },
      'length': 4
    }
  ],
  'minions': [
    {
      'type': 'scorpion',
      'positions': [
        {
          'x': 96,
          'y': 8
        },
        {
          'x': 99,
          'y': 8
        },
        {
          'x': 103,
          'y': 8
        },
        {
          'x': 108,
          'y': 8
        },
        {
          'x': 117,
          'y': 8
        },
        {
          'x': 127,
          'y': 8
        }
      ]
    }
  ],
  'platforms': [
    {
      'start': {
        'x': 35,
        'y': 5
      },
      'length': 3
    },
    {
      'start': {
        'x': 46,
        'y': 3
      },
      'length': 3
    },
    {
      'start': {
        'x': 104,
        'y': 2
      },
      'length': 2
    }
  ],
  'player': {
    'hasShell': true,
    'jumpVelocity' : -400,
    'walkDrag' : 800,
    'position': {
      'x': 1,
      'y': 7
    }
  },
  'physics': {
    'gravity' : 1200
  }
};

var levelFourTwo = {
  'id': '4-2',
  'name': 'U can\'t remember your name',
  'backgroundMusic': 'desert',
  'type': 'desert',
  'goal': {
    'position': {
      'x': 144,
      'y': 8,
    },
    'height': 8
  },
  'goodies': [
    {
      'type': 'bubble',
      'positions': [
        {
          'x': 49,
          'y': 0
        },
        {
          'x': 125,
          'y': 5
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 15,
          'y': 3
        },
        {
          'x': 120,
          'y': 2
        }
      ]
    },
    {
      'type': 'strawberry',
      'positions': [
        {
          'x': 108,
          'y': 1
        }
      ]
    }
  ],
  'hazardousWater': [
    {
      'start': {
        'x': 28,
        'y': 9
      },
      'length': 4
    },
    {
      'start': {
        'x': 63,
        'y': 9
      },
      'length': 9
    },
    {
      'start': {
        'x': 75,
        'y': 9
      },
      'length': 3
    },
    {
      'start': {
        'x': 80,
        'y': 9
      },
      'length': 6
    },
    {
      'start': {
        'x': 122,
        'y': 9
      },
      'length': 13
    }
  ],
  'hazardousTerrain': [
    {
      'start': {
        'x': 48,
        'y': 7
      },
      'length': 1
    },
    {
      'start': {
        'x': 49,
        'y': 8
      },
      'length': 3
    },
    {
      'start': {
        'x': 55,
        'y': 8
      },
      'length': 5
    },
    {
      'start': {
        'x': 88,
        'y': 8
      },
      'length': 4
    },
    {
      'start': {
        'x': 94,
        'y': 8
      },
      'length': 3
    },
    {
      'start': {
        'x': 97,
        'y': 6
      },
      'length': 1
    },
    {
      'start': {
        'x': 100,
        'y': 7
      },
      'length': 1
    },
    {
      'start': {
        'x': 101,
        'y': 8
      },
      'length': 3
    }
  ],
  'minions': [
    {
      'type': 'scorpion',
      'positions': [
        {
          'x': 40,
          'y': 8
        },
        {
          'x': 106,
          'y': 5
        }
      ]
    }
  ],
  'platforms': [
    {
      'start': {
        'x': 11,
        'y': 5
      },
      'length': 3
    },
    {
      'start': {
        'x': 14,
        'y': 4
      },
      'length': 2
    },
    {
      'start': {
        'x': 119,
        'y': 3
      },
      'length': 2
    }
  ],
  'slidingTerrain': [
    {
      'start': {
        'x': 10,
        'y': 9
      },
      'length': 18
    },
    {
      'start': {
        'x': 70,
        'y': 6
      },
      'length': 5
    }
  ],
  'player': {
    'hasShell': true,
    'jumpVelocity' : -400,
    'walkDrag' : 800,
    'position': {
      'x': 1,
      'y': 7
    }
  },
  'physics': {
    'gravity' : 1200
  }
};

var levelFourThree = {
  'id': '4-3',
  'name': 'U can\'t remember your name',
  'backgroundMusic': 'desert',
  'type': 'desert',
  'boss': {
    'type': 'snake',
    'position': {
      'x': 130,
      'y': 2
    }
  },
  'goal': {
    'position': {
      'x': 144,
      'y': 8,
    },
    'height': 8
  },
  'goodies': [
    {
      'type': 'bubble',
      'positions': [
        {
          'x': 36,
          'y': 8
        },
        {
          'x': 120,
          'y': 3
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 61,
          'y': 2
        },
        {
          'x': 87,
          'y': 7
        }
      ]
    },
    {
      'type': 'strawberry',
      'positions': [
        {
          'x': 51,
          'y': 1
        },
        {
          'x': 112,
          'y': 7
        }
      ]
    }
  ],
  'hazardousWater': [
    {
      'start': {
        'x': 25,
        'y': 9
      },
      'length': 3
    },
    {
      'start': {
        'x': 60,
        'y': 9
      },
      'length': 5
    },
    {
      'start': {
        'x': 71,
        'y': 9
      },
      'length': 7
    },
    {
      'start': {
        'x': 81,
        'y': 9
      },
      'length': 6
    },
    {
      'start': {
        'x': 90,
        'y': 9
      },
      'length': 4
    },
    {
      'start': {
        'x': 95,
        'y': 9
      },
      'length': 1
    }
  ],
  'hazardousTerrain': [
    {
      'start': {
        'x': 96,
        'y': 8
      }
    }
  ],
  'minions': [
    {
      'type': 'scorpion',
      'positions': [
        {
          'x': 19,
          'y': 3
        },
        {
          'x': 45,
          'y': 8
        },
        {
          'x': 49,
          'y': 8
        },
        {
          'x': 109,
          'y': 8
        }
      ]
    }
  ],
  'platforms': [
    {
      'start': {
        'x': 8,
        'y': 8
      },
      'length': 2
    },
    {
      'start': {
        'x': 11,
        'y': 5
      },
      'length': 2
    }
  ],
  'player': {
    'hasShell': true,
    'jumpVelocity' : -400,
    'walkDrag' : 800,
    'position': {
      'x': 1,
      'y': 7
    }
  },
  'physics': {
    'gravity' : 1200
  }
};
var Caterpillar = (function() {
  function Caterpillar(game, x, y) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'caterpillar');

    this.hasHitPlayer = false;
    this.walkVelocity = 80;

    this.plop = game.add.audio('plop',1.75);

    helper.addAnimationsToSprite(this, [
      'default'
    ], 4);
    this.animations.play('default');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.x = 1;
    this.body.immovable = true;
    this.body.velocity.x = -this.walkVelocity;
    this.scale.x *= -1;

    this.anchor.setTo(0.5, 1);

    this.facing = this.body.facing;

    game.add.existing(this);
  }

  Caterpillar.prototype = Object.create(Phaser.Sprite.prototype);
  Caterpillar.prototype.constructor = Caterpillar;

  Caterpillar.prototype.update = function() {
    var LEFT,
        RIGHT;

    LEFT = Phaser.LEFT;
    RIGHT = Phaser.RIGHT;

    if (this.body.facing === LEFT && this.facing !== LEFT) {
      this.facing = LEFT;
      this.turnAround();
    } else if (this.body.facing === RIGHT && this.facing !== RIGHT) {
      this.facing = RIGHT;
      this.turnAround();
    }
  };

  Caterpillar.prototype.hit = function(sprite) {
    var that;

    if (this.body.touching.up) {
      this.plop.play();
      this.kill();
    } else {
      if (!this.hasHitPlayer) {
        sprite.takeDamage(1);
        this.hasHitPlayer = true;
        that = this;

        setTimeout(function() {
          that.hasHitPlayer = false;
        }, 500);
      }
    }
  };

  Caterpillar.prototype.turnAround = function() {
    this.scale.x *= -1;
  };

  return Caterpillar;
})();

var Goody = (function() {
  function Goody(game, x, y, sprite, effects) {
    var that = this;

    Phaser.Sprite.call(this, game, x * 32, y * 32, sprite);

    this.dring = game.add.audio('dring', 0.3);

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = false;
    this.body.immovable = true;

    this.name = sprite;
    this.effects = effects;
    this.originalX = x;
    this.originalY = y;
    
    this.events.onKilled.add(function () {
      that.dring.play();
    });
  }

  Goody.prototype = Object.create(Phaser.Sprite.prototype);
  Goody.prototype.constructor = Goody;

  return Goody;
})();

var Jellyfish = (function() {
  function Jellyfish(game, x, y) {
    var that;

    Phaser.Sprite.call(this, game, x * 32, y * 32, 'jellyfish');

    this.hasHitPlayer = false;
    this.jumpVelocity = 100;
    this.walkVelocity = 100;

    this.plop = game.add.audio('plop', 1.75);

    helper.addAnimationsToSprite(this, [
      'default'
    ], 6);
    this.animations.play('default');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.x = 1;
    this.body.immovable = true;
    this.body.velocity.x = -1 * this.walkVelocity;
    this.body.velocity.y = -1 * this.jumpVelocity;
    // this.scale.x *= -1;

    this.anchor.setTo(0.5, 1);

    this.facing = this.body.facing;

    that = this;
    setInterval(function() {
      that.body.velocity.y = -1 * that.jumpVelocity;
    }, 1000);

    game.add.existing(this);
  }

  Jellyfish.prototype = Object.create(Phaser.Sprite.prototype);
  Jellyfish.prototype.constructor = Jellyfish;

  Jellyfish.prototype.update = function() {
    var LEFT,
        RIGHT;

    LEFT = Phaser.LEFT;
    RIGHT = Phaser.RIGHT;

    if (this.body.facing === LEFT && this.facing !== LEFT) {
      this.facing = LEFT;
      this.turnAround();
    } else if (this.body.facing === RIGHT && this.facing !== RIGHT) {
      this.facing = RIGHT;
      this.turnAround();
    }
  };

  Jellyfish.prototype.hit = function(sprite) {
    var that;

    if (this.body.touching.up) {
      this.plop.play();
      this.kill();
    } else {
      if (!this.hasHitPlayer) {
        sprite.takeDamage(1);
        this.hasHitPlayer = true;
        that = this;

        setTimeout(function() {
          that.hasHitPlayer = false;
        }, 500);
      }
    }
  };

  Jellyfish.prototype.turnAround = function() {
    this.scale.x *= -1;
  };

  return Jellyfish;
})();

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

    if (this.body.touching.up) {
      this.plop.play();
      this.kill();
    } else {
      if (!this.hasHitPlayer) {
        sprite.takeDamage(1);
        this.hasHitPlayer = true;
        that = this;

        setTimeout(function() {
          that.hasHitPlayer = false;
        }, 500);
      }
    }
  };

  return Lanternfish;
})();

var Penguin = (function() {
  function Penguin(game, x, y) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'penguin');

    this.hasHitPlayer = false;
    this.walkVelocity = 150;

    this.plop = game.add.audio('plop', 1.75);

    helper.addAnimationsToSprite(this, [
      'default'
    ], 4);
    this.animations.play('default');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.x = 1;
    this.body.immovable = true;
    this.body.velocity.x = -this.walkVelocity;
    this.scale.x *= -1;

    this.anchor.setTo(0.5, 1);

    this.facing = this.body.facing;

    game.add.existing(this);
  }

  Penguin.prototype = Object.create(Phaser.Sprite.prototype);
  Penguin.prototype.constructor = Penguin;

  Penguin.prototype.update = function() {
    var LEFT,
        RIGHT;

    LEFT = Phaser.LEFT;
    RIGHT = Phaser.RIGHT;

    if (this.body.facing === LEFT && this.facing !== LEFT) {
      this.facing = LEFT;
      this.turnAround();
    } else if (this.body.facing === RIGHT && this.facing !== RIGHT) {
      this.facing = RIGHT;
      this.turnAround();
    }
  };

  Penguin.prototype.hit = function(sprite) {
    var that;

    if (this.body.touching.up) {
      this.plop.play();
      this.kill();
    } else {
      if (!this.hasHitPlayer) {
        sprite.takeDamage(1);
        this.hasHitPlayer = true;
        that = this;

        setTimeout(function() {
          that.hasHitPlayer = false;
        }, 500);
      }
    }
  };

  Penguin.prototype.turnAround = function() {
    this.scale.x *= -1;
  };

  return Penguin;
})();

var Player = (function() {
  function Player(game, x, y, walkDrag, jumpVelocity, hasShell, isUnderWater, isSanta) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'player');

    this.aua = game.add.audio('aua', 0.3);
    this.gulp = game.add.audio('gulp', 0.3);
    this.wahoo = game.add.audio('wahoo', 0.3);
    this.whoop = game.add.audio('whoop', 0.3);
    this.woo = game.add.audio('woo', 0.3);


    this.damageInterval = null;
    this.currentJumpCount = 0;
    this.deathAnimation = null;
    this.facing = Phaser.RIGHT;
    this.hasShell = false;
    this.health = 3;
    this.isCheering = false;
    this.isDying = false;
    this.isInHazardousTerrain = false;
    this.isOnSlidingTerrain = false;
    this.isSanta = false;
    this.isUnderWater = false;
    this.jumpVelocity = jumpVelocity;
    this.maximumJumpCount = 2;
    this.walkDrag = walkDrag;
    this.walkVelocity = 200;

    if (hasShell) {
      this.hasShell = hasShell;
    }

    if (isSanta) {
      this.isSanta = isSanta;
    }

    if (isUnderWater) {
      this.isUnderWater = isUnderWater;
    }

    this.animationNames = [
      'walk-right',
      'walk-left',
      'walk-right-naked',
      'walk-left-naked',
      'eat-right',
      'eat-right-naked',
      'jump-right',
      'jump-right-naked',
      'jump-left',
      'jump-left-naked',
      'eat-left',
      'eat-left-naked',
      'die-right',
      'die-left',
      'die-right-naked',
      'die-left-naked',
      'cheer',
      'swim-right',
      'swim-left',
      'eat-right-underwater',
      'eat-left-underwater',
      'cheer-underwater',
      'die-left-underwater',
      'die-right-underwater',
      'walk-right-santa',
      'walk-left-santa',
      'eat-right-santa',
      'eat-left-santa',
      'jump-right-santa',
      'jump-left-santa',
      'die-right-santa',
      'die-left-santa',
      'cheer-santa'
    ];
    this.framesPerAnimation = 10;

    helper.addAnimationsToSprite(this, this.animationNames, this.framesPerAnimation);

    if (this.isSanta) {
      this.animations.play('walk-right-santa');
    } else if (this.isUnderWater) {
      this.animations.play('swim-right');
    } else if (this.hasShell) {
      this.animations.play('walk-right');
    } else {
      this.animations.play('walk-right-naked');
    }

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.drag.x = this.walkDrag;
    this.body.collideWorldBounds = true;

    this.events.onKilled.add(this.die, this);

    game.add.existing(this);
  }

  Player.prototype = Object.create(Phaser.Sprite.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.update = function() {
    var currentAnimation,
        indexOfSuffix,
        isEatingAnimation,
        isNakedAnimation,
        nakedSuffix,
        newAnimation;

    currentAnimation = this.animations.currentAnim.name;
    isEatingAnimation = currentAnimation.indexOf('eat-') === 0;

    if (!isEatingAnimation) {
      nakedSuffix = '-naked';
      indexOfSuffix = currentAnimation.indexOf(nakedSuffix, 0);
      isNakedAnimation = indexOfSuffix !== -1;

      if (this.hasShell && isNakedAnimation) {
        newAnimation = currentAnimation.substring(0, indexOfSuffix);
        this.animations.play(newAnimation);
      }
    }

    if ((this.body.facing === Phaser.LEFT && this.facing !== Phaser.LEFT) ||
        (this.body.facing === Phaser.RIGHT && this.facing !== Phaser.RIGHT)) {
      this.facing = this.body.facing;
    }

    if (this.body.velocity.y === 0) {
      this.currentJumpCount = 0;
    }
  };

  /* Custom methods */
  Player.prototype.addEffect = function(property, valueChange, duration) {
    var that;

    that = this;

    that[property] += valueChange;

    if (duration) {
      setTimeout(function() {
        that[property] -= valueChange;
      }, duration);
    }
  };

  Player.prototype.addBooleanEffect = function(property, value, duration) {
    var that;

    that = this;

    that[property] = value;

    if (duration) {
      setTimeout(function() {
        that[property] = !value;
      }, duration);
    }
  };

  Player.prototype.cheer = function() {
    var animation,
        that;

    animation = 'cheer';
    that = this;

    if (!this.isCheering) {
      this.isCheering = true;

      this.body.collideWorldBounds = false;
      this.body.velocity.x = this.walkVelocity;
      this.body.drag.x = that.walkVelocity;

      if (this.isSanta) {
        animation += '-santa';
      } else if (this.isUnderWater) {
        animation += '-underwater';
      }

      setTimeout(function() {
        that.animations.play(animation);

        setTimeout(function() {
          if (that.isUnderWater) {
            that.animations.play('swim-right');
          } else {
            if (that.isSanta) {
              that.animations.play('walk-right-santa');
            } else {
              if (!that.hasShell) {
                that.animations.play('walk-right-naked');
              } else {
                that.animations.play('walk-right');
              }
            }
          }

          that.body.velocity.x = that.walkVelocity / 2;
          that.body.drag.x = 0;
        }, 3750);
      }, 1000);
    }
  };

  Player.prototype.die = function() {
    var finalFrameIndex = this.animationNames.indexOf(this.deathAnimation) * this.framesPerAnimation + this.framesPerAnimation - 1;

    this.visible = true;
    this.frame = finalFrameIndex;
  };

  Player.prototype.eatGoody = function(goodyName) {
    if (!this.isCheering && !this.isDying) {
      var animation,
          effect,
          effects,
          goody,
          previousAnimation;

      animation = 'eat-';
      this.gulp.play();
      previousAnimation = this.animations.currentAnim.name;

      animation += this.facing === Phaser.LEFT ? 'left' : 'right';

      if (this.isSanta) {
        animation += '-santa';
      } else if (this.isUnderWater) {
        animation += '-underwater';
      }

      if (!this.hasShell) {
        animation += '-naked';
      }

      this.animations.play(animation, null, false);

      goody = goodies[goodyName.name];
      effects = goody.effects;

      for (var i = 0, l = effects.length; i < l; i += 1) {
        effect = effects[i];

        if (effect.addShell) {
          this.addBooleanEffect('hasShell', effect.addShell, goody.duration);
        }

        if (effect.healthIncrease) {
          this.addEffect('health', effect.healthIncrease, goody.duration);
        }

        if (effect.speedIncrease) {
          this.addEffect('walkVelocity', effect.speedIncrease, goody.duration);
        }

        if (effect.jumpHeightIncrease) {
          this.addEffect('jumpVelocity', effect.jumpHeightIncrease, goody.duration);
        }
      }

      var wasMoving = previousAnimation.indexOf('walk') === 0 || previousAnimation.indexOf('swim') === 0;
      var that = this;

      if (wasMoving) {
        this.events.onAnimationComplete.add(function() {
          that.animations.play(previousAnimation);
        });
      }
    }
  };

  Player.prototype.enterHazardousTerrain = function() {
    if (!this.isInHazardousTerrain) {
      this.isInHazardousTerrain = true;
      this.takeDamage(1);

      this.setDamageInterval();
    }
  };

  Player.prototype.leaveHazardousTerrain = function() {
    if (this.isInHazardousTerrain) {
      this.isInHazardousTerrain = false;

      this.clearDamageInterval();
    }
  };

  Player.prototype.clearDamageInterval = function() {
    clearInterval(this.damageInterval);
  };

  Player.prototype.setDamageInterval = function() {
    var that;

    that = this;

    this.damageInterval = setInterval(function() {
      that.takeDamage(1);
    }, 1000);
  };

  Player.prototype.takeDamage = function(hits) {
    if (!this.isCheering && !this.isDying) {
      if (this.health - hits <= 0) {
        this.isDying = true;
        this.body.immovable = true;

        this.health = 0;
        this.deathAnimation = 'die-';

        this.deathAnimation += (this.facing === Phaser.LEFT) ? 'left' : 'right';

        if (this.isSanta) {
          this.deathAnimation += '-santa';
        } else if (this.isUnderWater) {
          this.deathAnimation += '-underwater';
        }

        if (!this.hasShell) {
          this.deathAnimation += '-naked';
        }

        this.animations.play(this.deathAnimation, null, false, true);
      } else {
        this.aua.play();
        this.damage(hits);
      }
    }
  };

  Player.prototype.jump = function() {
    if (!this.isCheering && !this.isDying) {
      if (!this.isUnderWater) {
        var animation,
            previousAnimation,
            that,
            wasWalking;

        animation = 'jump-';
        that = this;

        wasWalking = this.animations.currentAnim.name.indexOf('walk') === 0;
        if (wasWalking) {
          previousAnimation = this.animations.currentAnim;
        }

        if (this.currentJumpCount < this.maximumJumpCount) {
          this.animations.stop();

          if (this.currentJumpCount === 0){
            this.woo.play();
          } else if (this.currentJumpCount === 1) {
            this.wahoo.play();
          }

          this.body.velocity.y = this.jumpVelocity;
          this.currentJumpCount += 1;

          animation += (this.facing === Phaser.LEFT) ? 'left' : 'right';

          if (this.isSanta) {
            animation += '-santa';
          } else if (!this.hasShell) {
            animation += '-naked';
          }

          this.animations.play(animation, null, false);

          if (previousAnimation) {
            this.events.onAnimationComplete.add(function() {
              that.animations.play(previousAnimation.name);
            });
          }
        }
      } else {
        this.whoop.play('', 0.2, 1, false);
        this.body.velocity.y = this.jumpVelocity;
      }
    }
  };

  Player.prototype.moveLeft = function() {
    if (!this.isCheering && !this.isDying) {
      this.body.velocity.x = -1 * this.walkVelocity;
    }
  };

  Player.prototype.moveRight = function() {
    if (!this.isCheering && !this.isDying) {
      this.body.velocity.x = this.walkVelocity;
    }
  };

  Player.prototype.resetSlide = function() {
    if (this.isOnSlidingTerrain) {
      this.isOnSlidingTerrain = false;

      this.body.drag.x = this.walkDrag;
    }
  };

  Player.prototype.slide = function() {
    if (!this.isOnSlidingTerrain) {
      this.isOnSlidingTerrain = true;

      this.body.drag.x = this.walkDrag / 5;
    }
  };

  Player.prototype.turnLeft = function() {
    if (!this.isCheering && !this.isDying) {
      var animation;

      animation = this.isUnderWater ? 'swim' : 'walk';
      animation += '-left';

      if (this.isSanta) {
        animation += '-santa';
      } else if (!this.hasShell) {
        animation += '-naked';
      }

      this.animations.play(animation);
      this.facing = Phaser.LEFT;
    }
  };

  Player.prototype.turnRight = function() {
    if (!this.isCheering && !this.isDying) {
      var animation;

      animation = this.isUnderWater ? 'swim' : 'walk';
      animation += '-right';

      if (this.isSanta) {
        animation += '-santa';
      } else if (!this.hasShell) {
        animation += '-naked';
      }
      this.animations.play(animation);
      this.facing = Phaser.RIGHT;
    }
  };

  return Player;
})();

var Pufferfish = (function() {
  function Pufferfish(game, x, y) {
    var that;

    Phaser.Sprite.call(this, game, x * 32, y * 32, 'pufferfish');

    this.hasHitPlayer = false;
    this.jumpVelocity = 103;
    this.walkVelocity = 120;

    this.plop = game.add.audio('plop', 1.75);

    helper.addAnimationsToSprite(this, [
      'default'
    ], 6);
    this.animations.play('default');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.collideWorldBounds = true;
    this.body.bounce.x = 1;
    this.body.immovable = true;
    this.body.velocity.x = -1 * this.walkVelocity;
    this.body.velocity.y = -1 * this.jumpVelocity;
    this.scale.x = -1;

    this.anchor.setTo(0.5, 1);

    this.facing = this.body.facing;

    that = this;
    setInterval(function() {
      that.body.velocity.y = -1 * that.jumpVelocity;
    }, 500);

    game.add.existing(this);
  }

  Pufferfish.prototype = Object.create(Phaser.Sprite.prototype);
  Pufferfish.prototype.constructor = Pufferfish;

  Pufferfish.prototype.update = function() {
    var LEFT,
        RIGHT;

    LEFT = Phaser.LEFT;
    RIGHT = Phaser.RIGHT;

    if (this.body.facing === LEFT && this.facing !== LEFT) {
      this.facing = LEFT;
      this.turnAround();
    } else if (this.body.facing === RIGHT && this.facing !== RIGHT) {
      this.facing = RIGHT;
      this.turnAround();
    }
  };

  Pufferfish.prototype.hit = function(sprite) {
    var that;

    if (this.body.touching.up) {
      this.plop.play();
      this.kill();
    } else {
      if (!this.hasHitPlayer) {
        sprite.takeDamage(1);
        this.hasHitPlayer = true;
        that = this;

        setTimeout(function() {
          that.hasHitPlayer = false;
        }, 500);
      }
    }
  };

  Pufferfish.prototype.turnAround = function() {
    this.scale.x *= -1;
  };

  return Pufferfish;
})();

var Scorpion = (function() {
  function Scorpion(game, x, y) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'scorpion');

    this.hasHitPlayer = false;
    this.walkVelocity = 120;

    this.plop = game.add.audio('plop',1.75);

    helper.addAnimationsToSprite(this, [
      'default'
    ], 4);
    this.animations.play('default');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.x = 1;
    this.body.immovable = true;
    this.body.velocity.x = -this.walkVelocity;
    this.scale.x *= -1;

    this.anchor.setTo(0.5, 1);

    this.facing = this.body.facing;

    game.add.existing(this);
  }

  Scorpion.prototype = Object.create(Phaser.Sprite.prototype);
  Scorpion.prototype.constructor = Scorpion;

  Scorpion.prototype.update = function() {
    var LEFT,
        RIGHT;

    LEFT = Phaser.LEFT;
    RIGHT = Phaser.RIGHT;

    if (this.body.facing === LEFT && this.facing !== LEFT) {
      this.facing = LEFT;
      this.turnAround();
    } else if (this.body.facing === RIGHT && this.facing !== RIGHT) {
      this.facing = RIGHT;
      this.turnAround();
    }
  };

  Scorpion.prototype.hit = function(sprite) {
    var that;

    if (this.body.touching.up) {
      this.plop.play();
      this.kill();
    } else {
      if (!this.hasHitPlayer) {
        sprite.takeDamage(1);
        this.hasHitPlayer = true;
        that = this;

        setTimeout(function() {
          that.hasHitPlayer = false;
        }, 500);
      }
    }
  };

  Scorpion.prototype.turnAround = function() {
    this.scale.x *= -1;
  };

  return Scorpion;
})();

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

var Worm = (function() {
  function Worm(game, x, y) {
    Phaser.Sprite.call(this, game, x * 32, y * 32, 'worm');

    this.hasHitPlayer = false;
    this.walkVelocity = 120;

    this.plop = game.add.audio('plop',1.75);

    helper.addAnimationsToSprite(this, [
      'default'
    ], 4);
    this.animations.play('default');

    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.x = 1;
    this.body.immovable = true;
    this.body.velocity.x = -this.walkVelocity;
    this.scale.x *= -1;

    this.anchor.setTo(0.5, 1);

    this.facing = this.body.facing;

    game.add.existing(this);
  }

  Worm.prototype = Object.create(Phaser.Sprite.prototype);
  Worm.prototype.constructor = Worm;

  Worm.prototype.update = function() {
    var LEFT,
        RIGHT;

    LEFT = Phaser.LEFT;
    RIGHT = Phaser.RIGHT;

    if (this.body.facing === LEFT && this.facing !== LEFT) {
      this.facing = LEFT;
      this.turnAround();
    } else if (this.body.facing === RIGHT && this.facing !== RIGHT) {
      this.facing = RIGHT;
      this.turnAround();
    }
  };

  Worm.prototype.hit = function(sprite) {
    var that;

    if (this.body.touching.up) {
      this.plop.play();
      this.kill();
    } else {
      if (!this.hasHitPlayer) {
        sprite.takeDamage(1);
        this.hasHitPlayer = true;
        that = this;

        setTimeout(function() {
          that.hasHitPlayer = false;
        }, 500);
      }
    }
  };

  Worm.prototype.turnAround = function() {
    this.scale.x *= -1;
  };

  return Worm;
})();

var GameCompleteState = {
  preload: function() {
    this.load.spritesheet('player', '/img/sprites/turtle.png', 32, 64);
  },

  create: function() {
    var game,
        menuLabel,
        player;

    game = this.game;

    this.fx = game.add.audio('gameover');
    this.fx.addMarker('gameover', 0, 24, 1, true);
    this.fx.play('gameover');

    this.stage.backgroundColor = config.colors.gray;

    helper.addText(4, 4, 'GAME COMPLETE', { fontSize: 32, fill: config.colors.red });
    helper.addText(4, 9, 'You are done. Good job!\nBut that also means the game is over.\n\nToo bad.');

    player = new Player(this.game, 7, 8, 0);
    player.animations.play('cheer');

    menuLabel = helper.addText(0.5, 1, '← Menu');
    menuLabel.inputEnabled = true;

    var that = this;
    menuLabel.events.onInputUp.add(function() {
      that.fx.pause('gameover');
      game.state.start('menu');
    });
  }
};

var ImprintState = {
    fx: null,

  create: function() {
    var textLabel,
        menuLabel;

    this.stage.backgroundColor = config.colors.lightGreen;

    this.fx = game.add.audio('menu');
    this.fx.addMarker('menu', 0, 12, 1, true);
    this.fx.play('menu');

    menuLabel = helper.addText(0.5, 1, '← Menu');
    menuLabel.inputEnabled = true;

    var that = this;
    menuLabel.events.onInputUp.add(function() {
      that.fx.pause('menu');
      game.state.start('menu');
    });

    textLabel = helper.addText(3, 6,
        'This game was created by:\n' +
        '· Astrid Wühr\n' +
        '· Dominik Habersack\n' +
        '· Judith Steigemann\n' +
        '· Miriam Mayer'
    );
  }
};

var MenuState = {
  fx: null,

  preload: function() {
    this.load.spritesheet('player', '/img/sprites/turtle.png', 32, 64);
  },

  create: function() {
    var game = this.game,
        imprintLabel,
        player,
        playLabel;

    this.fx = game.add.audio('menu');
    this.fx.addMarker('menu', 0, 12, 1, true);
    this.fx.play('menu');

    this.stage.backgroundColor = config.colors.lightYellow;

    helper.addText(4, 4, 'TURTLE', { fontSize: 32, fill: config.colors.green });
    helper.addText(4, 8, 'A fun little game about a fun little turtle.');

    playLabel = helper.addText(3, 12, '→ Play');
    playLabel.inputEnabled = true;

    var that = this;
    playLabel.events.onInputUp.add(function() {
      that.fx.pause('menu');
      game.state.start('play');
    });

    imprintLabel = helper.addText(3, 14, '→ Imprint');
    imprintLabel.inputEnabled = true;
    imprintLabel.events.onInputUp.add(function() {
      that.fx.pause('menu');
      game.state.start('imprint');
    });

    player = new Player(this.game, 7, 8, 0);
  }
};

var PlayState = {
  clouds: null,
  currentLevel: null,
  fx: null,
  goal: null,
  goodies: null,
  hazardousTerrain: null,
  isLevelComplete: null,
  isShowingCompleteMessage: null,
  levelNameLabel: null,
  label: null,
  layer: null,
  level: null,
  lifeGroup: null,
  minions: null,
  backgroundMusic: null,
  platforms: null,
  player: null,
  slidingTerrain: null,
  snake: null,
  stork: null,
  tilemap: null,

  preload: function() {
    var goodies,
        goody;

    goodies = config.goodies;
    for (goody in goodies) {
      if (goodies.hasOwnProperty(goody)) {
        this.load.image(goody, '/img/goodies/' + goody + '.png');
      }
    }
  },

  create: function() {
    this.fx = game.add.audio('backgroundmusic');
    this.fx.addMarker('happy', 0, 16, 1, true);
    this.fx.addMarker('sea', 18, 16, 1, true);
    this.fx.addMarker('ice', 36, 12, 1, true);
    this.fx.addMarker('desert', 52, 8, 1, true);
    this.fx.addMarker('final', 63.5, 7, 1, false);

    if (!localStorage.getItem('turtle')) {
      localStorage.setItem('turtle', JSON.stringify({ currentLevel: 0 }));
    }

    this.startLevel();
  },

  update: function() {
    var lifeGroup,
        newLife,
        newPosition,
        playerHealth;

    lifeGroup = this.lifeGroup;
    playerHealth = this.player.health;

    this.checkBossCollisions();
    this.checkMinionCollisions();
    this.checkPlayerCollisions();

    if (playerHealth >= 0) {
     if (playerHealth < lifeGroup.length) {
        lifeGroup.getAt(playerHealth).destroy();
      } else if (playerHealth > lifeGroup.length) {
        newPosition = this.stage.bounds.width - playerHealth * 32;
        newLife = game.add.sprite(newPosition, 16, 'life');
        lifeGroup.addAt(newLife, lifeGroup.length);
      }
    }

    if (!this.isLevelComplete) {
      this.checkKeys();
    }
  },

  checkKeys: function() {
    var cursorKeys;

    cursorKeys = this.input.keyboard.createCursorKeys();

    if (cursorKeys.left.isDown) {
      this.player.moveLeft();
    }

    if (cursorKeys.right.isDown) {
      this.player.moveRight();
    }
  },

  checkBossCollisions: function() {
    if (this.boss) {
      var arcade;

      arcade = this.game.physics.arcade;

      arcade.collide(this.boss, this.layer);
      arcade.collide(this.boss, this.platforms);
    }
  },

  checkMinionCollisions: function() {
    var arcade;

    arcade = this.game.physics.arcade;

    arcade.collide(this.minions, this.layer);
    arcade.collide(this.minions, this.platforms);
  },

  checkPlayerCollisions: function() {
    var arcade,
        that;

    arcade = this.game.physics.arcade;
    that = this;

    arcade.collide(this.player, this.boss, function(player, boss) {
      boss.hit(player);

      if (player.health <= 0) {
        setTimeout(function() {
         that.fx.pause();
          game.state.start(game.state.current);
        }, 2000);
      }
    });

    arcade.overlap(this.player, this.goal, function(player) {
      that.isLevelComplete = true;

      player.cheer();

      that.fx.stop();
      that.fx.play('final');
      that.showCompleteMessage();
      player.checkWorldBounds = true;

      return false;
    });

    arcade.collide(this.player, this.goodies, function(player, goody) {
      var duration;

      player.eatGoody(goody);
      goody.kill();

      duration = goodies[goody.name].duration;

      if (duration){
        setTimeout(function() {
          that.goodies.add(new Goody(that.game, goody.originalX, goody.originalY, goody.name));
        }, duration);
      }
    });

    var inHazardousTerrain = arcade.overlap(this.player, this.hazardousTerrain, function(player) {
      player.enterHazardousTerrain();

      if (player.health <= 0) {
        setTimeout(function() {
          that.fx.pause();
          game.state.start(game.state.current);
        }, 2000);
      }
    });

    if (!inHazardousTerrain) {
      this.player.leaveHazardousTerrain();
    }

    arcade.collide(this.player, this.layer, function(player) {
      player.resetSlide();
    });

    arcade.collide(this.player, this.minions, function(player, minion) {
      minion.hit(player);

      if (player.health <= 0) {
        setTimeout(function() {
          that.fx.pause();
          game.state.start(game.state.current);
        }, 2000);
      }
    });

    arcade.collide(this.player, this.platforms, function(player) {
      player.resetSlide();
    });

    arcade.collide(this.player, this.slidingTerrain, function(player) {
      player.slide();
    });
  },

  initializeBeforePlayer: function() {
    this.initializeGoal();
    this.initializeHazardousTerrain();
    this.initializePhysics();
    this.initializePlatforms();
    this.initializeSlidingTerrain();
  },

  initializeAfterPlayer: function() {
    this.initializeBoss();
    this.initializeCamera();
    this.initializeClouds();
    this.initializeGoodies();
    this.initializeHealthBar();
    this.initializeKeyboard();
    this.initializeLabels();
    this.initializeMinions();
    this.initializeTitle();

    this.isLevelComplete = false;
  },

  initializeBoss: function() {
    if (this.level.boss) {
      if (this.level.boss.type === 'stork') {
        this.boss = new Stork(this.game, this.level.boss.position.x, this.level.boss.position.y);
      } else if (this.level.boss.type === 'lanternfish') {
        this.boss = new Lanternfish(this.game, this.level.boss.position.x, this.level.boss.position.y);
      } else if (this.level.boss.type === 'snake') {
        this.boss = new Snake(this.game, this.level.boss.position.x, this.level.boss.position.y);
      }
    }
  },

  initializeCamera: function() {
    this.game.camera.follow(this.player);
  },

  initializeGoal: function() {
    var goal,
        pole,
        top;

    goal = this.level.goal;

    this.goal = this.game.add.group();
    this.goal.enableBody = true;
    this.goal.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < goal.height - 1; i += 1) {
      pole = this.goal.create(goal.position.x * 32, (goal.position.y - i) * 32, this.level.type + '-spritesheet', 11);
      this.game.physics.enable(pole, Phaser.Physics.ARCADE);
      pole.body.allowGravity = false;
      pole.body.immovable = true;
    }

    top = this.goal.create(goal.position.x * 32, (goal.position.y - goal.height + 1) * 32, this.level.type + '-spritesheet', 7);
    this.game.physics.enable(top, Phaser.Physics.ARCADE);
    top.body.allowGravity = false;
    top.body.immovable = true;
  },

  initializeClouds: function() {
    this.clouds = this.game.add.group();
    this.clouds.enableBody = true;
    this.clouds.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0, l = 8; i < l; i += 1) {
      this.addCloud(_.random(0, this.world.bounds.width / 32) * 32);
    }
  },

  initializeGoodies: function() {
    if (this.level.goodies) {
      var goodiesEntry,
          position,
          positions;

      this.goodies = this.game.add.group();
      this.goodies.enableBody = true;
      this.goodies.physicsBodyType = Phaser.Physics.ARCADE;

      for (var i = 0, l = this.level.goodies.length; i < l; i += 1) {
        goodiesEntry = this.level.goodies[i];
        positions = goodiesEntry.positions;

        for (var j = 0, k = positions.length; j < k; j += 1) {
          position = positions[j];

          this.goodies.add(new Goody(this.game, position.x, position.y, goodiesEntry.type));
        }
      }
    }
  },

  initializeMinions: function() {
    if (this.level.minions) {
      var minion,
          minionsEntry,
          position,
          positions;

      this.minions = this.game.add.group();

      for (var i = 0, l = this.level.minions.length; i < l; i += 1) {
        minionsEntry = this.level.minions[i];
        positions = minionsEntry.positions;

        for (var j = 0, k = positions.length; j < k; j += 1) {
          position = positions[j];

          switch (minionsEntry.type) {
            case 'caterpillar':
              minion = new Caterpillar(this.game, position.x, position.y);
              break;
            case 'jellyfish':
              minion = new Jellyfish(this.game, position.x, position.y);
              break;
            case 'penguin':
              minion = new Penguin(this.game, position.x, position.y);
              break;
            case 'pufferfish':
              minion = new Pufferfish(this.game, position.x, position.y);
              break;
            case 'scorpion':
              minion = new Scorpion(this.game, position.x, position.y);
              break;
            case 'worm':
              minion = new Worm(this.game, position.x, position.y);
              break;
          }

          this.minions.add(minion);
        }
      }
    }
  },

  initializeHazardousTerrain: function() {
    if (this.level.hazardousTerrain) {
      var entry,
          terrain,
          terrainStart;

      this.hazardousTerrain = this.game.add.group();
      this.hazardousTerrain.enableBody = true;
      this.hazardousTerrain.physicsBodyType = Phaser.Physics.ARCADE;

      for (var i = 0, l = this.level.hazardousTerrain.length; i < l; i += 1) {
        entry = this.level.hazardousTerrain[i];

        terrainStart = entry.start;

        for (var j = 0; j < entry.length; j += 1) {
          terrain = this.hazardousTerrain.create((terrainStart.x + j) * 32, terrainStart.y * 32, this.level.type + '-spritesheet', 14);

          this.game.physics.enable(terrain, Phaser.Physics.ARCADE);

          terrain.body.allowGravity = false;
          terrain.body.checkCollision.left = false;
          terrain.body.checkCollision.right = false;
          terrain.body.checkCollision.down = false;
          terrain.body.immovable = true;
        }
      }
    }
  },

  initializeHealthBar: function() {
    this.lifeGroup = game.add.group();
    this.lifeGroup.fixedToCamera = true;

    for (var i = 0; i < this.player.health; i += 1) {
      this.lifeGroup.create(this.stage.bounds.width - (i + 1) * 32, 16, 'life');
    }
  },

  initializeKeyboard: function() {
    var cursorKeys;

    cursorKeys = this.input.keyboard.createCursorKeys();

    this.input.keyboard.addKeyCapture([
        cursorKeys.up,
        cursorKeys.down,
        cursorKeys.Left,
        cursorKeys.right,

        Phaser.Keyboard.SPACEBAR
    ]);

    var jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    jumpButton.onDown.add(this.player.jump, this.player);

    cursorKeys.right.onDown.add(this.player.turnRight, this.player);
    cursorKeys.left.onDown.add(this.player.turnLeft, this.player);
  },

  initializeLabels: function() {
    var menuLabel,
        that = this;

    menuLabel = helper.addText(1, 1, 'Menu');
    menuLabel.fixedToCamera = true;
    menuLabel.inputEnabled = true;

    menuLabel.events.onInputUp.add(function() {
      that.fx.stop();
      game.state.start('menu');
    });
  },

  initializePlatforms: function() {
    if (this.level.platforms) {
      var entry,
          platform,
          platformStart;

      this.platforms = this.game.add.group();
      this.platforms.enableBody = true;
      this.platforms.physicsBodyType = Phaser.Physics.ARCADE;

      for (var i = 0, l = this.level.platforms.length; i < l; i += 1) {
        entry = this.level.platforms[i];

        platformStart = entry.start;

        for (var j = 0, k = entry.length; j < k; j += 1) {
          var tileIndex = 4;
          if (j > 0) {
            tileIndex = 5;
          }
          if (j === k) {
            tileIndex = 6;
          }

          platform = this.platforms.create((platformStart.x + j) * 32, platformStart.y * 32, this.level.type + '-spritesheet', tileIndex);

          this.game.physics.enable(platform, Phaser.Physics.ARCADE);

          platform.body.allowGravity = false;
          platform.body.checkCollision.left = false;
          platform.body.checkCollision.right = false;
          platform.body.checkCollision.down = false;
          platform.body.immovable = true;
        }
      }
    }
  },

  initializePhysics: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = this.level.physics.gravity;

    // prevent tunneling
    this.game.time.deltaCap = 0.02;
  },

  initializeSlidingTerrain: function() {
    if (this.level.slidingTerrain) {
      var entry,
          terrain,
          terrainStart;

      this.slidingTerrain = this.game.add.group();
      this.slidingTerrain.enableBody = true;
      this.slidingTerrain.physicsBodyType = Phaser.Physics.ARCADE;

      for (var i = 0, l = this.level.slidingTerrain.length; i < l; i += 1) {
        entry = this.level.slidingTerrain[i];

        terrainStart = entry.start;

        for (var j = 0; j < entry.length; j += 1) {
          terrain = this.slidingTerrain.create((terrainStart.x + j) * 32, terrainStart.y * 32, this.level.type + '-spritesheet', 10);

          this.game.physics.enable(terrain, Phaser.Physics.ARCADE);

          terrain.body.allowGravity = false;
          terrain.body.checkCollision.left = false;
          terrain.body.checkCollision.right = false;
          terrain.body.checkCollision.down = false;
          terrain.body.immovable = true;
        }
      }
    }
  },

  initializeTitle: function() {
    this.levelNameLabel = helper.addText(1, 4, this.level.id + ': ' + this.level.name, { fill: config.colors.gray });
  },

  startLevel: function() {
    var currentLevel,
        playerConfiguration;

    currentLevel = JSON.parse(localStorage.getItem('turtle')).currentLevel;

    if (this.boss) {
      this.boss.destroy();
    }

    if (this.clouds) {
      this.clouds.destroy();
    }

    if (this.goal) {
      this.goal.destroy();
    }

    if (this.goodies) {
      this.goodies.destroy();
    }

    if (this.hazardousTerrain) {
      this.hazardousTerrain.destroy();
    }

    if (this.label) {
      this.label.destroy();
    }

    if (this.layer) {
      this.layer.destroy();
    }

    if (this.levelNameLabel) {
      this.levelNameLabel.destroy();
    }

    if (this.lifeGroup) {
      this.lifeGroup.destroy();
    }

    if (this.minions) {
      this.minions.destroy();
    }

    if (this.platforms) {
      this.platforms.destroy();
    }

    if (this.tilemap) {
      this.tilemap.destroy();
    }

    this.isLevelComplete = false;
    this.isShowingCompleteMessage = false;

    this.level = config.levels[currentLevel];

    this.stage.backgroundColor = config.colors.lightBlue;
    this.fx.stop();
    this.fx.play(this.level.backgroundMusic, true);

    this.tilemap = this.game.add.tilemap(this.level.id + '-tilemap');
    this.tilemap.addTilesetImage(this.level.type + '-tiles');

    this.layer = this.tilemap.createLayer('layer-1');
    this.layer.resizeWorld();

    this.initializeBeforePlayer();

    playerConfiguration = this.level.player;
    this.player = new Player(
        this.game,
        playerConfiguration.position.x,
        playerConfiguration.position.y,
        playerConfiguration.walkDrag,
        playerConfiguration.jumpVelocity,
        playerConfiguration.hasShell,
        playerConfiguration.isUnderWater,
        playerConfiguration.isSanta
    );

    this.player.checkWorldBounds = false;
    var that = this;

    this.player.events.onOutOfBounds.add(function() {
      currentLevel += 1;
      localStorage.setItem('turtle', JSON.stringify({ currentLevel: currentLevel }));

      if (currentLevel < config.levels.length) {
        that.startLevel();
      } else {
        localStorage.setItem('turtle', JSON.stringify({ currentLevel: 0 }));
        game.state.start('game-complete');
      }
    });

    this.tilemap.setCollision([9, 10]);

    this.initializeAfterPlayer();
  },

  addCloud: function(x) {
    var cloud,
        that = this;

    if (typeof x === 'undefined') {
      x = this.world.bounds.width;
    }

    cloud = this.clouds.create(x, _.random(1, 3) * 32, this.level.type + '-spritesheet', 0);
    cloud.body.velocity.x = -1 * _.random(1, 2) * 32;
    cloud.body.allowGravity = false;
    cloud.checkWorldBounds = true;
    cloud.events.onKilled.add(function() {
      that.addCloud();
    });
    cloud.outOfBoundsKill = true;
  },

  showCompleteMessage: function() {
    if (!this.isShowingCompleteMessage) {
      this.label = helper.addText(2, 8, 'Congratulations!', { fill: config.colors.lightYellow, fontSize: 48 });
      this.label.fixedToCamera = true;

      this.isShowingCompleteMessage = true;
    }
  }
};

var PreloadState = {

  preload: function() {
    this.ready = false;

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

    game.load.audio('aua', 'music/aua.mp3');
    game.load.audio('backgroundmusic', 'music/backgroundmusic.mp3');
    game.load.audio('dring', 'music/dring.mp3');
    game.load.audio('gameover', 'music/gameover.mp3');
    game.load.audio('gulp', 'music/gulp.mp3');
    game.load.audio('menu', 'music/menu.mp3');
    game.load.audio('plop', 'music/plop.mp3');
    game.load.audio('wahoo', 'music/wahoo.mp3');
    game.load.audio('whoop', 'music/whoop.mp3');
    game.load.audio('woo', 'music/woo.mp3');

    this.load.image('desert-tiles', '/img/tiles/desert.png');
    this.load.image('forest-tiles', '/img/tiles/forest.png');
    this.load.image('sea-tiles', '/img/tiles/sea.png');
    this.load.image('winter-tiles', '/img/tiles/winter.png');
    this.load.image('life', '/img/images/life.png');

    this.load.spritesheet('lanternfish', '/img/sprites/lanternfish.png', 80, 80);
    this.load.spritesheet('caterpillar', '/img/sprites/caterpillar.png', 48, 16);
    this.load.spritesheet('jellyfish', '/img/sprites/jellyfish.png', 32, 48);
    this.load.spritesheet('penguin', '/img/sprites/penguin.png', 32, 28);
    this.load.spritesheet('player', '/img/sprites/turtle.png', 32, 64);
    this.load.spritesheet('pufferfish', '/img/sprites/pufferfish.png', 32, 32);
    this.load.spritesheet('scorpion', '/img/sprites/scorpion.png', 32, 18);
    this.load.spritesheet('snake', '/img/sprites/snake.png', 82, 80);
    this.load.spritesheet('stork', '/img/sprites/stork.png', 144, 132);
    this.load.spritesheet('worm', '/img/sprites/worm.png', 48, 16);

    this.load.spritesheet('desert-spritesheet', '/img/tiles/desert.png', 32, 32);
    this.load.spritesheet('forest-spritesheet', '/img/tiles/forest.png', 32, 32);
    this.load.spritesheet('sea-spritesheet', '/img/tiles/sea.png', 32, 32);
    this.load.spritesheet('winter-spritesheet', '/img/tiles/winter.png', 32, 32);

    this.load.tilemap('1-1-tilemap', '/img/tiles/1-1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('1-2-tilemap', '/img/tiles/1-2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('1-3-tilemap', '/img/tiles/1-3.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('2-1-tilemap', '/img/tiles/2-1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('2-2-tilemap', '/img/tiles/2-2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('3-1-tilemap', '/img/tiles/3-1.json', null, Phaser.Tilemap.TILED_JSON);

    this.load.tilemap('4-1-tilemap', '/img/tiles/4-1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('4-2-tilemap', '/img/tiles/4-2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('4-3-tilemap', '/img/tiles/4-3.json', null, Phaser.Tilemap.TILED_JSON);

  },
  create: function() {
  },
  update: function() {
    if(!!this.ready) {
      // this.game.state.start('menu');
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

var Config = (function() {
  function Config() {
    this.colors = {
      gray: '#bcbcbc',
      lightBlue: '#0078f8',
      blue: '#0058f8',
      purple: '#6844fc',
      magenta: '#d800cc',
      red: '#e40058',
      green: '#00a800',
      lightGreen: '#00b800',
      lightYellow: '#d8F878'
    };

    this.goodies = goodies;

    this.levels = [
      levelOneOne,
      levelOneTwo,
      levelOneThree,
      levelTwoOne,
      levelTwoTwo,
      levelThreeOne,
      levelFourOne,
      levelFourTwo,
      levelFourThree
    ];
  }

  return Config;
})();

var config,
    game,
    helper,
    states;

config = new Config();

game = new Phaser.Game(480, 320, Phaser.AUTO, 'turtle');

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
}).call(this);