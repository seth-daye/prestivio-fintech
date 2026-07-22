import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import Contact from '@/components/Contact';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t } = useTranslation('contact');
  const { t: tCommon } = useTranslation('common');
  const jsonLd = { '@context': 'https://schema.org', '@type': 'ContactPage', name: t('page.title') };
  return (
    <div className="bg-cream pt-16 lg:pt-20">
      <SEO titleKey="contact:meta.title" descriptionKey="contact:meta.description" canonicalPath="/contatti" jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: tCommon('nav.home'), to: '/' }, { label: tCommon('nav.contact') }]} />
      <Contact />
    </div>
  );
}
