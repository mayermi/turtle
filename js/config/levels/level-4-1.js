var levelFourOne = {
  'id': '4-1',
  'name': 'Horse with no name',
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
      'goody': 'bubble',
      'positions': [
        {
          'x': 37,
          'y': 2
        },
        {
          'x': 81,
          'y': 7
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
          'x': 126,
          'y': 8
        }
      ]
    },
    {
      'goody': 'chili',
      'positions': [
        {
          'x': 10,
          'y': 8
        },
        {
          'x': 49,
          'y': 9
        },
        {
          'x': 64,
          'y': 8
        }
      ]
    },
    {
      'goody': 'strawberry',
      'positions': [
        {
          'x': 46,
          'y': 1
        },
        {
          'x': 104,
          'y': 1
        }
      ]
    }
  ],
  'platforms': [
    {
      'start': {
        'x': 35,
        'y': 5
      },
      'length': 3
    },
    {
      'start': {
        'x': 44,
        'y': 3
      },
      'length': 3
    },
    {
      'start': {
        'x': 104,
        'y': 2
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
