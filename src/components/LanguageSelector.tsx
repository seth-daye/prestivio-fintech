import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import { supportedLanguages } from '@/i18n';

export default function LanguageSelector({ light = false }: { light?: boolean }) {
  const { i18n, t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const current = supportedLanguages.find((l) => l.code === i18n.language) ?? supportedLanguages[0];
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${light ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-navy-600 hover:text-navy-900 hover:bg-navy-50'}`}
        aria-label={t('languageSelector.selectLanguage')}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{current.flag}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-navy-100 bg-white shadow-navy">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { i18n.changeLanguage(lang.code); setOpen(false); }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-navy-50 ${lang.code === current.code ? 'text-gold-600 font-semibold' : 'text-navy-700'}`}
              >
                <span>{lang.label}</span>
                <span className="text-xs text-navy-400">{lang.flag}</span>
                {lang.code === current.code && <Check className="h-3.5 w-3.5 text-gold-500" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
