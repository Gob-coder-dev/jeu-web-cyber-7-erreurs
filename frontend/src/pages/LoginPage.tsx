import { useState } from "react";
import "./LoginPage.css";
import AlertModal from "../components/AlertModal";

type LoginPageProps = {
  onLogin: (pseudo: string, password: string) => Promise<void>;
  onGoToRegister: () => void;
};

function LoginPage({ onLogin, onGoToRegister }: LoginPageProps) {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (pseudo.trim() === "" || password.trim() === "") {
            setError("Veuillez entrer un pseudo et un mot de passe pour vous connecter.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await onLogin(pseudo.trim(), password.trim());
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Impossible de se connecter."
            );
        } finally {
            setIsLoading(false);
        }
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
                    disabled={isLoading}
                />

                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Entre ton mot de passe"
                    disabled={isLoading}
                />

                <button className="button" type="submit" disabled={isLoading}>
                    {isLoading ? "Connexion en cours..." : "Se connecter"}
                </button>
                <button type="button" className="login-page__register-link" onClick={onGoToRegister} disabled={isLoading}>
                    Pas encore de compte ? Inscrivez-vous
                </button>
            </form>

            {error && (
                <AlertModal
                    title="Erreur de connexion"
                    message={error}
                    onClose={() => setError(null)}
                    type="error"
                />
            )}
        </main>
    );
}

export default LoginPage;
