import {NavLink} from "react-router-dom";

const ProjectItem = ({project}) => {
    let UserNames = project.users.map(item => `${item.firstname} ${item.lastname}`).join('---')
    return (
        <tr>
            <td><NavLink to={`project/${project.uuid}`}>{project.name.slice(0, 60)}</NavLink></td>
            <td><a href={project.repoLink}>{project.repoLink}</a></td>
            <td>{UserNames}</td>
        </tr>
    )
}

export default ProjectItem;