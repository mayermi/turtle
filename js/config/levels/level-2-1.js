var levelTwoOne = {
  'id': '2-1',
  'name': 'Under the sea',
  'backgroundMusic': 'sea',
  'type': 'sea',
  'boss': {
    'type': 'lanternfish',
    'position': {
      'x': 58,
      'y': 5
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
          'x': 10,
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
      'type': 'jellyfish',
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
    },
    {
      'type': 'pufferfish',
      'positions': [
        {
          'x': 40,
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
      'x': 1,
      'y': 7
    }
  },
  'physics': {
    'gravity' : 400
  }
};
