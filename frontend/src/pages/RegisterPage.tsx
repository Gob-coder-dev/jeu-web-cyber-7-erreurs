import { useState } from "react";
import { useTranslation } from "../i18n/useTranslation";
import "./RegisterPage.css";
import AlertModal from "../components/AlertModal";
import PasswordCriteria from "../components/PasswordCriteria";
import LanguageSelector from "../components/LanguageSelector";


type RegisterPageProps = {
  onRegister: (pseudo: string, password: string) => Promise<void>;
  onGoToLogin: () => void;
};

function RegisterPage({ onRegister, onGoToLogin }: RegisterPageProps) {
    const t = useTranslation();
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (pseudo.trim() === "" || password.trim() === "") {
            setError(t.register.missingFields);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            await onRegister(pseudo.trim(), password.trim());
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : t.register.genericError
            );
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <LanguageSelector />
        <main className="page login-page">
        <p className="page__eyebrow">{t.register.eyebrow}</p>
        <h1>{t.register.title}</h1>
        <p className="page__intro">
            {t.register.intro}
        </p>
            <form className="login-page__form" onSubmit={handleRegister}>
                <input
                    value={pseudo}
                    onChange={(event) => setPseudo(event.target.value)}
                    placeholder={t.register.placeholder_username}
                    disabled={isLoading}
                />

                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={t.register.placeholder_password}
                    disabled={isLoading}
                />
                
                {password && <PasswordCriteria password={password} />}
                
                <button className="button" type="submit" disabled={isLoading}>
                    {isLoading ? t.register.submitting : t.register.submit}
                </button>
                <button type="button" className="login-page__register-link" onClick={onGoToLogin} disabled={isLoading}>
                    {t.register.redirection}
                </button>
            </form>

            {error && (
                <AlertModal
                    title={t.register.modalTitle}
                    message={error}
                    onClose={() => setError(null)}
                    type="error"
                />
            )}
        </main>
        </>
    );
}

export default RegisterPage;
