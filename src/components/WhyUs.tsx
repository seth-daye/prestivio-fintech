import { useTranslation } from 'react-i18next';
import { Shield, Eye, Headphones, Zap } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function WhyUs() {
  const { t } = useTranslation('home');
  const { ref, visible } = useReveal<HTMLDivElement>();
  const icons = [Shield, Eye, Headphones, Zap];
  const keys = ['f1', 'f2', 'f3', 'f4'];
  return (
    <section className="section-pad bg-navy-900">
      <div ref={ref} className={`container-px ${visible ? 'reveal is-visible' : 'reveal'}`}>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-gold-400">{t('whyUs.eyebrow')}</span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">{t('whyUs.title')}</h2>
          <p className="mt-4 text-white/60">{t('whyUs.subtitle')}</p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {keys.map((key, i) => {
            const Icon = icons[i];
            return (
              <div key={key} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-gold-400/30 hover:bg-white/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/10"><Icon className="h-6 w-6 text-gold-400" /></div>
                <h3 className="mt-5 font-serif text-lg font-bold text-white">{t(`whyUs.features.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{t(`whyUs.features.${key}.description`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
