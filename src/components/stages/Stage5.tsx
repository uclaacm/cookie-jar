import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import "../../styles/Stage5.scss";

// TODO: names; also think about how to properly determine these (maybe use viewport units)
// TODO: make it behave well when the window resizes
const SCALING_FACTOR = 100/1024/2;
const ORIGIN_X = 50;
const ORIGIN_Y = 50;
const STARTING_DISTANCE = 1024;

// how close a zombie can get to the player before the player loses a life
// TODO: name (really is the min zombie distance before the zombie & player get removed)
// TODO: how to match this up with the displayed size in the CSS?
const MAX_ZOMBIE_DISTANCE = 0;

// TODO: adjust this value (maybe change speed as a function of time)
const DEFAULT_SPEED = 6;

// number of ticks between zombie spawns
const TICKS_PER_SPAWN = 50;
const MILLISECONDS_PER_TICK = 50;

const MAX_HEALTH = 5;

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

// TODO: type annotation
function HealthBar({ health }: { health: number }) {
  // TODO: styling
  // TODO: display an amount of hearts given by `Health`
  return (
    <p>Health: {health}</p>
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

function ActiveGame({ gameOver }: { gameOver: () => void }) {
  const [count, setCount] = useState(0); // for keeping track of the key to assign to zombies
  const [tick, setTick] = useState(0); // current game tick (used to keep track of things that take multiple ticks to happen)
  const [zombies, setZombies] = useState<ZombieProps[]>([]);
  const [health, setHealth] = useState(MAX_HEALTH);

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
    // TODO: check if the player loses a life

    // if the zombie reaches the player, decrement `health` and remove the zombie.
    if (zombie.coords.distance - zombie.speed <= MAX_ZOMBIE_DISTANCE) {
      console.log(`Zombie #${zombie.key} has reached the player`)
      setHealth((health) => health - 1); // TODO: or `setHealth(health - 1)`?
      return undefined;
    }

    return {
      ...zombie,
      coords: {
        ...zombie.coords,
        distance: zombie.coords.distance - zombie.speed
      }
    };
  }

  function spawnZombie() {
    console.log(`Creating zombie #${count}`);
    // TODO: when to pass a function into a `set` function and when to directly pass the new value?
    setZombies([...zombies, newZombie(DEFAULT_SPEED, count)]);
    setCount(count + 1);
  }

  function gameTick() {
    setZombies(zombies.map((zombie) => stepZombie(zombie)).filter((result): result is ZombieProps => result !== undefined));
    if (tick % TICKS_PER_SPAWN == 0) {
      spawnZombie()
    }
    setTick(tick + 1);
  }

  useInterval(gameTick, MILLISECONDS_PER_TICK);

  if (health <= 0) {
    console.log("Game over");
    gameOver();
  }

  return (
    <>
      <div className="game">
        {zombies.map((props) => <Zombie props={props} onClick={onClick(props.key)} key={props.key} />)}
        <div className="player" style={coordinateMap({ distance: 0, angle: 0 })} />
      </div>
      <HealthBar health={health} />
    </>
  );
}

function GameOver({ playAgain }: { playAgain: () => void }) {
  return (
    <>
      <h2>Game over</h2>
      <button onClick={playAgain}>Play again</button>
    </>
  );
}

// TODO: state for before the game has been played
enum GameState {
  Active,
  GameOver
}

function Game() {
  const [state, setState] = useState(GameState.GameOver);
  switch (state) {
    case GameState.Active:
      // TODO: see the warning in the browser console that prints upon game over ("Warning: Cannot update a component (`Game`) while rendering a different component (`ActiveGame`).")
      return <ActiveGame gameOver={() => {setState(GameState.GameOver)}} />;
    case GameState.GameOver:
      return <GameOver playAgain={() => {setState(GameState.Active)}} />;
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
