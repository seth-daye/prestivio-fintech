import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import LegalPage from '@/components/LegalPage';

export default function TermsPage() {
  const { t } = useTranslation('common');
  const sections = t('terms.sections', { returnObjects: true }) as Record<string, { heading: string; body: string[] }>;
  return (
    <>
      <SEO titleKey="common:terms.metaTitle" descriptionKey="common:terms.metaDescription" canonicalPath="/termini" />
      <LegalPage titleKey="terms.title" breadcrumbKey="terms.breadcrumb" dateKey="terms.date" introKey="terms.intro" sections={sections} />
    </>
  );
}
