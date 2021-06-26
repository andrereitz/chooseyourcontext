import Logo from '../../assets/svg/logo.svg';
import styles from './Header.module.scss';

export function Header(){
    return(
        <header className={ styles.Default }>
            <img src={ Logo } alt="App logo" />
        </header>
    )
}