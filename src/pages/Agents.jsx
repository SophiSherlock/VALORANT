import { useEffect, useState, useRef } from 'react';
import styles from '../style/Agents.module.css';

function Agents() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const detalhesRef = useRef(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://valorant-api.com/v1/agents?isPlayableCharacter=true"
        );
        const result = await response.json();
        setAgents(result.data);
      } catch (error) {
        console.error("Erro:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {/* 👇 TÍTULO */}
      <h1 className={styles.titulo}>AGENTS</h1>

      {/* 👇 HEADER */}
      <header className={styles.header}>
        <p>
          O jogo tem atualmente 29 personagens de diferentes nacionalidades. Eles são divididos em 4 categorias: Iniciadores, Controladores, Sentilenas e Duelistas.
        </p>

        <p>
          <b>Iniciador</b> - Especialistas em quebrar a defesa do adversario, possibilitando a formação do time para o ataque. Eles possuem habilidades que os ajudam a desarmar a spike, cegar inimigos e pegar informações do mapa.
        </p>

        <p>
          <b>Controlador</b> - Garantem a entrada segura em regiões inimigas, na defesa impede avanços da equipe adversária. Suas habilidades consistem no bloqueio de visão por smokers ou paredes e dano em área. 
        </p>

        <p>
          <b>Sentinela</b> - Protegem e monitoram grandes áreas do mapa para que o time não sofra ataque infiltrado. Essa classe tem habilidades váriadas que vão desde paralisar inimigos até reviver um aliado. 
        </p>

        <p>
          <b>Duelista</b> - Estão presentes na linha de frente do combate, sendo responsavés por entrar na zona de perigo primeiro para conseguir abates e garantir a segurança do restante do time. Suas habilidades são relacionadas a mobilidade e proteção, visando uma efetiva movimentação. 
        </p>
      </header>

      {/* 👇 LINHA */}
      <div className={styles.linha}></div>

      <h2 className={styles.subtitulo}>Informações do agente</h2>

      {/* 🧩 LISTA */}
      <div className={styles.listaAgentes}>
        {agents.map((agent) => (
          <img
            key={agent.uuid}
            src={agent.displayIcon}
            className={styles.agentImg}
            onClick={() => {
  setSelectedAgent(agent);

  setTimeout(() => {
    detalhesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
}}
          />
        ))}
      </div>

      {/* 📌 DETALHES */}
      {selectedAgent && (
        <div ref={detalhesRef}  className={styles.detalhesAgente}>
          <p><strong>Nome:</strong> {selectedAgent.displayName}</p>
          <p><strong>Descrição:</strong> {selectedAgent.description}</p>
          <p><strong>Role:</strong> {selectedAgent.role?.displayName}</p>

          <img
            src={selectedAgent.fullPortrait || selectedAgent.displayIcon}
            className={styles.imgDetalhe}
          />

          {selectedAgent.abilities.map((ability, index) => (
            <div key={index}>
              <p><strong>{ability.displayName}:</strong></p>
              <p>{ability.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Agents;