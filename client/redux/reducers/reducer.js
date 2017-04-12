/////////////////ACTIONS/////////////////////


const SWITCH_ACTION = "SWITCH_ACTION";


/////////////////DISPATCHERS//////////////

export const switchAction = (param) => ({type: SWITCH_ACTION, payload: param});


/////////////////REDUCER/////////////////////

//initiate your starting state
let initial = {
  start: true
};

const reducer = (state = initial, action) => {

  switch(action.type){
    case SWITCH_ACTION:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }

};

export default reducer;


///////////////DISPATCHER FUNCTIONS///////////////////


//write yo dispatchers/async dispatchers here


