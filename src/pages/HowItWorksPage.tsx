import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Process from '@/components/Process';
import Stats from '@/components/Stats';
import CTA from '@/components/CTA';

export default function HowItWorksPage() {
  const { t } = useTranslation('home');
  const { t: tCommon } = useTranslation('common');
  const jsonLd = { '@context': 'https://schema.org', '@type': 'HowTo', name: t('process.title') };
  return (
    <div className="bg-white pt-16 lg:pt-20">
      <SEO titleKey="home:process.title" descriptionKey="home:process.subtitle" canonicalPath="/come-funziona" jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: tCommon('nav.home'), to: '/' }, { label: tCommon('nav.howItWorks') }]} />
      <section className="bg-navy-900 py-20 lg:py-28">
        <div className="container-px text-center">
          <span className="eyebrow text-gold-400">{t('process.eyebrow')}</span>
          <h1 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t('process.title')}</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">{t('process.subtitle')}</p>
        </div>
      </section>
      <Stats />
      <Process />
      <CTA />
    </div>
  );
}
