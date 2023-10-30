import React, { ChangeEvent } from 'react';
import { FilterValuesType } from '../App';
import AddItem from './AddItem';
import EditableSpan from './EditableSpan';
import { Delete } from '@mui/icons-material';
import { Button, IconButton, Checkbox } from '@mui/material';
import { pink } from '@mui/material/colors';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  id: string;
  removeTodolist: (todolistId: string) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  changeTitleTodolist: (id: string, newTitle: string) => void;
};

function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter('all', props.id);
  const onActiveClickHandler = () => props.changeFilter('active', props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter('completed', props.id);
  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };
  const changeTitleTodolist = (newTitle: string) => {
    props.changeTitleTodolist(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTitleTodolist} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItem addItem={addTask} />
      <div>
        {props.tasks.map((task) => {
          const onClickHandler = () => props.removeTask(task.id, props.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(task.id, newValue, props.id);
          };

          return (
            <div className={task.isDone ? 'is-done' : ''} key={task.id}>
              <Checkbox
                checked={task.isDone}
                onChange={onChangeHandler}
                sx={{
                  color: pink[800],
                  '&.Mui-checked': {
                    color: pink[600],
                  },
                }}
              />
              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />
              <IconButton onClick={onClickHandler}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          color={'inherit'}
          variant={props.filter === 'all' ? 'contained' : 'text'}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color={'primary'}
          variant={props.filter === 'active' ? 'contained' : 'text'}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color={'secondary'}
          variant={props.filter === 'completed' ? 'contained' : 'text'}
          onClick={onCompletedClickHandler}
        >
          Copmleted
        </Button>
      </div>
    </div>
  );
}

export default Todolist;
