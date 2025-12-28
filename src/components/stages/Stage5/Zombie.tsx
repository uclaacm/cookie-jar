import { Coordinates, coordinateMap, STARTING_DISTANCE } from "./utils.ts";

// a New zombie turns into a Tombstone when clicked, and after a period of time the Tombstone becomes an Undead zombie, which acts exactly like a New zombie except it is completely removed when clicked.
// (Tombstones can't be clicked.)
// TODO: if I had more time, I would probably make the game mechanics more meaningful/realistic. for example, it could make sense to have waves of zombies, where you have to remove all zombies in a wave in a certain period of time or else all of them respawn. I think this would represent how if there is any one piece of data that doesn't get deleted, every single place where it formerly was can be restored.
// TODO: also, it could make sense to label tombstones with mechanisms zombie cookies use to persist their data.
// (also, it would make sense for Undead zombies to be temporarily slower when having just respawned from a Tombstone)
export enum ZombieState {
  New,
  Tombstone,
  Undead
}

export interface ZombieProps {
  readonly coords: Coordinates;
  readonly speed: number;
  readonly state: ZombieState;
  readonly tickToRespawn: number; // only for Tombstones
  readonly key: number; // just for the key; TODO: see if it should be called "id"
}

export const Zombie = ({ coords, state, onClick }: { coords: Coordinates, state: ZombieState, onClick: () => void }) => {
  return (
    <div className={`zombie ${(state === ZombieState.Tombstone) ? "tombstone" : "alive"}`} style={coordinateMap(coords)} onClick={onClick} />
  );
}

export function newZombie(speed: number, key: number): ZombieProps {
  return {
    coords: {
      distance: STARTING_DISTANCE,
      angle: 2 * Math.PI * Math.random()
    },
    speed: speed,
    state: ZombieState.New,
    tickToRespawn: -1,
    key: key,
  };
}
