import React from 'react';

import './parents.css'

import KiDocWB from '../../icon/KiDocWB.png'
import Axios from 'axios';
import Swal from 'sweetalert2';

import ToDo from '../to-do-list/ToDo';

class ParentsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      birthday: '',
      password: '',
      name: '',
      items: []
    };
  }

  Validate = () => {
    const { name, password, birthday } = this.state
    const form = document.formulaire;
    if (form.password.value !== ''
      && form.birthday.value !== ''
      && form.name.value !== ''
    ) {
      const url = 'http://localhost:8000/children/2'
      Axios.put(url, {
        firstname: name,
        birth: birthday,
        password: password,
        level: 1
      })
        .then((res) => {
          Swal.fire({
            icon: 'succes',
            title: name,
            text: 'is saved',
          })
        this.props.history.push('/connect')
        })
        .catch((err) => console.log(err))
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Empty field!',
      })
    }
  }

  addItem = (item) => {
    const url = 'http://localhost:8000/tasks'
    const { items } = this.state;
    Axios.post(url, {
      title: item.text,
      hour: item.time,
      check: 0,
      child_id: 2
    })
      .then((response) => response.data)
      .then((data) => {
        item.id = data.id
        this.setState({ items: [...items, item] })
      })
      .catch((err) => console.log(err))
  }

  displayToDo() {
    const { items } = this.state;
    return items.map((item) => {
      return (
        <div className="instruction" key={item}>
          <div className="instructionToDo">
            <p className="instructionSep">{item.text}</p>
            <p>{item.time}</p>
          </div>
          <button className="deleteButton" onClick={() => {
            const url = `http://localhost:8000/tasks/${item.id}`
            const supItem = items.filter((filItem) => filItem.text !== item.text)
            this.setState({ items: supItem })
            Axios.delete(url)
              .then((res) => {
                console.log(res)
              })
              .catch((err) => {
                console.log(err)
              })
          }}>Delete</button>
        </div>
      )
    })
  }

  render() {
    return (
      <>
        <div className="pageParents">
          <div className="topParents">
            <h1 className="titleParents">KiDoc</h1>
            <img alt="kidoc" src={KiDocWB} className="ImgLogoParents" />
          </div>
          <div>
            <div className="completToDo">
              <ToDo
                addItem={this.addItem}
                deleteItem={this.deleteItem}
                items={this.state.items}
              />
              <div>
                {this.displayToDo()}
              </div>
            </div>
            <form onSubmit={(event) => {
              this.Validate()
              event.preventDefault()
            }} name="formulaire">
              <div className="BirthdayParents">
                <label htmlFor="birthday">Birthday</label>
                <input onChange={(event) => {
                  this.setState({
                    birthday: event.target.value
                  })
                }} type="date" id="birthday" name="birthday" className="inputBirthday" />
              </div>
              <div className="passwordParents">
                <label htmlFor="password">Create a password</label>
                <input type="password" onChange={(event) => {
                  this.setState({
                    password: event.target.value
                  })
                }}
                name="password" id="password" className="inputPassword" />
              </div>
              <div className="passwordParents">
                <label htmlFor="name">Name of children</label>
                <input onChange={(event) => {
                  this.setState({
                    name: event.target.value
                  })
                }}
                  type="text" name="name" id="name" className="inputName" />
              </div>
              <div>
                <button className="buttonValidate" type="submit">Validate</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };
};
export default ParentsForm;
