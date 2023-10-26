import React from 'react';
import Todolist, { TaskType } from './components/Todolist';
import './App.css';



function App() {
  let tasks1: Array<TaskType> = [
    {id: 1, title: 'Html', isDone: true},
    {id: 2, title: 'Css', isDone: true},
    {id: 3, title: 'React', isDone: false}
  ]

  let tasks2: Array<TaskType> = [
    {id: 1, title: 'Terminator', isDone: true},
    {id: 2, title: 'XXX', isDone: true},
    {id: 3, title: 'Wane', isDone: false},
    {id: 3, title: 'Wane', isDone: false}
  ]

  let tasks3: Array<TaskType> = [
    {id: 1, title: 'Walk', isDone: true},
    {id: 2, title: 'Movie', isDone: true},
    {id: 3, title: 'Coding', isDone: false}
  ]

  return (
    <div className="App">
      <Todolist title='What to learn' tasks={tasks1}/>
      <Todolist title='Movie' tasks={tasks2}/>
      <Todolist title='Chill' tasks={tasks3}/>
    </div>
  );
}

export default App;
