import { range } from "./utils.ts";

function Heart() {
  return (
    <div className="heart" />
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
