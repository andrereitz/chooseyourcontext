import styles from './Intro.module.scss';

export function Intro(){
    return(
        <div className={`container app-box ${styles.Default}`}>
            <div className="column">
                <h2>Welcome</h2>
                <ul>
                    <li><a href="#class-style">Class Style</a></li>
                    <li><a href="#redux-style">Redux Style</a></li>
                    <li><a href="#hooks-style">Hooks Style</a></li>
                </ul>
            </div>
            <div className="column">
                <p>The React Context API is extremely useful and flexible.</p>
                <p>This flexibility sometimes comes with doubts on architecture and implementation strategies.</p>
                <p>This website suggests three strategies for Context API implementation that can be combined or modified according to the user preference.</p>
            </div>
        </div>
    )
}