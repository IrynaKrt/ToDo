import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const todosAdapter = createEntityAdapter();

const initialState = todosAdapter.getInitialState({
    todosLoadingStatus: 'idle'
});

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/todos")
    }
)

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        todosCreated: (state, action) => {
            todosAdapter.addOne(state, action.payload);
        },
        todosDeleted: (state, action) => {
            todosAdapter.removeOne(state, action.payload);
        }
    },
    extraReducers : (builder) => {
        builder
                .addCase(fetchTodos.pending, state => {
                    state.todosLoadingStatus = 'loading'
                })
                .addCase(fetchTodos.fulfilled, (state, action) => {
                    state.todosLoadingStatus = 'idle';
                    todosAdapter.setAll(state,action.payload);
                })
                .addCase(fetchTodos.rejected, state => {
                    state.todosLoadingStatus = 'error'
                })
                .addDefaultCase(() => {})
    }
});

const {actions, reducer} = todosSlice;

export default reducer;

const {selectAll} = todosAdapter.getSelectors(state => state.todos);

export const filteredTodosSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, todos) => {
        if(filter === 'all') {
            return todos;
        } else {
            return todos.filter(item => item.element === filter);
        }
    }
)

export const {
    todosFetching,
    todosFetched,
    todosFetchingError,
    todosCreated,
    todosDeleted
} = actions;