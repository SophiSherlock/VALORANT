import { Link } from "react-router-dom";
import styles from '../../style/Header.module.css';
const Header = () => {
    return(
<>
    <header className={styles.header}>
        <h1 className={styles.logo}>VALORANT</h1>

        <nav>
            <ul className={styles.navList}>
                <li>
                    <Link to="/Agents" className={styles.link}>Agentes</Link>
                </li>

                <li>
                    <a href="Mapas.html" className={styles.link}>Mapas</a>     
                </li>

                <li>
                    <a href="Times Brasileiros.html" className={styles.link}>Times Brasileiros</a>   
                </li>

                <li>
                    <Link to="/" className={styles.link}>Home</Link>
                </li>
            </ul>

        </nav>
    </header>
</>
    );
};
export default Header;