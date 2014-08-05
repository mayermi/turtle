var levelOne = {
  'name': 'Level 1: Overworld',
  'tilemap': 'forest-tilemap',
  'tilemapImage': 'forest-tiles',
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
        'x': 4,
        'y': 7
      },
      'length': 6
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
    'walkDrag' : 800
  },
  'physics': {
    'gravity' : 1200
  },
};
