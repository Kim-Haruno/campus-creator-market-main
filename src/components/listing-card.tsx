import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categoryName, getUser, money, ratingFor, type Listing } from "@/data/mock";
import { cn } from "@/lib/utils";

export function StarRating({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn("flex items-center gap-0.5", className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i <= Math.round(value) ? "fill-warning text-warning" : "text-muted-foreground/40",
          )}
        />
      ))}
    </span>
  );
}

export function ListingCard({ listing }: { listing: Listing }) {
  const seller = getUser(listing.seller_id);
  const { avg, count } = ratingFor(listing.id);

  return (
    <Link
      to="/listing/$id"
      params={{ id: listing.id }}
      className="surface-card hover-lift group flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute left-3 top-3 rounded-full capitalize" variant="secondary">
          {listing.type}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-primary">
          {categoryName(listing.category)}
        </p>
        <h3 className="line-clamp-2 font-semibold leading-snug">{listing.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{listing.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-bold">{money(listing.price)}</span>
          {count > 0 ? (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <StarRating value={avg} />
              {avg.toFixed(1)} ({count})
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">New listing</span>
          )}
        </div>
        <div className="flex items-center gap-2 border-t border-border pt-3">
          <img
            src={seller?.avatar}
            alt=""
            className="size-6 rounded-full object-cover"
            loading="lazy"
          />
          <span className="text-xs text-muted-foreground">
            {seller?.name} · {seller?.campus}
          </span>
        </div>
      </div>
    </Link>
  );
}
