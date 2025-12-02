export function GameInstructions({ startGame }: { startGame: () => void }) {
  // TODO
  return (
    <>
      <h2>Zombie cookie game</h2>
      <p>Instructions go here&hellip;</p>
      <button onClick={startGame}>Start game</button>
    </>
  );
}
