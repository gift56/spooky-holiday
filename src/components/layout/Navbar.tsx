import { useState } from "react";
import { Menu, Skull, X } from "lucide-react";

const navigationLinks = [
  { label: "About Event", href: "#event" },
  { label: "Rules", href: "#rules" },
  { label: "Gallery", href: "#gallery" },
  { label: "Prices", href: "#prices" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#event" aria-label="Spooky Holiday home">
        <Skull className="brand__icon" aria-hidden="true" />
        <span>Spooky Holiday</span>
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <nav
        className={`site-nav${isMenuOpen ? " site-nav--open" : ""}`}
        id="primary-navigation"
        aria-label="Main navigation"
      >
        {navigationLinks.map(({ label, href }) => (
          <a
            href={href}
            key={label}
            onClick={() => setIsMenuOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
