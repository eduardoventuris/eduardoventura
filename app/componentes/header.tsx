import Link from "next/link";
import Nav from "./nav";

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <Link href="/" className="brand-link">
          <span className="brand-mark">PL</span>
          <span className="brand-copy">
            <small>PaperLane</small>
            <strong>Curriculos</strong>
          </span>
        </Link>
        <Nav />
      </div>
    </header>
  );
}
