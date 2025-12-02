import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import "../../styles/Stage5.scss";

// TODO: names; also think about how to properly determine these (maybe use viewport units)
const STARTING_DISTANCE = 1024;
// TODO: make it behave well when the window resizes
const SCALING_FACTOR = 100/STARTING_DISTANCE/2;
const ORIGIN_X = 50;
const ORIGIN_Y = 50;

// how close a zombie can get to the player before the player loses a life
// TODO: name (really is the min zombie distance before the zombie & player get removed)
// TODO: how to match this up with the displayed size in the CSS?
const MAX_ZOMBIE_DISTANCE = 0;

// TODO: allow the tick rate to be changed without changing the speed of most things in the game, so that most things depend just on the number of points or the absolute time
const MILLISECONDS_PER_TICK = 50;

const MAX_HEALTH = 5;
const POINTS_PER_TICK = MILLISECONDS_PER_TICK*20/1000; // 20 points per second


function zombieSpeed(tick: number): number {
  const points = tick * POINTS_PER_TICK;
  // TODO: adjust this formula
  // starts at 4, doubles by the time the number of points reaches 400
  // my judge of the difficulty for given speed values:
  //   4: easy
  //   8: medium
  //   12: hard
  //   16: extremely hard (basically, by this point I know I must lose)
  // I probably want players to get around 6000 points
  // I might want to make zombies bigger so they're easier to click (especially when fast)
  const exponent = 6;
  return 4 * Math.pow(points*(2**exponent-1)/400 + 1, 1/exponent);
}

// TODO: document
function zombieSpawnRate(tick: number): number {
  // TODO: make it increase over time
  /*
  if (tick * POINTS_PER_TICK > 200) {
    return 1/25;
  } else {
    return 1/50;
  }
  */
  return 1/50;
}

// from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(() => {});

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// TODO: maybe name this "position"
interface Coordinates {
  readonly distance: number; // distance from the player
  readonly angle: number; // in radians
}

// TODO: name and type
// for use in a `style` attribute
function coordinateMap({ distance, angle }: Coordinates) {
  const x = ORIGIN_X + SCALING_FACTOR * distance * Math.cos(angle);
  const y = ORIGIN_Y + SCALING_FACTOR * distance * Math.sin(angle);
  return {left: `${x}%`, bottom: `${y}%`};
}

interface ZombieProps {
  readonly coords: Coordinates;
  readonly speed: number;
  readonly key: number; // just for the key; TODO: see if it should be called "id"
}

function Zombie({ props: { coords }, onClick }: { props: ZombieProps, onClick: () => void }) {
  // TODO: get classNames (list of CSS classes) from the state of the zombie
  return (
    <div className="zombie" style={coordinateMap(coords)} onClick={onClick} />
  );
}

function Heart() {
  // TODO: make this an image instead
  return (
    <span className="heart">❤️</span>
  )
}

// list of integers from 0 to n (including 0 but not n)
function range(n: number): number[] {
  return [...(new Array(n)).keys()];
}

// TODO: type annotation
function HealthBar({ health }: { health: number }) {
  // TODO: styling
  return (
    <div className="healthbar">
      {range(health).map((n: number) => <Heart key={n} />)}
    </div>
  )
}

function newZombie(speed: number, key: number): ZombieProps {
  return {
    coords: {
      distance: STARTING_DISTANCE,
      angle: 2 * Math.PI * Math.random()
    },
    speed: speed,
    key: key,
  };
}

function Score({ points }: { points: number }) {
  return (
    <p className="score">Score: {points}</p>
  );
}

