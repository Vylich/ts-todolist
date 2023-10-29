import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

type AddItemPropsType = {
  addItem: (title: string) => void;
}

function AddItem(props: AddItemPropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask()
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Title is required!');
    }
  };

  return (
      <div>
        <input
          value={newTaskTitle}
          onChange={onTitleChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error ? <div className={'error-message'}>Field is required</div> : ''}
      </div>
  )
}

export default AddItem