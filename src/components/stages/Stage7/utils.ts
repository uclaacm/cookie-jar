import { useRef, useEffect } from "react";

// TODO: names; also think about how to properly determine these (maybe use viewport units)
export const STARTING_DISTANCE = 1024;
// TODO: make it behave well when the window resizes
const SCALING_FACTOR = 100 / STARTING_DISTANCE / 2;
const ORIGIN_X = 50;
const ORIGIN_Y = 50;

// TODO: allow the tick rate to be changed without changing the speed of most things in the game, so that most things depend just on the number of points or the absolute time
export const MILLISECONDS_PER_TICK = 50;

export const MAX_HEALTH = 5;
export const POINTS_PER_TICK = MILLISECONDS_PER_TICK * 1 / 1000; // 1 point per second

export const TICKS_TO_RESPAWN = 3 * 1000 / MILLISECONDS_PER_TICK; // 3 seconds to respawn

export function zombieSpeed(tick: number): number {
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
  return 4 * Math.pow(points * (2 ** exponent - 1) / 400 + 1, 1 / exponent);
}

// TODO: document
export function zombieSpawnRate(tick: number): number {
  const points = tick * POINTS_PER_TICK;
  // formula chosen just so that it increases somewhat over time but doesn't really become unmanageable
  const a = 9;
  const b = 32;
  return 1 / 60 * Math.log(b * points + Math.exp(a)) / a;
}

// from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(() => { });

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
export interface Coordinates {
  readonly distance: number; // distance from the player
  readonly angle: number; // in radians
}

// TODO: name and type
// for use in a `style` attribute
export function coordinateMap({ distance, angle }: Coordinates) {
  const x = ORIGIN_X + SCALING_FACTOR * distance * Math.cos(angle);
  const y = ORIGIN_Y + SCALING_FACTOR * distance * Math.sin(angle);
  return { left: `${x}%`, bottom: `${y}%` };
}

// list of integers from 0 to n (including 0 but not n)
export function range(n: number): number[] {
  return [...(new Array(n)).keys()];
}
