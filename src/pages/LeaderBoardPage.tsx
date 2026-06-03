import type { Score } from "../types/Score";
import { ScoreService } from "../services/scoreServices";
import "./LeaderBoardPage.css";

type LeaderBoardPageProps = {
    scores: Score[];
    onBackHome: () => void;
};

function getRankClassName(rank: number) {
    const rankModifiers = [`leaderboard-rank--${rank}`];

    if (rank >= 4 && rank <= 12) {
        rankModifiers.push("leaderboard-rank--top-12");
    }

    return ["leaderboard-rank", ...rankModifiers].join(" ");
}

function LeaderBoardPage({scores,onBackHome}: LeaderBoardPageProps) {

    return (
        <main className="page__leaderboard-page">
        <h1>Classement</h1>
        <ol className="leaderboard-list">
        {[...scores].sort((a, b) => b.score - a.score).map((score, index) => {
            const rank = index + 1;

            return (
            <li className="leaderboard-row" key={score.id}>
            <span className={getRankClassName(rank)}>
                {rank}
            </span>

            <span className="leaderboard-player">{score.pseudo}</span>

            <span className="leaderboard-score">{score.score} pts</span>

            <span className="leaderboard-date">
                {new Date(score.date).toLocaleDateString()}
            </span>
            </li>
        )})}
        </ol>

        <button className="button button--primary" onClick={() => new ScoreService().clearScores()}>
            Effacer le classement
        </button>
        
        <button className="button button--secondary" onClick={() => onBackHome()}>
            Retour à l'accueil
        </button>

        </main>
    );
}

export default LeaderBoardPage;
