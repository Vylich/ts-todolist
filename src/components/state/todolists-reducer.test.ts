
import React from "react";
import { addTodolistAC, changeTodolistFiltereAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { TodolistType, FilterValuesType } from "../../App";

test('correct todolist chould be removed', () => {
  let tlId1 = v1();
  let tlId2 = v1();


  const startState: Array<TodolistType> = [
    { id: tlId1, title: 'What to learn', filter: 'all' },
    { id: tlId2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todolistsReducer(startState, removeTodolistAC(tlId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(tlId2);
});


test('correct todolist chould be added', () => {
  let tlId1 = v1();
  let tlId2 = v1();

  let newTodolistTitle = 'New todolist';


  const startState: Array<TodolistType> = [
    { id: tlId1, title: 'What to learn', filter: 'all' },
    { id: tlId2, title: 'What to buy', filter: 'all' },
  ];

  const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe('all');

});

test('correct todolist chould be changed', () => {
  let tlId1 = v1();
  let tlId2 = v1();

  let newTodolistTitle = 'New todolist';


  const startState: Array<TodolistType> = [
    { id: tlId1, title: 'What to learn', filter: 'all' },
    { id: tlId2, title: 'What to buy', filter: 'all' },
  ];

  const action = changeTodolistTitleAC(tlId2, newTodolistTitle)

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe('What to learn');
  expect(endState[1].title).toBe(newTodolistTitle);

});

test('correct todolist chould be filter', () => {
  let tlId1 = v1();
  let tlId2 = v1();

  let newFilter: FilterValuesType = "completed";


  const startState: Array<TodolistType> = [
    { id: tlId1, title: 'What to learn', filter: 'all' },
    { id: tlId2, title: 'What to buy', filter: 'all' },
  ];

  const action = changeTodolistFiltereAC(tlId2, newFilter)

  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe('completed');

});
