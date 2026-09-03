import { useState, useEffect } from "react";

export default function MeuComponente() {
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
                setRank(result.data);
            } catch (error) {
                console.error("Error:", error);
            }
        }
    
        fetchData();
        }, []);

function buscarRank() {
    const competitivetiersEncontrado = rank.find(
      (competitivetiers) =>
        competitivetiers.displayName.toLowerCase() === search.toLowerCase()
    );

    if (competitivetiersEncontrado) {
      setSelectedRank(competitivetiersEncontrado);
    } else {
      alert("competitive tiers não encontrado!");
      setSelectedRank(null);
    }
  }
  return (
    <>
    
      <div>
        <input
          type="text"
          placeholder="Digite o nome do RankselectedRanka"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={buscarRank}>
          Buscar RankselectedRanka
        </button>
      </div>

      {selectedRank && (
        <div>
          <h2>{selectedRank.displayName}</h2>

          <img
            src={selectedRank.splash}
            alt={selectedRank.displayName}
            width="800"
          />

          <p>
            <strong>Coordenadas:</strong>{" "}
            {selectedRank.coordinates}
          </p>

          <p>
            <strong>Descrição:</strong>{" "}
            {selectedRank.tacticalDescription}
          </p>
        </div>
      )}
    </>
  );
}