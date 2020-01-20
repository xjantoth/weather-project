import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class ToDoItem extends Component {
    
    getStyle = () => {
        // if(this.props.todo.completed) {
        //     return {
        //         textDecoration: 'line-through'
        //     } 
        // } else {
        //     return {
        //         textDecoration: 'none' 
        //     }
        // }
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }      
    }
    
    render() {

        const {id, title} = this.props.todo;        

        return (
            <div style={this.getStyle()}>   
                <p> 
                    <input 
                    type="checkbox" 
                    // sendig "markComplete" to Todos.js 
                    // and further to App.js from this 
                    // checkbox object
                    onChange={
                        this.props.markComplete.bind(
                            this,  
                            id
                            )
                        }>
                    </input>
                    { title }
                    <button style={btnStryle}
                    // sending "delTodo" info up to App.js via
                    // Todos.js
                        onClick={
                            this.props.delTodo.bind(
                                this,
                                id
                            )
                        }
                    >
                        x
                    </button>
                </p>
            </div>
        )
    }
}

ToDoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

// const itemStyle = {
//     backgroundColor: '#f4f4f4'
// }

const btnStryle = {
    backgroundColor: '#ff0000',
    color: '#fff',
    border: 'none',
    padding: '5px 8px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'

}

export default ToDoItem
