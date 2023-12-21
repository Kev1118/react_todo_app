
import { apiSlice } from "../../app/api/apiSlice";

export const todoApiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createTodo: builder.mutation({
            query: credentials => ({
                url: '/todo/create-todo',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        loadTodo: builder.mutation({
            query: credentials => ({
                url: '/todo/',
                method: 'POST',
                body: {...credentials}
            })
        }),
        updateFinishTodo: builder.mutation({
            query: credentials => ({
                url: '/todo/update-finish',
                method: 'PUT',
                body: { ...credentials }
            })
        }),
        getOneTodo: builder.mutation({
            query: credentials => ({
                url: '/todo/get-one-todo/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        updateTodoData: builder.mutation({
            query: credentials => ({
                url: '/todo/update-todo',
                method: 'POST',
                body: {...credentials}
            })
        }),
        deleteTodoData: builder.mutation({
            query: credentials => ({
                url: '/todo/delete-todo',
                method: 'PUT',
                body: {...credentials}
            })
        })
       

    })
})

export const {
    useCreateTodoMutation,
    useLoadTodoMutation,
    useUpdateFinishTodoMutation,
    useGetOneTodoMutation,
    useUpdateTodoDataMutation,
    useDeleteTodoDataMutation
} = todoApiSlice