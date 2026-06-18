import { useState } from "react";
import "./LoginPage.css";

type LoginPageProps = {
  onLogin: (pseudo: string) => void;
};

function LoginPage({ onLogin }: LoginPageProps) {
    const [pseudo, setPseudo] = useState("");

    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (pseudo.trim() === "") {
        return;
        }

        onLogin(pseudo.trim());
    }

    return (
        <main className="page login-page">
        <p className="page__eyebrow">Cyber 7 erreurs</p>
        <h1>Connexion</h1>
        <p className="page__intro">
            Entre un pseudo pour lancer la manche de sensibilisation.
        </p>

            <form className="login-page__form" onSubmit={handleLogin}>
            <input
                value={pseudo}
                onChange={(event) => setPseudo(event.target.value)}
                placeholder="Entre ton pseudo"
            />

            <button className="button" type="submit">Se connecter</button>
            </form>
        </main>
    );
}

export default LoginPage;
