import { formatDate } from '../../helpers/formatting'
import styles from './styles.module.css'
import { NavLink, Outlet } from "react-router-dom"
import assistant from '../../assets/assistant.jpg'

const Layout = () => {
    return (
        <>
        <header className={styles.header}>
            <p className={styles.title}>Мой персональный помощник</p>
            <div className={styles.wrapper}>
                <NavLink className={styles.link} to="/">Расходы</NavLink>
                <NavLink className={styles.link} to="/weather">Погода</NavLink>
                <NavLink className={styles.link} to="/words">Слова</NavLink>
            </div>
            <img className={styles.assistant} src={assistant} alt="Perdonal assistant" />
        </header>
        
        <main>
            <Outlet/>
        </main>

        <footer className={styles.footer}>
            <a className={styles.a} href="https://github.com/Rrilence/Personal_assistant">Rrilence/GitHub</a>
            <div>{formatDate(new Date())}</div>
        </footer>
        </>

    )
}

export default Layout