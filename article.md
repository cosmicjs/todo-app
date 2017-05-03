# How to Build a ToDo App Using React, Redux, and Webpack
In this tutorial I'm going to show you how to create a simple “ToDo” app using React, Redux, a little bit of Node, and Cosmic JS.  For the sake of understanding how to consume Restful API’s, this tutorial will show how to make simple AJAX requests to the Cosmic JS API in order to retrieve, update, and delete data in our Cosmic JS buckets. Let's get started.

## Getting Started:
First, let’s make a new directory to build our project in and lets also make a package.json file.
```
mkdir cool-cosmic-todo-app
```
```
cool-cosmic-todo-app$ touch package.json
```
Now, in your ```package.json```, copy and paste the code below and then run npm install or yarn (if you're a super cool yarn user):

```json
//cool-cosmic-todo-app/package.json
{
  "name": "cosmicToDo",
  "version": "1.0.0",
  "description": "A simple todo app thet uses the Cosmic JS API",
  "main": "index.js",
  "scripts": {
    "start": "nodemon server/index.js",
    "build": "webpack -w",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "axios": "^0.16.1",
    "react": "^15.5.4",
    "react-dom": "^15.5.4",
    "react-redux": "^5.0.4",
    "redux": "^3.6.0",
    "redux-logger": "^3.0.1",
    "redux-thunk": "^2.2.0",
    "css-loader": "^0.28.0"
  },
  "devDependencies": {
    "babel": "^6.5.2",
    "babel-core": "^6.18.0",
    "babel-loader": "^6.2.7",
    "babel-preset-es2015": "^6.18.0",
    "babel-preset-react": "^6.16.0",
    "cross-env": "^3.1.4",
    "nodemon": "^1.11.0",
    "volleyball": "^1.4.1",
    "webpack": "^2.2.1",
    "webpack-livereload-plugin": "^0.10.0",
    "sass-loader": "^6.0.3",
    "style-loader": "^0.16.1"
  }
}
```
## What we're installing and why:
1. We're going to use the axios library to handle our requests to our Cosmic JS bucket.
2. We're installing react and react-dom to build our react components.
3. We are going to use redux, react-redux, redux-logger, and redux-thunk to help us implement what is called the [Flux architecture](https://facebook.github.io/flux/). 
4. The only thing worth mentioning in the dev dependencies is webpack and volleyball. Webpack will help us bundle all of our react and redux files into one large "bundle" file that will be used in our index.html. Volleyball is a cool little library that allows us to see in our console incoming and outgoing HTTP requests.

## Building or app:
Now we're going to build out our file structure a bit more so that we can organize our react components and redux files. This is what our cool-cosmic-todo-app directory should look like:
```
cool-cosmic-todo-app
|----client
|       |----components
|                 |----Home.js
|                 |----Section.js
|                 |----Task.js
|       |----index.html
|       |----dist
|----redux
|       |----store.js
|       |----reducer.js
|----server
|       |----index.js
|----webpack.config.js
|----package.json
```
Now we we will set up our index.html in our client directory. Copy and paste the following code into your index.html file:
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Cosmic Todo App!</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="./styles/mainSheet/main.css">
    <link rel="stylesheet" href="./styles/mainSheet/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"
            integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
            crossorigin="anonymous"></script>
    <script src="/dist/bundle.js" defer></script>
</head>
<body>
<div id="root"></div>
</body>
</html>
```
Here, we are going to target our "root" div to place our react components in later. The ```bundle.js``` file located in our dist directory is what our webpack.config file will spit out after bundling all of our react components
Now, set up our webpack.config file to bundle all of our react files and export that bundle file to our dist directory. Copy the following code into your ```webpack.config.js``` file:
```js
let path = require('path');
let LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      options: {
        presets: ['react', 'es2015']
      }
    },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.COSMIC_BUCKET': JSON.stringify(process.env.COSMIC_BUCKET),
      'process.env.COSMIC_READ_KEY': JSON.stringify(process.env.COSMIC_READ_KEY),
      'process.env.COSMIC_WRITE_KEY': JSON.stringify(process.env.COSMIC_WRITE_KEY)
    }),
    new LiveReloadPlugin({appendScriptTag: true})
  ]
};
```
Here, we are simply telling webpack to output a ```bundle.js``` file into our dist folder with all of our react components bundled in there as well. The babel-loader is simply transpiling JavaScript files using babel and webpack. The live reload plugin allows us to make changes to our files and automatically have webpack watch and "re-bundle" with our updated changes.
Next, we're going to us a little bit of node with express to serve up our ```index.html``` file as well as our ```bundle.js``` file. Realistically, we aren't really making requests to our own node backend, but it's good to use node as a method to serve us static files. Copy and paste the code below into our ```index.js``` file located in our server directory.
```js
const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');

