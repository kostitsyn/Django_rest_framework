import React from 'react';
import './App.css';
import {BrowserRouter, Route, NavLink, Switch, Redirect} from "react-router-dom";
import AuthorList from "./components/Authors/Authors";
import Books from "./components/Books/Books";
import NotFound404 from "./components/404Page/404Page";
import AuthorBookList from "./components/AuthorBook/AuthorBook";
import BookForm from "./components/Books/BookForm/BookForm";
import axios from "axios";
import LoginForm from "./components/Authorization/Auth";
import Cookies from "universal-cookie/lib";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.url = 'http://127.0.0.1:8001';
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
        axios.post(`${this.url}/api-token-auth/`, {username: username, password: password})
            .then(response => {
                this.setToken(response.data['token']);
            }).catch(error => alert('Wrong login or password!'))
    }

    deleteBook(uuid) {
        const headers = this.getHeaders();
        axios.delete(`${this.url}/api/books/${uuid}`, {headers: headers})
            .then(response => {this.setState({books: this.state.books.filter(book => book.uuid !== uuid)})})
            .catch(error => console.log(error))
    }

    createBook(name, authors) {
        const headers = this.getHeaders();
        const data = {name: name, authors: authors}
        axios.post(`${this.url}/api/books/`, data, {headers: headers})
            .then(response => {
                let newBook = response.data;
                const authors = this.state.authors.filter(author => authors.find(newAuthor => newAuthor === author.uuid));
                newBook.authors = authors;
            })
            .catch(error => console.log(error));
    }

    loadData() {
        const headers = this.getHeaders();
        axios.get(`${this.url}/api/authors`, {headers: headers})
            .then(response => {
                this.setState(
                    {
                        authors: response.data,
                    }
                )
            }).catch(error => console.log(error))
        axios.get(`${this.url}/api/books`, {headers: headers})
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
                        <Route exact path='/books' render={() => <Books books={this.state.books} deleteBook={uuid => this.deleteBook(uuid)}/>}/>
                        <Route exact path='/book/create' component={() => <BookForm authors={this.state.authors} createBook={(name, authors) => this.createBook(name, authors)}/>}/>
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