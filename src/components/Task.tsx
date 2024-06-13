import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { pink } from "@mui/material/colors";
import React, { ChangeEvent, memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import EditableSpan from "./EditableSpan";
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasks-reducer";

type PropsType = {
  id: string;
  taskId: string;
  title: string;
  isDone: boolean;
};

const Task = memo((props: PropsType) => {
  const dispatch = useDispatch();

  const onClickHandler = useCallback(
    () => dispatch(removeTaskAC(props.taskId, props.id)),
    [dispatch, props.id, props.taskId],
  );
  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeTaskStatusAC(props.taskId, e.currentTarget.checked, props.id),
      );
    },
    [dispatch, props.id, props.taskId],
  );
  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      dispatch(changeTaskTitleAC(props.taskId, newValue, props.id));
    },
    [dispatch, props.id, props.taskId],
  );

  return (
    <div className={props.isDone ? "is-done" : ""} key={props.taskId}>
      <Checkbox
        checked={props.isDone}
        onChange={onChangeHandler}
        sx={{
          color: pink[800],
          "&.Mui-checked": {
            color: pink[600],
          },
        }}
      />
      <EditableSpan title={props.title} onChange={onChangeTitleHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});

export default Task;
