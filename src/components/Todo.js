import React, { useState } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { db } from '../firebase';
import Modal from './Modal';
import { ReactComponent as Delete } from '../assets/icons/delete.svg';
import { ReactComponent as Update } from '../assets/icons/pencil.svg';

const Todo = ({ todo }) => {
  const [open, setOpen] = useState(false);
  const deleteTodo = () => {
    db.collection('todos').doc(todo.id).delete();
  };
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <>
      {open && <Modal close={closeModal} todo={todo} />}
      <List className="todo__list">
        <ListItem>
          <ListItemText primary={todo.todo} />
          <span onClick={openModal}>
            <Update className="todo__update" />
          </span>
          <span onClick={deleteTodo}>
            <Delete className="todo__delete" />
          </span>
        </ListItem>
      </List>
    </>
  );
};

export default Todo;
