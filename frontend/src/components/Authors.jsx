import AuthorItem from "./AuthorItem/AuthorItem";
import c from './Authors.module.css';

const AuthorList = ({authors}) => {
    let authorsElements = authors.map(author => <AuthorItem author={author}/> )
    return (
        <table border='1' className={c.AuthorTable}>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                Birthday year
            </th>
            {authorsElements}
        </table>
    )
}

export default AuthorList;