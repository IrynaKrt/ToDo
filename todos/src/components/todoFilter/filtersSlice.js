import { createSelector, createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
})

export const fetchFilters = createAsyncThunk(
    'todos/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterCreated: (state, action) => {
            filtersAdapter.addOne(state, action.payload);
        },
        filterDeleted: (state, action) => {
            filtersAdapter.removeOne(state, action.payload);
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
                .addCase(fetchFilters.pending, state => {
                    state.filtersLoadingStatus = 'loading'
                })
                .addCase(fetchFilters.fulfilled, (state, action) => {
                    state.filtersLoadingStatus = 'idle';
                    filtersAdapter.setAll(state, action.payload);
                })
                .addCase(fetchFilters.rejected, state => {
                    state.filtersLoadingStatus = 'error'
                })
                .addDefaultCase(() => {})
    }
})

const {actions, reducer} = filtersSlice;

export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export const filteredTagSelector = createSelector(
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
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;