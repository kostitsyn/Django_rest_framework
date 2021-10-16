import ProjectItem from "./ProjectItem/ProjectItem";
import {Link} from "react-router-dom";
import React, {useState} from 'react';
import SearchProjectForm from "./SearchProjectForm/SearchProjectForm";


const ProjectsList = (props) => {
    const [foundProjects, setFoundProjects] = useState(props.projects)
    // const [searchStr, setSearchStr] = useState('')

    // let ProjectElements = props.projects.map(project => <ProjectItem deleteProject={props.deleteProject} project={project} key={project.uuid}/>)
    //
    const updateProjectElements = projects => {
        setFoundProjects(projects);
    }

  //   const searchByName = str => {
  //     let foundProjects;
  //     if (str) {
  //         foundProjects = props.projects.filter(project => project.name.includes(str));
  //     } else {
  //         foundProjects = props.projects;
  //     }
  //     setFoundProjects(foundProjects);
  //     ProjectElements = foundProjects.map(project => <ProjectItem deleteProject={props.deleteProject} project={project} key={project.uuid}/>)
  // }
  //
  //   const handleChange = event => {
  //       setSearchStr(event.target.value)
  //       searchByName(event.target.value)
  //   }


    return (
        <div>
            <SearchProjectForm projects={props.projects} update={updateProjectElements}/>
            {/*<label htmlFor='search'>Search by name...</label>*/}
            {/*<input id='search' name='searchStr' value={searchStr} type='text' onChange={event => handleChange(event)}/>*/}
            {/*<div>Найдено {foundProjects.length} записей</div>*/}
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Repository</th>
                        <th>Participants</th>
                        <th/>
                    </tr>
                    {foundProjects.map(project => <ProjectItem deleteProject={props.deleteProject}
                                                               changeProject={props.changeProject}
                                                               project={project} key={project.uuid}/>)}
                </tbody>
            </table>
            {props.isFirstProjectPage ? null : <button onClick={() => {props.changePage('projects', 'previous'); updateProjectElements(props.projects)}}>Previous page</button>}
            {/*<button onClick={() => previousPage()}>Previous page</button>*/}

            {props.isLastProjectPage ? null : <button onClick={() => {props.changePage('projects', 'next'); updateProjectElements(props.projects)}}>Next page</button>}
            {/*<button onClick={() => nextPage()}>Next page</button>*/}

            <div>Текущая страница: {props.currentPage}</div>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

// class ProjectsList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state ={
//             foundProjects: props.projects,
//             searchStr: '',
//         }
//         this.ProjectElements = props.projects.map(project => <ProjectItem deleteProject={props.deleteProject} project={project} key={project.uuid}/>)
//     }
//
//     handleChange(event) {
//         this.setState({
//             searchStr: event.target.value
//         })
//         this.searchByName(event.target.value)
//     }
//
//     searchByName(str) {
//       let foundProjects;
//       if (str) {
//           foundProjects = this.props.projects.filter(project => project.name.includes(str));
//       } else {
//           foundProjects = this.props.projects;
//       }
//       this.setState({foundProjects: foundProjects});
//       this.ProjectElements = foundProjects.map(project => <ProjectItem deleteProject={this.props.deleteProject} project={project} key={project.uuid}/>)
//       debugger;
//   }
//
//     render () {
//         return (
//             <div>
//             <label htmlFor='search'>Search by name...</label>
//             <input id='search' name='searchStr' value={this.state.searchStr} type='text' onChange={event => this.handleChange(event)}/>
//             <div>Найдено {this.state.foundProjects.length} записей</div>
//             <table>
//                 <tbody>
//                     <tr>
//                         <th>Name</th>
//                         <th>Repository</th>
//                         <th>Participants</th>
//                         <th/>
//                     </tr>
//                     {this.ProjectElements}
//                 </tbody>
//             </table>
//             {this.props.isFirstProjectPage ? null : <button onClick={() => this.props.changePage('projects', 'previous')}>Previous page</button>}
//             {/*<button onClick={() => previousPage()}>Previous page</button>*/}
//
//             {this.props.isLastProjectPage ? null : <button onClick={() => this.props.changePage('projects', 'next')}>Next page</button>}
//             {/*<button onClick={() => nextPage()}>Next page</button>*/}
//
//             <div>Текущая страница: {this.props.currentPage}</div>
//             <Link to='/projects/create'>Create</Link>
//         </div>
//         )
//     }
// }

export default ProjectsList;