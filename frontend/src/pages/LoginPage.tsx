import { useState } from "react";
import { useTranslation } from "../i18n/useTranslation";
import LanguageSelector from "../components/LanguageSelector";
import "./LoginPage.css";
import AlertModal from "../components/AlertModal";

type LoginPageProps = {
  onLogin: (pseudo: string, password: string) => Promise<void>;
  onGoToRegister: () => void;
};

function LoginPage({ onLogin, onGoToRegister }: LoginPageProps) {
    const t = useTranslation();
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (pseudo.trim() === "" || password.trim() === "") {
            setError(t.login.intro);
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
                    : t.login.errorMessage
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <LanguageSelector />
        <main className="page login-page">
        <p className="page__eyebrow">{t.login.eyebrow}</p>
        <h1>{t.login.title}</h1>
        <p className="page__intro">
            {t.login.intro}
        </p>

            <form className="login-page__form" onSubmit={handleLogin}>
                <input
                    value={pseudo}
                    onChange={(event) => setPseudo(event.target.value)}
                    placeholder={t.login.placeholder_username}
                    disabled={isLoading}
                />

                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={t.login.placeholder_password}
                    disabled={isLoading}
                />

                <button className="button" type="submit" disabled={isLoading}>
                    
                    {isLoading ? t.login.submitting : t.login.submit}
                </button>
                <button type="button" className="login-page__register-link" onClick={onGoToRegister} disabled={isLoading}>
                    {t.login.redirection}
                </button>
            </form>

            {error && (
                <AlertModal
                    title= {t.login.errorTitle}
                    message={error}
                    onClose={() => setError(null)}
                    type="error"
                />
            )}
        </main>
        </>
    );
}

export default LoginPage;