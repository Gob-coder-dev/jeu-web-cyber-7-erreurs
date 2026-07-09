import type { LeaderboardEntry, LeaderboardUserResult } from "../types/Leaderboard";
import LanguageSelector from "../components/LanguageSelector";
import "./LeaderBoardPage.css";

type LeaderBoardPageProps = {
    topScores: LeaderboardEntry[];
    currentLeaderboardUser: LeaderboardUserResult | null;
    onBackHome: () => void;
};

function getRankClassName(rank: number) {
    const rankModifiers = [`leaderboard-rank--${rank}`];

    if (rank >= 4 && rank <= 12) {
        rankModifiers.push("leaderboard-rank--top-12");
    }

    return ["leaderboard-rank", ...rankModifiers].join(" ");
}

function getCurrentPlayerAsideScore(
    currentLeaderboardUser: LeaderboardUserResult | null,
): LeaderboardEntry | null {
    if (
        currentLeaderboardUser?.hasPlayed !== true ||
        currentLeaderboardUser.rank === null ||
        currentLeaderboardUser.rank <= 12 ||
        currentLeaderboardUser.user === null
    ) {
        return null;
    }

    return {
        id: currentLeaderboardUser.user.id,
        pseudo: currentLeaderboardUser.user.pseudo,
        globalScore: currentLeaderboardUser.user.globalScore,
        rank: currentLeaderboardUser.rank,
    };
}

function LeaderBoardPage({
    topScores,
    currentLeaderboardUser,
    onBackHome,
}: LeaderBoardPageProps) {
    const currentPlayerAsideScore =
        getCurrentPlayerAsideScore(currentLeaderboardUser);

    function renderScoreRow(score: LeaderboardEntry) {
        const isCurrentPlayer = score.id === currentLeaderboardUser?.user?.id;

        return (
            <li
                className={`leaderboard-row${
                    isCurrentPlayer ? " leaderboard-row--current" : ""
                }`}
                key={score.id}
            >
                <span className={getRankClassName(score.rank)}>
                    {score.rank}
                </span>

                <span className="leaderboard-player">{score.pseudo}</span>

                <span className="leaderboard-score">
                    {score.globalScore} pts
                </span>
            </li>
        );
    }

    return (
        <>
        <LanguageSelector />
        <main className="page__leaderboard-page">
            <h1>Classement</h1>

            <ol className="leaderboard-list">
                {topScores.map((score) => renderScoreRow(score))}
            </ol>

            {currentPlayerAsideScore !== null && (
                <section className="leaderboard-current-player">
                    <h2>Votre position</h2>
                    <ol className="leaderboard-list leaderboard-list--current">
                        {renderScoreRow(currentPlayerAsideScore)}
                    </ol>
                </section>
            )}

            <button className="button button--secondary" onClick={onBackHome}>
                Retour a l'accueil
            </button>
        </main>
        </>
    );
}

export default LeaderBoardPage;
