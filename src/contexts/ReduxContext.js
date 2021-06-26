import React, { useReducer } from 'react';

const ReduxContext = React.createContext();

const initialState = {
    todos: [],
    loading: true
}

const actionTypes = {
    addTodo: 'ADD_TODO',
    toggleComplete: 'TOGGLE_COMPLETE',
    setTodos: 'SET_TODOS',
    setLoading: 'SET_LOADING'
}

export const actions = {
    addTodo: (payload) => ({
        type: 'ADD_TODO',
        payload
    }),
    toggleComplete: (payload) => ({
        type: 'TOGGLE_COMPLETE',
        payload
    }),
    setTodos: (payload) => ({
        type: 'SET_TODOS',
        payload
    }),
    setLoading: (payload) => ({
        type: 'SET_LOADING',
        payload
    })
}

function reduxLikeReducer(state, action){
    switch(action.type){
        case actionTypes.addTodo:
            return { ...state, todos: [...state.todos, action.payload] };

        case actionTypes.toggleComplete:
            return { ...state, todos: [...state.todos.map( todo => {
                if(todo.id === action.payload.id){
                    todo.completed = action.payload.completed;
                }

                return todo;
            })]};

        case actionTypes.setTodos:
            return { ...state, todos: action.payload, loading: false };

        case actionTypes.setLoading: 
            return { ...state, loading: action.payload }

        default:
            return state;
    }
}

function ReduxLikeContextProvider({ children }){
    const [state, dispatch] = useReducer(reduxLikeReducer, initialState);

    return <ReduxContext.Provider value={{ state, dispatch, actions }}> { children } </ReduxContext.Provider>
}

export { ReduxContext, ReduxLikeContextProvider };