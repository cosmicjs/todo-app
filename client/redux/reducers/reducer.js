import axios from "axios";

/////////////////CONSTANTS/////////////////////


const GET_ALL_TASKS = "GET_ALL_TASKS";


/////////////////ACTIONS//////////////

const getTasks = (tasks) => ({type: GET_ALL_TASKS, tasks});


/////////////////REDUCER/////////////////////

//initiate your starting state
let initial = {
  tasks: []
};

const reducer = (state = initial, action) => {

  switch (action.type) {
    case GET_ALL_TASKS:
      return Object.assign({}, state, {tasks: action.tasks});
    default:
      return state;
  }

};

export default reducer;


/////////////// ACTION DISPATCHER FUNCTIONS///////////////////

export const getAllTasks = () => dispatch => {
  axios.get("https://api.cosmicjs.com/v1/react-redux-node-todo-app/object-type/tasks")
    .then((response) => {
      return response.data;
    })
    .then((tasks) => {
      dispatch(getTasks(tasks))
    })
    .catch((err) => {
      console.error.bind(err);
    })
};