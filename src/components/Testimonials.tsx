import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function Testimonials() {
  const { t } = useTranslation('home');
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section className="section-pad bg-white">
      <div ref={ref} className={`container-px ${visible ? 'reveal is-visible' : 'reveal'}`}>
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t('testimonials.eyebrow')}</span>
          <h2 className="mt-4 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">{t('testimonials.title')}</h2>
          <p className="mt-4 text-navy-400">{t('testimonials.subtitle')}</p>
        </div>
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.id} className="rounded-2xl border border-navy-100 bg-cream p-8 shadow-soft">
              <Quote className="h-8 w-8 text-gold-400" />
              <p className="mt-4 text-navy-700 leading-relaxed">{t(item.quoteKey)}</p>
              <div className="mt-6 border-t border-navy-100 pt-4">
                <p className="font-serif font-bold text-navy-900">{t(item.authorKey)}</p>
                <p className="text-sm text-navy-400">{t(item.roleKey)} · {t(item.locationKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
