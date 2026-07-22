import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { loanProducts } from '@/data/loans';
import { useReveal } from '@/hooks/useReveal';

export default function LoanListPage() {
  const { t } = useTranslation('loans');
  const { ref, visible } = useReveal<HTMLDivElement>();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: loanProducts.map((loan, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://prestivio.it/${loan.slug}`,
      name: t(`loans.${loan.id}.name`),
    })),
  };
  return (
    <div className="bg-white pt-16 lg:pt-20">
      <SEO titleKey="loans:meta.title" descriptionKey="loans:meta.description" canonicalPath="/prestiti" jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: t('breadcrumb.home'), to: '/' }, { label: t('breadcrumb.loans') }]} />
      <section className="bg-navy-900 py-20 lg:py-28">
        <div className="container-px text-center">
          <span className="eyebrow text-gold-400">{t('listHero.eyebrow')}</span>
          <h1 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t('listHero.title')}</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">{t('listHero.subtitle')}</p>
        </div>
      </section>
      <section className="section-pad bg-cream">
        <div ref={ref} className={`container-px ${visible ? 'reveal is-visible' : 'reveal'}`}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t('list.eyebrow')}</span>
            <h2 className="mt-4 font-serif text-3xl font-bold text-navy-900">{t('list.title')}</h2>
            <p className="mt-4 text-navy-400">{t('list.subtitle')}</p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loanProducts.map((loan) => (
              <Link key={loan.slug} to={`/${loan.slug}`} className="card-hover group overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
                <div className="relative h-48 overflow-hidden">
                  <img src={loan.image} alt={t(`loans.${loan.id}.name`)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-sm font-medium text-white/90">{t('list.fromRate')} <span className="font-bold text-gold-400">{loan.rate}</span></span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-navy-900">{t(`loans.${loan.id}.name`)}</h3>
                  <p className="mt-1 text-sm text-navy-400">{t(`loans.${loan.id}.tagline`)}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-4">
                    <div><p className="text-xs text-navy-400">{t('list.amountLabel')}</p><p className="text-sm font-medium text-navy-700">{loan.amountRange}</p></div>
                    <div><p className="text-xs text-navy-400">{t('list.termLabel')}</p><p className="text-sm font-medium text-navy-700">{loan.termRange}</p></div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-gold-600">{t('list.viewDetails')}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
