import { useCallback} from "react";
import Todolist, { TaskType } from "./components/Todolist";
import "./App.css";
import AddItem from "./components/AddItem";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import {
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
} from "./components/state/todolists-reducer";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./components/state/store";
export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  const dispatch = useDispatch();

  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(
    (state) => state.todolists,
  );

  const changeFilter = useCallback(
    (value: FilterValuesType, todolistId: string) => {
      const action = changeTodolistFilterAC(value, todolistId);
      dispatch(action);
    }, [dispatch]);

  const removeTodolist = useCallback((todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  }, [dispatch]);

  const addTodolist = useCallback((title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  }, [dispatch]);

  const changeTitleTodolist = useCallback((id: string, newTitle: string) => {
    const action = changeTodolistTitleAC(id, newTitle);
    dispatch(action);
  }, [dispatch]);

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
        <Grid container style={{ padding: "20px" }}>
          <AddItem addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => (
            <Grid item>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  changeFilter={changeFilter}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
                  changeTitleTodolist={changeTitleTodolist}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
