var levelZero = {
  'name': '3-1 Winter Wonderland',
  'backgroundMusic': 'happy',
  'goal': {
    'position': {
      'x': 64,
      'y': 8,
    },
    'height': 8
  },
  'goodies': [
    {
      'goody': 'bubble',
      'positions': [
        {
          'x': 41,
          'y': 5
        }
      ]
    },
    {
      'goody': 'candy',
      'positions': [
        {
          'x': 7,
          'y': 4
        }
      ]
    },
    {
      'goody': 'chili',
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
      'goody': 'ice',
      'positions': [
        {
          'x': 16,
          'y': 5
        }
      ]
    },
    {
      'goody': 'strawberry',
      'positions': [
        {
          'x': 16,
          'y': 8
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
    'hasShell': true,
    'isSanta': true,
    'isUnderWater': false,
    'jumpVelocity' : -400,
    'walkDrag' : 800
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
  ],
  'tilemap': 'forest-tilemap',
  'tilemapImage': 'forest-tiles'
};
