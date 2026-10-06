// Maps.jsx
import { useEffect, useState } from 'react';
import styles from '../style/Maps.module.css';

function Maps() {
  const [maps, setMaps] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMap, setSelectedMap] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://valorant-api.com/v1/maps");
        const result = await response.json();
        setMaps(result.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  function buscarMapa() {
    const mapaEncontrado = maps.find(
      (map) => map.displayName.toLowerCase() === search.toLowerCase()
    );

    if (mapaEncontrado) {
      setSelectedMap(mapaEncontrado);
    } else {
      alert("Mapa não encontrado!");
      setSelectedMap(null);
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.conteudoCentral}>
      <section className={styles.header}>
        <img
          className={styles.headerImg}
          src="https://www.exitlag.com/blog/wp-content/uploads/2024/12/valorant_maps.webp"
          alt="Mapas Valorant"
        />

        <div className={styles.linha}></div>

        <p>
          Existem 12 mapas no jogo, porém nos Campeonatos oficiais e na aba
          ranked do jogo há uma rotação de mapas que varia a cada season.
        </p>
      </section>

      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Digite o nome do mapa"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className={styles.button} onClick={buscarMapa}>
          Buscar Mapa
        </button>
      </div>
</div>
      {selectedMap && (
        <div className={styles.detalhesMapa}>
          <h2 className={styles.tituloMapa}>{selectedMap.displayName}</h2>
          <div className={styles.linha}></div>

          <img
            className={styles.imgDetalhe}
            src={selectedMap.splash}
            alt={selectedMap.displayName}
          />

          <p className={styles.detalhesTexto}>
            <strong>Coordenadas:</strong> {selectedMap.coordinates || "Não informadas"}
          </p>

          <p className={styles.detalhesTexto}>
            <strong>Descrição:</strong> {selectedMap.tacticalDescription || "Sem descrição disponível"}
          </p>
        </div>
      )}
    </main>
  );
}

export default Maps;