import axios from "axios";
/////////////////CONSTANTS/////////////////////


const GET_ALL_TASKS = "GET_ALL_TASKS";
const POST_TASK = "POST_TASK";
const CHANGE_STATUS = "CHANGE_STATUS";
const DELETE_TASK = "DELETE_TASK";


/////////////////ACTIONS//////////////

const getTasks = (tasks) => ({type: GET_ALL_TASKS, tasks});
const addTask = (task) => ({type: POST_TASK, task});
const changeStatus = (task) => ({type: CHANGE_STATUS, task});
const taskDelete = (slug) => ({type: DELETE_TASK, slug});


/////////////////REDUCER/////////////////////

//initiate your starting state
let initial = {
  tasks: []
};

const reducer = (state = initial, action) => {

  switch (action.type) {
    case GET_ALL_TASKS:
      console.log("THE GOTTEN TASKS", action.tasks);
      return Object.assign({}, state, {tasks: action.tasks.objects});
    case POST_TASK:
      console.log("TASKSTATE", state.tasks);
      let updatedTasks = state.tasks.concat([action.task]);
      return Object.assign({}, state, {tasks: updatedTasks});
    case CHANGE_STATUS:
      let newArr = state.tasks.map((task) => {
        if(task.slug === action.task.slug) task.metafields[0].value = !task.metafields[0].value;
        return task;
      });
      return Object.assign({}, state, {tasks: newArr});
    case DELETE_TASK:
      let arr = state.tasks.filter((task) => {
        return !(task.slug === action.slug);
      });
      return Object.assign({}, state, {tasks: arr});
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

export const postNewTask = (task) => dispatch => {
  axios.post("https://api.cosmicjs.com/v1/react-redux-node-todo-app/add-object", {type_slug: "tasks", title: task, content: "New Task",
    metafields: [
      {
        title: "Is Complete",
        key: "is_complete",
        value: false,
        type: "text"
      }
    ]})
    .then((response) => {
    console.log("RESPONSE", response);
      return response.data;
    })
    .then((task) => {
      dispatch(addTask(task.object));
    })
    .catch((err) => {
      console.error.bind(err);
    })
};

export const putChangeStatus = (slug, bool) => (dispatch) => {
  axios.put("https://api.cosmicjs.com/v1/react-redux-node-todo-app/edit-object", {slug,
    metafields: [
      {
        title: "Is Complete",
        key: "is_complete",
        value: !bool,
        type: "text"
      }
    ]})
    .then((response) => {
      console.log("RESPONSE", response);
      return response.data;
    })
    .then((task) => {
      dispatch(changeStatus(task.object));
    })
    .catch((err) => {
      console.error.bind(err);
    })
};

export const deleteTask = (slug) => (dispatch) => {
  dispatch(taskDelete(slug));
  axios.delete(`https://api.cosmicjs.com/v1/react-redux-node-todo-app/${slug}`)
    .then((response) => {
      console.log("RESPONSE", response);
    })
    .catch((err) => {
      console.error.bind(err);
    })
};