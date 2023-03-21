import { v4 as uuidv4 } from 'uuid';
import close from '../../assets/garbage.png';

import './TodoItem.css';

const TodoItem = (props) => {
    
    let tagClassName;

    switch (props.tag) {
        case 'hover':
            tagClassName = 'hover-item';
            break;
        case 'active':
            tagClassName = 'active-item';
            break;
        default:
            tagClassName = 'item-list';
    }

    const id = uuidv4();

    return (
        <li className={`todo-list ${tagClassName}`}>
            <input type="checkbox" id={id} className='check'/>
            <label htmlFor={id}>
                <div className="item-body">
                    <p className="item-text">{props.description}</p>
                    <textarea required name="text" id="text"  placeholder="Type the notice" className="text-notice"/>
                </div>
                <span onClick={props.onDelete} className="close">
                    <button type="button" className="btn-close" aria-label="Close"><img src={close} alt="close" width="25" height="25"/></button>
                </span>
            </label>
        </li>
    )
}

export default TodoItem;