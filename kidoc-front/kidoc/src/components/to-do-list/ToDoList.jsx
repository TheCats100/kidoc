import React from 'react';
import {
  BrowserRouter as
    Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from 'axios';
import './todolist.css';

import editButton from '../../icon/editButton.png'
class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      child_id: 2,
      items: [],
      firstBadge: 0,
      allBadge: 0,
      correct: 0
    };
    this.getToDoList = this.getToDoList.bind(this);
  };

  componentDidMount() {
    this.getToDoList();
  }

  componentDidUpdate(prevProps, prevState) {
    const url = 'http://localhost:8000/children_badges'
    const url2 = 'http://localhost:8000/children/2'
    const { child_id, allBadge, correct } = this.state;
    if (prevState.allBadge !== allBadge) {
      this.alertBadge();
    }
    if (prevState.correct !== correct) {
      if ( correct === 5 ){
        Axios.post(url, {
          child_id: child_id,
          badge_id: 2
        })
        Axios.post(url, {
          child_id: child_id,
          badge_id: 7
        })
        Axios.put(url2, {
          level: 2
        })
        this.setState({ allBadge: allBadge + 1})
      }
    }
  }

  alertBadge = () => {
    Swal.fire({
      icon: 'succes',
      title: 'Badge',
      text: 'you got a new badge !',
    })
  }

  getToDoList = () => {
    const url = `http://localhost:8000/tasks/${this.state.child_id}`
    Axios.get(url)
      .then((response) => response.data)
      .then((data) => this.setState({ items: data }))
  }

  render() {
    const { child_id, items, firstBadge, allBadge, correct } = this.state;
    return (
      <>
        {items.map((item) => {
          return (
            <>
              <div className="inputCheckboxes">
                <div className="inColumn">
                  <input className="taskCheckboxes" type="checkbox" id={item.id} name={item.id} onChange={() => {
                  const url = 'http://localhost:8000/children_badges'
                  if (firstBadge === 0) {
                    Axios.post(url, {
                      child_id: child_id,
                      badge_id: 11
                    })
                      .then((response) => { 
                        this.setState({ firstBadge: 1 })
                        this.setState({ allBadge: allBadge + 1})
                      })
                  }
                  this.setState({ correct: correct + 1 })
                }}/>
                  <label htmlFor={item.id} className="taskLabel">{`${item.title}  -  ${item.hour}`}</label>
                </div>
              </div>
            </>
          )
        })}
        <div className="tdlEdit" onClick={() => {
          Swal.fire({
            title: 'Parents\' password',
            input: 'password',
            inputAttributes: {
              autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
              const url = (`http://localhost:8000/children/${this.state.child_id}`)
              Axios.get(url)
                .then((response) => response.data)
                .then((data) => {
                  if (login === data.password) {
                    return this.props.history.push('/parents')
                  } else {
                    let timerInterval
                    Swal.fire({
                      title: 'Wrong password',
                      timer: 1000,
                      onBeforeOpen: () => {
                        timerInterval = setInterval(() => {
                          const content = Swal.getContent()
                          if (content) {
                            const b = content.querySelector('b')
                            if (b) {
                              b.textContent = Swal.getTimerLeft()
                            }
                          }
                        }, 100)
                      },
                      onClose: () => {
                        clearInterval(timerInterval)
                      }
                    }).then((result) => {
                      if (result.dismiss === Swal.DismissReason.timer) {
                        console.log('I was closed by the timer')
                      }
                    })
                  }
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          })
        }}>
          <img alt="edit button" className="tdlEditButton" src={editButton} />
        </div>
      </>
    );
  };
};

export default ToDoList;
