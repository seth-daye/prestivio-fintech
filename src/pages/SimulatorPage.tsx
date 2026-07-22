import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Calculator, ArrowRight, Lock } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useReveal } from '@/hooks/useReveal';

const FIXED_APR = 0.04;

function calculateMonthlyPayment(principal: number, annualRate: number, months: number): number {
  const r = annualRate / 12;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * (r * factor)) / (factor - 1);
}

export default function SimulatorPage() {
  const { t } = useTranslation('simulator');
  const { t: tCommon } = useTranslation('common');
  const navigate = useNavigate();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [amount, setAmount] = useState(20000);
  const [duration, setDuration] = useState(60);

  const { monthlyPayment, totalRepayment, totalInterest } = useMemo(() => {
    const monthly = calculateMonthlyPayment(amount, FIXED_APR, duration);
    const total = monthly * duration;
    return { monthlyPayment: monthly, totalRepayment: total, totalInterest: total - amount };
  }, [amount, duration]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t('hero.title'),
    url: 'https://prestivio.it/calcola-rata',
  };

  return (
    <div className="bg-cream pt-16 lg:pt-20">
      <SEO titleKey="simulator:meta.title" descriptionKey="simulator:meta.description" canonicalPath="/calcola-rata" jsonLd={jsonLd} />
      <Breadcrumbs items={[{ label: tCommon('nav.home'), to: '/' }, { label: t('hero.title') }]} />
      <section className="relative overflow-hidden bg-navy-900 py-20 lg:py-28">
        <div className="absolute inset-0 navy-radial" />
        <div className="container-px relative text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400/10"><Calculator className="h-7 w-7 text-gold-400" /></div>
          <span className="eyebrow mt-6 text-gold-400">{t('hero.eyebrow')}</span>
          <h1 className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-bold text-white text-balance sm:text-4xl lg:text-5xl">{t('hero.title')}</h1>
          <p className="mx-auto mt-4 max-w-xl text-white/60">{t('hero.subtitle')}</p>
        </div>
      </section>
      <section className="section-pad">
        <div ref={ref} className={`container-px ${visible ? 'reveal is-visible' : 'reveal'}`}>
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft sm:p-8">
                <div>
                  <div className="flex items-baseline justify-between">
                    <label className="text-sm font-semibold text-navy-900">{t('controls.amountLabel')}</label>
                    <span className="font-serif text-2xl font-bold text-navy-900">{t('controls.amountValue', { amount: amount.toLocaleString('it-IT') })}</span>
                  </div>
                  <input type="range" min={1000} max={100000} step={500} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="mt-4 w-full" />
                  <div className="mt-2 flex justify-between text-xs text-navy-400"><span>{t('controls.amountMin')}</span><span>{t('controls.amountMax')}</span></div>
                </div>
                <div className="mt-8">
                  <div className="flex items-baseline justify-between">
                    <label className="text-sm font-semibold text-navy-900">{t('controls.durationLabel')}</label>
                    <span className="font-serif text-2xl font-bold text-navy-900">{t('controls.durationValue', { months: duration })}</span>
                  </div>
                  <input type="range" min={12} max={120} step={6} value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="mt-4 w-full" />
                  <div className="mt-2 flex justify-between text-xs text-navy-400"><span>{t('controls.durationMin')}</span><span>{t('controls.durationMax')}</span></div>
                </div>
                <div className="mt-8 flex items-center gap-3 rounded-xl border border-navy-100 bg-navy-50 p-4">
                  <Lock className="h-5 w-5 shrink-0 text-navy-500" />
                  <div><p className="text-sm font-semibold text-navy-900">{t('rate.label')}: {t('rate.value')}</p><p className="text-xs text-navy-400">{t('rate.description')}</p></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl bg-navy-900 p-6 shadow-navy">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">{t('results.monthlyPayment.label')}</p>
                  <p className="mt-2 font-serif text-4xl font-bold text-white">€{monthlyPayment.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="mt-1 text-xs text-white/40">{t('results.monthlyPayment.subtitle')}</p>
                </div>
                <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">{t('results.totalRepayment.label')}</p>
                  <p className="mt-2 font-serif text-2xl font-bold text-navy-900">€{totalRepayment.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="mt-1 text-xs text-navy-400">{t('results.totalRepayment.subtitle')}</p>
                </div>
                <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-400">{t('results.totalInterest.label')}</p>
                  <p className="mt-2 font-serif text-2xl font-bold text-navy-900">€{totalInterest.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <p className="mt-1 text-xs text-navy-400">{t('results.totalInterest.subtitle')}</p>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-gold-400/20 bg-gold-400/5 p-5">
                  <div><p className="text-xs font-semibold uppercase tracking-wider text-gold-600">{t('results.annualRate.label')}</p><p className="text-xs text-navy-400">{t('results.annualRate.subtitle')}</p></div>
                  <p className="font-serif text-xl font-bold text-gold-600">{t('rate.value')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-soft">
            <h3 className="font-serif text-2xl font-bold text-navy-900">{t('cta.title')}</h3>
            <p className="mx-auto mt-3 max-w-lg text-navy-400">{t('cta.subtitle')}</p>
            <button onClick={() => navigate('/contatti', { state: { amount, duration } })} className="btn-gold mt-6">{t('cta.button')}<ArrowRight className="h-4 w-4" /></button>
            <p className="mx-auto mt-4 max-w-xl text-xs text-navy-400">{t('cta.disclaimer')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
