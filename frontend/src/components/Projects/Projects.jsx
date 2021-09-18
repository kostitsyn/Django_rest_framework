import ProjectItem from "./ProjectItem/ProjectItem";


const ProjectsList = ({projects}) => {
    let ProjectElements = projects.map(project => <ProjectItem project={project} key={project.uuid}/>)
    return (
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Repository</th>
                    <th>Participants</th>
                </tr>
                {ProjectElements}
            </tbody>
        </table>
    )
}

export default ProjectsList;