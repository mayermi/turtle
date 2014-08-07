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
      'type': 'worm',
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
        'x': 19,
        'y': 5
      },
      'length': 3
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
        'x': 119,
        'y': 3
      },
      'length': 2
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
