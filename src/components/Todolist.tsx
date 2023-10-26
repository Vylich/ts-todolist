import React from 'react';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
};

function Todolist(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          return (
            <li>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={() => {}}>X</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button>All</button>
        <button>Acttive</button>
        <button>Copmleted</button>
      </div>
    </div>
  );
}

export default Todolist;
