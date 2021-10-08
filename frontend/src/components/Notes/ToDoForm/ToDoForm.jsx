import React from 'react';
import c from './ToDoForm.module.css';

class ToDoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: '',
            text: '',
            user: '',
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
                user: this.state.user,
            })
        event.preventDefault();
    }

    render() {
        return(
                <form onSubmit={event => this.handleSubmit(event)}>
                    <div className={c.formGroup}>
                        <label htmlFor='project'>Project</label>
                        <input id='project' type='text' name='project' value={this.state.project} onChange={event => this.handleChange(event)}/>
                    </div>

                    <div className={c.formGroup}>
                        <label htmlFor='noteText'>Text</label>
                        <input id='noteText' type='text' name='text' value={this.state.text} onChange={event => this.handleChange(event)}/>
                    </div>

                    <div className={c.formGroup}>
                        <label htmlFor='user'>User</label>
                        <input id='user' type='text' name='user' value={this.state.user} onChange={event => this.handleChange(event)}/>
                    </div>

                    <button type='submit'>Save</button>
                </form>
        )
    }
}

export default ToDoForm;