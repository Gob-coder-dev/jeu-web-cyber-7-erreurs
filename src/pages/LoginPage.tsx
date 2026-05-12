import { useState } from "react";

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
        <main>
        <h1>Connexion</h1>

            <form onSubmit={handleLogin}>
            <input
                value={pseudo}
                onChange={(event) => setPseudo(event.target.value)}
                placeholder="Entre ton pseudo"
            />

            <button type="submit">Se connecter</button>
            </form>
        </main>
    );
}

export default LoginPage;