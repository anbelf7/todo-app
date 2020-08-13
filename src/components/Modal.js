import React, { useState } from 'react';
import { db } from '../firebase';

const Modal = ({ close, todo }) => {
  const [input, setInput] = useState('');
  const updateTodo = (e) => {
    db.collection('todos').doc(todo.id).update({ todo: input });
    e.preventDefault();
    close();
  };
  return (
    <div className="modal">
      <div className="modal__box">
        <button className="modal__boxClose" onClick={close}>
          X
        </button>
        <form>
          <input
            placeholder={todo.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={updateTodo}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
