import { useState } from "react";
import "./RegisterPage.css";

type RegisterPageProps = {
  onRegister: (pseudo: string, password: string) => void;
  onGoToLogin: () => void;
};

function RegisterPage({ onRegister, onGoToLogin }: RegisterPageProps) {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");

    function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (pseudo.trim() === "" || password.trim() === "") {
            alert("Entre un pseudo et un mot de passe pour vous inscrire.");
            return;
        }
        onRegister(pseudo.trim(), password.trim());
    }

    return (
        <main className="page login-page">
        <p className="page__eyebrow">Cyber 7 erreurs</p>
        <h1>Inscription</h1>
        <p className="page__intro">
            Entre un pseudo et un mot de passe pour vous inscrire.
        </p>
            <form className="login-page__form" onSubmit={handleRegister}>
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
                
                <button className="button" type="submit">S'inscrire</button>
                <button type="button" className="login-page__register-link" onClick={onGoToLogin}>
                    Vous avez déjà un compte ? Connectez-vous
                </button>
            </form>
            
        </main>
    );
}

export default RegisterPage;
