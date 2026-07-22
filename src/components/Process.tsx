import { useTranslation } from 'react-i18next';
import { processSteps } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function Process() {
  const { t } = useTranslation('home');
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="section-pad bg-cream">
      <div ref={ref} className={`container-px ${visible ? 'reveal is-visible' : 'reveal'}`}>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t('process.eyebrow')}</span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">{t('process.title')}</h2>
          <p className="mt-4 text-navy-400">{t('process.subtitle')}</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.number} className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-900 font-serif text-xl font-bold text-gold-400">{step.number}</div>
              <h3 className="mt-5 font-serif text-lg font-bold text-navy-900">{t(step.titleKey)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-400">{t(step.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
