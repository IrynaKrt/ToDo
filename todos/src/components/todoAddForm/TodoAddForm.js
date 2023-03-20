import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCreateTodoMutation } from '../../api/apiSlice';
import { v4 as uuidv4 } from 'uuid';
import store from '../../store/store';

import './TodoAddForm.css';

const TodoAddForm = () => {
    const [todoDescr, setTodoDescr] = useState('');
    const [todoTag, setTodoTag] = useState('');

    const [createTodo] = useCreateTodoMutation();

    // const {filtersLoadingStatus} = useSelector(state => state.filters);
    // const filters = selectAll(store.getState());

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const newTodo = {
            id: uuidv4(),
            description: todoDescr,
            tag: todoTag
        }


        createTodo(newTodo).unwrap(); //чтобы сущности не ломались

        setTodoDescr('');
        setTodoTag('');
    }

    // const renderFilters = (filters, status) => {
    //     if (status === "loading") {
    //         return <option>Loaging</option>
    //     } else if (status === "error") {
    //         return <option>Failed to Loading</option>
    //     }

    //     if (filters && filters.length > 0 ) {
    //         return filters.map(({name, label}) => {
    //             // eslint-disable-next-line
    //             return <option key={name} value={name}>{label}</option>
    //         })
    //     }
    // }

    return (
        <form className="create-to-do" onSubmit={onSubmitHandler}>
            <div className="form-body">
                <label htmlFor="text" className="form-item">Create to do</label>
                    <div className="form-action">
                        <textarea
                            required
                            name="text"
                            className="form-control"
                            id="text"
                            placeholder="I will to do..."
                            value={todoDescr}
                            onChange={(e) => setTodoDescr(e.target.value)}/>

                        <button type="submit" className="btn-submit">Add To Do</button>
                    </div>
                </div>
        </form>
    )
}

export default TodoAddForm;