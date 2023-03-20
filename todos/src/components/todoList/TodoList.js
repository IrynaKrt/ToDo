import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { useGetTodosQuery, useDeleteTodoMutation} from '../../api/apiSlice';

import TodoItem from '../todoItem/TodoItem';

import './TodoList.css'
import Spinner from '../../spinner/Spinner';

const TodoList = () => {
    const {
        data: todos = [],
        isLoading,
        isError,
    } = useGetTodosQuery();

    const [deleteTodo] = useDeleteTodoMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);
    const filteredTodos = useMemo(() => {
        const filteredTodos = todos.slice();

        if(activeFilter === 'all') {
            return todos;
        } else {
            return filteredTodos.filter(item => item.element === activeFilter);
        }
                // eslint-disable-next-line
    }, [todos, activeFilter])

    const onDelete = useCallback((id) => {
        // Удаление персонажа по его id
        deleteTodo(id);
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="error">Failed for loading...</h5>
    }

    const renderTodosList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="to-do">
                    <h5 className="no-to-do">No to do!</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames="to-do">
                    <TodoItem {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderTodosList(filteredTodos);

    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default TodoList;