app.use(volleyball);

//serve up static files
app.use(express.static(path.resolve(__dirname, '..', 'client')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


// handle every other route with index.html, which will contain
// a script tag to our application's JavaScript file(s).
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'))
});

//listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Rockin' out on port 3000 homie");
});
```
Here, we are simply telling our server to serve up static files out of our node_modules and client directories. The '*' route is basically telling express to serve up our index.html on any route requested within our app. Finally, we are telling express to listen on port 3000. Feel free to try it out! Run npm start or yarn start and see our "Rockin' out on port 3000 homie" message log put to the console!
Next, let's set up our redux ```store.js``` file, located in our client/redux folder. Copy and paste the following code into the ```store.js``` file located in our client/redux folder:
```js
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

const store = createStore(
  reducer,
  applyMiddleware(
    createLogger(),
    thunkMiddleware
  )
);

export default store;
```
### What's going on here:
1. We are setting up our redux "store" so that we can pass data down through "props" into whatever components we want (I am going to assume you have some working knowledge of how the flux architecture functions, if you do not understand this it is OK, just check the flux architecture link above).
2. We are using the redux-thunk middleware to handle all of our asynchronous calls to our Cosmic JS API. This middleware is used whenever we dispatch a function instead of an action.
3. We are also using "createlogger" middleware to visually see every logged action that we dispatch.
Next, we are going to set up the ```index.js``` file, located in our client directory. Copy and paste the following code:
```js
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import {Provider} from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
);
```
### What's going on here:
1. We are telling ReactDOM to target our "root" div from our ```index.html``` file and pop in our ```<Home/>``` react component (which we will build out in our next step).
2. Our ```<Home/>``` react component is being served up data from our store through that ```<Provider store={store}>``` tag. It is "providing" its children with data (hence, why it's called "Provider").
Next, we will build out our ```Home``` component. In our ```Home.js``` file located in out client/components directory, copy and paste the following code:
```js
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getAllTasks, postNewTask } from '../redux/reducer';
import Task from './Task';

class Home extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    getAllTasks();
  }
  render() {
    return (
      <div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
           <h1>Cosmic To-Do App!!</h1>
            <form onSubmit={evt => {
               evt.preventDefault();
               this.props.postNewTask(evt.target.taskName.value);
               evt.target.taskName.value = "";
              }
             }>
              <div className="form-group">
              <label for="exampleInputEmail1">Add New To-Do</label>
              <input name="taskName" placeholder="Enter new task" />
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h3>Let's get some work done!</h3>
          </div>
        </div>
      </div>
      <div className="container">
        {
          this.props.tasks && this.props.tasks.map((task) => {
            return (
              <Task key={task._id} Obj={task} isComplete={task.metafields[0].value} Name={task.title}/>
            )
          })
        }
      </div>
      </div>
    )
  }
}

const mapState = ({tasks}) => ({tasks});
const mapDispatch = {getAllTasks, postNewTask};
export default connect(mapState, mapDispatch)(Home);
```
### What's going on (a lot!):
1. We are creating a react component and fetching all of our data when our ```Home``` component mounts (which will be tasks form our Cosmic JS bucket).
2. We are rendering "HTML" to our virtual DOM.
3. We are creating a form that will dispatch a function (that will go through our redux-thunk middleware) that adds tasks to our list of tasks to do whenever our users click the submit ```<button>```.
4. We are doing a hacky check so that our app does not break by doing what is called a "short-circuit". We are first checking if we have gotten back "tasks" from our asynchronous call to our Cosmic JS bucket and if we do then we are going to map over each of them and render a ```<Task />``` component (which we will build in the nex step).
5. Finally, we are wrapping our ```Home``` component inside of the connect function that the react-redux library gives us. We are getting the ```{tasks}``` from our store as well as our ```{getAllTasks, postNewTask}``` functions from our store.
Next, we are going to build out our ```<Task>``` component to render every task that we are getting from our store. In our ```Task.js``` file, located in our client/components directory, copy and paste the following code:
```js
import React from 'react';
import { connect } from 'react-redux';
import { putChangeStatus, deleteTask } from '../redux/reducers/reducer';

