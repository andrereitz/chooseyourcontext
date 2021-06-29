import styles from './Contents.module.scss';

import { useContext, useEffect, useState } from "react";
import { ReduxContext, actions as ReduxContextActions } from "../../contexts/ReduxContext";

import { useRandomTodo } from "../../hooks/useRandomTodo";
import { useTodoFilter } from '../../hooks/useTodoFilter';

import { ListItem, AddButton, Loader } from '../';

export function ReduxLikeContextList(){
    const todoContext = useContext(ReduxContext);
    const { todos, loading } = todoContext.state;
    const { setTodos, toggleComplete } = todoContext.actions;

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
        todoContext.dispatch(setTodos(filtered))
    }, [filtered])

    function handleTodoAdd(){
        todoContext.dispatch(ReduxContextActions.addTodo(radomTodo));
        regenerate();
    }

    function handleTodoComplete(id, completed){
        todoContext.dispatch(toggleComplete({ id, completed }))
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
                <h2 id="redux-style">The “Reducer Style” strategy</h2>
                <h3>Context API Exporting a "Redux Like" Reducer</h3>
                <p>State of the context is the reducer state defined in the context file.</p>
                <p>Similar to the previous strategy, related files to this context are defined in the same file. The provider and provider value are expoted from the same place aswell, but this time with a functional component.</p>
                <p>For the action creators you can export them from the file itself, or use it from the Provider value passed down. Both implementations were illustrated in this example</p>
                <p>Although this implementation looks more complex, it gives a solid base for scalability and developers used to Flux/Redux style architecture will easily adapt to this strategy.</p>
            </div>
            <div className={`${styles.Column} ${styles.CodeSection}`}>
                <div>
                    <h3>State Implementation example:</h3>
                    <span><i className="fas fa-code-branch"></i> <a href="https://github.com/andrereitz/chooseyourcontext/blob/master/src/contexts/ReduxContext.js" target="_blank">Check out on Github</a></span>
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