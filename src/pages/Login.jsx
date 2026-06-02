import { useState } from "react";
import styles from "../style/Login.module.css";

function Login() {
        const [nickname, setNickName] = useState("")
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        function handleSubmit(event) {
            event.preventDefault();
            
        }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h2>Login</h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="nickname">NickName</label>
                    <input
                        type="text"
                        id="nickname"
                        placeholder="Enter NickName"
                        onChange={e => setNickName(e.target.value)}
                    />
                </div>

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