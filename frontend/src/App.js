import React from 'react';
import './App.css';
import {BrowserRouter, Route, NavLink, Switch, Redirect} from "react-router-dom";
import AuthorList from "./components/Authors/Authors";
import Books from "./components/Books/Books";
import NotFound404 from "./components/404Page/404Page";
import AuthorBookList from "./components/AuthorBook/AuthorBook";


class App extends React.Component {
    constructor(props) {
        super(props);
        const author1 = {id: 1, name: 'Грин', birthday_year: 1880}
        const author2 = {id: 2, name: 'Пушкин А.С.', birthday_year: 1799}
        const author3 = {id: 3, name: 'Толстой Л.Н.', birthday_year: 1828}
        const authors = [author1, author2, author3]
        const book1 = {id: 1, name: 'Алые паруса', author: author1}
        const book2 = {id: 2, name: 'Золотая цепь', author: author1}
        const book3 = {id: 3, name: 'Пиковая дама', author: author2}
        const book4 = {id: 4, name: 'Руслан и Людмила', author: author2}
        const book5 = {id: 5, name: 'Война и Мир', author: author3}
        const book6 = {id: 6, name: 'Анна Каренина', author: author3}
        const books = [book1, book2, book3, book4, book5, book6]
        this.state = {
            'authors': authors,
            'books': books
        }
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
                        <Route path='/author/:id'>
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