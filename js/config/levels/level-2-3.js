var levelTwoThree = {
  'id': '2-3',
  'name': 'Finding Peemo',
  'backgroundMusic': 'sea',
  'type': 'sea',
  'boss': {
    'type': 'lanternfish',
    'position': {
      'x': 140,
      'y': 4
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
          'x': 29,
          'y': 3
        },
        {
          'x': 47,
          'y': 7
        }
      ]
    },
    {
      'type': 'candy',
      'positions': [
        {
          'x': 69,
          'y': 8
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 20,
          'y': 6
        },
        {
          'x': 34,
          'y': 1
        },
        {
          'x': 77,
          'y': 8
        },
        {
          'x': 80,
          'y': 2
        },
        {
          'x': 91,
          'y': 5
        },
        {
          'x': 96,
          'y': 8
        },
        {
          'x': 98,
          'y': 2
        },
        {
          'x': 101,
          'y': 5
        },
        {
          'x': 110,
          'y': 2
        }
      ]
    },
    {
      'type': 'ice',
      'positions': [
        {
          'x': 88,
          'y': 8
        }
      ]
    },
    {
      'type': 'strawberry',
      'positions': [
        {
          'x': 57,
          'y': 4
        },
        {
          'x': 61,
          'y': 5
        },
        {
          'x': 78,
          'y': 5
        },
        {
          'x': 80,
          'y': 4
        },
        {
          'x': 82,
          'y': 5
        },
        {
          'x': 111,
          'y': 6
        },
        {
          'x': 112,
          'y': 8
        },
        {
          'x': 137,
          'y': 5
        },
      ]
    }
  ],
  'hazardousTerrain': [
    {
      'start': {
        'x': 1,
        'y': 8
      },
      'length': 6
    },
    {
      'start': {
        'x': 81,
        'y': 8
      },
      'length': 4
    },
    {
      'start': {
        'x': 98,
        'y': 8
      },
      'length': 4
    }
  ],
  'minions': [
    {
      'type': 'jellyfish',
      'positions': [
        {
          'x': 52,
          'y': 7
        },
        {
          'x': 53,
          'y': 7
        },
        {
          'x': 54,
          'y': 7
        },
        {
          'x': 55,
          'y': 7
        },
        {
          'x': 56,
          'y': 7
        },
        {
          'x': 122,
          'y': 7
        },
        {
          'x': 128,
          'y': 7
        },
        {
          'x': 129,
          'y': 7
        }
      ]
    }
  ],
  'player': {
    'hasShell': true,
    'isUnderWater': true,
    'jumpVelocity' : -200,
    'walkDrag' : 800,
    'position': {
      'x': 2,
      'y': 3
    }
  },
  'physics': {
    'gravity' : 400
  }
};
