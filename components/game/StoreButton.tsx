import type { Game } from "@/content/games";
import { Arrow } from "@/components/ui/primitives";

/** Links to the store only when a verified public listing exists. */
export function StoreButton({ game }: { game: Game }) {
  if (game.store.url) {
    return (
      <a href={game.store.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        Get it on {game.store.name} <Arrow />
      </a>
    );
  }
  return (
    <p className="inline-flex min-h-[3.4rem] items-center gap-3 text-sm text-bone/80 shadow-[inset_0_0_0_1px_rgba(244,244,242,0.18)] max-sm:py-3 sm:px-6 max-sm:px-4">
      <span aria-hidden="true" className="block h-3 w-[7px] shrink-0 -skew-x-[28deg] bg-gold" />
      {game.store.pendingNote}
    </p>
  );
}
