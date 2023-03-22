import './FilterItem.css';

const FilterItem = (props) => {

    return (
            <li className={`filter-list item-list ${props.name}`}>
                <div className="tag-body">
                    <button key={props.name}
                        id={props.name}
                        className={`tag-btn ${props.name}`}
                        onClick={props.onClick}>{props.label}</button>
                </div>
                <span onClick={props.onDelete} className="delete">x</span>
            </li>
    )
}

export default FilterItem;
