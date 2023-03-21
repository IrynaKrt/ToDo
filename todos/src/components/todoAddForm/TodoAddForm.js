import { useState } from 'react';
import { useCreateTodoMutation, useCreateTagMutation } from '../../api/apiSlice';
import { v4 as uuidv4 } from 'uuid';

import TodoFilter from '../todoFilter/TodoFilter';
import './TodoAddForm.css';

const TodoAddForm = () => {
    const [todoDescr, setTodoDescr] = useState('');
    const [todoTag, setTodoTag] = useState('');

    const [createTodo] = useCreateTodoMutation();
    const [createTag] = useCreateTagMutation();

    // const {filtersLoadingStatus} = useSelector(state => state.filters);
    // const filters = selectAll(store.getState());

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const findTag = (item) => {
            if(item.includes('#')) {
                const tag = item.match(/\#\w+/)[0].slice(1, -1);
                console.log(tag);
                return tag;
            } else {
                return null;
            }
        }

        const tag = findTag(todoDescr);


        const newTodo = {
            id: uuidv4(),
            description: todoDescr
        }

        const newTag = {
            id: tag,
            name: tag,
            label: `#${tag}`,
            className: "filter-item"
        }


        createTodo(newTodo).unwrap(); //чтобы сущности не ломались
        if(newTag.name !== null) {
            createTag(newTag).unwrap();
        }

        setTodoDescr('');
        setTodoTag('');
    }

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