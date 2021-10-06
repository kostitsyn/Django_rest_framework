import ProjectItem from "./ProjectItem/ProjectItem";
import {Link} from "react-router-dom";


const ProjectsList = ({projects, deleteProject, changePage}) => {
    let ProjectElements = projects.map(project => <ProjectItem deleteProject={deleteProject} project={project} key={project.uuid}/>)
    let currentPage = 1;

    let nextPage = () => {
        currentPage++;
        changePage(currentPage);
    }

    let previousPage = () => {
        if (currentPage > 1) {
            currentPage--;
        }
        changePage(currentPage);
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
            <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectsList;