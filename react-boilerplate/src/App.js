
import {BrowserRouter as Router, Route}  from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos';
import AddToDo from './components/AddToDo';
import Header from './components/layout/Hearder';
import About from './components/pages/About';
import axios from 'axios';
// import uuid from 'uuid';
import PropTypes from 'prop-types';

class App extends Component {
  
  state = {
    todos: [
      // {
      //   id: 1,
      //   title: 'Take out the trash 1',
      //   completed: false
      // },
      
    ]
  }
  
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.setState(
      {
        todos: res.data
      }
    ))
  }

  markComplete = (id) => {
    // console.log("printing id: ", id)
    this.setState(
      {
        todos: this.state.todos.map(
          itodo => {
            if(itodo.id === id) {
              itodo.completed = !itodo.completed
            }
            return itodo;
          }
        )
      }
    );

  }


  delTodo = (id) => {
    
    axios.delete(`https://jsonplaceholder.typicode.com/todos/$(id)`).then(
      res => this.setState({
        todos: [...this.state.todos.filter(
            itodo => itodo.id !== id
        )] 
      })
    );
    
    
  }


  addToDo = (title) => {
      // console.log(title)
      // const newTodo = {
      //   id: uuid.v4(),
      //   title: title,
      //   completed: false
      // }
      axios.post('https://jsonplaceholder.typicode.com/todos',
      {
        title: title,
        completed: false
      }
      ).then(res => this.setState({
        todos: [...this.state.todos, res.data]
      }));
      
  }

  render () {
    // console.log(this.state.todos)
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={
              props => (
                <React.Fragment>
                    <AddToDo addToDo={this.addToDo} />
                    <Todos 
                    todos={this.state.todos} 
                    // Climbed from ToDoItem.js through Todos.js up here to App.js
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                    />
                </React.Fragment>
              )
            }>
            </Route>
            <Route path="/about" component={About}> 

            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
}
// https://www.youtube.com/watch?v=sBws8MSXN7A
// 1:26:03 Talking about REST calls :)