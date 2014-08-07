var levelFourThree = {
  'id': '4-3',
  'name': 'U can\'t remember your name',
  'backgroundMusic': 'desert',
  'type': 'desert',
  'boss': {
    'type': 'snake',
    'position': {
      'x': 130,
      'y': 2
    }
  },
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
          'x': 36,
          'y': 8
        },
        {
          'x': 120,
          'y': 3
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 61,
          'y': 2
        },
        {
          'x': 87,
          'y': 7
        }
      ]
    },
    {
      'type': 'strawberry',
      'positions': [
        {
          'x': 51,
          'y': 1
        },
        {
          'x': 112,
          'y': 7
        }
      ]
    }
  ],
  'hazardousWater': [
    {
      'start': {
        'x': 25,
        'y': 9
      },
      'length': 3
    },
    {
      'start': {
        'x': 60,
        'y': 9
      },
      'length': 5
    },
    {
      'start': {
        'x': 71,
        'y': 9
      },
      'length': 7
    },
    {
      'start': {
        'x': 81,
        'y': 9
      },
      'length': 6
    },
    {
      'start': {
        'x': 90,
        'y': 9
      },
      'length': 4
    },
    {
      'start': {
        'x': 95,
        'y': 9
      },
      'length': 1
    }
  ],
  'hazardousTerrain': [
    {
      'start': {
        'x': 96,
        'y': 8
      }
    }
  ],
  'minions': [
    {
      'type': 'scorpion',
      'positions': [
        {
          'x': 19,
          'y': 3
        },
        {
          'x': 45,
          'y': 8
        },
        {
          'x': 49,
          'y': 8
        },
        {
          'x': 109,
          'y': 8
        }
      ]
    }
  ],
  'platforms': [
    {
      'start': {
        'x': 8,
        'y': 8
      },
      'length': 2
    },
    {
      'start': {
        'x': 11,
        'y': 5
      },
      'length': 2
    }
  ],
  'player': {
    'hasShell': true,
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