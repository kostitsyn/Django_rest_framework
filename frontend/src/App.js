import React from 'react';
import './App.css';
import AuthorList from "./components/Authors";
import axios from "axios";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'authors': [],
    }
  }
  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/authors/')
        .then(response => {
          const authors = response.data
          this.setState(
              {
                'authors': authors
              }
          )
        }).catch(error => {
        // console.log(error)
        const authors = [
          {
              'first_name': '123',
          'last_name': '456',
          'birthday_year': '122'
          }
      ]
      this.setState(
              {
                'authors': authors
              }
          )

    })

      // const authors = [
      //     {
      //         'first_name': '123',
      //     'last_name': '456',
      //     'birthday_year': '122'
      //     }
      // ]
      // this.setState(
      //         {
      //           'authors': authors
      //         }
      //     )
  }

  render() {
    return (
        <div>
          <AuthorList authors={this.state.authors}/>
        </div>
    )
  }
}
export default App;