import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blocnote.arthurp.fr";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site BlocNote.",
  alternates: {
    canonical: `${siteUrl}/mentions-legales`,
  },
};

export default function MentionsLegalesPage() {
  return (
    <main className="legal-page">
      <div className="legal-page-hero">
        <span className="legal-page-kicker">Informations légales</span>
        <h1 className="legal-page-title">Mentions légales</h1>
        <p className="legal-page-intro">
          Les informations ci-dessous résument l'éditeur du site, les contacts utiles et le cadre technique de BlocNote.
        </p>
      </div>

      <div className="legal-page-grid">
        <section className="legal-card">
          <h2>Éditeur du site</h2>
          <p>
            BlocNote est édité par Arthur P. Le site est accessible à l'adresse <Link className="legal-page-link" href="/">blocnote.arthurp.fr</Link>.
          </p>
        </section>

        <section className="legal-card">
          <h2>Contact</h2>
          <p>
            Pour toute demande, utilisez <a className="legal-page-link" href="https://contact.arthurp.fr" target="_blank" rel="noreferrer">contact.arthurp.fr</a> ou écrivez à <a className="legal-page-link" href="mailto:contact@arthurp.fr">contact@arthurp.fr</a>.
          </p>
        </section>

        <section className="legal-card">
          <h2>Hébergement</h2>
          <p>
            Le site est auto-hébergé sur Proxmox, avec une mise en production Docker pour servir l'application Next.js.
          </p>
        </section>

        <section className="legal-card">
          <h2>Propriété intellectuelle</h2>
          <p>
            Le contenu, l'identité visuelle et le code source de BlocNote restent protégés par le droit d'auteur. Toute réutilisation doit respecter les droits du titulaire.
          </p>
        </section>
      </div>
    </main>
  );
}