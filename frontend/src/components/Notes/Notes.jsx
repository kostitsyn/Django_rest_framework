import NoteItem from "./NoteItem/NoteItem";
import c from './Notes.module.css';
import {Link} from "react-router-dom";

const NotesList = (props) => {
    let NoteElements = props.notes.map(note => <NoteItem note={note} deleteNote={props.deleteNote} key={note.id}/>)

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Project name</th>
                        <th className={c.textCol}>Text</th>
                        <th>Author</th>
                        <th/>
                    </tr>
                    {NoteElements}
                </tbody>
            </table>
            {props.isFirstNotesPage ? null : <button onClick={() => props.changePage('notes', 'previous')}>Previous page</button>}
            {props.isLastNotesPage ? null : <button onClick={() => props.changePage('notes', 'next')}>Next page</button>}
            <div>Текущая страница: {props.currentPage}</div>
            <Link to='/notes/create'>Create</Link>
        </div>
    )
}

export default NotesList;