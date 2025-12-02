import { useState } from "react";

import { MAX_HEALTH, POINTS_PER_TICK, MAX_ZOMBIE_DISTANCE, MILLISECONDS_PER_TICK, coordinateMap, useInterval, zombieSpeed, zombieSpawnRate } from "./utils.ts";
import { Zombie, ZombieProps, newZombie } from "./Zombie.tsx";
import { HealthBar } from "./HealthBar.tsx";
import { Score } from "./Score.tsx";

export function ActiveGame({ gameOver }: { gameOver: (finalScore: number) => void }) {
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
