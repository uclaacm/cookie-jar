import { Coordinates, coordinateMap, STARTING_DISTANCE } from "./utils.ts";

export interface ZombieProps {
  readonly coords: Coordinates;
  readonly speed: number;
  readonly key: number; // just for the key; TODO: see if it should be called "id"
}

export const Zombie = ({ props: { coords }, onClick }: { props: ZombieProps, onClick: () => void }) => {
  // TODO: get classNames (list of CSS classes) from the state of the zombie
  return (
    <div className="zombie" style={coordinateMap(coords)} onClick={onClick} />
  );
}

export function newZombie(speed: number, key: number): ZombieProps {
  return {
    coords: {
      distance: STARTING_DISTANCE,
      angle: 2 * Math.PI * Math.random()
    },
    speed: speed,
    key: key,
  };
}
