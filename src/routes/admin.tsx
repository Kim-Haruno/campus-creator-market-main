import { createFileRoute } from "@tanstack/react-router";
import { Check, Clock, Layers, ShieldCheck, Users, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryName, getUser, listings as seed, money, users, type Listing } from "@/data/mock";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin moderation — Eduvos Incubation Hub Marketplace" },
      {
        name: "description",
        content:
          "Review, approve or reject student listings submitted to the Eduvos Incubation Hub Marketplace.",
      },
      { property: "og:title", content: "Admin moderation — Eduvos Incubation Hub Marketplace" },
      {
        property: "og:description",
        content: "Moderation queue and marketplace health stats for hub coordinators.",
      },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [items, setItems] = useState<Listing[]>(seed);
  const queue = items.filter((l) => l.status === "pending");

  const decide = (id: string, status: "approved" | "rejected") => {
    setItems((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    toast[status === "approved" ? "success" : "error"](
      status === "approved" ? "Listing approved" : "Listing rejected",
    );
  };

  const stats = [
    { label: "Pending review", value: String(queue.length), icon: Clock },
    {
      label: "Live listings",
      value: String(items.filter((l) => l.status === "approved").length),
      icon: Layers,
    },
    { label: "Registered users", value: String(users.length), icon: Users },
    {
      label: "Rejected",
      value: String(items.filter((l) => l.status === "rejected").length),
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-extrabold">Moderation</h1>
        <p className="mt-2 text-muted-foreground">
          Incubation Hub coordinators review every listing before it reaches the campus community.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="surface-card p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <s.icon className="size-4 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Moderation queue</h2>
          {queue.length ? (
            <div className="mt-5 space-y-4">
              {queue.map((l) => {
                const seller = getUser(l.seller_id);
                return (
                  <div key={l.id} className="surface-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                    <img
                      src={l.image}
                      alt=""
                      loading="lazy"
                      className="h-28 w-full rounded-2xl object-cover sm:size-24"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{l.title}</h3>
                        <Badge variant="outline" className="rounded-full capitalize">
                          {l.type}
                        </Badge>
                        <Badge variant="secondary" className="rounded-full">
                          {categoryName(l.category)}
                        </Badge>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{l.description}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {seller?.name} · {seller?.campus} · {money(l.price)} · submitted {l.created_at}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="rounded-full" onClick={() => decide(l.id, "approved")}>
                        <Check className="size-4" /> Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() => decide(l.id, "rejected")}
                      >
                        <X className="size-4" /> Reject
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="surface-card mt-5 p-12 text-center">
              <ShieldCheck className="mx-auto size-8 text-success" />
              <p className="mt-3 font-semibold">Queue is clear</p>
              <p className="text-sm text-muted-foreground">Every submitted listing has been reviewed.</p>
            </div>
          )}
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold">All listings</h2>
          <div className="surface-card mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border text-left text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Listing</th>
                  <th className="px-4 py-3 font-medium">Seller</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map((l) => (
                  <tr key={l.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">{l.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{getUser(l.seller_id)?.name}</td>
                    <td className="px-4 py-3">{money(l.price)}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={l.status === "approved" ? "secondary" : "outline"}
                        className="rounded-full capitalize"
                      >
                        {l.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <SiteFooter />
    </div>
  );
}
