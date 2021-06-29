import styles from './Contents.module.scss';

import { useContext, useEffect, useState } from "react";
import ClassContext from "../../contexts/ClassContext";

import { useRandomTodo } from "../../hooks/useRandomTodo";
import { useTodoFilter } from '../../hooks/useTodoFilter';

import { ListItem, AddButton, Loader } from '../';

export function ClassContextList(){
    const todoContext = useContext(ClassContext);
    const { todos, loading } = todoContext.state;
    
    const [allTodos, setAllTodos] = useState([]);
    const [radomTodo, regenerate] = useRandomTodo(allTodos);
    const filtered = useTodoFilter(allTodos);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
          .then(res => res.json())
          .then(res => {
            setAllTodos(res);
          })
    }, []);    

    useEffect(() => {
        todoContext.setTodos(filtered);
    }, [filtered])

    function handleTodoAdd(){
        todoContext.addTodo(radomTodo);
        regenerate();
    }

    function handleTodoComplete(id, completed){
        todoContext.toggleComplete(id, completed);
    }

    if(loading){
        return (
            <div className={`container app-box ${styles.Contents}`}>
                <Loader />
            </div>
        )
    }

    return(
        <div className={`container app-box ${styles.Contents}`}>
            <div className={`${styles.Column}`}>
                <h2 id="class-style">The “Class Style” strategy</h2>
                <h3>Context API Exporting Provider Class</h3>
                <p>State of the context is the state of the class used to export the Provider.</p>
                <p>The advantage of this approach is its easier to understand for people who are not used to Redux or complex Hooks. The provider and provider value is also exported from the same place.</p>
                <p>All data and methods related to this context are defined in the same file, a provider is exported as a class and used under the app with useContext Hook.</p>
            </div>
            <div className={`${styles.Column} ${styles.CodeSection}`}>
                <div>
                    <h3>State Implementation example:</h3>
                    <span><i className="fas fa-code-branch"></i> <a href="https://github.com/andrereitz/chooseyourcontext/blob/master/src/contexts/ClassContext.js" target="_blank">Check out on Github</a></span>
                </div>
                <ul>
                    {todos.length > 0 && todos.map((todo, index) => (
                        <ListItem key={`cc-todo-${index}`} todo={todo} clickAction={ handleTodoComplete } />
                    ))}
                </ul>
                <AddButton clickAction={ handleTodoAdd }>
                    Add Random Todo
                </AddButton>
            </div>
        </div>
    )
}