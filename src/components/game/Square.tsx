import styles from '@/styles/Home.module.css';

interface SquareProps {
    readonly squareValue: string;
    readonly onClickSquare: () => void;
    readonly mBoardSizeCol: number;
    readonly nBoardSizeRow: number;
    readonly isHighlighted: boolean; // Add this prop
}

export default function Square({ squareValue, onClickSquare, mBoardSizeCol, nBoardSizeRow, isHighlighted }: SquareProps) {
    return (
        <>
            {(mBoardSizeCol === 3 && nBoardSizeRow === 3) ? (
                <button
                    className={`${styles.tictacbutton} ${isHighlighted ? styles.highlightedSquare : ''}`}
                    onClick={onClickSquare}
                >
                    {squareValue}
                </button>
            ) : (mBoardSizeCol === 15 && nBoardSizeRow === 15) ? (
                <button
                    className={`${styles.gomokubutton} ${isHighlighted ? styles.highlightedSquare : ''}`}
                    onClick={onClickSquare}
                >
                    {squareValue}
                </button>
            ) : null}
        </>
    );
}

