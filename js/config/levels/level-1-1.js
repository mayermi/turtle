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
