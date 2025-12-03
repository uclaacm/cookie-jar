export function GameInstructions({ startGame }: { startGame: () => void }) {
  // TODO
  return (
    <div className="instructions">
      <h2>Zombie cookie game</h2>
      <p>As a privacy-conscious user, you delete cookies from websites you don&rsquo;t trust to prevent them from identifying you. However, some trackers use a technique called <em>zombie cookies</em>, where they use another method of data storage to re-create cookies after you delete them, thus retaining the information they have about you.</p> {/* TODO: make sure this is true and not misleading. e.g. do privacy regulations ban websites from using zombie cookies now? */}
      <p>Your goal is to prevent the zombie cookies from reaching you. To do this, click on cookies to delete them. After you click on a cookie, it will temporarily turn into a tombstone. After 3 seconds, the tombstone will transform back into a zombie cookie, and you will have to click on the zombie cookie again to get rid of it for good.</p>
      <button onClick={startGame}>Start game</button>
    </div>
  );
}
