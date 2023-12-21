import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {title: null, description: null,  user_id: null, todoId: null },
    reducers: {
        setTodoCredentials: (state, action) => {
            const {title, description, user_id} = action.payload
            state.title = title
            state.description = description
            state.user_id = user_id
        },
        setUpdateTodoCredentials: (state,action) => {
            const {todoId} = action.payload
            state.todoId = todoId
        }
    }
})

export const { setTodoCredentials, setUpdateTodoCredentials } = todoSlice.actions

export default todoSlice.reducer

// export const