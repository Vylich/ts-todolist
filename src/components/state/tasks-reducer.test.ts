import { removeTaskAC, addTaskAC, tasksReducer, changeTaskStatusAC, changeTaskTitleAC } from "./tasks-reducer ";
import { TasksStateType } from "../../App";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

test('correct task chould be deleted from correct array', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const action = removeTaskAC('2', 'todolistId2');

  const endstate = tasksReducer(startState, action);

  expect(endstate["todolistId1"].length).toBe(3);
  expect(endstate["todolistId2"].length).toBe(2);
  expect(endstate["todolistId2"].every(t => t.id !== '2')).toBeTruthy();

});


test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const action = addTaskAC('juce', 'todolistId2');

  const endstate = tasksReducer(startState, action);

  expect(endstate["todolistId1"].length).toBe(3);
  expect(endstate["todolistId2"].length).toBe(4);
  expect(endstate["todolistId2"][0].id).toBeDefined();
  expect(endstate["todolistId2"][0].title).toBe('juce');
  expect(endstate["todolistId2"][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const action = changeTaskStatusAC('2', false, 'todolistId2');

  const endstate = tasksReducer(startState, action);

  expect(endstate["todolistId2"][1].isDone).toBe(false);
  expect(endstate["todolistId1"][1].isDone).toBe(true);

});

test('title of specified task should be changed', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const action = changeTaskTitleAC('2', "milkyway", 'todolistId2');

  const endstate = tasksReducer(startState, action);

  expect(endstate["todolistId2"][1].title).toBe("milkyway");
  expect(endstate["todolistId1"][1].title).toBe('JS');

});

test('new array should be added when new todolist is added', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const action = addTodolistAC('new todolist');

  const endstate = tasksReducer(startState, action);

  const keys = Object.keys(endstate);
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3);
  expect(endstate[newKey]).toEqual([]);

});

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    "todolistId1": [
      {id: "1", title: "CSS", isDone: false},
      {id: "2", title: "JS", isDone: true},
      {id: "3", title: "React", isDone: false}
    ],
    "todolistId2": [
      {id: "1", title: "bread", isDone: false},
      {id: "2", title: "milk", isDone: true},
      {id: "3", title: "tea", isDone: false}
    ]
  };

  const action = removeTodolistAC('todolistId2');

  const endstate = tasksReducer(startState, action);

  const keys = Object.keys(endstate);

  expect(keys.length).toBe(1);
  expect(endstate['todolistId2']).toBeUndefined();

});