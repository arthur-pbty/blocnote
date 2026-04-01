import Link from "next/link";

const navigationLinks = [
  { href: "/", label: "Accueil" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
];

const contactLinks = [
  { href: "https://contact.arthurp.fr", label: "contact.arthurp.fr", external: true },
  { href: "mailto:contact@arthurp.fr", label: "contact@arthurp.fr", external: true },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" aria-label="Pied de page">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <div className="site-footer-logo">
            <img
              className="site-footer-mark"
              src="/icon.svg"
              alt=""
              aria-hidden="true"
              width={34}
              height={34}
            />
            <span>BlocNote</span>
          </div>
          <p className="site-footer-description">
            BlocNote est un bloc-notes Markdown rapide, auto-hébergé et pensé pour écrire sans friction, organiser ses idées et garder le contrôle sur ses données.
          </p>
          <div className="site-footer-badges">
            <span className="site-footer-badge">Auto-hébergé sur Proxmox</span>
            <span className="site-footer-badge">Fait avec ❤️</span>
          </div>
        </div>

        <nav className="site-footer-column" aria-label="Navigation du site">
          <h2 className="site-footer-heading">Navigation</h2>
          <div className="site-footer-links">
            {navigationLinks.map((link) => (
              <Link key={link.href} href={link.href} className="site-footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="site-footer-column">
          <h2 className="site-footer-heading">Contact</h2>
          <div className="site-footer-links">
            {contactLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="site-footer-link site-footer-link-muted"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className="site-footer-link site-footer-link-muted">
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>

        <div className="site-footer-column">
          <h2 className="site-footer-heading">Service</h2>
          <div className="site-footer-links">
            <span className="site-footer-link site-footer-link-muted">Edition Markdown</span>
            <span className="site-footer-link site-footer-link-muted">Sauvegarde locale</span>
            <span className="site-footer-link site-footer-link-muted">Export et recherche</span>
          </div>
        </div>
      </div>

      <div className="site-footer-bottom">
        <span>
          © {year} <strong>BlocNote</strong>. Tous droits réservés.
        </span>
        <span>Un outil sobre pour écrire vite, garder ses notes et rester indépendant.</span>
      </div>
    </footer>
  );
}