import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import CustomHead from '../../components/custom/CustomeHead'
import Board from '@/components/game/Board';
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    const matchid: string = uuidv4();

    const router = useRouter();
    const { id } = router.query;

    // check if match id is available before rendering the Board component
    const renderBoard = id !== undefined;

    return (
        <>
            <CustomHead title={'Tic Tac Toe'} />
            <main className={`${styles.main} ${inter.className}`}>
                <div className={styles.description}>
                    <Link href="/">
                        <p>
                            Home Page
                        </p>
                    </Link>
                    <Link href="/gomoku/[id]" as={`/gomoku/${matchid}`}>
                        <p>
                            Play Gomoku
                        </p>
                    </Link>
                </div>
                <div>
                    {renderBoard && (
                        <Board mBoardSizeCol={3} nBoardSizeRow={3} kWinningLength={3} matchId={id as string} />
                    )}
                </div>
            </main>
        </>
    )
}
