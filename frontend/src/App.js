import React from "react";
import c from './App.css';
import axios from "axios";
import Users from "./components/Users/Users";
import NotesList from "./components/Notes/Notes";
import ProjectsList from "./components/Projects/Projects";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import NotFound404 from "./components/NotFound404/NotFound404";
import ProjectView from "./components/Projects/ProjectView/ProjectView";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
        'projects': [],
        'menuItem': ['Users', 'Projects', 'Notes']
    }
  }
  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users')
        .then(response => {
          const users = response.data.results
          this.setState(
              {
                'users': users,
              }
          )
        }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/projects')
        .then(response => {
          const projects = response.data.results
          this.setState(
              {
                'projects': projects,
              }
          )
        }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/notes')
        .then(response => {
          const notes = response.data.results
          this.setState(
              {
                'notes': notes,
              }
          )
        }).catch(error => console.log(error))
  }
  render() {
    return(
        <div className={c.wrapper}>
            <BrowserRouter>
                <Menu items={this.state.menuItem}/>
                <Switch>
                    <Route exact path='/users' render={() => <Users users={this.state.users}/>}/>
                    <Route exact path='/projects' render={() => <ProjectsList projects={this.state.projects}/>}/>
                    <Route exact path='/notes' render={() => <NotesList notes={this.state.notes}/>}/>
                    <Route exact path='/project/:uuid'>
                        <ProjectView projects={this.state.projects}/>
                    </Route>
                    <Redirect from='/' to='/users'/>
                    <Route render={NotFound404}/>
                </Switch>
            </BrowserRouter>
            <Footer/>
        </div>
    )
  }
}

export default App;
