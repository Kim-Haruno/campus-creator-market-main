import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Coffee,
  GraduationCap,
  Laptop,
  PartyPopper,
  PenTool,
  Search,
  Shirt,
  ShieldCheck,
  Store,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ListingCard } from "@/components/listing-card";
import { Button } from "@/components/ui/button";
import { CATEGORIES, listings, users } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eduvos Incubation Hub Marketplace — Buy from student founders" },
      {
        name: "description",
        content:
          "Discover products and services built by Eduvos student entrepreneurs — tech, design, food, tutoring and more, all on campus.",
      },
      { property: "og:title", content: "Eduvos Incubation Hub Marketplace" },
      {
        property: "og:description",
        content: "A campus marketplace where Eduvos student founders showcase and sell to their community.",
      },
    ],
  }),
  component: Home,
});

const icons = { Laptop, PenTool, Coffee, Shirt, GraduationCap, PartyPopper };

function Home() {
  const featured = listings.filter((l) => l.status === "approved").slice(0, 6);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-primary shadow-soft">
              <Sparkles className="size-3.5" /> Powered by the Eduvos Incubation Hub
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] md:text-6xl">
              The campus marketplace for{" "}
              <span className="text-gradient">student founders</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">
              Buy websites, brand kits, tutoring, baked goods and more — all made by Eduvos students,
              delivered on campus.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/browse">
                  Browse the marketplace <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/dashboard">Sell your work</Link>
              </Button>
            </div>
            <dl className="mt-10 flex gap-8">
              {[
                { k: `${listings.length}+`, v: "Live listings" },
                { k: `${users.filter((u) => u.role === "seller").length}`, v: "Student sellers" },
                { k: "3", v: "Campuses" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="text-2xl font-bold">{s.k}</dt>
                  <dd className="text-sm text-muted-foreground">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="brand-gradient absolute -inset-3 rounded-[2.5rem] opacity-15 blur-2xl" />
            <img
              src={heroImg}
              alt="Student entrepreneurs at campus market stalls"
              width={1600}
              height={1008}
              className="relative w-full rounded-[2rem] border border-border object-cover shadow-lift"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold">Shop by category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => {
            const Icon = icons[c.icon as keyof typeof icons];
            return (
              <Link
                key={c.id}
                to="/browse"
                search={{ category: c.id }}
                className="surface-card hover-lift flex flex-col items-center gap-3 p-5 text-center"
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-semibold leading-tight">{c.name}</span>
                <span className="text-xs text-muted-foreground">
                  {listings.filter((l) => l.category === c.id).length} listings
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Featured listings</h2>
            <p className="text-sm text-muted-foreground">Hand-picked by the hub team this month.</p>
          </div>
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/browse">
              See all <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="surface-card p-8 md:p-12">
          <h2 className="text-2xl font-bold">How it works</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Find what you need",
                text: "Search or filter by category to see what students on your campus are offering.",
              },
              {
                icon: Store,
                title: "Talk to the founder",
                text: "Message the seller directly, agree on details and place your order in a click.",
              },
              {
                icon: ShieldCheck,
                title: "Reviewed by the hub",
                text: "Every listing is moderated by the Incubation Hub before it goes live.",
              },
            ].map((s, i) => (
              <div key={s.title} className="flex gap-4">
                <span className="brand-gradient flex size-11 shrink-0 items-center justify-center rounded-2xl text-primary-foreground">
                  <s.icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-primary">Step {i + 1}</p>
                  <h3 className="mt-1 font-semibold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
