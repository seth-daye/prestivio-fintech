import { useTranslation } from 'react-i18next';

export default function Logo({ light = false }: { light?: boolean }) {
  const { t } = useTranslation('common');
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400">
        <span className="font-serif text-xl font-bold text-navy-900">P</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-serif text-xl font-bold ${light ? 'text-white' : 'text-navy-900'}`}>{t('brand.name')}</span>
        <span className={`text-[10px] font-medium uppercase tracking-widest ${light ? 'text-white/60' : 'text-navy-400'}`}>{t('brand.subtitle')}</span>
      </div>
    </div>
  );
}
