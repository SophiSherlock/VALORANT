import { useState } from "react";
import styles from "../style/Login.module.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha:password }),
    });

    // 1. AQUI É ONDE DECLARA A VARIÁVEL 'data'
    const data = await response.json();

    if (response.ok) {
      // 2. Agora o data.usuario.id existe e pode ser lido
      localStorage.setItem("userId", data.usuario.id);

      alert("Login realizado com sucesso!");
      
      // Se usar o useNavigate do react-router-dom para redirecionar:
      // navigate("/perfil");
    } else {
      alert(data.mensagem || "Erro ao fazer login!");
    }
  } catch (error) {
    console.error("Erro no login:", error);
    alert("Erro de conexão com o servidor.");
  }
}

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;