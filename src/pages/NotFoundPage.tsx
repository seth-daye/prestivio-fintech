import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '@/components/SEO';

export default function NotFoundPage() {
  const { t } = useTranslation('common');
  return (
    <>
      <SEO titleKey="common:notFound.title" descriptionKey="common:notFound.message" canonicalPath="/" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-navy-900 px-6 text-center">
        <p className="font-serif text-7xl font-bold text-gold-400">{t('notFound.code')}</p>
        <h1 className="mt-4 font-serif text-2xl font-bold text-white">{t('notFound.title')}</h1>
        <p className="mt-3 max-w-md text-white/60">{t('notFound.message')}</p>
        <div className="mt-8 flex gap-4">
          <Link to="/" className="btn-gold">{t('notFound.backHome')}</Link>
          <Link to="/contatti" className="btn-ghost-light">{t('notFound.contactUs')}</Link>
        </div>
      </div>
    </>
  );
}
