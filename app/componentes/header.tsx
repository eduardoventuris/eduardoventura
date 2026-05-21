import Link from "next/link";
import Nav from "./nav";

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="grid gap-4">
          <Link href="/" className="brand-link">
            <span className="brand-mark">PL</span>
            <span className="brand-copy">
              <small>PaperLane</small>
              <strong>Curriculos</strong>
            </span>
          </Link>
          <div className="header-note">
            <strong>Visual de planner e mural.</strong>
            <p>Comandos espalhados em papeis visuais.</p>
          </div>
        </div>
        <Nav />
      </div>
    </header>
  );
}
