import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import close from '../../assets/garbage.png';

import './TodoItem.css';

const TodoItem = (props) => {
    const [todoNotice, setTodoNotice] = useState("Type the notice" );

    const id = uuidv4();

    return (
        <li className={`todo-list item-list ${props.tag}`}>
            <input type="checkbox" id={id} className='check'/>
            <label htmlFor={id}>
                <div className="item-body">
                    <p className="item-text">{props.description}</p>
                    <textarea required
                              name="text"
                              id="text"
                              placeholder={todoNotice}
                              className="text-notice"
                              onChange={(e) => setTodoNotice(e.target.value)}/>
                </div>
                <span onClick={props.onDelete} className="close">
                    <button type="button" className="btn-close" aria-label="Close"><img src={close} alt="close" width="25" height="25"/></button>
                </span>
            </label>
        </li>
    )
}

export default TodoItem;