import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import Todo from './components/Todo';
import firebase, { db } from './firebase';

const App = () => {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  // quando l'app viene caricata leggi i dati dal database
  useEffect(() => {
    db.collection('todos') // todos: raccolta firebase
      .orderBy('timestamp', 'desc') // ordina per orario di creazione
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo })) // todo: campo del documento firebase
        );
      });
  }, []);

  const addTodo = () => {
    setTodos([...todos, input]);
    setInput('');
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), // orario di inserimento che permette di ordinare l'elenco in ordine di inserimento
    });
  };

  return (
    <div className="app">
      <form onSubmit={(e) => e.preventDefault()}>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            className="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map((todo, i) => (
          <Todo key={i} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default App;
