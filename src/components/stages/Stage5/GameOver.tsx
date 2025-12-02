export function GameOver({ score, playAgain, viewInstructions }: { score: number, playAgain: () => void, viewInstructions: () => void }) {
  return (
    <>
      <h2>Game over</h2>
      <p>Final score: {score}</p>
      <button onClick={playAgain}>Play again</button>
      <button onClick={viewInstructions}>View instructions</button>
    </>
  );
}
