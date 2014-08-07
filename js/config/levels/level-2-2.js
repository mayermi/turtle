var levelTwoTwo = {
  'id': '2-2',
  'name': 'Message in a bottle',
  'backgroundMusic': 'sea',
  'type': 'sea',
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
          'x': 12,
          'y': 7
        },
        {
          'x': 76,
          'y': 1
        },
        {
          'x': 102,
          'y': 2
        }
      ]
    },
    {
      'type': 'candy',
      'positions': [
        {
          'x': 33,
          'y': 8
        },
        {
          'x': 83,
          'y': 1
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 8,
          'y': 4
        },
        {
          'x': 23,
          'y': 8
        },
        {
          'x': 36,
          'y': 1
        },
        {
          'x': 65,
          'y': 8
        },
        {
          'x': 69,
          'y': 7
        },
        {
          'x': 76,
          'y': 8
        },
        {
          'x': 110,
          'y': 3
        }
      ]
    },
    {
      'type': 'ice',
      'positions': [
        {
          'x': 50,
          'y': 8
        },
        {
          'x': 91,
          'y': 2
        },
        {
          'x': 116,
          'y': 2
        }
      ]
    }
  ],
  'hazardousTerrain': [
    {
      'start': {
        'x': 17,
        'y': 2
      },
      'length': 2
    },
    {
      'start': {
        'x': 31,
        'y': 6
      },
      'length': 1
    },
    {
      'start': {
        'x': 52,
        'y': 2
      },
      'length': 2
    },
    {
      'start': {
        'x': 107,
        'y': 8
      },
      'length': 2
    },
    {
      'start': {
        'x': 114,
        'y': 8
      },
      'length': 2
    }
  ],
  'player': {
    'hasShell': true,
    'isUnderWater': true,
    'jumpVelocity' : -200,
    'walkDrag' : 800,
    'position': {
      'x': 1,
      'y': 7
    }
  },
  'physics': {
    'gravity' : 400
  }
};
