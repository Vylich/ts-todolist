import React, { useState } from 'react';
import Todolist, { TaskType } from './components/Todolist';
import './App.css';
import { v1 } from 'uuid';
import AddItem from './components/AddItem';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import { Menu } from '@mui/icons-material';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  let tlId1 = v1();
  let tlId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
    { id: tlId1, title: 'What to learn', filter: 'all' },
    { id: tlId2, title: 'What to buy', filter: 'all' },
  ]);

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [tlId1]: [
      { id: v1(), title: 'Html', isDone: true },
      { id: v1(), title: 'Css', isDone: true },
      { id: v1(), title: 'React', isDone: false },
    ],
    [tlId2]: [
      { id: v1(), title: 'book', isDone: true },
      { id: v1(), title: 'Milk', isDone: true },
    ],
  });

  const removeTask = (id: string, todolistId: string) => {
    let tasks = tasksObj[todolistId];
    const filteredTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  };

  const addTask = (title: string, todolistId: string) => {
    let newTask = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  };

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    let todolist = todoLists.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  };

  const removeTodolist = (todolistId: string) => {
    let filteredTodolist = todoLists.filter((tl) => tl.id !== todolistId);
    setTodoLists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  };

  const addTodolist = (title: string) => {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title,
    };
    setTodoLists([todolist, ...todoLists]);
    setTasks({ ...tasksObj, [todolist.id]: [] });
  };

  const changeTaskTitle = (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => {
    let tasks = tasksObj[todolistId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  };

  const changeTitleTodolist = (id: string, newTitle: string) => {
    const todolist = todoLists.find((tl) => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodoLists([...todoLists]);
    }
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItem addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((tl) => {
            let tasksForTodolist = tasksObj[tl.id];

            if (tl.filter === 'completed') {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.isDone === true
              );
            }

            if (tl.filter === 'active') {
              tasksForTodolist = tasksForTodolist.filter(
                (t) => t.isDone === false
              );
            }

            return (
              <Grid item>
                <Paper style={{padding: '10px'}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTitleTodolist={changeTitleTodolist}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
