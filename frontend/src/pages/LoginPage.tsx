import { useState } from "react";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "../i18n/useTranslation";
import "./LoginPage.css";

type LoginPageProps = {
  onLogin: (pseudo: string) => void;
};

function LoginPage({ onLogin }: LoginPageProps) {
    const t = useTranslation();
    const [pseudo, setPseudo] = useState("");

    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (pseudo.trim() === "") {
        return;
        }

        onLogin(pseudo.trim());
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
                placeholder={t.login.placeholder}
            />

            <button className="button" type="submit">{t.login.submit}</button>
            </form>
        </main>
        </>
    );
}

export default LoginPage;
