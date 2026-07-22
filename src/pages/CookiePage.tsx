import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';
import LegalPage from '@/components/LegalPage';

export default function CookiePage() {
  const { t } = useTranslation('common');
  const sections = t('cookie.sections', { returnObjects: true }) as Record<string, { heading: string; body: string[] }>;
  return (
    <>
      <SEO titleKey="common:cookie.metaTitle" descriptionKey="common:cookie.metaDescription" canonicalPath="/cookie" />
      <LegalPage titleKey="cookie.title" breadcrumbKey="cookie.breadcrumb" dateKey="cookie.date" introKey="cookie.intro" sections={sections} />
    </>
  );
}
