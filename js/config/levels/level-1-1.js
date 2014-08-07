var levelOneOne = {
  'id': '1-1',
  'name': 'Welcome to the world',
  'backgroundMusic': 'happy',
  'type': 'forest',
  'boss': {
    'type': 'stork',
    'position': {
      'x': 58,
      'y': 4
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
  'minions': [
    {
      'minion': 'worm',
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
    }
  ],
  'platforms': [
    {
      'start': {
        'x': 5,
        'y': 7
      },
      'length': 4
    },
    {
      'start': {
        'x': 16,
        'y': 4
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
