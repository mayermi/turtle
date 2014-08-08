var levelTwoOne = {
  'id': '2-1',
  'name': 'Under the sea',
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
          'x': 68,
          'y': 6
        }
      ]
    },
    {
      'type': 'candy',
      'positions': [
        {
          'x': 78,
          'y': 1
        },
        {
          'x': 92,
          'y': 5
        }
      ]
    },
    {
      'type': 'chili',
      'positions': [
        {
          'x': 42,
          'y': 1
        }
      ]
    },
    {
      'type': 'ice',
      'positions': [
        {
          'x': 60,
          'y': 1
        },
        {
          'x': 104,
          'y': 1
        }
      ]
    },
    {
      'type': 'strawberry',
      'positions': [
        {
          'x': 44,
          'y': 1
        },
        {
          'x': 113,
          'y': 8
        }
      ]
    }
  ],
  'minions': [
    {
      'type': 'jellyfish',
      'positions': [
        {
          'x': 90,
          'y': 7
        },
        {
          'x': 105,
          'y': 7
        },
        {
          'x': 130,
          'y': 7
        },
        {
          'x': 135,
          'y': 7
        }
      ]
    },
    {
      'type': 'pufferfish',
      'positions': [
        {
          'x': 40,
          'y': 9
        },
        {
          'x': 60,
          'y': 8
        },
        {
          'x': 78,
          'y': 5
        },
        {
          'x': 110,
          'y': 1
        },
        {
          'x': 113,
          'y': 1
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
