import { v4 as uuidv4 } from 'uuid';
import close from '../../assets/garbage.png';

import './FilterItem.css';

const FilterItem = (props) => {

    let tagClassName;

    switch (props.className) {
        case 'hover':
            tagClassName = 'hover-item';
            break;
        case 'active':
            tagClassName = 'active-item';
            break;
        default:
            tagClassName = 'item-list';
    }

    return (
            <li className={`filter-list ${tagClassName}`}>
                <div className="tag-body">
                    <button key={props.name}
                        id={props.name}
                        className={`tag-text ${props.btnClass}`}
                        onClick={props.onClick}>{props.label}</button>
                </div>
                <span onClick={props.onDelete} className="delete">x</span>
            </li>
    )
}

export default FilterItem;
