import styles from './ListItem.module.scss';
import PropTypes from 'prop-types';

export function ListItem({ todo, clickAction }){
    return(
        <li 
            className={`${styles.Default} ${todo.completed ? styles.Completed : ''}`}
        >
            <i className={todo.completed ? 'far fa-check-circle' : 'far fa-circle'} onClick={ () => clickAction(todo.id, !todo.completed) }></i>
            <p>{todo.title}</p>
        </li>
    )
}

ListItem.propTypes = {
    todo: PropTypes.object,
    clickAction: PropTypes.func.isRequired
}