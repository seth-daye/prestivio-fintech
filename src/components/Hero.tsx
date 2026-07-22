import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Calculator } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function Hero() {
  const { t } = useTranslation('home');
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="absolute inset-0 navy-radial" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900 to-navy-800" />
      <div ref={ref} className={`container-px relative ${visible ? 'reveal is-visible' : 'reveal'}`}>
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow text-gold-400">{t('hero.eyebrow')}</span>
          <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-white text-balance sm:text-5xl lg:text-6xl">{t('hero.title')}</h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70 text-balance">{t('hero.subtitle')}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/contatti" className="btn-gold">{t('hero.cta')}<ArrowRight className="h-4 w-4" /></Link>
            <Link to="/calcola-rata" className="btn-ghost-light"><Calculator className="h-4 w-4" />{t('hero.secondaryCta')}</Link>
          </div>
          <p className="mt-8 text-xs text-white/40">{t('hero.trustBadge')}</p>
        </div>
      </div>
    </section>
  );
}
