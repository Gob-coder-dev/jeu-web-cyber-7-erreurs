import { useState } from "react";
import "./RegisterPage.css";
import AlertModal from "../components/AlertModal";
import PasswordCriteria from "../components/PasswordCriteria";

type RegisterPageProps = {
  onRegister: (pseudo: string, password: string) => Promise<void>;
  onGoToLogin: () => void;
};

function RegisterPage({ onRegister, onGoToLogin }: RegisterPageProps) {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (pseudo.trim() === "" || password.trim() === "") {
            setError("Veuillez entrer un pseudo et un mot de passe pour vous inscrire.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await onRegister(pseudo.trim(), password.trim());
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue lors de l'inscription.";
            if (errorMessage.includes("409")) {
                setError("Ce pseudo est déjà utilisé. Veuillez en choisir un autre.");
            } else {
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
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
                    disabled={isLoading}
                />

                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Entre ton mot de passe"
                    disabled={isLoading}
                />
                
                {password && <PasswordCriteria password={password} />}
                
                <button className="button" type="submit" disabled={isLoading}>
                    {isLoading ? "Inscription en cours..." : "S'inscrire"}
                </button>
                <button type="button" className="login-page__register-link" onClick={onGoToLogin} disabled={isLoading}>
                    Vous avez déjà un compte ? Connectez-vous
                </button>
            </form>

            {error && (
                <AlertModal
                    title="Erreur d'inscription"
                    message={error}
                    onClose={() => setError(null)}
                    type="error"
                />
            )}
        </main>
    );
}

export default RegisterPage;
