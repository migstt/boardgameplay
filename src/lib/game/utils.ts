interface Types {
    calculateWinner: (squareValue: string[], mBoardSizeCol: number, nBoardSizeRow: number, kWinningLength: number) => string | null;
}

export const calculateWinner: Types["calculateWinner"] = function (squares, mBoardSizeCol, nBoardSizeRow, kWinningLength) {
    const checkLineTictactoe = (a: number, b: number, c: number) => {
        return squares[a] && squares[a] === squares[b] && squares[a] === squares[c];
    };
    const checkLineGomoku = (a: number, b: number, c: number, d: number, e: number) => {
        return squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e];
    };
    // iterate through each square in the board
    for (let i = 0; i < mBoardSizeCol * nBoardSizeRow; i++) {
        const row = Math.floor(i / nBoardSizeRow);
        const col = i % nBoardSizeRow;
        // check for a winner in all directions, horizontal, vertical, and diagonals
        if (kWinningLength === 3) {
            if (
                (col <= nBoardSizeRow - kWinningLength && checkLineTictactoe(i, i + 1, i + (kWinningLength - 1))) || // Check horizontal
                (row <= mBoardSizeCol - kWinningLength && checkLineTictactoe(i, i + nBoardSizeRow, i + (kWinningLength - 1) * nBoardSizeRow)) || // Check vertical
                (col <= nBoardSizeRow - kWinningLength && row <= mBoardSizeCol - kWinningLength && checkLineTictactoe(i, i + nBoardSizeRow + 1, i + (kWinningLength - 1) * (nBoardSizeRow + 1))) || // Check diagonal top-left to bottom-right
                (col >= kWinningLength - 1 && row <= mBoardSizeCol - kWinningLength && checkLineTictactoe(i, i + nBoardSizeRow - 1, i + (kWinningLength - 1) * (nBoardSizeRow - 1))) // Check diagonal top-right to bottom-left
            ) {
                return squares[i]; // return the winning player ('X' or 'O')
            }
        } else if (kWinningLength === 5) {
            if (
                (col <= nBoardSizeRow - kWinningLength && checkLineGomoku(i, i + 1, i + 2, i + 3, i + 4)) || // Check horizontal
                (row <= mBoardSizeCol - kWinningLength && checkLineGomoku(i, i + nBoardSizeRow, i + 2 * nBoardSizeRow, i + 3 * nBoardSizeRow, i + 4 * nBoardSizeRow)) || // Check vertical
                (col <= nBoardSizeRow - kWinningLength && row <= mBoardSizeCol - kWinningLength && checkLineGomoku(i, i + nBoardSizeRow + 1, i + 2 * (nBoardSizeRow + 1), i + 3 * (nBoardSizeRow + 1), i + 4 * (nBoardSizeRow + 1))) || // Check diagonal top-left to bottom-right
                (col >= kWinningLength - 1 && row <= mBoardSizeCol - kWinningLength && checkLineGomoku(i, i + nBoardSizeRow - 1, i + 2 * (nBoardSizeRow - 1), i + 3 * (nBoardSizeRow - 1), i + 4 * (nBoardSizeRow - 1))) // Check diagonal top-right to bottom-left
            ) {
                return squares[i]; // return the winning player ('X' or 'O')
            }
        }
    }
    return null; // If no winner is found, return null
};

export function generateUniqueId() {
    return `${Date.now()}`;
}
