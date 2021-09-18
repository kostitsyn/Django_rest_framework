import AuthorItem from "./AuthorItem/AuthorItem";
import c from './Authors.module.css';

const AuthorList = ({authors}) => {
    let authorsElements = authors.map(author => <AuthorItem author={author} key={author.uuid}/> )
    return (
        <table border='1' className={c.AuthorTable}>
            <tbody>
                <tr>
                    <th>UUID</th>
                    <th>Name</th>
                    <th>Birthday year</th>
                </tr>
                {authorsElements}
            </tbody>
        </table>
    )
}

export default AuthorList;