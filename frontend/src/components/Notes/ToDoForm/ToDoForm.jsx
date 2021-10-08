import React from 'react';
import c from './ToDoForm.module.css';

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            text: '',
            user: '',
            isActive: ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        this.props.createNote(
            {
                project: this.state.project,
                text: this.state.text,
                user: this.state.user, isActive:
                this.state.isActive
            })
        event.preventDefault();
    }

    render() {
        return(

        )
    }
}

export default ToDoForm;