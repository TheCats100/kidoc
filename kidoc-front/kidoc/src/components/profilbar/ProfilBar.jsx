import React from 'react';
import {
  BrowserRouter as
    Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './profilbar.css'

import KiDocWB from '../../icon/KiDocWB.png'
import Axios from 'axios';

class ProfilBar extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      level: '1',
      date: new Date(),
      child_id: 2
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.getTime(), 30000);
    this.getName();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getTime() {
    this.setState({
      date: new Date()
    });
  }

  getName = () => {
    const { child_id, name } = this.state;
    const url = `http://localhost:8000/children/${child_id}`
    Axios.get(url)
      .then((response) => response.data)
      .then((data) => {
        this.setState({ name: data.firstname})
        this.setState({ level: data.level })
      })
  }

  render() {
    const { name, date, level } = this.state;
    return (
      <>
        <div className="profilBarBlock">
          <div className="profilBarAvatarBlock">
            <img className="profilBarLogo" alt="avatar" src={KiDocWB} />
            <p>Doctor {name}</p>
          </div>
          <h2 className="profilBarDate" >{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>
          <Link className="profilBarLevel" to="/badges">{level}</Link>
        </div>
      </>
    );
  };
};

export default ProfilBar;
