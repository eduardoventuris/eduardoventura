"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiFolder, FiHome, FiPlusSquare } from "react-icons/fi";

const menuLinks = [
  { label: "Mural", href: "/", icon: FiHome },
  { label: "Anotacoes", href: "/sistema/paginas/curriculos", icon: FiFolder },
  { label: "Criar", href: "/sistema/paginas/curriculos/novo", icon: FiPlusSquare },
];

export default function Nav() {
  const currentPath = usePathname();

  return (
    <nav className="app-nav" aria-label="Navegacao principal">
      {menuLinks.map((item) => {
        const isCurrent = currentPath === item.href || (item.href !== "/" && currentPath.startsWith(item.href));
        const Glyph = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link ${isCurrent ? "active" : ""}`}
            aria-current={isCurrent ? "page" : undefined}
          >
            <Glyph />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
