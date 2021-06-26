import { Fragment } from 'react';
import styles from './Loader.module.scss';

export const Loader = ({ useContainer = true, loadingText }) => {
    
    const loader = (
        <div className={ styles.Default }>{ loadingText }</div>
    )

    return(
        <Fragment>
            {
                useContainer 
                    ?
                        <div className={ styles.Container }>{ loader }</div>
                    :
                        loader
            }
        </Fragment>
    )
}
