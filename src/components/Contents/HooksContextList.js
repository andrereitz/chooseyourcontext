import styles from './Contents.module.scss';

import { useEffect, useState } from 'react';
import { useTodos } from "../../contexts/HooksContext";

import { useRandomTodo } from "../../hooks/useRandomTodo";
import { useTodoFilter } from '../../hooks/useTodoFilter';

import { ListItem, AddButton, Loader } from '../';

export function HooksContextList(){
    const { state, addTodo, setTodos, toggleComplete } = useTodos();
    const { todos, loading } = state;

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
        setTodos(filtered);
    }, [filtered])

    function handleTodoAdd(){
        addTodo(radomTodo);
        regenerate();
    }

    function handleTodoComplete(id){
        toggleComplete(id);
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
                <h2 id="hooks-style">The “Hooks Style” strategy</h2>
                <h3>State management via Hooks</h3>
                <p>State of this strategy can be abstracted (as current implementation) or scoped. A more scoped implementation would require more state fragmentation as it would not allow a multi-level state.</p>
                <p>All the methods and hooks in this case can also be defined in a single file, but could also be segmented, for exemple, separating hooks in other folder.</p>
                <p>This in implementation can be a little confusing compared to the others, but offers good flexibility.</p>
                <p>A hibrid implementation with the "Redux Style", using useReducer hook, could offer better architecture for this implementation.</p>
            </div>
            <div className={`${styles.Column} ${styles.CodeSection}`}>
                <div>
                    <h3>State Implementation example:</h3>
                    <span><i className="fas fa-code-branch"></i> <a href="https://github.com/andrereitz/chooseyourcontext/blob/master/src/contexts/HooksContext.js" target="_blank">Check out on Github</a></span>
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