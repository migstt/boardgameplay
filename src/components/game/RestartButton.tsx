import styles from '@/styles/Home.module.css'


interface RestartButtonProps {
    readonly handleRestartClick: () => void;
}

export default function GameStatus({ handleRestartClick }: RestartButtonProps) {

    return (
        <button className={`${styles.restartGameButton}`} onClick={handleRestartClick}>
            Restart Game
        </button>
    );
}