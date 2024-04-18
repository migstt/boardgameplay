import React, { useState, useEffect } from "react";
import styles from '@/styles/Home.module.css'
import Square from "./Square";
import GameStatus from "./GameStatus";
import PlayerRecord from "./PlayerRecord";
import { calculateWinner } from "@/lib/game/utils";
import { setDoc, doc, onSnapshot, getDoc, updateDoc, increment, FieldValue } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

interface BoardTypes {
    handleSquareClick: (index: number) => void;
    handleRestartClick: () => void;
    calculateWinner: (squareValue: string[], mBoardSizeCol: number, nBoardSizeRow: number, kWinningLength: number) => string | null;
}
interface BoardProps {
    mBoardSizeCol: number;
    nBoardSizeRow: number;
    kWinningLength: number;
    matchId: string,
}
type Player = {
    xRecord: number;
    oRecord: number;
    type: 'X' | 'O';
    isMoveAllowed: boolean;
    isXReady?: boolean;
    isOReady?: boolean;
};
type GameDocument = {
    player1: Player;
    player2: Player;
    currentPlayer: 'X' | 'O';
    squares: Array<string | null>;
    winner: string | null;
    matchId: string;
    latestClickedSquare: number | null;
    isHighlighting: boolean;
};
type PlayerType = "X" | "O";

