import ProjectItem from "./ProjectItem/ProjectItem";
import {Link} from "react-router-dom";
import React from 'react';

// class ProjectsList extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             currentPage: 1,
//         }
//         this.ProjectElements = this.props.projects.map(project =>
//             <ProjectItem deleteProject={this.props.deleteProject} project={project} key={project.uuid}/>)
//     }
//     nextPage() {
//         let spam = this.state.currentPage;
//         this.setState({
//             currentPage: ++spam
//         })
//         this.props.changePage(this.state.currentPage);
//     }
//
//     previousPage() {
//         let spam = this.state.currentPage;
//         if (this.state.currentPage > 1) {
//             this.setState({
//                 currentPage: --spam
//             })
//         }
//         this.props.changePage(this.state.currentPage);
//     }
//
//     render() {
//         return (
//             <div>
//                 <table>
//                     <tbody>
//                         <tr>
//                             <th>Name</th>
//                             <th>Repository</th>
//                             <th>Participants</th>
//                             <th/>
//                         </tr>
//                         {this.ProjectElements}
//                     </tbody>
//                 </table>
//                 <button onClick={() => this.previousPage()}>Previous page</button>
//                 <button onClick={() => this.nextPage()}>Next page</button>
//                 <Link to='/projects/create'>Create</Link>
//             </div>
//         )
//     }
//
// }
const ProjectsList = ({projects, deleteProject, changePage, currentPage}) => {
    let ProjectElements = projects.map(project => <ProjectItem deleteProject={deleteProject} project={project} key={project.uuid}/>)

    let nextPage = () => {
        changePage('projects', 'next');
    }

    let previousPage = () => {
        changePage('projects', 'previous');
    }

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Repository</th>
                        <th>Participants</th>
                        <th/>
                    </tr>
                    {ProjectElements}
                </tbody>
            </table>
            <button onClick={() => previousPage()}>Previous page</button>
            <button onClick={() => nextPage()}>Next page</button>
            <div>Текущая страница: {currentPage}</div>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectsList;