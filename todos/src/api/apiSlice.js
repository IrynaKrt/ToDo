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
        getTag: builder.query({
            query: () => '/filters',
            providesTags: ['Filters']
        }),
        createTodo: builder.mutation({
            query: todo => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ['Todos'] //подвязка под запрос
        }),
        createTag: builder.mutation({
            query: tag => ({
                url: '/filters',
                method: 'POST',
                body: tag
            }),
            invalidatesTags: ['Filters']
        }),
        deleteTodo: builder.mutation({
            query: id => ({
                url: `/todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTag: builder.mutation({
            query: id => ({
                url: `/filters/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Filters']
        })
    })
});

export const {useGetTodosQuery, useGetTagQuery, useCreateTodoMutation, useCreateTagMutation, useDeleteTodoMutation, useDeleteTagMutation} = apiSlice;