import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";

const NAV = [
  { path: "/", label: "首页", end: true },
  { path: "/tests", label: "全部测试", end: false },
  { path: "/about", label: "关于", end: false },
];

export const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" onClick={() => setOpen(false)} aria-label="回到首页">
            <BrandLogo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.path}
                to={n.path}
                end={n.end}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground hover:text-foreground md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "关闭菜单" : "打开菜单"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <nav className="space-y-1 border-t px-4 py-2 md:hidden">
            {NAV.map((n) => (
              <NavLink
                key={n.path}
                to={n.path}
                end={n.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block rounded-md px-3 py-2 text-sm",
                    isActive ? "bg-muted font-medium text-foreground" : "text-muted-foreground",
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t bg-card">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-8 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link to="/about" className="inline-flex">
              <BrandLogo compact />
            </Link>
            <span className="text-xs">{SITE.footerNote}</span>
          </div>
          <p className="max-w-3xl text-xs leading-relaxed">{SITE.disclaimer}</p>
          <p className="text-xs">{SITE.copyright}</p>
        </div>
      </footer>
    </div>
  );
};
