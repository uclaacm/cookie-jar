export function GameOver({ score, playAgain, viewInstructions }: { score: number, playAgain: () => void, viewInstructions: () => void }) {
  return (
    <>
      <h2>Game over</h2>
      <p>Final score: {score}</p>
      <p>Zombie cookies can come back if a website saves them secretly in backups! That&rsquo;s why privacy settings are important.</p>
      <button onClick={playAgain}>Play again</button>
      <button onClick={viewInstructions}>View instructions</button>
    </>
  );
}
