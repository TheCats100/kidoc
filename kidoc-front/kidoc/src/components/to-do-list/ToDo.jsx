import React, { Component } from 'react';

import './ToDo.css';
import ToDoList from './ToDoList';

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ToDoInputText: '',
      ToDoInputTime: '00:00',
    }
  }

  onChangeText(event) {
    this.setState({
      ToDoInputText: event.target.value
    });
  }

  onChangeTime(event) {
    this.setState({
      ToDoInputTime: event.target.value
    });
  }

  addToDo(event) {
    const { ToDoInputText, ToDoInputTime } = this.state
    event.preventDefault();
    this.props.addItem({ time: ToDoInputTime, text: ToDoInputText })
    this.setState({
      ToDoInputText: '',
      ToDoInputTime: '00:00',
    });
  }

  render() {
    const { ToDoInputText, ToDoInputTime } = this.state
    return (
      <>
        <h1 className="ToDoTitle">To Do List</h1>
        <form className="ToDoForm" onSubmit={this.addToDo.bind(this)}>
          <input className="inputAdd inputIntitulePF" type="time" value={ToDoInputTime} onChange={this.onChangeTime.bind(this)}></input>
          <input className="inputAdd inputTimePF" type="text" value={ToDoInputText} onChange={this.onChangeText.bind(this)} />
          <button className="buttonAdd" type="submit">Add</button>
        </form>
      </>
    )
  }

}

export default ToDo;