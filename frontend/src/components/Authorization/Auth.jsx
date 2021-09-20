import React from 'react';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            },
        )
        // console.log(this.state.login, this.state.password);
    }

    handleSubmit(event) {
        this.props.getToken(this.state.login, this.state.password);
        // console.log(this.state.login, this.state.password);
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={event => this.handleSubmit(event)}>
                <input type='text' name='login' value={this.state.login} placeholder='login' onChange={event => this.handleChange(event)}/>
                <input type='password' name='password' value={this.state.password} placeholder='password' onChange={event => this.handleChange(event)}/>
                <button type='submit'>Login</button>
            </form>
        )
    }
}

export default Auth;