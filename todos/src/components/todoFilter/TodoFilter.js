import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { fetchFilters, activeFilterChanged } from './filtersSlice';
import { useGetTagQuery, useDeleteTagMutation } from '../../api/apiSlice';
import Spinner from '../../spinner/Spinner';

import FilterItem from '../filterItem/FilterItem';
import './TodoFilter.css';

const TodoFilter = () => {
    const {
        data: filters = [],
        isLoading,
        isError,
    } = useGetTagQuery();

    const [deleteTag] = useDeleteTagMutation();

    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filteredTags = useMemo(() => {
        const filteredTags = filters.slice();

        if(activeFilter === 'all') {
            return filters;
        } else {
            return filteredTags.filter(item => item.element === activeFilter);
        }
                // eslint-disable-next-line
    }, [filters, activeFilter]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        // Удаление персонажа по его id
        deleteTag(id);
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Failed for Loading</h5>
    }

    const renderTagFilter = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="to-do">
                    <h5 className="no-to-do">No tags!</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="filter-items">
                    <FilterItem {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderTagFilter(filteredTags);

    return (
        <div className="filter">
            <div className="filter-body">
                <h3 className="filter-text">Your tags</h3>
                    <TransitionGroup component="ul">
                        {elements}
                    </TransitionGroup>
                </div>
        </div>
    )
}

export default TodoFilter;
