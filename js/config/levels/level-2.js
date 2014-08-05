var levelTwo = {
  'backgroundMusic': 'sea',
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
          'x': 10,
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
  'name': 'Level 2: Sea',
  'platforms': [
    {
      'start': {
        'x': 8,
        'y': 8
      },
      'length': 1
    },
    {
      'start': {
        'x': 6,
        'y': 1
      },
      'length': 2
    }
  ],
  'player': {
    'jumpVelocity' : -200,
    'walkDrag' : 800
  },
  'physics': {
    'gravity' : 400
  },
  'tilemap': 'sea-tilemap',
  'tilemapImage': 'sea-tiles'
};