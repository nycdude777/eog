const layout = {
  root: [
    {
      row: [
        {
          'cell:0': [
            {
              column: [
                { 'cell:0': [
                  { 
                    gauge: [
                      // { 'flareTemp?': [] }
                    ] 
                  }
                ] },
                { 'cell:1': [] },
                { 'cell:2': [] },
              ]
            }
          ],
        },

        {
          'expandingcell:1': [
            {
              column: [
                {
                  'cell:0': [
                    {
                      'line-chart': [],
                    },
                  ],
                },

                {
                  'expandingcell:1': [
                    {
                      'line-chart': [],
                    },
                  ],
                },

              ],
            },
          ],
        },
      ],
    },
  ],
};


export default JSON.stringify(layout);