import React from 'react';
import ProfilBar from '../profilbar/ProfilBar';
import ToDoList from '../to-do-list/ToDoList';


function Home({ history }) {
  return (
    <>
      <ProfilBar />
      <ToDoList history={history}/>
    </>
  )
}

export default Home;
