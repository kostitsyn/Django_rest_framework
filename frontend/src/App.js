import React from 'react';
import './App.css';
import {BrowserRouter, Route, NavLink, Switch, Redirect} from "react-router-dom";
import AuthorList from "./components/Authors/Authors";
import Books from "./components/Books/Books";
import NotFound404 from "./components/404Page/404Page";
import AuthorBookList from "./components/AuthorBook/AuthorBook";
import axios from "axios";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            books: []
        }
    }

    load_data() {
        axios.get('http://127.0.0.1:8001/api/authors')
            .then(response => {

                this.setState(
                    {
                        authors: response.data,
                    }
                )
            }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8001/api/books')
            .then(response => {

                this.setState(
                    {
                        books: response.data,
                    }
                )
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.load_data()
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <NavLink to='/'>Authors</NavLink>
                        </ul>
                        <ul>
                            <NavLink to='/books'>Books</NavLink>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' render={() => <AuthorList authors={this.state.authors}/>}/>
                        <Redirect from='/authors' to='/'/>
                        <Route exact path='/books' render={() => <Books books={this.state.books}/>}/>
                        <Route path='/author/:uuid'>
                            <AuthorBookList books={this.state.books}/>
                        </Route>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}


export default App;