
import { useState, useEffect } from "react";
import styles from "../style/Perfil.module.css";

function Rank() {
  const [rank, setRank] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRank, setSelectedRank] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://valorant-api.com/v1/competitivetiers"
        );
        const result = await response.json();

        // Pega os elos do episódio/versão mais recente
        const ultimaVersao = result.data.at(-1);
        setRank(ultimaVersao.tiers);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  function buscarRank() {
    const rankEncontrado = rank.find(
      (tier) => tier.tierName?.toLowerCase() === search.trim().toLowerCase()
    );

    if (rankEncontrado) {
      setSelectedRank(rankEncontrado);
    } else {
      alert("Rank não encontrado!");
      setSelectedRank(null);
    }
  }

  return (
    <div className={styles.container}>
      {/* HEADER E BUSCA */}
      <div className={styles.header}>
        <h1 className={styles.tituloHome}>Consultar Ranks</h1>
        <div className={styles.linha}></div>
        <p className={styles.descricaoHero}>
          Pesquise pelo nome do elo para visualizar o emblema oficial do Valorant.
        </p>

        <div className={styles.buscaContainer}>
          <input
            className={styles.inputBusca}
            type="text"
            placeholder="Digite o nome (ex: Gold 1, Radiant)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscarRank()}
          />

          <button className={styles.buttonPrimary} onClick={buscarRank}>
            Buscar Rank
          </button>
        </div>
      </div>

      {/* RESULTADO DA BUSCA */}
      {selectedRank && (
        <div className={styles.rankCard}>
          <h2 className={styles.cardTitulo}>{selectedRank.tierName}</h2>

          <img
            className={styles.rankIcone}
            src={selectedRank.largeIcon || selectedRank.smallIcon}
            alt={selectedRank.tierName}
          />
        </div>
      )}
    </div>
  );
}

export default Rank;