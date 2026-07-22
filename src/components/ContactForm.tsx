import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { supabase, type NewContactInquiry } from '@/lib/supabase';
import { loanProducts } from '@/data/loans';

type Props = { loanId?: string; prefillAmount?: number; prefillDuration?: number; compact?: boolean };

export default function ContactForm({ loanId, prefillAmount, prefillDuration, compact = false }: Props) {
  const { t } = useTranslation('common');
  const { t: tSim } = useTranslation('simulator');
  const { t: tLoans } = useTranslation('loans');
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const initialLoanType = loanId ?? (location.state?.loanId as string) ?? '';
  const initialAmount = prefillAmount ?? (location.state?.amount as number) ?? '';
  const initialDuration = prefillDuration ?? (location.state?.duration as number) ?? '';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    const form = e.currentTarget;
    const data = new FormData(form);
    const inquiry: NewContactInquiry = {
      full_name: String(data.get('full_name') || ''),
      email: String(data.get('email') || ''),
      phone: String(data.get('phone') || '') || undefined,
      loan_type: String(data.get('loan_type') || '') || undefined,
      loan_amount: Number(data.get('loan_amount')) || undefined,
      loan_duration: Number(data.get('loan_duration')) || undefined,
      message: String(data.get('message') || '') || undefined,
    };
    const { error: insertError } = await supabase.from('contact_inquiries').insert(inquiry);
    setSubmitting(false);
    if (insertError) { setError(true); } else { setSuccess(true); form.reset(); }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-soft">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-400/10">
          <svg className="h-7 w-7 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h3 className="mt-4 font-serif text-xl font-bold text-navy-900">{t('contactForm.successTitle')}</h3>
        <p className="mt-2 text-sm text-navy-400">{t('contactForm.successMessage')}</p>
        <button onClick={() => setSuccess(false)} className="btn-outline mt-6">{t('contactForm.sendAnother')}</button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft sm:p-8">
      {!compact && (<div className="mb-6"><h3 className="font-serif text-xl font-bold text-navy-900">{t('contactForm.title')}</h3><p className="mt-1 text-sm text-navy-400">{t('contactForm.subtitle')}</p></div>)}
      {initialAmount && initialDuration && (
        <div className="mb-6 rounded-xl border border-gold-400/20 bg-gold-400/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-600">{tSim('form.prefilledNote')}</p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-navy-700">
            <span><strong>{tSim('form.amountLabel')}:</strong> €{Number(initialAmount).toLocaleString('it-IT')}</span>
            <span><strong>{tSim('form.durationLabel')}:</strong> {initialDuration} mesi</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy-700">{t('contactForm.fullName')}</label>
          <input name="full_name" type="text" required placeholder={t('contactForm.fullNamePlaceholder')} className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="mb-1.5 block text-sm font-medium text-navy-700">{t('contactForm.email')}</label><input name="email" type="email" required placeholder={t('contactForm.emailPlaceholder')} className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400" /></div>
          <div><label className="mb-1.5 block text-sm font-medium text-navy-700">{t('contactForm.phone')}</label><input name="phone" type="tel" placeholder={t('contactForm.phonePlaceholder')} className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400" /></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy-700">{t('contactForm.loanType')}</label>
            <select name="loan_type" defaultValue={initialLoanType} className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400">
              <option value="">{t('contactForm.loanTypePlaceholder')}</option>
              {loanProducts.map((loan) => (<option key={loan.id} value={loan.id}>{tLoans(`loans.${loan.id}.name`)}</option>))}
              <option value="other">{t('contactForm.other')}</option>
            </select>
          </div>
          <div><label className="mb-1.5 block text-sm font-medium text-navy-700">{t('contactForm.loanAmount')}</label><input name="loan_amount" type="number" defaultValue={initialAmount} placeholder={t('contactForm.loanAmountPlaceholder')} className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400" /></div>
        </div>
        <div><label className="mb-1.5 block text-sm font-medium text-navy-700">{t('contactForm.loanDuration')}</label><input name="loan_duration" type="number" defaultValue={initialDuration} placeholder={t('contactForm.loanDurationPlaceholder')} className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400" /></div>
        <div><label className="mb-1.5 block text-sm font-medium text-navy-700">{t('contactForm.message')}</label><textarea name="message" rows={4} placeholder={t('contactForm.messagePlaceholder')} className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-400 focus:ring-1 focus:ring-gold-400" /></div>
        {error && (<p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{t('contactForm.errorMessage')}</p>)}
        <button type="submit" disabled={submitting} className="btn-gold w-full disabled:opacity-60">{submitting ? t('contactForm.submitting') : t('contactForm.submit')}</button>
        <p className="text-center text-xs text-navy-400">{t('contactForm.privacyNote')}</p>
      </form>
    </div>
  );
}
