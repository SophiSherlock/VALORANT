import { useState, useEffect } from "react";
import styles from "../style/Perfil.module.css";

function Perfil() {
  const [rankList, setRankList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedRank, setSearchedRank] = useState(null);

  // Rank atual salvo no banco de dados
  const [userRank, setUserRank] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);

  // Pega o ID do usuário logado do localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. Busca os ranks da API do Valorant
        const responseValorant = await fetch(
          "https://valorant-api.com/v1/competitivetiers"
        );
        const resultValorant = await responseValorant.json();
        const ultimaVersao = resultValorant.data.at(-1);
        setRankList(ultimaVersao.tiers);

        // 2. Busca o rank atual do usuário no nosso backend
        if (userId) {
          const responseUser = await fetch(
            `http://localhost:3000/api/usuarios/${userId}`
          );
          if (responseUser.ok) {
            const userData = await responseUser.json();
            if (userData.rank) {
              setUserRank(userData.rank);
            }
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    fetchData();
  }, [userId]);

  function buscarRank() {
    const rankEncontrado = rankList.find(
      (tier) => tier.tierName?.toLowerCase() === search.trim().toLowerCase()
    );

    if (rankEncontrado) {
      setSearchedRank(rankEncontrado);
    } else {
      alert("Rank não encontrado!");
      setSearchedRank(null);
    }
  }

  // Função para salvar o rank no banco via PUT
  async function salvarMeuRank() {
    if (!userId) {
      alert("Você precisa estar logado para salvar seu rank!");
      return;
    }

    if (!searchedRank) return;

    setLoadingSave(true);

    try {
      const rankData = {
        tierName: searchedRank.tierName,
        iconUrl: searchedRank.largeIcon || searchedRank.smallIcon,
      };

      const response = await fetch(
        `http://localhost:3000/api/usuarios/${userId}/rank`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rank: rankData }),
        }
      );

      if (response.ok) {
        alert("Rank atualizado com sucesso!");
        setUserRank(rankData); // Atualiza o rank na tela
        setSearchedRank(null); // Limpa a busca
        setSearch("");
      } else {
        alert("Erro ao salvar rank no servidor.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoadingSave(false);
    }
  }

  return (
    <div className={styles.container}>
      {/* EXIBIÇÃO DO RANK ATUAL SALVO NO BANCO */}
      <div className={styles.recursosSection}>
        <h2 className={styles.subtitulo}>Meu Rank Atual</h2>
        <div className={styles.linha}></div>

        {userRank ? (
          <div className={styles.rankCard}>
            <h3 className={styles.cardTitulo}>{userRank.tierName}</h3>
            <img
              className={styles.rankIcone}
              src={userRank.iconUrl}
              alt={userRank.tierName}
            />
          </div>
        ) : (
          <p className={styles.cardTexto}>
            Nenhum rank definido. Pesquise abaixo para selecionar o seu!
          </p>
        )}
      </div>

      {/* ÁREA DE BUSCA */}
      <div className={styles.header} style={{ marginTop: "30px" }}>
        <h1 className={styles.tituloHome}>Alterar Rank</h1>
        <p className={styles.descricaoHero}>
          Pesquise o elo desejado e clique em "Salvar no meu Perfil".
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
            Buscar
          </button>
        </div>
      </div>

      {/* CARD DO RANK ENCONTRADO NA PESQUISA */}
      {searchedRank && (
        <div className={styles.rankCard}>
          <h3 className={styles.cardTitulo}>{searchedRank.tierName}</h3>
          <img
            className={styles.rankIcone}
            src={searchedRank.largeIcon || searchedRank.smallIcon}
            alt={searchedRank.tierName}
          />

          <button
            className={styles.buttonPrimary}
            style={{ marginTop: "20px" }}
            onClick={salvarMeuRank}
            disabled={loadingSave}
          >
            {loadingSave ? "Salvando..." : "Salvar como Meu Rank"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Perfil;