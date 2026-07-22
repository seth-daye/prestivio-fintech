import { useTranslation } from 'react-i18next';
import { stats } from '@/data/content';

export default function Stats() {
  const { t } = useTranslation('home');
  return (
    <section className="border-b border-navy-100 bg-cream">
      <div className="container-px py-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="font-serif text-3xl font-bold text-navy-900 lg:text-4xl">{t(stat.valueKey)}</p>
              <p className="mt-1 text-sm text-navy-400">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
