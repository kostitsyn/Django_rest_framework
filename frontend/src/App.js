import React from 'react';
import './App.css';
import {BrowserRouter, Route, NavLink, Switch, Redirect} from "react-router-dom";
import AuthorList from "./components/Authors/Authors";
import Books from "./components/Books/Books";
import NotFound404 from "./components/404Page/404Page";
import AuthorBookList from "./components/AuthorBook/AuthorBook";
import axios from "axios";
import LoginForm from "./components/Authorization/Auth";
import Cookies from "universal-cookie/lib";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            books: [],
            token: '',
        }
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = `Token ${this.state.token}`;
        }
        return headers;
    }

    setToken(token) {
        const cookies = new Cookies();
        cookies.set('token', token);
        this.setState({'token': token}, () => this.loadData())
    }

    isAuthenticated() {
        return this.state.token != '';
    }

    logout() {
        this.setToken('');
    }

    getTokenFromStorage() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        this.setState({'token': token}, () => this.loadData());
    }

    getToken(username, password) {
        axios.post('http://127.0.0.1:8001/api-token-auth/', {username: username, password: password})
            .then(response => {
                this.setToken(response.data['token']);
            }).catch(error => alert('Wrong login or password!'))
    }

    loadData() {
        const headers = this.getHeaders();
        axios.get('http://127.0.0.1:8001/api/authors', {headers})
            .then(response => {
                this.setState(
                    {
                        authors: response.data,
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8001/api/books', {headers})
            .then(response => {
                this.setState(
                    {
                        books: response.data,
                    }
                )
            }).catch(error => {
                console.log(error);
                this.setState({'books': []})
            })
    }

    componentDidMount() {
        this.getTokenFromStorage();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to='/'>Authors</NavLink>
                            </li>
                            <li>
                                <NavLink to='/books'>Books</NavLink>
                            </li>
                            <li>
                                {this.isAuthenticated() ? <a href='#' onClick={() => this.logout()}>Logout</a> : <NavLink to='/login'>Login</NavLink>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' render={() => <AuthorList authors={this.state.authors}/>}/>
                        <Redirect from='/authors' to='/'/>
                        <Route exact path='/books' render={() => <Books books={this.state.books}/>}/>
                        <Route path='/author/:uuid'>
                            <AuthorBookList books={this.state.books}/>
                        </Route>
                        <Route exact path='/login' render={() => <LoginForm getToken={(username, password) => this.getToken(username, password)}/>}/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}


export default App;