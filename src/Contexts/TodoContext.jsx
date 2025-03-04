import { createContext, useContext } from "react";

export const TodoContext = createContext({ 
    todos: [
    {
        id:1,
        todo:"Todo messg",
        checked:false
    }    
    ],
    addTodo: ((todo) => {} ) ,
    deleteTodo: ((id) => {}),
    editTodo: ((id, todo) => {}),
    toggleChecked: ((id) => {})
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider