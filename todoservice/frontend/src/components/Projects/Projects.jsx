import ProjectItem from "./ProjectItem/ProjectItem";
import {Link} from "react-router-dom";
import React from 'react';


const ProjectsList = (props) => {
    let ProjectElements = props.projects.map(project => <ProjectItem deleteProject={props.deleteProject} project={project} key={project.uuid}/>)

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
            {props.isFirstProjectPage ? null : <button onClick={() => props.changePage('projects', 'previous')}>Previous page</button>}
            {/*<button onClick={() => previousPage()}>Previous page</button>*/}

            {props.isLastProjectPage ? null : <button onClick={() => props.changePage('projects', 'next')}>Next page</button>}
            {/*<button onClick={() => nextPage()}>Next page</button>*/}

            <div>Текущая страница: {props.currentPage}</div>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectsList;