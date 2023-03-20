import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Todos'],
    endpoints: builder => ({
        getTodos: builder.query({
            query: () => '/todos',
            providesTags: ['Todos']
        }),
        createTodo: builder.mutation({
            query: hero => ({
                url: '/todos',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Todos'] //подвязка под запрос
        }),
        deleteTodo: builder.mutation({
            query: id => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todos']
        })
    })
});

export const {useGetTodosQuery, useCreateTodoMutation, useDeleteTodoMutation} = apiSlice;