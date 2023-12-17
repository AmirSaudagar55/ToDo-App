import React, { useState } from 'react'
import { useTodoContext } from '../Context/TodoContext';

function TodoForm() {

    const {addTodo} = useTodoContext()
    const [todo, setTodo] = useState("");

    function add(e)
    {
        e.preventDefault()
        if(!todo) return
        
        addTodo({todo, complete : false});
        setTodo("")
    }


        return (
        <form  className="flex dark:bg-gray-800" onSubmit={add} >
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5 text-black dark:text-white "
                value = {todo}
                onChange = {(e)=> setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;


