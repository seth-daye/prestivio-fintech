import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Phone } from 'lucide-react';

export default function CTA() {
  const { t } = useTranslation('common');
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 lg:py-28">
      <div className="absolute inset-0 navy-radial" />
      <div className="container-px relative text-center">
        <span className="eyebrow text-gold-400">{t('cta.eyebrow')}</span>
        <h2 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-bold text-white text-balance sm:text-4xl">{t('cta.title')}</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">{t('cta.subtitle')}</p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link to="/contatti" className="btn-gold">{t('cta.button')}<ArrowRight className="h-4 w-4" /></Link>
          <a href="tel:+39020000000" className="flex items-center gap-2 text-sm text-white/60"><Phone className="h-4 w-4 text-gold-400" />{t('cta.callText')}</a>
        </div>
      </div>
    </section>
  );
}
