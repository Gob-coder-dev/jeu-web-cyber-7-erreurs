import type { Score } from "../types/Score";
import "./LeaderBoardPage.css";
import { UserService } from "../services/userServices";

type LeaderBoardPageProps = {
    scores: Score[];
    currentPseudo: string;
    onBackHome: () => void;
};

function getRankClassName(rank: number) {
    const rankModifiers = [`leaderboard-rank--${rank}`];

    if (rank >= 4 && rank <= 12) {
        rankModifiers.push("leaderboard-rank--top-12");
    }

    return ["leaderboard-rank", ...rankModifiers].join(" ");
}

function LeaderBoardPage({scores,currentPseudo,onBackHome}: LeaderBoardPageProps) {
    const sortedScores = [...scores].sort((a, b) => b.score - a.score);
    const topScores = sortedScores.slice(0, 12);
    const currentPlayerIndex = sortedScores.findIndex(
        (score) => score.pseudo === currentPseudo
    );
    const currentPlayerScore =
        currentPlayerIndex === -1 ? null : sortedScores[currentPlayerIndex];
    const currentPlayerRank = currentPlayerIndex + 1;
    const shouldShowCurrentPlayerAside =
        currentPlayerScore !== null && currentPlayerRank > 12;

    function renderScoreRow(score: Score, rank: number) {
        const isCurrentPlayer = score.id === currentPlayerScore?.id;

        return (
            <li
                className={`leaderboard-row${
                    isCurrentPlayer ? " leaderboard-row--current" : ""
                }`}
                key={score.id}
            >
            <span className={getRankClassName(rank)}>
                {rank}
            </span>

            <span className="leaderboard-player">{score.pseudo}</span>

            <span className="leaderboard-score">{score.score} pts</span>

            <span className="leaderboard-date">
                {new Date(score.date).toLocaleDateString()}
            </span>
            </li>
        );
    }

    return (
        <main className="page__leaderboard-page">
        <h1>Classement</h1>
        <ol className="leaderboard-list">
        {topScores.map((score, index) => {
            const rank = index + 1;

            return renderScoreRow(score, rank);
        })}
        </ol>

        {shouldShowCurrentPlayerAside && (
            <section className="leaderboard-current-player">
                <h2>Votre position</h2>
                <ol className="leaderboard-list leaderboard-list--current">
                    {renderScoreRow(currentPlayerScore, currentPlayerRank)}
                </ol>
            </section>
        )}

        <button className="button button--primary" onClick={() => new UserService().clearUsers()}>
            Effacer le classement
        </button>
        
        <button className="button button--secondary" onClick={() => onBackHome()}>
            Retour à l'accueil
        </button>

        </main>
    );
}

export default LeaderBoardPage;
