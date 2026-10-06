import { Link } from "react-router-dom";
import styles from "../style/Home.module.css";
import icon from '../../img/home-icon.png';


const Home = () => {
    return(
<>
<main>
<div className={styles.container}>
      <div className={styles.conteudoCentral}>
        
        {/* HERO SECTION */}
        <header className={styles.header}>
          <h1 className={styles.tituloHome}>BEM-VINDO AO VALORANT WEB</h1>
          <div className={styles.linha}></div>
          <p className={styles.descricaoHero}>
            Veja informações completas sobre os agentes e mapas. 
            Crie sua conta para salvar seu rank, agentes e mapas favoritos!
          </p>
          
          <div className={styles.ctaGroup}>
          </div>
        </header>

        {/*Links */}

        <section className={styles.cardsGrid}>
          
          <div className={styles.card}>
            <h2 className={styles.cardTitulo}>AGENTES</h2>
            <p className={styles.cardTexto}>
              Conheça as habilidades, funções e detalhes de cada agente para dominar as partidas.
            </p>

              <Link to="/Agents"
              className={styles.link}>Ver Agentes
              </Link>
            
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitulo}>MAPAS</h2>
            <p className={styles.cardTexto}>
              Explore os cenários, localizações e estratégias de cada mapa do jogo.
            </p>
        
             <Link to="Maps"
              className={styles.link}>Ver Mapas
             </Link>
            
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitulo}>MEU PERFIL</h2>

            <p className={styles.cardTexto}>
              Acompanhe seu desempenho, salve seu rank atual e personalize seus favoritos.
            </p>
       
            <Link to="/Perfil"
            className={styles.link}>Ver Perfil
            </Link>
            
          </div>

        </section>

        {/* SEÇÃO DE BENEFÍCIOS / RECURSOS DA CONTA */}
        <section className={styles.recursosSection}>
          <h2 className={styles.subtitulo}>POR QUE CRIAR UMA CONTA?</h2>
          <div className={styles.linha}></div>
          
          <div className={styles.recursosContainer}>

            <div className={styles.recursoItem}>
              <img
              src={icon}
              className={styles.icon}/>

              <h3>Gerencie seu Rank</h3>

              <p>Mantenha seu elo atualizado no perfil e mostre sua evolução.</p>
            </div>

            <div className={styles.recursoItem}>
              <span className={styles.icone}>⭐</span>

              <h3>Agentes Favoritos</h3>

              <p>Guarde seus mono-champions e agentes principais em um só lugar.</p>
            </div>

            <div className={styles.recursoItem}>
              <span className={styles.icone}>🗺️</span>

              <h3>Mapas Preferidos</h3>

              <p>Mantenha acessíveis os mapas onde você tem os melhores setups.</p>
            </div>
          </div>
        </section>

      </div>
    </div>
</main>
</>
    );
};
export default Home;