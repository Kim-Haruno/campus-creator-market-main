import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ListingCard } from "@/components/listing-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES, listings, ratingFor } from "@/data/mock";
import { cn } from "@/lib/utils";

type BrowseSearch = { category?: string | undefined };

export const Route = createFileRoute("/browse")({
  validateSearch: (search: Record<string, unknown>): BrowseSearch => ({
    category: typeof search['category'] === "string" ? search['category'] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Browse listings — Eduvos Incubation Hub Marketplace" },
      {
        name: "description",
        content:
          "Search and filter products and services from Eduvos student entrepreneurs by category, price and rating.",
      },
      { property: "og:title", content: "Browse listings — Eduvos Incubation Hub Marketplace" },
      {
        property: "og:description",
        content: "Search student-made products and services across all Eduvos campuses.",
      },
    ],
  }),
  component: Browse,
});

function Browse() {
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  const active = category ?? "all";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = listings.filter((l) => l.status === "approved");
    if (active !== "all") out = out.filter((l) => l.category === active);
    if (q)
      out = out.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q)),
      );
    const sorted = [...out];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => ratingFor(b.id).avg - ratingFor(a.id).avg);
    if (sort === "newest") sorted.sort((a, b) => b.created_at.localeCompare(a.created_at));
    return sorted;
  }, [active, query, sort]);

  const setCategory = (id: string) =>
    navigate({ search: id === "all" ? {} : { category: id }, replace: true });

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-extrabold">Browse the marketplace</h1>
        <p className="mt-2 text-muted-foreground">
          {results.length} listing{results.length === 1 ? "" : "s"} from student founders across campus.
        </p>

        <div className="surface-card mt-6 flex flex-col gap-4 p-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search listings, tags or keywords…"
              className="h-11 rounded-full pl-9"
            />
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="h-11 w-full rounded-full md:w-56">
              <SlidersHorizontal className="size-4 text-muted-foreground" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="price-asc">Price: low to high</SelectItem>
              <SelectItem value="price-desc">Price: high to low</SelectItem>
              <SelectItem value="rating">Top rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {[{ id: "all", name: "All categories" }, ...CATEGORIES].map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active === c.id
                  ? "border-transparent bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        {results.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        ) : (
          <div className="surface-card mt-8 p-12 text-center">
            <p className="font-semibold">No listings match that search</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different keyword or clear the category filter.
            </p>
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
