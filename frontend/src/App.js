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
import ToDoForm from "./components/Notes/ToDoForm/ToDoForm";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.url = 'http://127.0.0.1:8000';
    this.state = {
        users: [],
        projects: [],
        menuItem: ['Users', 'Projects', 'Notes', 'Login'],
        notes: [],
        token: '',
        username: '',

        usersPage: 1,
        isLastUsersPage: false,
        isFirstUsersPage: false,

        projectPage: 1,
        isLastProjectPage: false,
        isFirstProjectPage: false,

        notesPage: 1,
        isLastNotesPage: false,
        isFirstNotesPage: false,
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

  changePage(entity, action) {
      const headers = this.getHeaders();
      let currentPage;
      let currentPageLabel;

      let isLastPage;
      let isLastPageLabel;

      let isFirstPage;
      let isFirstPageLabel;

      switch (entity) {
          case 'projects':
              currentPage = this.state.projectPage;
              currentPageLabel = 'projectPage';

              isLastPage = this.state.isLastProjectPage;
              isLastPageLabel = 'isLastProjectPage';

              isFirstPage = this.state.isFirstProjectPage;
              isFirstPageLabel = 'isFirstProjectPage';
              break;
          case 'users':
              currentPage = this.state.usersPage;
              currentPageLabel = 'usersPage';

              isLastPage = this.state.isLastUsersPage;
              isLastPageLabel = 'isLastUsersPage';

              isFirstPage = this.state.isFirstUsersPage;
              isFirstPageLabel = 'isFirstUsersPage';
              break;
          case 'notes':
              currentPage = this.state.notesPage;
              currentPageLabel = 'notesPage';

              isLastPage = this.state.isLastNotesPage;
              isLastPageLabel = 'isLastNotesPage';

              isFirstPage = this.state.isFirstNotesPage;
              isFirstPageLabel = 'isFirstNotesPage';
              break;
      }

      // if (entity === 'projects') {
      //     currentPage = this.state.projectPage;
      //     currentPageLabel = 'projectPage'
      //
      //     isLastPage = this.state.isLastProjectPage
      //     isLastPageLabel = 'isLastProjectPage'
      //
      //     isFirstPage = this.state.isFirstProjectPage
      //     isFirstPageLabel = 'isFirstProjectPage'
      //
      // } else if (entity === 'users') {
      //     currentPage = this.state.usersPage;
      //     currentPageLabel = 'usersPage'
      //
      //     isLastPage = this.state.isLastUsersPage
      //     isLastPageLabel = 'isLastUsersPage'
      //
      //     isFirstPage = this.state.isFirstUsersPage
      //     isFirstPageLabel = 'isFirstUsersPage'
      //
      // } else if (entity === 'notes') {
      //     currentPage = this.state.notesPage;
      //     currentPageLabel = 'notesPage'
      //
      //     isLastPage = this.state.isLastNotesPage
      //     isLastPageLabel = 'isLastNotesPage'
      //
      //     isFirstPage = this.state.isFirstNotesPage
      //     isFirstPageLabel = 'isFirstNotesPage'
      // }

      if (action === 'next' && !isLastPage) {
          ++currentPage;
      } else if (action === 'previous' && !isFirstPage) {
          --currentPage;
      } else {
          return
      }
      axios.get(`${this.url}/api/${entity}/?page=${currentPage}`, {headers})
        .then(response => {
          const objects = response.data.results
          this.setState(
              {
                [entity]: objects,
                [currentPageLabel]: currentPage,
                [isLastPageLabel]: !response.data.next,
                [isFirstPageLabel]: !response.data.previous,
              }
          )
        }).catch(error => console.log(error))
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
          const projects = response.data.results
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

  deleteObject(entity, uuid) {
      const headers = this.getHeaders();
      axios.delete(`${this.url}/api/${entity}/${uuid}/`, {headers: headers})
          .then(response => {
              const objects = this.state[entity].filter(object => object.uuid !== uuid);
              this.setState({[entity]: objects})
          }).catch(error => console.log(error))
  }

  createObject(data, entity) {
      const headers = this.getHeaders();
      axios.post(`${this.url}/api/${entity}/`, data, {headers: headers})
          .then(response => {
              let newObject = response.data;
              if (entity === 'projects') {

              } else if (entity) {
              let users = this.state.projects
              }
          }).catch(error => console.log(error))
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
                        <Route exact path='/' render={() => <Users
                            users={this.state.users}
                            changePage={(entity, action) => {this.changePage(entity, action)}}
                            currentPage={this.state.usersPage}
                            isLastUsersPage={this.state.isLastUsersPage}
                            isFirstUsersPage={this.state.isFirstUsersPage}/>}/>
                        <Redirect from='/users' to='/'/>
                        <Route exact path='/projects' render={() => <ProjectsList
                            deleteProject={(entity, uuid) => this.deleteObject(entity, uuid)}
                            projects={this.state.projects}
                            changePage={(entity, action) => {this.changePage(entity, action)}}
                            currentPage={this.state.projectPage}
                            isLastProjectPage={this.state.isLastProjectPage}
                            isFirstProjectPage={this.state.isFirstProjectPage}/>}/>
                        <Route exact path='/notes' render={() => <NotesList
                            deleteNote={(entity, uuid) => {this.deleteObject(entity, uuid)}}
                            notes={this.state.notes}
                            changePage={(entity, action) => {this.changePage(entity, action)}}
                            currentPage={this.state.notesPage}
                            isLastNotesPage={this.state.isLastNotesPage}
                            isFirstNotesPage={this.state.isFirstNotesPage}/>}/>
                        <Route path='/project/:id'>
                            <ProjectView projects={this.state.projects}/>
                        </Route>
                        <Route exact path='/login' render={() => <Auth getToken={(username, password) => this.getToken(username, password)}/>}/>
                        <Route exact path='/projects/create' render={() =>
                            <ProjectForm
                                allUsers={this.state.users}
                                createProject={(data, entity) => this.createObject(data, entity)}/>}/>
                        <Route exact path='/notes/create' render={() =>
                            <ToDoForm
                                createNote={(data, entity) => this.createObject(data,entity)} />}/>
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
