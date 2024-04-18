import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import CustomHead from '../components/custom/CustomeHead'
import { v4 as uuidv4 } from 'uuid';

const matchidTicTac:string = uuidv4();
const matchidGomoku:string = uuidv4();

export default function Home() {
    return (
        <>
            <CustomHead title={'Home Page'}/>
            <main className={`${styles.main} ${inter.className}`}>
                <div className={styles.description}>
                    <Link href="/tic-tac-toe/[id]" as={`/tic-tac-toe/${matchidTicTac}`}>
                        <p>
                            Play Tic Tac Toe
                        </p>
                    </Link>
                    <Link href="/gomoku/[id]" as={`/gomoku/${matchidGomoku}`}>
                        <p>
                            Play Gomoku
                        </p>
                    </Link>
                </div>
                <div>
                    Migoy
                </div>
            </main>
        </>
    )
}
