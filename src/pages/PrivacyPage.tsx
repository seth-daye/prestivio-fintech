import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import LegalPage from '@/components/LegalPage';

export default function PrivacyPage() {
  const { t } = useTranslation('common');
  const sections = t('privacy.sections', { returnObjects: true }) as Record<string, { heading: string; body: string[] }>;
  return (
    <>
      <SEO titleKey="common:privacy.metaTitle" descriptionKey="common:privacy.metaDescription" canonicalPath="/privacy" />
      <LegalPage titleKey="privacy.title" breadcrumbKey="privacy.breadcrumb" dateKey="privacy.date" introKey="privacy.intro" sections={sections} />
    </>
  );
}
