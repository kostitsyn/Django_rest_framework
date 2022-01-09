import React from 'react';
import c from "../ProjectForm/ProjectForm.module.css";
import {withRouter} from "react-router-dom";


class ChangeProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.match.params.id;
        this.project = props.projects.find(project => String(project.id) === String(this.id));
        this.state = {
            name: this.project.name,
            repoLink: this.project.repoLink,
            users: this.project.users,
        }
        this.usersElements = this.props.users.map(user => <option value={user.id} key={user.id}>{user.firstname} {user.lastname}</option>)

    }

    handleChange(event) {
        if (['name', 'repoLink'].includes(event.target.name)) {
            this.setState({
                [event.target.name]: event.target.value
            })
        }
        else {
            let users = [...this.state.users];
            if (this.state.users.includes(Number(event.target.value))) {
                users = users.filter(u => u !== Number(event.target.value));
            }else {
                users = [...users, Number(event.target.value)];
            };
            this.setState({
                    [event.target.name]: users
            })
        }
    }

    handleSubmit(event) {
        this.props.changeProject({name: this.state.name, repoLink: this.state.repoLink, users: this.state.users}, 'projects', this.id)
        event.preventDefault();
    }

    render() {
        return(
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
                    <select multiple={true} value={this.state.users} id='users' name='users' onChange={event => this.handleChange(event)}>
                        {this.usersElements}
                    </select>
                </div>

                <button type='submit'>Save</button>
            </form>
        )
    }
}

export default withRouter(ChangeProjectForm);