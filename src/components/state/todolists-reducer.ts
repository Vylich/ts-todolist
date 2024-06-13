import { TodolistType, FilterValuesType } from "../../AppWithRedux";
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};
export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};
type ChangeTodolistActionType = {
  type: "CHANGED-TODOLIST";
  id: string;
  title: string;
};
type FilterTodolistActionType = {
  type: "CHANGED-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistActionType
  | FilterTodolistActionType;

export const removeTodolistAC = (
  totdolistId: string,
): RemoveTodolistActionType => {
  return {
    type: "REMOVE-TODOLIST",
    id: totdolistId,
  };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: "ADD-TODOLIST",
    title: title,
    todolistId: v1(),
  };
};

export const changeTodolistTitleAC = (
  totdolistId: string,
  title: string,
): ChangeTodolistActionType => {
  return {
    type: "CHANGED-TODOLIST",
    title: title,
    id: totdolistId,
  };
};

export const changeTodolistFilterAC = (
  filter: FilterValuesType,
  totdolistId: string,
): FilterTodolistActionType => {
  return {
    type: "CHANGED-TODOLIST-FILTER",
    filter: filter,
    id: totdolistId,
  };
};
// TODO

const initialState: Array<TodolistType> = [];

export const todolistsReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionsType,
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      const stateCopy = [...state];
      const filteredState = stateCopy.filter((tl) => tl.id !== action.id);
      return filteredState;
    }
    case "ADD-TODOLIST": {
      const copyState = [...state];
      const newTodolist: TodolistType = {
        id: action.todolistId,
        title: action.title,
        filter: "all",
      };
      return [...copyState, newTodolist];
    }
    case "CHANGED-TODOLIST": {
      const todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }
    case "CHANGED-TODOLIST-FILTER": {
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }

    default:
      return state;
  }
};
