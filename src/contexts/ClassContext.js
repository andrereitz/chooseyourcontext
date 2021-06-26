import React, { Component } from 'react';

const ClassContext = React.createContext();

class ClassProvider extends Component {
  state = {
    todos: [],
    loading: true
  };

  addTodo = (todo) => {
    this.setState((prevState) => ({ ...prevState, todos: [...this.state.todos, todo] }))
  };

  toggleComplete = (id, completed) => {
    this.setState((prevState) => ({ ...prevState, todos: [...this.state.todos.map( todo => {
      if(todo.id === id){
        todo.completed = completed
      }

      return todo;
    })] }))
  }

  setTodos = (todos) => {
    this.setState((prevState) => ({ ...prevState, todos: todos, loading: false }))
  };

  setLoading = (action) => {
      this.setState((prevState) => ({ ...prevState, loading: action }))
  }

  render() {
    const { children } = this.props;
    const { addTodo, toggleComplete, setTodos, setLoading } = this;

    return (
      <ClassContext.Provider
        value={{
          state: this.state,
          addTodo,
          toggleComplete,
          setTodos,
          setLoading
        }}
      >
        {children}
      </ClassContext.Provider>
    );
  };
};

export default ClassContext;

export { ClassProvider };