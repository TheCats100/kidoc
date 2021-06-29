import React from 'react';
import {
  BrowserRouter as
    Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './firstname.css';
import Swal from 'sweetalert2';

import KiDocWB from '../../icon/KiDocWB.png'
import Axios from 'axios';

class FirstName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      names: [],
    };
    this.getAllName = this.getAllName.bind(this);
  }

  componentDidMount(){
    this.getAllName();
  }

  getAllName = () => {
    const url = 'http://localhost:8000/children_names'
    Axios.get(url)
      .then((response) => response.data)
      .then((data) => this.setState({ names: data }))
  }

  render() {
    const { names, firstname } = this.state;
    return (
      <>
        <div className="firstNamePage">
          <h1 className="firstNameLogo">KiDoc</h1>
          <img alt="kidoc" src={KiDocWB} className="firstNameImgLogo" />
          <form onSubmit={(event) => {
            event.preventDefault()
            const filName = names.filter((name) => name.firstname === firstname)
            if (filName.length === 0) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
              })
            } else {
              this.props.history.push('/')
            }
          }}>
            <label for="name" className="firstNameLabel">Enter your firstname</label>
            <input className="firstNameInput" type="text" id="name" onChange={(event) => {
                  this.setState({
                    firstname: event.target.value
                  })
                }}/>
            <button type="submit" className="firstNameConfirm" to="/">CONFIRM</button>
          </form>
        </div>
      </>
    );
  };
};

export default FirstName;
