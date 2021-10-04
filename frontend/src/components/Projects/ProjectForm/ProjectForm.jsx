import React from 'react';
import c from './ProjectForm.module.css';

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            repoLink: '',
            users: [],
        }
    }

    handleChange(event) {
        // let users = event;
        // if (event.target.name in ['name', 'repoLink']) {
        if (['name', 'repoLink'].includes(event.target.name)) {
            this.setState({[event.target.name]: event.target.value})
        }
        else {
            this.setState({[event.target.name]: event.target.value.split(',')})
        }
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.repoLink, this.state.users)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <div className={c.formGroup}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' value={this.state.name} onChange={event => this.handleChange(event)}/>
                </div>

                <div className={c.formGroup}>
                    <label htmlFor='repoLink'>Link of repository</label>
                    <input type='text' id='repoLink' name='repoLink' value={this.state.repoLink} onChange={event => this.handleChange(event)}/>
                </div>

                <div className={c.formGroup}>
                    <label htmlFor='users'>Users</label>
                    <input type='text' id='users' name='users' value={this.state.users} onChange={event => this.handleChange(event)}/>
                </div>

                <button type='submit'>Save</button>
            </form>
        )
    }
}

export default ProjectForm;