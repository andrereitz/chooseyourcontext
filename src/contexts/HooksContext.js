import * as React from 'react'

const HooksContext = React.createContext();

function useTodos() {
        const context = React.useContext(HooksContext);
        
        if (!context) {
            throw new Error(`useCount hook must be used under HooksContextProvider`)
        }
        
        const [state, setState] = context;
        
        const addTodo = (payload) => {
            setState({
                ...state,
                todos: [
                    ...state.todos,
                    payload
                ]
            });
        }

        const toggleComplete = (payload) => {
            setState({
                ...state,
                todos: [...state.todos.map( todo => {
                    if(todo.id === payload){
                        todo.completed = !todo.completed;
                    }

                    return todo;
                })]
            });
        }

        const setTodos = (payload) => {
            setState({
                ...state,
                todos: payload,
                loading: false
            });
        }

        const setLoading = (payload) => {
            setState({
                ...state,
                loading: payload
            });
        }

        return {
            state,
            addTodo,
            toggleComplete,
            setTodos,
            setLoading
        }
    };

function HooksContextProvider(props) {
    const initialState = {
        todos: [],
        loading: true
    }
    const [state, setState] = React.useState(initialState)
    const value = React.useMemo(() => [state, setState], [state])

    return <HooksContext.Provider value={value} {...props} />
};

export { HooksContextProvider, useTodos }
