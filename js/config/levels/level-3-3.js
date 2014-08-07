var levelThreeThree = {
  'id': '3-3',
  'name': 'Winter Wonderland',
  'backgroundMusic': 'ice',
  'type': 'winter',
  'boss': {
    'type': 'polarbaer',
    'position': {
      'x': 145,
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
          'x': 21,
          'y': 8
        },
        {
          'x': 96,
          'y': 1
        },
      ]
    },
    {
      'type': 'candy',
      'positions': [
        {
          'x': 30,
          'y': 8
        },
        {
          'x': 104,
          'y': 1
        },
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 50,
          'y': 3
        }
      ]
    },
    {
      'type': 'strawberry',
      'positions': [
        {
          'x': 41,
          'y': 1
        },
        {
          'x': 124,
          'y': 8
        },
      ]
    }
  ],
  'hazardousWater': [
    {
      'start': {
        'x': 22,
        'y': 9
      },
      'length': 4
    },
    {
      'start': {
        'x': 35,
        'y': 9
      },
      'length': 3
    },
    {
      'start': {
        'x': 64,
        'y': 9
      },
      'length': 3
    }
  ],
  'hazardousTerrain': [
    {
      'start': {
        'x': 32,
        'y': 8
      },
      'length': 1
    },
    {
      'start': {
        'x': 72,
        'y': 5
      },
      'length': 1
    },
    {
      'start': {
        'x': 86,
        'y': 8
      },
      'length': 1
    },
    {
      'start': {
        'x': 92,
        'y': 8
      },
      'length': 2
    },
    {
      'start': {
        'x': 100,
        'y': 7
      },
      'length': 1
    }
  ],
  'minions': [
    {
      'type': 'penguin',
      'positions': [
        {
          'x': 15,
          'y': 8
        },
        {
          'x': 50,
          'y': 5
        },
        {
          'x': 52,
          'y': 5
        },
        {
          'x': 53,
          'y': 5
        },
        {
          'x': 70,
          'y': 5
        },
        {
          'x': 100,
          'y': 5
        },
        {
          'x': 102,
          'y': 5
        },
        {
          'x': 105,
          'y': 5
        },
        {
          'x': 120,
          'y': 8
        },
        {
          'x': 117,
          'y': 8
        },
        {
          'x': 124,
          'y': 8
        }
      ]
    }
  ],
  'platforms': [
    {
      'start': {
        'x': 19,
        'y': 6
      },
      'length': 2
    },
    {
      'start': {
        'x': 22,
        'y': 4
      },
      'length': 2
    },
    {
      'start': {
        'x': 27,
        'y': 3
      },
      'length': 4
    },
    {
      'start': {
        'x': 36,
        'y': 3
      },
      'length': 2
    },
    {
      'start': {
        'x': 40,
        'y': 3
      },
      'length': 2
    },
    {
      'start': {
        'x': 85,
        'y': 4
      },
      'length': 2
    },
    {
      'start': {
        'x': 90,
        'y': 3
      },
      'length': 2
    },
    {
      'start': {
        'x': 95,
        'y': 3
      },
      'length': 3
    },
    {
      'start': {
        'x': 103,
        'y': 3
      },
      'length': 2
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
        'x': 19,
        'y': 9
      },
      'length': 3
    },
    {
      'start': {
        'x': 26,
        'y': 9
      },
      'length': 9
    },
    {
      'start': {
        'x': 74,
        'y': 9
      },
      'length': 6
    },
    {
      'start': {
        'x': 83,
        'y': 9
      },
      'length': 13
    }
  ]
};