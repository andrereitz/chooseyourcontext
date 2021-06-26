import { useState, useEffect } from 'react';

export function useRandomTodo(data = []){
    const [randomTodo, setRandomTodo] = useState();

    useEffect(() => {
        regenerateRandom();
    }, [data])

    const regenerateRandom = () => setRandomTodo(data[Math.floor(Math.random() * data.length)]);

    return [
        randomTodo,
        regenerateRandom
    ]
}