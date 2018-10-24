const initialState = {
    users: {
        usr001: {
            id: 'usr001',
            name: 'Gisnando Kfuri'
        },
        usr002: {
            id: 'usr002',
            name: 'Tarsila de Conti'
        },
        usr003: {
            id: 'usr003',
            name: 'Felipe Olmos'
        }
    },
    spaces: {
        spc001: {
            id: 'spc001',
            code: 'ESPA001',
            name: 'Espaço 001',
            members: {
                usr001: true,
                usr002: true,
                usr003: true
            },
            channels: {
                ch001: {
                    id: 'cht001',
                    name: 'General',
                    lastMessage: 'Tarsila: tchau! ;)',
                    timeStamp: 1540328412947
                },
                ch002: {
                    id: 'cht002',
                    name: 'General #2',
                    lastMessage: 'Gisnando: qual tela?',
                    timeStamp: 1540329325531
                }
            }
        },
        spc002: {
            id: 'spc002',
            code: 'ESPA002',
            name: 'Espaço 002',
            members: {
                usr001: true,
                usr002: true,
                usr003: true
            },
            channels: {
                ch003: {
                    id: 'cht003',
                    name: 'General',
                    lastMessage: 'Tarsila: Bom dia!',
                    timeStamp: 1540328412947
                }
            }
        }
    }
};



function miniaReducer (state = initialState, action) {
    switch (action.type) {
      default :
        return state
    }
  }
  
  export default miniaReducer;