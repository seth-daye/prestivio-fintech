import { useTranslation } from 'react-i18next';
import type { FormErrors } from '@/lib/applicationTypes';

type FieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
};

export function TextField({ name, label, placeholder, value, onChange, error, type = 'text', required, autoComplete }: FieldProps) {
  const { t } = useTranslation('application');
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy-700">{label} {required && <span className="text-gold-500">*</span>}</label>
      <input id={name} name={name} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} autoComplete={autoComplete}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all focus:ring-1 ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-navy-200 focus:border-gold-400 focus:ring-gold-400'}`} />
      {error && <p className="mt-1.5 text-xs text-red-500">{t(`errors.${error}`)}</p>}
    </div>
  );
}

type SelectFieldProps = FieldProps & { options: { value: string; label: string }[] };

export function SelectField({ name, label, placeholder, value, onChange, error, options, required }: SelectFieldProps) {
  const { t } = useTranslation('application');
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy-700">{label} {required && <span className="text-gold-500">*</span>}</label>
      <select id={name} name={name} value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all focus:ring-1 ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-navy-200 focus:border-gold-400 focus:ring-gold-400'}`}>
        <option value="">{placeholder}</option>
        {options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
      </select>
      {error && <p className="mt-1.5 text-xs text-red-500">{t(`errors.${error}`)}</p>}
    </div>
  );
}

type TextAreaFieldProps = FieldProps & { rows?: number };

export function TextAreaField({ name, label, placeholder, value, onChange, error, required, rows = 4 }: TextAreaFieldProps) {
  const { t } = useTranslation('application');
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-navy-700">{label} {required && <span className="text-gold-500">*</span>}</label>
      <textarea id={name} name={name} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-navy-900 outline-none transition-all focus:ring-1 ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-navy-200 focus:border-gold-400 focus:ring-gold-400'}`} />
      {error && <p className="mt-1.5 text-xs text-red-500">{t(`errors.${error}`)}</p>}
    </div>
  );
}

export function CheckboxField({ name, label, checked, onChange, error, required, optional }: { name: string; label: string; checked: boolean; onChange: (checked: boolean) => void; error?: string; required?: boolean; optional?: boolean }) {
  const { t } = useTranslation('application');
  return (
    <div>
      <label htmlFor={name} className="flex cursor-pointer items-start gap-3">
        <div className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
          <input id={name} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer absolute h-5 w-5 cursor-pointer appearance-none rounded-md border-2 transition-colors checked:border-gold-400 checked:bg-gold-400" />
          <svg className="pointer-events-none absolute h-3 w-3 text-navy-900 opacity-0 transition-opacity peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <div className="flex-1"><span className="text-sm leading-relaxed text-navy-700">{label} {required && <span className="text-gold-500">*</span>}{optional && <span className="ml-2 text-xs font-medium text-navy-400">{t('consent.marketingOptional')}</span>}</span></div>
      </label>
      {error && <p className="mt-1.5 pl-8 text-xs text-red-500">{t(`errors.${error}`)}</p>}
    </div>
  );
}

export function StepHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (<div className="mb-8"><span className="eyebrow">{eyebrow}</span><h2 className="mt-3 font-serif text-2xl font-bold text-navy-900">{title}</h2><p className="mt-2 text-sm text-navy-400">{subtitle}</p></div>);
}

export function ValidationErrorSummary({ errors }: { errors: FormErrors }) {
  const { t } = useTranslation('application');
  if (Object.keys(errors).length === 0) return null;
  return (<div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3"><p className="text-sm font-medium text-red-600">{t('validation.checkFields')}</p></div>);
}
