const NoteItem = ({note, deleteNote}) => {
    debugger;
    return (
        <tr>
            <td>{note.project.name.slice(0, 60)}</td>
            <td>{note.text.slice(0, 100)}</td>
            <td>{note.user.firstname} {note.user.lastname}</td>
            <td><button onClick={() => deleteNote('notes', note.uuid)} type='button'>Delete</button></td>
        </tr>
    )
}

export default NoteItem;