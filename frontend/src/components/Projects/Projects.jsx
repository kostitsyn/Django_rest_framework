import ProjectItem from "./ProjectItem/ProjectItem";
import {Link} from "react-router-dom";
import React, {useState} from 'react';
import SearchProjectForm from "./SearchProjectForm/SearchProjectForm";


const ProjectsList = (props) => {
    const [foundProjects, setFoundProjects] = useState(props.projects);

    let ProjectElements = props.projects.map(project => <ProjectItem deleteProject={props.deleteProject}
                                                          project={project} users={props.users} key={project.uuid}/>)



    const updateProjectElements = projects => {
        setFoundProjects(projects);
    }


    return (
        <div>
            <SearchProjectForm projects={props.projects} update={updateProjectElements} projectsCount={props.projectsCount}/>
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
            {props.isFirstProjectPage ? null : <button onClick={() => {props.changePage('projects', 'previous'); updateProjectElements(props.projects)}}>Previous page</button>}

            {props.isLastProjectPage ? null : <button onClick={() => {props.changePage('projects', 'next'); updateProjectElements(props.projects)}}>Next page</button>}

            <div>Текущая страница: {props.currentPage}</div>
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectsList;