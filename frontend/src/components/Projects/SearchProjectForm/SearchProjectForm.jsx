import React from 'react'

class SearchProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            foundProjects: this.props.projectsCount,
            searchStr: '',
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        let foundProjects;
        if (this.state.searchStr) {
            foundProjects = this.props.projects.filter(project => project.name.includes(this.state.searchStr));
        } else {
            foundProjects = this.props.projects;
        }
        this.setState({
            foundProjects: foundProjects
        })
        this.props.update(foundProjects);

        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={event => this.handleSubmit(event)}>
                <label htmlFor='searchField'>Search by name...</label>
                <input id='searchField' name='searchStr' value={this.state.searchStr} onChange={event => this.handleChange(event)}/>
                <button type='submit'>Search</button>
                <span>Найдено {this.state.foundProjects} записей</span>
            </form>
        )
    }
}

export default SearchProjectForm;