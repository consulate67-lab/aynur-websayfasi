"use client";

import { useEffect, useState } from "react";

export function SiteHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${solid ? " is-solid" : ""}`}>
      <a className="logo" href="#ust">
        Aynur
      </a>
      <nav className="nav" aria-label="Ana menü">
        <a href="#hikaye">Hikaye</a>
        <a href="#hikayeler">Hikâyeler</a>
        <a href="#anlar">Anlar</a>
        <a href="#ziyaret">Ziyaret</a>
      </nav>
    </header>
  );
}
