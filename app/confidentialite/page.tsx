import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blocnote.arthurp.fr";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Politique de confidentialité de BlocNote.",
  alternates: {
    canonical: `${siteUrl}/confidentialite`,
  },
};

export default function ConfidentialitePage() {
  return (
    <main className="legal-page">
      <div className="legal-page-hero">
        <span className="legal-page-kicker">Vie privée</span>
        <h1 className="legal-page-title">Confidentialité</h1>
        <p className="legal-page-intro">
          BlocNote est conçu pour garder les notes localement dans le navigateur et éviter la collecte de données inutile.
        </p>
      </div>

      <div className="legal-page-grid">
        <section className="legal-card">
          <h2>Stockage des notes</h2>
          <p>
            Les notes sont enregistrées dans le navigateur via <Link className="legal-page-link" href="/">localStorage</Link>. Elles ne sont pas envoyées à un serveur BlocNote pour la synchronisation.
          </p>
        </section>

        <section className="legal-card">
          <h2>Données collectées</h2>
          <p>
            L'application n'exige pas de compte utilisateur. Les contenus créés restent sous le contrôle direct de la personne qui utilise le site.
          </p>
        </section>

        <section className="legal-card">
          <h2>Partage et support</h2>
          <p>
            Si vous souhaitez signaler un souci ou poser une question liée à la confidentialité, contactez <a className="legal-page-link" href="https://contact.arthurp.fr" target="_blank" rel="noreferrer">contact.arthurp.fr</a> ou <a className="legal-page-link" href="mailto:contact@arthurp.fr">contact@arthurp.fr</a>.
          </p>
        </section>

        <section className="legal-card">
          <h2>Évolution</h2>
          <p>
            Cette page peut évoluer si le fonctionnement technique du service change. La version la plus récente reste celle publiée sur le site.
          </p>
        </section>
      </div>
    </main>
  );
}