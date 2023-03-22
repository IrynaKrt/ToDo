import { useState } from 'react';
import { useCreateTodoMutation, useCreateTagMutation } from '../../api/apiSlice';
import { v4 as uuidv4 } from 'uuid';

import './TodoAddForm.css';

const TodoAddForm = (props) => {
    const [todoDescr, setTodoDescr] = useState('');
    const [ setTodoTag] = useState('');

    const [createTodo] = useCreateTodoMutation();
    const [createTag] = useCreateTagMutation();

    const onSubmitHandler = (e) => {
        e.preventDefault();


        const findTag = (item) => {
            if(item.includes('#')) {
                const tag = item.match(/\#\w+/)[0].slice(1); //eslint-disable-line
                console.log(tag);
                return tag;
            } else {
                return null;
            }
        }

        const compareTags = (newItem, oldItems) => {
            console.log(oldItems)
            if(oldItems !== {}) {
                let arr = [],
                res;
                for (const obj in oldItems) {
                    Object.values(obj).forEach((val) => {
                      arr.push(val);
                      console.log(val);
                    })
                }

                res = arr.filter(el => el !== newItem);
                if(res.length === oldItems.length) {
                    return true;
                }
                return false;
            }
        }

        const tag = findTag(todoDescr);


        const newTodo = {
            id: uuidv4(),
            description: todoDescr,
            tag: tag
        }

        const newTag = {
            id: tag,
            name: tag,
            label: `#${tag}`,
            className: "filter-item"
        }


        createTodo(newTodo).unwrap();
        if(newTag.name !== null || compareTags(newTag, props)) {
            createTag(newTag).unwrap();
            setTodoTag('');
        }

        setTodoDescr('');
    }

    const onSubmitKey = () => {
        onSubmitHandler();
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
                            onChange={(e) => setTodoDescr(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' ? onSubmitKey : null}
                            />

                        <button type="submit" className="btn-submit">Add To Do</button>
                    </div>
                </div>
        </form>
    )
}

export default TodoAddForm;