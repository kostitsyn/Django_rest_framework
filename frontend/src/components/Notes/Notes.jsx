import NoteItem from "./NoteItem/NoteItem";
import c from './Notes.module.css';

const NotesList = ({notes}) => {
    let NoteElements = notes.map(note => <NoteItem note={note} key={note.uuid}/>)
    return (
        <table>
            <tbody>
                <tr>
                    <th>Project name</th>
                    <th className={c.textCol}>Text</th>
                    <th>Author</th>
                </tr>
                {NoteElements}
            </tbody>
        </table>
    )
}

export default NotesList;