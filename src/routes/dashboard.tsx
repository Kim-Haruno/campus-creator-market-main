import { createFileRoute, Link } from "@tanstack/react-router";
import { Banknote, Eye, PackagePlus, ShoppingBag, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CATEGORIES,
  CURRENT_SELLER_ID,
  categoryName,
  getListing,
  getUser,
  listings as seedListings,
  money,
  orders,
  reviews,
  sellerRating,
  type Listing,
} from "@/data/mock";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Seller dashboard — Eduvos Incubation Hub Marketplace" },
      {
        name: "description",
        content:
          "Track your sales, manage your listings and publish new products or services as an Eduvos student seller.",
      },
      { property: "og:title", content: "Seller dashboard — Eduvos Incubation Hub Marketplace" },
      {
        property: "og:description",
        content: "Manage listings, orders and reviews from one place.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const seller = getUser(CURRENT_SELLER_ID)!;
  const [myListings, setMyListings] = useState<Listing[]>(
    seedListings.filter((l) => l.seller_id === CURRENT_SELLER_ID),
  );
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "tech",
    type: "service",
    tags: "",
  });

  const myOrders = orders.filter((o) => myListings.some((l) => l.id === o.listing_id));
  const revenue = myOrders.reduce((sum, o) => sum + o.amount, 0);
  const rating = sellerRating(seller.id);

  const activity = [
    ...myOrders.map((o) => ({
      key: `o-${o.id}`,
      date: o.created_at,
      icon: ShoppingBag,
      text: `New ${o.status} order for “${getListing(o.listing_id)?.title}” — ${money(o.amount)}`,
    })),
    ...reviews
      .filter((r) => myListings.some((l) => l.id === r.listing_id))
      .map((r) => ({
        key: `r-${r.id}`,
        date: r.created_at,
        icon: Star,
        text: `${getUser(r.author_id)?.name} left a ${r.rating}-star review on “${getListing(r.listing_id)?.title}”`,
      })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.price) {
      toast.error("Add a title and a price first");
      return;
    }
    const listing: Listing = {
      id: `new-${Date.now()}`,
      seller_id: seller.id,
      title: form.title.trim(),
      description: form.description.trim() || "No description yet.",
      price: Number(form.price),
      category: form.category,
      type: form.type as Listing["type"],
      image:
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=70",
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status: "pending",
      created_at: new Date().toISOString().slice(0, 10),
    };
    setMyListings((l) => [listing, ...l]);
    setForm({ title: "", description: "", price: "", category: "tech", type: "service", tags: "" });
    toast.success("Listing submitted", { description: "It will appear once the hub approves it." });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center gap-4">
          <img src={seller.avatar} alt="" className="size-14 rounded-full object-cover" />
          <div>
            <h1 className="text-3xl font-extrabold">Welcome back, {seller.name.split(" ")[0]}</h1>
            <p className="text-muted-foreground">{seller.headline} · {seller.campus} campus</p>
          </div>
          <Button asChild variant="outline" className="ml-auto rounded-full">
            <Link to="/seller/$id" params={{ id: seller.id }}>
              <Eye className="size-4" /> View public profile
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Revenue", value: money(revenue), icon: Banknote },
            { label: "Orders", value: String(myOrders.length), icon: ShoppingBag },
            { label: "Listings", value: String(myListings.length), icon: PackagePlus },
            {
              label: "Rating",
              value: rating.count ? rating.avg.toFixed(1) : "—",
              icon: Star,
            },
          ].map((s) => (
            <div key={s.label} className="surface-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <s.icon className="size-4 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <section className="surface-card p-6">
            <h2 className="text-lg font-bold">My listings</h2>
            <div className="mt-4 divide-y divide-border">
              {myListings.map((l) => (
                <div key={l.id} className="flex items-center gap-4 py-3">
                  <img src={l.image} alt="" className="size-14 rounded-xl object-cover" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{l.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {categoryName(l.category)} · {money(l.price)}
                    </p>
                  </div>
                  <Badge
                    variant={l.status === "approved" ? "secondary" : "outline"}
                    className="rounded-full capitalize"
                  >
                    {l.status}
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full text-muted-foreground"
                    aria-label="Remove listing"
                    onClick={() => {
                      setMyListings((prev) => prev.filter((x) => x.id !== l.id));
                      toast("Listing removed");
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
              {!myListings.length && (
                <p className="py-6 text-sm text-muted-foreground">No listings yet — create one below.</p>
              )}
            </div>
          </section>

          <section className="surface-card p-6">
            <h2 className="text-lg font-bold">Recent activity</h2>
            <ul className="mt-4 space-y-4">
              {activity.map((a) => (
                <li key={a.key} className="flex gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <a.icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.date}</p>
                  </div>
                </li>
              ))}
              {!activity.length && <p className="text-sm text-muted-foreground">Nothing yet.</p>}
            </ul>
          </section>
        </div>

        <section className="surface-card mt-6 p-6">
          <h2 className="text-lg font-bold">Create a listing</h2>
          <p className="text-sm text-muted-foreground">
            New listings go to the Incubation Hub moderation queue before appearing publicly.
          </p>
          <form onSubmit={submit} className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Logo design for student societies"
                className="mt-1.5 rounded-xl"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="What's included, turnaround time, delivery…"
                className="mt-1.5 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="price">Price (ZAR)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="450"
                className="mt-1.5 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="design, logo, fast"
                className="mt-1.5 rounded-xl"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="mt-1.5 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger className="mt-1.5 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Button type="submit" size="lg" className="rounded-full">
                <PackagePlus className="size-4" /> Submit for review
              </Button>
            </div>
          </form>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
