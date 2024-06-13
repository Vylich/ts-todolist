import { ChangeEvent, memo, useCallback } from "react";
import { FilterValuesType } from "../AppWithRedux";
import AddItem from "./AddItem";
import EditableSpan from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { AppRootStateType } from "./state/store";
import { useSelector } from "react-redux";
import { addTaskAC } from "./state/tasks-reducer";
import { useDispatch } from "react-redux";
import Task from "./Task";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  filter: FilterValuesType;
  id: string;
  removeTodolist: (todolistId: string) => void;

  changeTitleTodolist: (id: string, newTitle: string) => void;
};

const Todolist = memo((props: PropsType) => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(
    (state) => state.tasks[props.id],
  );

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.changeFilter, props.id],
  );
  const removeTodolist = useCallback(() => {
    props.removeTodolist(props.id);
  }, [props.removeTodolist, props.id]);
  const changeTitleTodolist = useCallback(
    (newTitle: string) => {
      props.changeTitleTodolist(props.id, newTitle);
    },
    [props.changeTitleTodolist, props.id],
  );

  let allTodolistTasks = tasks;
  let tasksForTodolist = allTodolistTasks;

  if (props.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === true);
  }

  if (props.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter((t) => t.isDone === false);
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTitleTodolist} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItem
        addItem={useCallback(
          (title) => {
            dispatch(addTaskAC(title, props.id));
          },
          [dispatch, props.id],
        )}
      />
      <div>
        {tasksForTodolist.map((task) => (
          <Task
            key={task.id}
            id={props.id}
            taskId={task.id}
            title={task.title}
            isDone={task.isDone}
          />
        ))}
      </div>
      <div>
        <Button
          color={"inherit"}
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color={"primary"}
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color={"secondary"}
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
        >
          Copmleted
        </Button>
      </div>
    </div>
  );
});

export default Todolist;