function ActiveGame({ gameOver }: { gameOver: (finalScore: number) => void }) {
  const [count, setCount] = useState(0); // for keeping track of the key to assign to zombies
  const [tick, setTick] = useState(0); // current game tick (used to keep track of things that take multiple ticks to happen)
  const [zombies, setZombies] = useState<ZombieProps[]>([]);
  const [health, setHealth] = useState(MAX_HEALTH);
  const [zombiesToSpawn, setZombiesToSpawn] = useState(1); // TODO: describe

  const points = Math.floor(POINTS_PER_TICK * tick);

  function removeZombie(key: number) {
    console.log(`Removing zombie #${key}`); // TODO: why is the message displayed twice?
    setZombies((zombies) => zombies.filter((zombie) => zombie.key !== key));
  }

  function onClick(key: number): () => void {
    // will be different once zombies can have multiple states
    return () => {removeZombie(key)};
  }

  // TODO: address different zombie states
  // returns `undefined` if the zombie should be removed
  function stepZombie(zombie: ZombieProps): ZombieProps | undefined {
    const newDistance = zombie.coords.distance - zombie.speed;

    // if the zombie reaches the player, decrement `health` and remove the zombie.
    if (newDistance <= MAX_ZOMBIE_DISTANCE) {
      console.log(`Zombie #${zombie.key} has reached the player`)
      setHealth((health) => health - 1); // TODO: or `setHealth(health - 1)`?
      return undefined;
    }

    return {
      ...zombie,
      coords: {
        ...zombie.coords,
        distance: newDistance
      }
    };
  }

  function spawnZombie() {
    const speed = zombieSpeed(tick);
    console.log(`Creating zombie #${count} (current points: ${points}, speed: ${speed.toFixed(2)})`);
    // TODO: when to pass a function into a `set` function and when to directly pass the new value?
    // TODO: this gives a warning when spawning multiple zombies in the same tick (zombiesToSpawn >= 2), because the same value of `count` is reused for multiple zombies.
    setZombies((zombies) => [...zombies, newZombie(speed, count)]);
    setCount((count) => count + 1);
  }

  function gameTick() {
    setZombies(zombies.map((zombie) => stepZombie(zombie)).filter((result): result is ZombieProps => result !== undefined));
    // TODO: update
    // (create a new state variable and add a value; spawn a zombie if that is greater than 1)
    // TODO: variable names
    const spawnedZombies = Math.floor(zombiesToSpawn);
    for (let i = 0; i < spawnedZombies; i++) {
      spawnZombie();
    }
    // TODO: how come the obvious way to split this into two statements doesn't work?
    setZombiesToSpawn(zombiesToSpawn - spawnedZombies + zombieSpawnRate(tick));
    setTick(tick + 1);
  }

  useInterval(gameTick, MILLISECONDS_PER_TICK);

  if (health <= 0) {
    console.log("Game over");
    gameOver(points);
  }

  return (
    <>
      <div className="game-container">
        <div className="game">
          {zombies.map((props) => <Zombie props={props} onClick={onClick(props.key)} key={props.key} />)}
          <div className="player" style={coordinateMap({ distance: 0, angle: 0 })} />
        </div>
        <HealthBar health={health} />
        <Score points={points} />
      </div>
    </>
  );
}

function GameInstructions({ startGame }: { startGame: () => void }) {
  // TODO
  return (
    <>
      <h2>Zombie cookie game</h2>
      <p>Instructions go here&hellip;</p>
      <button onClick={startGame}>Start game</button>
    </>
  );
}

function GameOver({ score, playAgain, viewInstructions }: { score: number, playAgain: () => void, viewInstructions: () => void }) {
  return (
    <>
      <h2>Game over</h2>
      <p>Final score: {score}</p>
      <button onClick={playAgain}>Play again</button>
      <button onClick={viewInstructions}>View instructions</button>
    </>
  );
}


enum GameState {
  Instructions,
  Active,
  GameOver
}

function Game() {
  const [state, setState] = useState(GameState.Instructions);
  const [score, setScore] = useState(0);

  switch (state) {
    case GameState.Instructions:
      return <GameInstructions startGame={() => {setState(GameState.Active)}} />;
    case GameState.Active:
      // TODO: see the warning in the browser console that prints upon game over ("Warning: Cannot update a component (`Game`) while rendering a different component (`ActiveGame`).")
      return <ActiveGame gameOver={
        (finalScore) => {
          setState(GameState.GameOver);
          setScore(finalScore);
        }
      } />;
    case GameState.GameOver:
      return <GameOver score={score} playAgain={() => {setState(GameState.Active)}} viewInstructions={() => {setState(GameState.Instructions)}} />;
  }
}

const Stage5: React.FC = () => {
  return (
    <div className="stage5-container">
      <h1>Stage 5</h1>

      <Game />

      <Link to="/stage4" className="back-button">
        <ArrowLeft />
      </Link>

      {/* TODO: hide this until the game has been won */}
      <Link to="/stage6" className="next-button">
        <ArrowRight />
      </Link>
    </div>
  );
};

export default Stage5;
