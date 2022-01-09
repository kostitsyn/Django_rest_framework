import {NavLink} from "react-router-dom";

const ProjectItem = ({project, deleteProject, users}) => {
    let usersUuid = [];
    project.users.forEach(u => usersUuid.push(u));
    let currentUsers = users.filter(u => usersUuid.includes(u.uuid));
    let userNames = [];
    currentUsers.forEach(u => userNames.push(`${u.firstname} ${u.lastname}`));
    userNames = userNames.join('---');
    return (
        <tr>
            <td><NavLink to={`project/${project.uuid}`}>{project.name.slice(0, 60)}</NavLink></td>
            <td><a href={project.repoLink}>{project.repoLink}</a></td>
            <td>{userNames}</td>
            <td><button onClick={() => deleteProject('projects', project.uuid)} type='button'>Delete</button></td>
            <td><NavLink to={`/project/change/${project.uuid}`}>Change</NavLink></td>
        </tr>
    )
}

export default ProjectItem;