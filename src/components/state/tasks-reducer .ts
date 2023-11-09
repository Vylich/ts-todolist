import { TodolistType, FilterValuesType, TasksStateType } from '../../App';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';
import { v1 } from 'uuid';

type RemoveTaskActionType = {
  type: 'REMOVE-TASK';
  todolistId: string;
  taskId: string;
};

type addTaskActionType = {
  type: 'ADD-TASK';
  title: string;
  todolistId: string;
};

type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS';
  todolistId: string;
  isDone: boolean;
  taskId: string;
};

type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE';
  todolistId: string;
  title: string;
  taskId: string;
};

export type ActionsType = RemoveTaskActionType | addTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType;

// TODO

export const tasksReducer = (
  state: TasksStateType,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const filteredTasks = tasks.filter(t => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;

      return stateCopy;
    }
    case 'ADD-TASK': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTask = {id: v1(), title: action.title, isDone: false};
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case 'CHANGE-TASK-STATUS': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];

      const task = tasks.find((t) => t.id === action.taskId);
      if(task) {
        task.isDone = action.isDone
      }
      stateCopy[action.todolistId] = {...tasks}

      return stateCopy;
    }
    case 'CHANGE-TASK-TITLE': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];

      const task = tasks.find((t) => t.id === action.taskId);
      if(task) {
        task.title = action.title
      }
      stateCopy[action.todolistId] = {...tasks}

      return stateCopy;
    }
    case 'ADD-TODOLIST': {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];
      return stateCopy;
    }
    case 'REMOVE-TODOLIST': {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    default:
      throw new Error("I don't understand");
  }
};

export const removeTaskAC = ( taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return {
    type: 'REMOVE-TASK',
    todolistId,
    taskId,
  };
};

export const addTaskAC = (title: string,
  todolistId: string): addTaskActionType => {
  return {
    type: 'ADD-TASK',
    title, todolistId
  };
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean,
  todolistId: string): ChangeTaskStatusActionType => {
  return {
    type: 'CHANGE-TASK-STATUS',
    isDone, todolistId, taskId
  };
};

export const changeTaskTitleAC = (taskId: string, title: string,
  todolistId: string): ChangeTaskTitleActionType => {
  return {
    type: 'CHANGE-TASK-TITLE',
    title, todolistId, taskId
  };
};