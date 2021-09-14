import {NavLink} from "react-router-dom";

const ProjectItem = ({project}) => {
    let UserNames = project.users.map(item => `${item.firstname} ${item.lastname}`).join('---')
    debugger;
    return (
        <tr>
            <td><NavLink>{project.name.slice(0, 60)}</NavLink></td>
            <td>{project.repoLink}</td>
            <td>{UserNames}</td>
        </tr>
    )
}

export default ProjectItem;