const Task = (props) => {
  return (
      <div className="row">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" onClick={() => {
            props.putChangeStatus(props.Obj, props.isComplete)}} className="btn">{props.isComplete ? "Undo" : "Complete" }</button>
          <button type="button" onClick={() => props.deleteTask(props.Obj.slug)} className="btn">Delete</button>
        </div>
        <h3 style={{textDecoration: props.isComplete ? "line-through" : "none"}}>{props.Name}</h3>
      </div>
  );
};

const mapDispatch = {putChangeStatus, deleteTask};
export default connect(null, mapDispatch)(Task);
```
### What's going on:
1. We are creating what is called a "dumb" react component and, again, wrapping it in our connect function.
2. We are pulling in ```putChangeStatus``` and ```deleteTask``` from our reducer (which we will finally make in te next step) and hookingit up to our store.
3. We are hooking up our "Complete" and "Delete" buttons to dispatch asynchronous functions ```onClick``` so that we actually update our Cosmic JS bucket as well.
Next, we will FINALLY make our reducer and set up all of our asynchronous "redux-thunk" functions. In our ```reducer.js``` file, located in our client/redux directory, copy and paste the following code:
```js
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
      return Object.assign({}, state, {tasks: action.tasks.objects});
    case POST_TASK:
      let updatedTasks = [action.task].concat(state.tasks);
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
  axios.get(`https://api.cosmicjs.com/v1/your-bucket-slug-name/object-type/tasks`)
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
  dispatch(addTask({title: task, metafields: [{value: false}], slug: formatSlug(task)}));
  axios.post(`https://api.cosmicjs.com/v1/your-bucket-slug-name/add-object`, {type_slug: "tasks", title: task, content: "New Task",
    metafields: [
      {
        title: "Is Complete",
        key: "is_complete",
        value: false,
        type: "text"
      }
    ]})
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.error.bind(err);
    })
};

export const putChangeStatus = (task, bool) => (dispatch) => {
  dispatch(changeStatus(task));
  axios.put(`https://api.cosmicjs.com/v1/your-bucket-slug-name/edit-object`, {slug: task.slug,
    metafields: [
      {
        title: "Is Complete",
        key: "is_complete",
        value: !bool,
        type: "text"
      }
    ]})
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.error.bind(err);
    })
};

export const deleteTask = (slug) => (dispatch) => {
  dispatch(taskDelete(slug));
  axios.delete(`https://api.cosmicjs.com/v1/your-bucket-slug-name/${slug}`)
    .then((response) => {
    console.log(response.data)
    })
    .catch((err) => {
      console.error.bind(err);
    })
};

const formatSlug = (title) => {
  let lower = title.toLowerCase();
  return lower.split(" ").join("-");
};
```
### What is going on?!
Side note -> I personally like to store all of my constants, actions, and action dispatcher functions inside of one file for every reducer that I have just so I'm not contantly jumping from file to file. It's totally common  and cool to break these up into seperate files.
1. We are puling in axios (our library that will be making the HTTP requests for us).
2. We are defining our constants.
3. We are setting up our actions to dispatch.
4. We define our reducer function that our store uses and we are starting it out initially with an object that has a ```tasks``` key with an empty array as a value (this array will be filled with task objects retrieved from our Cosmic JS bucket).
5. We define our action dispatcher functions that make our axios requests to the Cosmic JS API (specifically to our personal bucket).
And we are done! Run ```npm run build``` or ```yarn build``` and in a different tab run ```npm start``` or ```yarn start``` and see what we made!
If you want to see my implementation of this (unnecessarily using react-router) to get a glimpse of how all this works together check out my [github repo](https://github.com/ryskiz/Cosmic-ToDo-App)

## Conclusion:
We were able to consume the Cosmic JS API with our actions and dispatcher functions. If you're a little iffy on how how all the files work in conjunction with our store check out [this gif](https://camo.githubusercontent.com/9de527b9432cc9244dc600875b46b43311918b59/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6d656469612d702e736c69642e65732f75706c6f6164732f3336343831322f696d616765732f323438343739302f415243482d5265647578322d657874656e6465642d7265616c2d6465636c657261746976652e676966) to get a better picture of how redux is passing data around the app. I hope you enjoyed this tutorial as much as I did, if you have any questions reach out to us on Twitter and join our community on Slack.
