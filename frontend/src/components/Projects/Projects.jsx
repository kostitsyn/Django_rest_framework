import ProjectItem from "./ProjectItem/ProjectItem";
import {Link} from "react-router-dom";


const ProjectsList = ({projects, deleteProject}) => {
    let ProjectElements = projects.map(project => <ProjectItem deleteProject={deleteProject} project={project} key={project.uuid}/>)
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
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectsList;