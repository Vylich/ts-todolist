import { TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react'

type EditableSpanType = {
  title: string;
  onChange: (newValue: string) => void;
}

function EditableSpan(props: EditableSpanType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState('');


  const activeEditMode = () => {
    setEditMode(true);
    setTitle(props.title)
  }
  const activeViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
  ? <TextField value={title} onChange={onChangeHandler} onBlur={activeViewMode} autoFocus variant="standard"/>
  : <span onDoubleClick={activeEditMode}>{props.title}</span>

}

export default EditableSpan