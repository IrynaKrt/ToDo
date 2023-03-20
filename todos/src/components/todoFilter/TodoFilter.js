import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store/store';

import {activeFilterChanged, fetchFilters, selectAll} from './filtersSlice';
import Spinner from '../../spinner/Spinner';

import './TodoFilter.css';

const TodoFilter = () => {
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    //обязательно с аргументом глобального стора!
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Failed for Loading</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Tags not found</h5>
        }

        // Данные в json-файле я расширил классами и текстом
        return arr.map(({name, className, label}) => {

            return <button
                        key={name}
                        id={name}
                        className={`${className}` + name === activeFilter ? 'active' : null}
                        onClick={() => dispatch(activeFilterChanged(name))}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="filter">
            <div className="filter-body">
                <h3 className="filter-text">Your tags</h3>
                <div className="filter-items">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default TodoFilter;
