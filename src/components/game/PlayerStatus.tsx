import styles from '@/styles/Home.module.css';
import RestartButton from './RestartButton';

interface GameStatusProps {
    readonly winner: string | null;
    readonly isBoardFull: boolean;
    readonly currentPlayer: string;
    readonly handleRestartClick: () => void;
}

export default function GameStatus({
    winner,
    handleRestartClick,
    isBoardFull,
    currentPlayer,
}: GameStatusProps) {
    return (
        <div className={`${styles.gameStatus}`}>
            {winner && (
                <>
                    <div>Winner: Player {winner}</div>
                    <RestartButton handleRestartClick={handleRestartClick} />
                </>
            )}
            {!winner && isBoardFull && (
                <>
                    <div>No Winner, A Tie!</div>
                    <RestartButton handleRestartClick={handleRestartClick} />
                </>
            )}
            {!winner && !isBoardFull && (
                <>
                    <div className={`${styles.gameStatus}`}>
                        <div>Player {currentPlayer}&#39;s turn</div>
                    </div>
                </>
            )}
        </div>
    );
}
