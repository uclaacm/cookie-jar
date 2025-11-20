import React from "react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import "../../styles/Stage5.scss";

// TODO: names; also think about how to properly determine these (maybe use viewport units)
// TODO: make it behave well when the window resizes
const SCALING_FACTOR = 0.25;
const ORIGIN_X = 400;
const ORIGIN_Y = 400;
const STARTING_DISTANCE = 1024;

// TODO: adjust this value (maybe change speed as a function of time)
const DEFAULT_SPEED = 6;

// number of ticks between zombie spawns
const TICKS_PER_SPAWN = 50;
const MILLISECONDS_PER_TICK = 100;

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

interface ZombieData {
  readonly distance: number; // distance from the player
  readonly angle: number; // in radians
  readonly speed: number;
  readonly key: number; // just for the key; TODO: see if it should be called "id"
}

// TODO: maybe make this an abstract class and have the different states be the concrete classes (using the State design pattern)
// note: all methods are pure
class Zombie {
  readonly data: ZombieData; // TODO: maybe call this "props"
  // TODO: is there a way to avoid having to type `.data` all the time? e.g. writing `this.distance` instead of `this.data.distance`?
  exists: boolean; // keeps track of whether to remove the zombie at the end of this step

  // code outside this class shouldn't call the constructor.
  // instead, create Zombie objects using newZombie() or Zombie.step().
  constructor(data: ZombieData) {
    this.data = data;
    this.exists = true;
  }

  // TODO: address different zombie states
  // returns `undefined` if the zombie should be removed
  step(): Zombie | undefined {
    // TODO: check if the player loses a life

    if (!this.exists) {
      console.log(`Removing zombie #${this.data.key}`); // TODO: why is the message displayed twice?
      return undefined;
    }

    return new Zombie({
      ...this.data,
      distance: this.data.distance - this.data.speed
    });
  }

  // TODO: ensure the name and type of this function are right
  asComponent(): React.ReactElement {
    // TODO: function to map game coordinates onto "physical" coordinates
    // TODO: it seems that somehow, either the zombies or player aren't aligned (not sure if this is a calculation issue or a CSS issue); the center of a zombie doesn't necessarily pass through the center of the player when the zombie passes over the player (while the zombie hitting the player is not yet handled)
    const x = ORIGIN_X + SCALING_FACTOR * this.data.distance * Math.cos(this.data.angle);
    const y = ORIGIN_Y + SCALING_FACTOR * this.data.distance * Math.sin(this.data.angle);

    // TODO: this function should involve a state transition in the case that the zombie doesn't get completely removed.
    const onClick = () => {
      this.exists = false;
    }

    // TODO: get classNames (list of CSS classes) from the state of the zombie
    // TODO: what's the best way to allow this to return northing if `!this.exists`?
    return this.exists ? (
      <div className="zombie" style={{left: x, bottom: y}} onClick={onClick} key={this.data.key} />
    ) : <></>;
  }
}

function newZombie(speed: number, key: number): Zombie {
  console.log(`Creating zombie #${key}`);
  return new Zombie({
    distance: STARTING_DISTANCE,
    angle: 2 * Math.PI * Math.random(),
    speed: speed,
    key: key
  });
}

function Game() {
  const [count, setCount] = useState(0); // for keeping track of the key to assign to zombies
  const [tick, setTick] = useState(0); // current game tick (used to keep track of things that take multiple ticks to happen)
  const [zombies, setZombies] = useState<Zombie[]>([]);

  function spawnZombie() {
    // TODO: when to pass a function into a `set` function and when to directly pass the new value?
    setZombies(prev => [...prev, newZombie(DEFAULT_SPEED, count)]);
    setCount(count + 1);
  }

  function gameTick() {
    setZombies((zombies) => zombies.map((zombie) => zombie.step()).filter((result): result is Zombie => result !== undefined));
    if (tick % TICKS_PER_SPAWN == 0) {
      spawnZombie()
    }
    setTick(tick + 1);
  }

  useInterval(gameTick, MILLISECONDS_PER_TICK);

  return (
    <>
      <div className="player" style={{left: ORIGIN_X, bottom: ORIGIN_Y}} />
      {zombies.map((zombie) => zombie.asComponent())}
    </>
  );
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
