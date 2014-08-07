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
