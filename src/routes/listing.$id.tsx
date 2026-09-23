import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, MessageCircle, ShieldCheck, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ListingCard, StarRating } from "@/components/listing-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  categoryName,
  getListing,
  getUser,
  listingReviews,
  listings,
  money,
  ratingFor,
  sellerRating,
} from "@/data/mock";

export const Route = createFileRoute("/listing/$id")({
  loader: ({ params }) => {
    const listing = getListing(params.id);
    if (!listing) throw notFound();
    return { listing };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Listing unavailable" }, { name: "robots", content: "noindex" }] };
    const { listing } = loaderData;
    const title = `${listing.title} — Eduvos Incubation Hub Marketplace`;
    const description = listing.description.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: listing.image },
        { name: "twitter:image", content: listing.image },
      ],
    };
  },
  component: ListingDetail,
  notFoundComponent: ListingMissing,
});

function ListingMissing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Listing not found</h1>
        <p className="mt-2 text-muted-foreground">This listing may have been removed by its seller.</p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/browse">Back to browse</Link>
        </Button>
      </div>
    </div>
  );
}

function ListingDetail() {
  const { listing } = Route.useLoaderData();
  const seller = getUser(listing.seller_id)!;
  const { avg, count } = ratingFor(listing.id);
  const reviews = listingReviews(listing.id);
  const related = listings
    .filter((l) => l.id !== listing.id && l.status === "approved" && l.category === listing.category)
    .slice(0, 3);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 py-8">
        <nav className="text-sm text-muted-foreground">
          <Link to="/browse" className="hover:text-foreground">
            Browse
          </Link>
          <span className="px-2">/</span>
          <span>{categoryName(listing.category)}</span>
        </nav>

        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <img
              src={listing.image}
              alt={listing.title}
              className="aspect-[16/10] w-full rounded-3xl border border-border object-cover shadow-soft"
            />

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="rounded-full capitalize">
                {listing.type}
              </Badge>
              <Badge variant="outline" className="rounded-full">
                {categoryName(listing.category)}
              </Badge>
              {count > 0 && (
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <StarRating value={avg} /> {avg.toFixed(1)} · {count} review{count === 1 ? "" : "s"}
                </span>
              )}
            </div>

            <h1 className="mt-4 text-3xl font-extrabold">{listing.title}</h1>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
              {listing.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {listing.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  #{t}
                </span>
              ))}
            </div>

            <section className="mt-10">
              <h2 className="text-xl font-bold">Reviews</h2>
              {reviews.length ? (
                <div className="mt-4 space-y-4">
                  {reviews.map((r) => {
                    const author = getUser(r.author_id);
                    return (
                      <div key={r.id} className="surface-card p-5">
                        <div className="flex items-center gap-3">
                          <img src={author?.avatar} alt="" className="size-9 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-semibold">{author?.name}</p>
                            <p className="text-xs text-muted-foreground">{r.created_at}</p>
                          </div>
                          <StarRating value={r.rating} className="ml-auto" />
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">{r.text}</p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">No reviews yet — be the first buyer.</p>
              )}
            </section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="surface-card p-6">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-3xl font-extrabold">{money(listing.price)}</p>
              <div className="mt-5 space-y-2">
                <Button
                  className="w-full rounded-full"
                  size="lg"
                  onClick={() => toast.success("Order placed", { description: `${listing.title} — the seller will confirm shortly.` })}
                >
                  <ShoppingBag className="size-4" /> Place order
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full"
                  onClick={() => setContactOpen(true)}
                >
                  <MessageCircle className="size-4" /> Contact seller
                </Button>
              </div>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-4 text-success" /> Approved by the Incubation Hub
              </p>
            </div>

            <div className="surface-card p-6">
              <div className="flex items-center gap-3">
                <img src={seller.avatar} alt="" className="size-12 rounded-full object-cover" />
                <div>
                  <p className="font-semibold">{seller.name}</p>
                  <p className="text-xs text-muted-foreground">{seller.headline}</p>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{seller.bio}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" /> {seller.campus}
                </span>
                <span className="flex items-center gap-1">
                  <StarRating value={sellerRating(seller.id).avg} /> {sellerRating(seller.id).avg.toFixed(1)}
                </span>
              </div>
              <Button asChild variant="secondary" className="mt-4 w-full rounded-full">
                <Link to="/seller/$id" params={{ id: seller.id }}>
                  View profile
                </Link>
              </Button>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold">More in {categoryName(listing.category)}</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message {seller.name}</DialogTitle>
            <DialogDescription>
              Ask about availability, delivery or a custom quote for “{listing.title}”.
            </DialogDescription>
          </DialogHeader>
          <Textarea rows={5} placeholder="Hi! I'm interested in this listing…" />
          <DialogFooter>
            <Button
              className="rounded-full"
              onClick={() => {
                setContactOpen(false);
                toast.success("Message sent", { description: `${seller.name} will reply by email.` });
              }}
            >
              Send message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
}
