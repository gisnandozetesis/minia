import { SPACE_SEARCH_RESULT } from '../actions';

function miniaReducer (state = {}, action) {

    const { spaces } = action;

    switch (action.type) {
        case SPACE_SEARCH_RESULT :

            return {
                ...state,
                spaces
            };

      default :
        return state
    }
  }
  
  export default miniaReducer;