export default function Board({ mBoardSizeCol, nBoardSizeRow, kWinningLength, matchId }: BoardProps) {

    const [xRecord, setXRecord] = useState<number>(0);
    const [oRecord, setORecord] = useState<number>(0);
    const [currentPlayer, setCurrentPlayer] = useState<PlayerType>('X')
    const [isXAllowedToMove, setIsXAllowedToMove] = useState<boolean>(false);
    const [isOAllowedToMove, setIsOAllowedToMove] = useState<boolean>(false);
    const [squareValue, setSquareValue] = useState<string[]>(Array(mBoardSizeCol * nBoardSizeRow).fill(null));
    const [latestClickedSquare, setLatestClickedSquare] = useState<number | null>(null);
    const [isHighlighting, setIsHighlighting] = useState<boolean>(false);
    const [isXReady, setIsXReady] = useState<boolean>(true);
    const [isOReady, setIsOReady] = useState<boolean>(false);
    const [localPlayerType, setLocalPlayerType] = useState<PlayerType>('X');

    useEffect(() => {
        const initializeGame = async () => {
            // get a reference to the game document in the firestore database using matchid
            const gameDocRef = doc(db, 'games', matchId);
            // try to fetch the existing game document from the database
            const gameDoc = await getDoc(gameDocRef);
            // check if the game document exists
            if (gameDoc.exists()) {
                // update the document, add the player 2 or O id
                await updateDoc(gameDocRef, {
                    "player2.isOReady": true,
                } as Partial<GameDocument>);
                // set up a listener to get real-time updates on the existing game document
                const listener = onSnapshot(gameDocRef, (snapshot) => {
                    const gameData = snapshot.data();
                    if (gameData) {
                        setCurrentPlayer(gameData.currentPlayer);
                        setSquareValue(gameData.squares);
                        setIsOAllowedToMove(gameData.player2.isMoveAllowed);
                        setXRecord(gameData.player1.xRecord);
                        setORecord(gameData.player2.oRecord);
                        setIsXReady(gameData.player1.isXReady);
                        setIsOReady(gameData.player2.isOReady);
                        setLocalPlayerType(gameData.player2.type)
                        // check if the opponent's latest move is different from the local state
                        if (gameData.latestClickedSquare !== latestClickedSquare) {
                            setLatestClickedSquare(gameData.latestClickedSquare);
                            setIsHighlighting(true);
                            setTimeout(() => {
                                setIsHighlighting(false);
                            }, 2000);
                        }
                    }
                });
                return () => listener();
            } else {
                // create new game document
                await setDoc(gameDocRef, {
                    "player1": { "xRecord": xRecord, "type": 'X', "isMoveAllowed": true, "isXReady": isXReady },
                    "player2": { "oRecord": oRecord, "type": 'O', "isMoveAllowed": false, "isOReady": isOReady },
                    "currentPlayer": 'X',
                    "squares": Array(mBoardSizeCol * nBoardSizeRow).fill(null),
                    "winner": null,
                    "matchId": matchId,
                    "latestClickedSquare": null,
                    "isHighlighting": false,
                } as GameDocument);
                // set up a listener for the newly created game document
                const listener = onSnapshot(gameDocRef, (snapshot) => {
                    const gameData = snapshot.data();
                    if (gameData) {
                        setCurrentPlayer(gameData.currentPlayer);
                        setSquareValue(gameData.squares);
                        setIsXAllowedToMove(gameData.player1.isMoveAllowed);
                        setXRecord(gameData.player1.xRecord);
                        setORecord(gameData.player2.oRecord);
                        setIsXReady(gameData.player1.isXReady);
                        setIsOReady(gameData.player2.isOReady);
                        setLocalPlayerType(gameData.player1.type)
                        if (gameData.latestClickedSquare !== latestClickedSquare) {
                            setLatestClickedSquare(gameData.latestClickedSquare);
                            setIsHighlighting(true);
                            setTimeout(() => {
                                setIsHighlighting(false);
                            }, 2000);
                        }
                    }
                });
                return () => listener();
            }
        };
        // call the initializeGame function when the component mounts or when dependencies change
        initializeGame();
    }, []);


    const handleSquareClick: BoardTypes["handleSquareClick"] = async function (index) {
        const gameDocRef = doc(db, 'games', matchId);
        // check if both players are ready
        if (!isXReady || !isOReady) {
            return;
        }
        // check if the square is already filled or there is a winner
        if (squareValue[index] != null || calculateWinner(squareValue, mBoardSizeCol, nBoardSizeRow, kWinningLength)) {
            return;
        }
        // check if the current player is allowed to make a move
        if ((currentPlayer === 'X' && !isXAllowedToMove) || (currentPlayer === 'O' && !isOAllowedToMove)) {
            return;
        }

        const nextSquares = squareValue.slice();
        nextSquares[index] = currentPlayer;

        const winner: string | null = calculateWinner(nextSquares, mBoardSizeCol, nBoardSizeRow, kWinningLength);

        try {
            const updateGameData: { [key: string]: string[] | string | boolean | number | null | FieldValue } = {
                "squares": nextSquares,
                "currentPlayer": currentPlayer === 'X' ? 'O' : 'X',
                "player1.isMoveAllowed": currentPlayer === 'X' ? false : true,
                "player2.isMoveAllowed": currentPlayer === 'O' ? false : true,
                "winner": winner,
                "latestClickedSquare": index,
            };
            // if there's a winner, update updateGameData player object
            if (winner === 'X') {
                updateGameData["player1.xRecord"] = increment(1);
            } else if (winner === 'O') {
                updateGameData["player2.oRecord"] = increment(1);
            }
            await updateDoc(gameDocRef, updateGameData);
        } catch (error) {
            console.error('error updating game document: ', error);
        }
    };

    const winner = calculateWinner(squareValue, mBoardSizeCol, nBoardSizeRow, kWinningLength);

    let isBoardFull: boolean = true;

    for (let i = 0; i < squareValue.length; i++) {
        if (squareValue[i] === null) {
            isBoardFull = false;
            break;
        }
    }

    const handleRestartClick: BoardTypes["handleRestartClick"] = async () => {
        setSquareValue(Array(mBoardSizeCol * nBoardSizeRow).fill(null));
        setCurrentPlayer('X');
        // get a reference to the game document in the firestore database using matchid
        const gameDocRef = doc(db, 'games', matchId);
        try {
            // reset the game state in Firestore
            await updateDoc(gameDocRef, {
                "player1.isMoveAllowed": true,
                "player2.isMoveAllowed": false,
                "currentPlayer": 'X',
                "squares": Array(mBoardSizeCol * nBoardSizeRow).fill(null),
                "winner": null,
            });
        } catch (error) {
            console.error('error resetting game in Firestore: ', error);
        }
    };


    const row: (null | undefined)[] = Array(mBoardSizeCol).fill(null)
    const col: (null | undefined)[] = Array(nBoardSizeRow).fill(null)

    return (
        <div className={`${styles.tictacboard}`}>
            <PlayerRecord 
                xRecord={xRecord} 
                oRecord={oRecord} 
                isXReady={isXReady} 
                isOReady={isOReady} 
                localPlayerType={localPlayerType}
            />
            <GameStatus
                winner={winner}
                handleRestartClick={handleRestartClick}
                isBoardFull={isBoardFull}
                currentPlayer={currentPlayer}
            />
            {row.map((rowElement, rowIndex) => (
                <div key={rowIndex} className={`${styles.tictacboardrow}`}>
                    {col.map((colElement, colIndex) => {
                        const index = rowIndex * nBoardSizeRow + colIndex;
                        return (
                            <Square
                                key={index}
                                squareValue={squareValue[index]}
                                onClickSquare={() => handleSquareClick(index)}
                                mBoardSizeCol={mBoardSizeCol}
                                nBoardSizeRow={nBoardSizeRow}
                                isHighlighted={isHighlighting && latestClickedSquare === index}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    )
}