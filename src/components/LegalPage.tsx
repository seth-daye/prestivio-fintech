import { useTranslation } from 'react-i18next';
import { Shield } from 'lucide-react';

type Section = { heading: string; body: string[] };
type Props = { titleKey: string; breadcrumbKey: string; dateKey: string; introKey: string; sections: Record<string, Section> };

export default function LegalPage({ titleKey, breadcrumbKey, dateKey, introKey, sections }: Props) {
  const { t } = useTranslation('common');
  return (
    <div className="bg-cream pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="container-px max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-navy-400"><Shield className="h-4 w-4 text-gold-500" />{t(breadcrumbKey)}</div>
        <h1 className="mt-4 font-serif text-3xl font-bold text-navy-900 sm:text-4xl">{t(titleKey)}</h1>
        <p className="mt-2 text-sm text-navy-400">{t('legal.lastUpdated', { date: t(dateKey) })}</p>
        <p className="mt-6 leading-relaxed text-navy-700">{t(introKey)}</p>
        {Object.entries(sections).map(([key, section]) => (
          <div key={key} className="mt-8">
            <h2 className="font-serif text-xl font-bold text-navy-900">{t(`${titleKey}.sections.${key}.heading`)}</h2>
            {section.body.map((_, i) => (<p key={i} className="mt-3 leading-relaxed text-navy-700">{t(`${titleKey}.sections.${key}.body.${i}`)}</p>))}
          </div>
        ))}
        <div className="mt-12 rounded-xl border border-navy-100 bg-white p-6 text-sm text-navy-400">{t('legal.contactPrompt')} <a href="mailto:privacy@prestivio.it" className="font-medium text-gold-600">{t('legal.privacyEmail')}</a></div>
      </div>
    </div>
  );
}
