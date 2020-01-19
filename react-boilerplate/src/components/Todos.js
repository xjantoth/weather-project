import React, { Component } from 'react';
import ToDoItem from './ToDoItem';
import PropTypes from 'prop-types';

class Todos extends Component {  
    render () {
    // console.log(this.props.todos)
    return this.props.todos.map(
        (todo) => (
            <ToDoItem 
                key={todo.id} 
                todo={todo}
                // Climbing through the leader with "makrComplete"
                markComplete = {this.props.markComplete}
                // Climbing through the leader with "delTodo"
                delTodo = {this.props.delTodo}
            
            />
        )
    );
  }
}

Todos.propTypes = {
    todos: PropTypes.array.isRequired
}
export default Todos;
