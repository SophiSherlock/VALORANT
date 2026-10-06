import styles from '../../style/Footer.module.css';
const Footer = () => {
    return(
<>
     <footer className={styles.footer}>

            <div className={styles.footerContainer}>

            <div className={styles.footerContainerTwo}>
                <div className={styles.logoContainer}>
                    <h2 className={styles.logo}>VALORANT</h2>
                    <p>DATABASE</p>
                </div>

                    <a href="/" className={styles.link}>Voltar ao topo</a>

            </div>

                <div className={styles.info}>
                    <p>Desenvolvido por Sophia</p>
                    <p className={styles.tech}>
                        React • JavaScript • Node.js • Express • MySQL
                    </p>
                </div>

            </div>

            <div className={styles.bottom}>
                <p>© 2026 Sophia Sherlock — Projeto acadêmico</p>
                <p>Não afiliado à Riot Games.</p>
            </div>

        </footer>
</>
    );
};
export default Footer;