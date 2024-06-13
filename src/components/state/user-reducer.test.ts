import React from "react";
import { userReducer } from "./user-reducer";

test("user reducer age", () => {
  const startState = {
    age: 20,
    childrenCount: 2,
    name: "Ilya",
  };

  const endState = userReducer(startState, { type: "INCREMENT-AGE" });

  expect(endState.age).toBe(21);
  expect(endState.childrenCount).toBe(2);
});

test("children", () => {
  const startState = {
    age: 20,
    childrenCount: 2,
    name: "Ilya",
  };

  const endState = userReducer(startState, {
    type: "INCREMENT-CHILDREN-COUNT",
  });

  expect(endState.age).toBe(20);
  expect(endState.childrenCount).toBe(3);
});

test("name", () => {
  const startState = {
    age: 20,
    childrenCount: 2,
    name: "Ilya",
  };

  const newName = "Sofya";
  const endState = userReducer(startState, {
    type: "CHANGE-NAME",
    newName: newName,
  });

  expect(endState.name).toBe(newName);
});

