import { useState } from "react";
import "./LoginPage.css";

type LoginPageProps = {
  onLogin: (pseudo: string, password: string) => void;
  onGoToRegister: () => void;
};

function LoginPage({ onLogin, onGoToRegister }: LoginPageProps) {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");

    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (pseudo.trim() === "" || password.trim() === "" ) {
            alert("Entre un pseudo et un mot de passe pour lancer la manche de sensibilisation.");
            return;
        }

        onLogin(pseudo.trim(), password.trim());
    }

    return (
        <main className="page login-page">
        <p className="page__eyebrow">Cyber 7 erreurs</p>
        <h1>Connexion</h1>
        <p className="page__intro">
            Entre un pseudo et un mot de passe pour lancer la manche de sensibilisation.
        </p>

            <form className="login-page__form" onSubmit={handleLogin}>
                <input
                    value={pseudo}
                    onChange={(event) => setPseudo(event.target.value)}
                    placeholder="Entre ton pseudo"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Entre ton mot de passe"
                />

                <button className="button" type="submit">Se connecter</button>
                <button type="button" className="login-page__register-link" onClick={onGoToRegister}>
                    Pas encore de compte ? Inscrivez-vous
                </button>
            </form>
        </main>
    );
}

export default LoginPage;
