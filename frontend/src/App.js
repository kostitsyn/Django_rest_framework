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
import ProjectForm from "./components/Projects/ProjectForm/ProjectForm";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.url = 'http://127.0.0.1:8002';
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
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Origin': 'http://localhost:3000'
          // 'Access-Control-Allow-Origin': 'http://127.0.0.1:8000'
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
      axios.post(`${this.url}/api-token-auth/`, {username: login, password: password})
      // axios.post(`127.0.0.1:8002/api/api-token-auth/`, {username: login, password: password})
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
      axios.get(`${this.url}/api/0.2/users/?page=1`, {headers})
        .then(response => {
          const users = response.data.results
          this.setState(
              {
                users: users,
              }
          )
        }).catch(error => console.log(error))
    axios.get(`${this.url}/api/projects/`, {headers})
        .then(response => {
          const projects = response.data
          this.setState(
              {
                projects: projects,
              }
          )
        }).catch(error => console.log(error))
    axios.get(`${this.url}/api/notes/`, {headers})
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

  deleteProject(uuid) {
      const headers = this.getHeaders();
      axios.delete(`${this.url}/api/projects/${uuid}/`, {headers: headers})
          .then(response => {
              const projects = this.state.projects.filter(project => project.uuid !== uuid);
              this.setState({projects: projects})
          }).catch(error => console.log(error))
  }

  createProject(name, repoLink, users) {
      const headers = this.getHeaders();
      const data = {name: name, repoLink: repoLink, users: users};
      axios.post(`${this.url}/api/projects/`, data, {headers: headers})
          .then(response => {
              let newProject = response.data;
              let users = this.state.projects
          })
  }

  componentDidMount() {
      this.getCookieFromStorage();
  }

  render() {
    return(
        <div className='wrapper'>
            <div className='content'>
                <BrowserRouter>
                    <Menu items={this.state.menuItem} isAuthenticated={this.isAuthenticated.bind(this)}
                          logout={this.logout.bind(this)} username={this.state.username}/>
                    <Switch>
                        <Route exact path='/' render={() => <Users users={this.state.users}/>}/>
                        <Redirect from='/users' to='/'/>
                        <Route exact path='/projects' render={() => <ProjectsList deleteProject={uuid => this.deleteProject(uuid)} projects={this.state.projects}/>}/>
                        <Route exact path='/notes' render={() => <NotesList notes={this.state.notes}/>}/>
                        <Route path='/project/:id'>
                            <ProjectView projects={this.state.projects}/>
                        </Route>
                        <Route exact path='/login' render={() => <Auth getToken={(username, password) => this.getToken(username, password)}/>}/>
                        <Route exact path='/projects/create' render={() =>
                            <ProjectForm createProject={(name, repoLink, users) => this.createProject(name, repoLink, users)}/>}/>
                        <Route render={NotFound404}/>
                    </Switch>
                </BrowserRouter>
            </div>
            <Footer/>
        </div>
    )
  }
}

export default App;
