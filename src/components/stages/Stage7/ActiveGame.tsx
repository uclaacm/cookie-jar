import { useState } from "react";

import { MAX_HEALTH, POINTS_PER_TICK, MILLISECONDS_PER_TICK, TICKS_TO_RESPAWN, coordinateMap, useInterval, zombieSpeed, zombieSpawnRate } from "./utils.ts";
import { Zombie, ZombieProps, ZombieState, newZombie } from "./Zombie.tsx";
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

  // what to replace a zombie with once it gets clicked
  // TODO: name
  function whenClicked(zombie: ZombieProps): ZombieProps | undefined {
    switch (zombie.state) {
      case ZombieState.New:
        return {
          ...zombie,
          state: ZombieState.Tombstone,
          tickToRespawn: tick + TICKS_TO_RESPAWN
        };
      case ZombieState.Tombstone:
        return zombie;
      case ZombieState.Undead:
        return undefined; // remove the zombie
    }
  }

  function onClick(key: number): () => void {
    return () => {
      const zombie = zombies.filter((zombie) => zombie.key === key)[0];
      const newZombie = whenClicked(zombie);
      if (newZombie === undefined) {
        removeZombie(key);
        return;
      }
      setZombies((zombies) => zombies.map((zombie) => (zombie.key === key ? newZombie : zombie))); // TODO: make it readable
    }
  }

  // TODO: address different zombie states
  // returns `undefined` if the zombie should be removed
  function stepZombie(zombie: ZombieProps): ZombieProps | undefined {
    if (zombie.state === ZombieState.Tombstone) {
      if (tick >= zombie.tickToRespawn) {
        console.log(`Respawning zombie #${zombie.key}`);
        // respawn the zombie
        return {
          ...zombie,
          state: ZombieState.Undead
        };
      }
      return zombie;
    }

    const newDistance = zombie.coords.distance - zombie.speed;

    // if the zombie reaches the player, decrement `health` and remove the zombie.
    if (newDistance <= 0) {
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
          {zombies.map((props) => <Zombie coords={props.coords} state={props.state} onClick={onClick(props.key)} key={props.key} />)}
          <div className="player" style={coordinateMap({ distance: 0, angle: 0 })} />
        </div>
        <HealthBar health={health} />
        <Score points={points} />
      </div>
    </>
  );
}
