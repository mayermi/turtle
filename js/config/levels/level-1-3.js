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
