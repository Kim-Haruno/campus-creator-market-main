import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Star } from "lucide-react";
import { toast } from "sonner";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ListingCard, StarRating } from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import { getUser, listings, orders, sellerRating } from "@/data/mock";

export const Route = createFileRoute("/seller/$id")({
  loader: ({ params }) => {
    const seller = getUser(params.id);
    if (!seller) throw notFound();
    return { seller };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Seller unavailable" }, { name: "robots", content: "noindex" }] };
    const { seller } = loaderData;
    const title = `${seller.name} — Eduvos Incubation Hub Marketplace`;
    const description = seller.bio.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SellerProfile,
  notFoundComponent: SellerMissing,
});

function SellerMissing() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Seller not found</h1>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/browse">Back to browse</Link>
        </Button>
      </div>
    </div>
  );
}

function SellerProfile() {
  const { seller } = Route.useLoaderData();
  const mine = listings.filter((l) => l.seller_id === seller.id && l.status === "approved");
  const rating = sellerRating(seller.id);
  const sold = orders.filter((o) => mine.some((l) => l.id === o.listing_id)).length;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="surface-card overflow-hidden">
          <div className="brand-gradient h-36" />
          <div className="px-6 pb-6">
            <div className="-mt-12 flex flex-wrap items-end gap-4">
              <img
                src={seller.avatar}
                alt={seller.name}
                className="size-24 rounded-full border-4 border-card object-cover shadow-soft"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-extrabold">{seller.name}</h1>
                <p className="text-muted-foreground">{seller.headline}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> {seller.campus} campus · {seller.email}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  className="rounded-full"
                  onClick={() => toast.success(`Message sent to ${seller.name}`)}
                >
                  <MessageCircle className="size-4" /> Message
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full"
                  onClick={() => toast("Email copied", { description: seller.email })}
                >
                  <Mail className="size-4" /> Email
                </Button>
              </div>
            </div>

            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">{seller.bio}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {seller.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Active listings", value: String(mine.length) },
            { label: "Orders completed", value: String(sold) },
            {
              label: "Average rating",
              value: rating.count ? `${rating.avg.toFixed(1)} / 5` : "—",
            },
          ].map((s) => (
            <div key={s.label} className="surface-card p-5">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-1 flex items-center gap-2 text-2xl font-bold">
                {s.value}
                {s.label === "Average rating" && rating.count ? (
                  <Star className="size-4 fill-warning text-warning" />
                ) : null}
              </p>
            </div>
          ))}
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Listings by {seller.name.split(" ")[0]}</h2>
            {rating.count > 0 && <StarRating value={rating.avg} />}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {mine.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
          {!mine.length && (
            <p className="mt-4 text-sm text-muted-foreground">No live listings right now.</p>
          )}
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
