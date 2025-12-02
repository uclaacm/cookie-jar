import { range } from "./utils.ts";

function Heart() {
  // TODO: make this an image instead
  return (
    <span className="heart">❤️</span>
  )
}

// TODO: type annotation
export function HealthBar({ health }: { health: number }) {
  // TODO: styling
  return (
    <div className="healthbar">
      {range(health).map((n: number) => <Heart key={n} />)}
    </div>
  )
}
