import c from './ProjectView.module.css';
import {useParams} from 'react-router-dom';

const ProjectView = ({projects}) => {
    let {uuid} = useParams();
    let currentProject = projects.find(project => project.uuid == uuid);
    let UserNames = currentProject.users.map(item => `${item.firstname} ${item.lastname}`).join('---')
    return (
        <div className={c.projectData}>
            <div><span>Name:</span> {currentProject.name}</div>
            <div><span>Link on repository:</span> {currentProject.repoLink}</div>
            <div><span>Participants:</span> {UserNames}</div>
        </div>
    )
}

export default ProjectView;