import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import LoanApplicationForm from '@/components/application/LoanApplicationForm';
import ApplicationSuccess from '@/components/application/ApplicationSuccess';

export default function LoanApplicationPage() {
  const { t } = useTranslation('application');
  const { t: tCommon } = useTranslation('common');
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const jsonLd = { '@context': 'https://schema.org', '@type': 'WebForm', name: t('page.title') };
  return (
    <div className="bg-cream pt-16 pb-20 lg:pt-20 lg:pb-28">
      <SEO titleKey="application:meta.title" descriptionKey="application:meta.description" canonicalPath="/richiedi-prestito" jsonLd={jsonLd} />
      {!referenceNumber && <Breadcrumbs items={[{ label: tCommon('nav.home'), to: '/' }, { label: tCommon('nav.apply') }]} />}
      <section className="bg-navy-900 py-16 lg:py-20">
        <div className="container-px text-center">
          <span className="eyebrow text-gold-400">{t('page.eyebrow')}</span>
          <h1 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-bold text-white text-balance sm:text-4xl lg:text-5xl">{t('page.title')}</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">{t('page.subtitle')}</p>
        </div>
      </section>
      {referenceNumber ? (
        <ApplicationSuccess referenceNumber={referenceNumber} />
      ) : (
        <LoanApplicationForm onSuccess={(ref) => setReferenceNumber(ref)} />
      )}
    </div>
  );
}
