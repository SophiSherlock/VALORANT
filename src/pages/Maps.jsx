import { useEffect, useState, useRef } from 'react';
import styles from '../style/Agents.module.css';

function Maps(){
    const [maps, setMaps] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedMap, setSelectedMap] = useState(null);

    useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(
                "https://valorant-api.com/v1/maps"
            );
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
      (map) =>
        map.displayName.toLowerCase() === search.toLowerCase()
    );

    if (mapaEncontrado) {
      setSelectedMap(mapaEncontrado);
    } else {
      alert("Mapa não encontrado!");
      setSelectedMap(null);
    }
  }
    
    return(
        <>
        <section>
        <img
          src="https://www.exitlag.com/blog/wp-content/uploads/2024/12/valorant_maps.webp"
          alt="Mapas Valorant"
          width="600"
        />

        <p>
          Existem 12 mapas no jogo, porém nos Campeonatos
          oficiais e na aba ranked do jogo há uma rotação
          de mapas que varia a cada season.
        </p>
      </section>

      <div>
        <input
          type="text"
          placeholder="Digite o nome do mapa"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={buscarMapa}>
          Buscar Mapa
        </button>
      </div>

      {selectedMap && (
        <div>
          <h2>{selectedMap.displayName}</h2>

          <img
            src={selectedMap.splash}
            alt={selectedMap.displayName}
            width="800"
          />

          <p>
            <strong>Coordenadas:</strong>{" "}
            {selectedMap.coordinates}
          </p>

          <p>
            <strong>Descrição:</strong>{" "}
            {selectedMap.tacticalDescription}
          </p>
        </div>
      )}
    </>
  );
}

export default Maps;