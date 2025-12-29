import { useState } from "react";

import { ActiveGame } from "./ActiveGame.tsx";
import { GameInstructions } from "./GameInstructions.tsx";
import { GameOver } from "./GameOver.tsx";
import { updateUserPoints } from "../../../utils/api";

enum GameState {
  Instructions,
  Active,
  GameOver
}

export function Game() {
  const [state, setState] = useState(GameState.Instructions);
  const [score, setScore] = useState(0);

  switch (state) {
    case GameState.Instructions:
      return <GameInstructions startGame={() => { setState(GameState.Active) }} />;
    case GameState.Active:
      // TODO: see the warning in the browser console that prints upon game over ("Warning: Cannot update a component (`Game`) while rendering a different component (`ActiveGame`).")
      return <ActiveGame gameOver={
        (finalScore) => {
          setState(GameState.GameOver);
          setScore(finalScore);
          // Save points when game ends
          if (finalScore > 0) {
            updateUserPoints(finalScore);
          }
        }
      } />;
    case GameState.GameOver:
      return <GameOver score={score} playAgain={() => { setState(GameState.Active) }} viewInstructions={() => { setState(GameState.Instructions) }} />;
  }
}
