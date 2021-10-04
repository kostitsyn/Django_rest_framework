import React from "react";
import c from './BookForm.module.css';

class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            // authors: props.authors.slice(0, 1).uuid
            authors: props.authors
        }
        this.authorsElements = this.props.authors.map(item => <option value={item.uuid} key={item.uuid}>{item.firstName} {item.lastName}</option>)
    }

    handleChange(event) {
        if (event.target.name == 'name') {
            this.setState({[event.target.name]: event.target.value})
        }
        else {
            let value = Array.from(event.target.selectedOptions, (option) => option.value);
            this.setState({[event.target.name]: value})
        }
    }

    handleSubmit(event) {
        this.props.createBook(this.state.name, this.state.authors)
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={event => this.handleSubmit(event)}>
                <div className={c.formGroup}>
                    <label htmlFor='bookName'>name</label>
                    <input id='bookName' type='text' className={c.formControl} name='name' value={this.state.name} onChange={event => this.handleChange(event)} />
                </div>

                <div className={c.formGroup}>
                    <label htmlFor='authors'>author</label>
                    {/*<input id='author' type='text' className={c.formControl} name='authors' value={this.state.authors} onChange={event => this.handleChange(event)} />*/}
                    <select multiple id='authors' name='authors' className={c.formControl} onChange={event => this.handleChange(event)}>
                        {this.authorsElements}
                    </select>
                </div>

                <button type='submit'>Save</button>
            </form>
        )
    }
}

export default BookForm;

// 44b464c3d7fd4ef9bc2ff674e18bc89a,a222d8b34f6a4025a3927e7d1c36ddce
