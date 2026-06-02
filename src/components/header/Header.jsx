import { Link } from "react-router-dom";
import styles from '../../style/Header.module.css';
import logo from '../../../img/valorant-logo-iu.png'
const Header = () => {
    return(
<>
    <header className={styles.header}>

        <div className={styles.logoContainer}>
        <img src={logo} alt="Valorant-logo" className={styles.logoImg} />

        <h1 className={styles.logo}>VALORANT</h1>
        </div>


        <nav>
            <ul className={styles.navList}>
                <li>
                    <Link to="/Agents" className={styles.link}>Agentes</Link>
                </li>

                <li>
                    <Link to="Maps" className={styles.link}>Mapas</Link>     
                </li>

                <li>
                    <Link to="/Login" className={styles.link}>Entrar</Link>
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