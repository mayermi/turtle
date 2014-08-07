var levelThreeOne = {
  'id': '3-1',
  'name': 'Winter Wonderland',
  'backgroundMusic': 'ice',
  'type': 'winter',
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
          'x': 54,
          'y': 8
        },
        {
          'x': 130,
          'y': 4
        }
      ]
    },
    {
      'type': 'candy',
      'positions': [
        {
          'x': 26,
          'y': 2
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 92,
          'y': 1
        }
      ]
    },
    {
      'type': 'ice',
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
          'x': 41,
          'y': 8
        },
        {
          'x': 118,
          'y': 8
        }
      ]
    }
  ],
  'hazardousTerrain': [
    {
      'start': {
        'x': 19,
        'y': 8
      },
      'length': 1
    },
    {
      'start': {
        'x': 81,
        'y': 8
      },
      'length': 3
    }
  ],
  'hazardousWater': [
    {
      'start': {
        'x': 47,
        'y': 9
      },
      'length': 2
    },
    {
      'start': {
        'x': 68,
        'y': 9
      },
      'length': 2
    },
    {
      'start': {
        'x': 74,
        'y': 9
      },
      'length': 3
    },
    {
      'start': {
        'x': 85,
        'y': 7
      },
      'length': 8
    },
    {
      'start': {
        'x': 129,
        'y': 9
      },
      'length': 3
    }
  ],
  'minions': [
    {
      'type': 'penguin',
      'positions': [
        {
          'x': 14,
          'y': 8
        },
        {
          'x': 53,
          'y': 8
        },
        {
          'x': 55,
          'y': 8
        },
        {
          'x': 96,
          'y': 8
        },
        {
          'x': 104,
          'y': 8
        },
        {
          'x': 122,
          'y': 8
        }
      ]
    }
  ],
  'platforms': [
    {
      'start': {
        'x': 18,
        'y': 4
      },
      'length': 4
    },
    {
      'start': {
        'x': 25,
        'y': 3
      },
      'length': 4
    },
    {
      'start': {
        'x': 52,
        'y': 5
      },
      'length': 5
    },
    {
      'start': {
        'x': 85,
        'y': 5
      },
      'length': 2
    },
    {
      'start': {
        'x': 87,
        'y': 3
      },
      'length': 3
    },
    {
      'start': {
        'x': 91,
        'y': 3
      },
      'length': 3
    },
    {
      'start': {
        'x': 95,
        'y': 4
      },
      'length': 3
    },
    {
      'start': {
        'x': 108,
        'y': 6
      },
      'length': 3
    },
    {
      'start': {
        'x': 129,
        'y': 5
      },
      'length': 3
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
  }
};
