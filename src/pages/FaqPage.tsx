import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { generalFaqs } from '@/data/content';
import FAQAccordion from '@/components/FAQAccordion';
import CTA from '@/components/CTA';

export default function FaqPage() {
  const { t } = useTranslation('faq');
  const { t: tCommon } = useTranslation('common');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: generalFaqs.map((item) => ({
      '@type': 'Question',
      name: t(item.questionKey),
      acceptedAnswer: { '@type': 'Answer', text: t(item.answerKey) },
    })),
  };
  return (
    <div className="bg-cream pt-16 lg:pt-20">
      <SEO titleKey="faq:meta.title" descriptionKey="faq:meta.description" canonicalPath="/faq" jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: tCommon('nav.home'), to: '/' }, { label: tCommon('nav.faq') }]} />
      <section className="bg-navy-900 py-20 lg:py-28">
        <div className="container-px text-center">
          <span className="eyebrow text-gold-400">{t('page.eyebrow')}</span>
          <h1 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t('page.title')}</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">{t('page.subtitle')}</p>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-px max-w-3xl">
          <FAQAccordion items={generalFaqs.map((item) => ({ id: item.id, questionKey: t(item.questionKey), answerKey: t(item.answerKey) }))} />
        </div>
      </section>
      <CTA />
    </div>
  );
}
