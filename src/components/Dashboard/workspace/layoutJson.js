const layout = {
  root: [
    {
      column: [
        
        { 
          'cell:0': [
            {
              row: [
                { 
                  'cell:0': [
                    { gauge: [ { 'flareTemp?': [] } ] }
                  ] 
                },
                { 
                  'expandingCell:0': [
                    { lineChart: [ { 'flareTemp?': [] } ] }
                  ] 
                },
              ]
            }
          ],
        },

        { 
          'cell:1': [
            {
              row: [
                { 
                  'cell:0': [
                    { gauge: [ { 'tubingPressure?': [] } ] }
                  ] 
                },
                { 
                  'expandingCell:0': [
                    { lineChart: [ { 'tubingPressure?': [] } ] }
                  ] 
                },
              ]
            }
          ],
        },

        { 
          'cell:2': [
            {
              row: [
                { 
                  'cell:0': [
                    
                  ] 
                },
                { 
                  'expandingCell:0': [
                    { row: [
                      { "expandingCell:0": []  },
                      { "expandingCell:1": []  }
                    ] }
                  ] 
                },
              ]
            }
          ],
        },

        { 
          'cell:3': [
            {
              row: [
                { 
                  'cell:0': [
                    
                  ] 
                },
                { 
                  'expandingCell:0': [
                    
                  ] 
                },
              ]
            }
          ],
        },
        

      ],
    },
  ],
};


export default JSON.stringify(layout);