import { useState } from "react";
import { Menu, Skull, X } from "lucide-react";
import { motion } from "motion/react";

const navigationLinks = [
  { label: "About Event", href: "#event" },
  { label: "Rules", href: "#rules" },
  { label: "Gallery", href: "#gallery" },
  { label: "Prices", href: "#prices" },
  { label: "Contact", href: "#contact" },
];

type NavbarProps = {
  isRevealed: boolean;
};

const revealTransition = {
  duration: 0.6,
  ease: [0.2, 0.75, 0.25, 1] as const,
};

export function Navbar({ isRevealed }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <motion.a
        className="brand"
        href="#event"
        aria-label="Spooky Holiday home"
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealed ? 1 : 0 }}
        transition={{ ...revealTransition, delay: isRevealed ? 0.05 : 0 }}
      >
        <Skull className="brand__icon" aria-hidden="true" />
        <span>Spooky Holiday</span>
      </motion.a>

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

      <motion.nav
        className={`site-nav${isMenuOpen ? " site-nav--open" : ""}`}
        id="primary-navigation"
        aria-label="Main navigation"
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : -22 }}
        transition={{ ...revealTransition, delay: isRevealed ? 0.24 : 0 }}
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
      </motion.nav>
    </header>
  );
}
