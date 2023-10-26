import React, { useState } from 'react';
import Todolist, { TaskType } from './components/Todolist';
import './App.css';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'Html', isDone: true },
    { id: v1(), title: 'Css', isDone: true },
    { id: v1(), title: 'React', isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeTask = (id: string) => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    setTasks(filteredTasks);
  };

  const addTask = (title: string) => {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  };

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  };

  const changeStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find((t) => t.id === taskId);
    if(task) {
      task.isDone = isDone;
    }
    let copyTasks = [...tasks]
    setTasks(copyTasks);
  };

  let tasksForTodolist = tasks;

  if (filter === 'completed') {
    tasksForTodolist = tasks.filter((t) => t.isDone === true);
  }

  if (filter === 'active') {
    tasksForTodolist = tasks.filter((t) => t.isDone === false);
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
