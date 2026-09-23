import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/browse", label: "Browse" },
  { to: "/dashboard", label: "Seller dashboard" },
  { to: "/admin", label: "Admin" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Eduvos Incubation Hub logo" className="size-9 object-contain" />
          <span className="leading-tight">
            <span className="block text-sm font-extrabold tracking-tight">Eduvos Incubation Hub</span>
            <span className="block text-xs text-muted-foreground">Student Marketplace</span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2 rounded-full">
            <Link to="/dashboard">Start selling</Link>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto rounded-full md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Menu className="size-5" />
        </Button>
      </div>

      <div className={cn("border-t border-border bg-background md:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto flex max-w-6xl flex-col p-2">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "bg-secondary text-foreground" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>Eduvos Incubation Hub Marketplace — a demo </p>
      </div>
    </footer>
  );
}
