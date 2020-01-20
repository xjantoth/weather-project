import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddToDo extends Component {
    
    state = {
        title: ''
    }
    
    onChange = (e) => {
        this.setState(
            {
                'title': e.target.value
            }
        );
    }

    onSubmit = (e) => {
        e.preventDefault();
        // Pass this "addToDo" all the way up to App.js 
        this.props.addToDo(this.state.title);
        this.setState({title: ''});
    }

    render() {
        return (
            <form 
            onSubmit={this.onSubmit}
            style={{display: 'flex'}}>
                <input
                    type="text" 
                    name="title"
                    style={{flex: '10', padding: '5px'}}
                    placeholder="Add Todo ..."
                    value={this.state.title}
                    onChange={this.onChange}
                    >
                </input>
                <input 
                    type="submit"
                    value="Submit"
                    className="btn"
                    style={{flex: '1'}}
                    >
                </input>
            </form>
        )
    }
}

AddToDo.propTypes = {
    addToDo: PropTypes.func.isRequired
}
export default AddToDo
