import c from './ProjectView.module.css';
import {useParams} from 'react-router-dom';

const ProjectView = ({projects, users}) => {
    let { id } = useParams();
    let currentProject = projects.find(project => String(project.id) == String(id));
    let usersid = [];
    currentProject.users.forEach(u => usersid.push(u));
    let currentUsers = users.filter(u => usersid.includes(u.id));
    let UserNames = currentUsers.map(item => `${item.firstname} ${item.lastname}`).join('---')

    return (
        <div className={c.projectData}>
            <div><span>Name:</span> {currentProject.name}</div>
            <div><span>Link on repository:</span> {currentProject.repoLink}</div>
            <div><span>Participants:</span> {UserNames}</div>
        </div>
    )
}

export default ProjectView;