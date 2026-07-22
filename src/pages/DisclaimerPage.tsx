import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import LegalPage from '@/components/LegalPage';

export default function DisclaimerPage() {
  const { t } = useTranslation('common');
  const sections = t('disclaimer.sections', { returnObjects: true }) as Record<string, { heading: string; body: string[] }>;
  return (
    <>
      <SEO titleKey="common:disclaimer.metaTitle" descriptionKey="common:disclaimer.metaDescription" canonicalPath="/disclaimer" />
      <LegalPage titleKey="disclaimer.title" breadcrumbKey="disclaimer.breadcrumb" dateKey="disclaimer.date" introKey="disclaimer.intro" sections={sections} />
    </>
  );
}
