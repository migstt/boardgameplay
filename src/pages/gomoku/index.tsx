import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import CustomHead from '../../components/custom/CustomeHead'
import Board from '@/components/game/Board';
import { useRouter } from 'next/router'
import { generateUniqueId } from '@/lib/game/utils'

export default function Home() {
    const router = useRouter();
    const { id } = router.query;

    // check if match id is available before rendering the Board component
    const renderBoard = id !== undefined;

    return (
        <>
            <CustomHead title={'Gomoku'} />
            <main className={`${styles.main} ${inter.className}`}>
                <div className={styles.description}>
                    <Link href="/">
                        <p>
                            Home Page
                        </p>
                    </Link>
                    <Link href="/tic-tac-toe/[id]" as={`/tic-tac-toe/${generateUniqueId()}`}>
                        <p>
                            Play Tic Tac Toe
                        </p>
                    </Link>
                </div>
                <div>
                    {renderBoard && (
                        <Board mBoardSizeCol={15} nBoardSizeRow={15} kWinningLength={5} matchId={id as string}/>
                    )}
                </div>
            </main>
        </>
    )
}
