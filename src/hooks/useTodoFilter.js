import { useState, useEffect } from 'react';

export function useTodoFilter(todos){
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        setFiltered(todos.slice(0, 5));
    }, [todos]);
    
    return filtered;
}