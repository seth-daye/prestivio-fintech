import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import LegalPage from '@/components/LegalPage';

export default function GdprPage() {
  const { t } = useTranslation('common');
  const sections = t('gdpr.sections', { returnObjects: true }) as Record<string, { heading: string; body: string[] }>;
  return (
    <>
      <SEO titleKey="common:gdpr.metaTitle" descriptionKey="common:gdpr.metaDescription" canonicalPath="/gdpr" />
      <LegalPage titleKey="gdpr.title" breadcrumbKey="gdpr.breadcrumb" dateKey="gdpr.date" introKey="gdpr.intro" sections={sections} />
    </>
  );
}
