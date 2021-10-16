import {NavLink} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {
    let UserNames = project.users.map(item => `${item.firstname} ${item.lastname}`).join('---')
    return (
        <tr>
            <td><NavLink to={`project/${project.uuid}`}>{project.name.slice(0, 60)}</NavLink></td>
            <td><a href={project.repoLink}>{project.repoLink}</a></td>
            <td>{UserNames}</td>
            <td><button onClick={() => deleteProject('projects', project.uuid)} type='button'>Delete</button></td>
        </tr>
    )
}

export default ProjectItem;