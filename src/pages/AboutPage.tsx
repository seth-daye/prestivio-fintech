import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Stats from '@/components/Stats';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';

export default function AboutPage() {
  const { t } = useTranslation('home');
  const { t: tCommon } = useTranslation('common');
  const jsonLd = { '@context': 'https://schema.org', '@type': 'AboutPage', name: t('whyUs.title') };
  return (
    <div className="bg-white pt-16 lg:pt-20">
      <SEO titleKey="home:whyUs.title" descriptionKey="home:whyUs.subtitle" canonicalPath="/chi-siamo" jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: tCommon('nav.home'), to: '/' }, { label: tCommon('nav.about') }]} />
      <section className="bg-navy-900 py-20 lg:py-28">
        <div className="container-px text-center">
          <span className="eyebrow text-gold-400">{t('whyUs.eyebrow')}</span>
          <h1 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t('whyUs.title')}</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">{t('whyUs.subtitle')}</p>
        </div>
      </section>
      <Stats />
      <WhyUs />
      <Testimonials />
      <CTA />
    </div>
  );
}
