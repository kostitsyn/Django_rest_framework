import React from "react";
import c from './App.css';
import axios from "axios";
import Users from "./components/Users/Users";
import NotesList from "./components/Notes/Notes";
import ProjectsList from "./components/Projects/Projects";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import {BrowserRouter, HashRouter, Route, Switch, Redirect} from "react-router-dom";
import NotFound404 from "./components/NotFound404/NotFound404";
import ProjectView from "./components/Projects/ProjectView/ProjectView";
import Auth from "./components/Authorization/Auth";
import Cookies from "universal-cookie/lib";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        users: [],
        projects: [],
        menuItem: ['Users', 'Projects', 'Notes', 'Login'],
        notes: [],
        token: '',
        username: '',
    }
  }

  setUsername(username) {
      if (this.isAuthenticated()) {
          this.setState({'username': username});
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
      this.setState({'token': token}, () => this.loadData());
  }

  getToken(login, password) {
      axios.post('http://127.0.0.1:8000/api-token-auth/', {username: login, password: password})
          .then(response => {
              this.setToken(response.data['token']);
              this.setUsername(login);
          }).catch(error => alert('Wrong login or password!!!'))
  }

  getCookieFromStorage() {
      const cookies = new Cookies();
      const token = cookies.get('token');
      this.setState({'token': token}, () => this.loadData());
  }

  loadData() {
      const headers = this.getHeaders();
      axios.get('http://127.0.0.1:8000/api/users/?page=3', {headers})
        .then(response => {
          const users = response.data.results
          this.setState(
              {
                users: users,
              }
          )
        }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/projects', {headers})
        .then(response => {
          const projects = response.data.results
          this.setState(
              {
                projects: projects,
              }
          )
        }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/notes', {headers})
        .then(response => {
          const notes = response.data.results
          this.setState(
              {
                notes: notes,
              }
          )
        }).catch(error => console.log(error))
  }

  logout() {
      this.setToken('');
      this.setState({'username': ''});
  }

  isAuthenticated() {
      return this.state.token != '';
  }

  componentDidMount() {
      this.getCookieFromStorage();
  }

  render() {
    return(
        <div className={c.wrapper}>
            <BrowserRouter>
                <Menu items={this.state.menuItem} isAuthenticated={this.isAuthenticated.bind(this)}
                      logout={this.logout.bind(this)} username={this.state.username}/>
                <Switch>
                    <Route exact path='/' render={() => <Users users={this.state.users}/>}/>
                    <Redirect from='/users' to='/'/>
                    <Route exact path='/projects' render={() => <ProjectsList projects={this.state.projects}/>}/>
                    <Route exact path='/notes' render={() => <NotesList notes={this.state.notes}/>}/>
                    <Route path='/project/:id'>
                        <ProjectView projects={this.state.projects}/>
                    </Route>
                    <Route exact path='/login' render={() => <Auth getToken={(username, password) => this.getToken(username, password)}/>}/>
                    <Route render={NotFound404}/>
                </Switch>
            </BrowserRouter>
            <Footer/>
        </div>
    )
  }
}

export default App;
