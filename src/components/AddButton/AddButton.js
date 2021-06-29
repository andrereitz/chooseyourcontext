import styles from './AddButton.module.scss';

export const AddButton = ({clickAction, children}) => {
    return(
        <button className={styles.AddButton} onClick={() => clickAction()}>{children}</button>
    )
}