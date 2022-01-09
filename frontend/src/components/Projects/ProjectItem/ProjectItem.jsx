import {NavLink} from "react-router-dom";

const ProjectItem = ({project, deleteProject, users}) => {
    let usersid = [];
    project.users.forEach(u => usersid.push(u));
    let currentUsers = users.filter(u => usersid.includes(u.id));
    let userNames = [];
    currentUsers.forEach(u => userNames.push(`${u.firstname} ${u.lastname}`));
    userNames = userNames.join('---');
    return (
        <tr>
            <td><NavLink to={`project/${project.id}`}>{project.name.slice(0, 60)}</NavLink></td>
            <td><a href={project.repoLink}>{project.repoLink}</a></td>
            <td>{userNames}</td>
            <td><button onClick={() => deleteProject('projects', project.id)} type='button'>Delete</button></td>
            <td><NavLink to={`/project/change/${project.id}`}>Change</NavLink></td>
        </tr>
    )
}

export default ProjectItem;