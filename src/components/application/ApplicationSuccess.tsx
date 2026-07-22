import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Clock, FileSearch, Wallet } from 'lucide-react';

type Props = { referenceNumber: string };

export default function ApplicationSuccess({ referenceNumber }: Props) {
  const { t } = useTranslation('application');
  const steps = [
    { icon: FileSearch, text: t('success.next1') },
    { icon: Clock, text: t('success.next2') },
    { icon: Wallet, text: t('success.next3') },
  ];
  return (
    <div className="container-px max-w-2xl py-16">
      <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
        <div className="bg-navy-900 px-8 py-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-400/10"><CheckCircle className="h-8 w-8 animate-check-pop text-gold-400" /></div>
          <h1 className="mt-6 font-serif text-2xl font-bold text-white text-balance sm:text-3xl">{t('success.title')}</h1>
          <p className="mt-3 text-white/60">{t('success.subtitle')}</p>
        </div>
        <div className="border-b border-navy-100 px-8 py-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">{t('success.referenceLabel')}</p>
          <p className="mt-2 font-serif text-2xl font-bold text-gold-600">{referenceNumber}</p>
        </div>
        <div className="px-8 py-8">
          <h2 className="font-serif text-lg font-bold text-navy-900">{t('success.whatNext')}</h2>
          <div className="mt-5 space-y-4">
            {steps.map((step, i) => { const Icon = step.icon; return (
              <div key={i} className="flex items-start gap-4 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50"><Icon className="h-5 w-5 text-navy-600" /></div>
                <p className="pt-1.5 text-sm leading-relaxed text-navy-700">{step.text}</p>
              </div>
            ); })}
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-navy-100 px-8 py-6 sm:flex-row sm:justify-center">
          <Link to="/" className="btn-outline">{t('success.backHome')}</Link>
          <Link to="/richiedi-prestito" className="btn-gold">{t('success.newApplication')}</Link>
        </div>
      </div>
    </div>
  );
}
