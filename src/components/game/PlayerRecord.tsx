import { useState } from 'react';
import styles from '@/styles/Home.module.css';

interface PlayerRecordProps {
  readonly xRecord: number;
  readonly oRecord: number;
  readonly isXReady: boolean;
  readonly isOReady: boolean;
  readonly localPlayerType: string;
}

export default function PlayerRecord({ xRecord, oRecord, isXReady, isOReady, localPlayerType }: PlayerRecordProps) {
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const copyToClipboard = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div>
      <div className={`${styles.playerRecord}`}>Player Record</div>
      {isXReady && (
        <div className={`${styles.playerOneRec}`}>
          ✅ Player X {localPlayerType === 'X' ? '(You) : ' : '(Opponent): '} {xRecord}
        </div>
      )}
      {!isOReady && (
        <div className={`${styles.playerTwoRec}`}>
          ❌ Player O {localPlayerType === 'O' ? '(You): ' : '(Opponent): '}{' '}
          <button onClick={copyToClipboard} disabled={copySuccess}>
            Copy Invite Link
          </button>
        </div>
      )}
      {isOReady && (
        <div className={`${styles.playerTwoRec}`}>
          ✅ Player O {localPlayerType === 'O' ? '(You): ' : '(Opponent): '} {oRecord}
        </div>
      )}
      {copySuccess && <div>Invite link copied to clipboard!</div>}
    </div>
  );
}
