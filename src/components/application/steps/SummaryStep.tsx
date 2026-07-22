import { useTranslation } from 'react-i18next';
import { Pencil } from 'lucide-react';
import type { ApplicationFormData } from '@/lib/applicationTypes';
import { loanProducts } from '@/data/loans';
import { StepHeader } from '../FormFields';

type Props = { data: ApplicationFormData; onEdit: (step: number) => void };

type SummaryRow = { label: string; value: string };

function Section({ title, rows, onEdit, step }: { title: string; rows: SummaryRow[]; onEdit: (step: number) => void; step: number }) {
  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-lg font-bold text-navy-900">{title}</h3>
        <button onClick={() => onEdit(step)} className="flex items-center gap-1.5 text-xs font-semibold text-gold-600 transition-colors hover:text-gold-500"><Pencil className="h-3.5 w-3.5" /></button>
      </div>
      <dl className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {rows.map((row, i) => (<div key={i}><dt className="text-xs text-navy-400">{row.label}</dt><dd className="text-sm font-medium text-navy-900">{row.value || '—'}</dd></div>))}
      </dl>
    </div>
  );
}

export default function SummaryStep({ data, onEdit }: Props) {
  const { t } = useTranslation('application');
  const { t: tLoans } = useTranslation('loans');
  const loanName = loanProducts.find((l) => l.id === data.loanType);
  const employmentStatusLabel = data.employmentStatus ? t(`employmentStatuses.${data.employmentStatus}`) : '—';
  const contractTypeLabel = data.contractType ? t(`contractTypes.${data.contractType}`) : '—';
  const loanTypeLabel = loanName ? tLoans(`loans.${loanName.id}.name`) : '—';
  const docEntries = Object.entries(data.documents);
  const docLabels: Record<string, string> = { identityCard: t('documents.identityCard'), taxCode: t('documents.taxCode'), payslips: t('documents.payslips'), bankStatement: t('documents.bankStatement'), otherDocuments: t('documents.otherDocuments') };

  return (
    <div className="animate-fade-up">
      <StepHeader eyebrow={t('progress.summary')} title={t('summary.title')} subtitle={t('summary.subtitle')} />
      <div className="space-y-4">
        <Section title={t('summary.personalSection')} step={0} onEdit={onEdit} rows={[
          { label: t('personal.firstName'), value: data.firstName }, { label: t('personal.lastName'), value: data.lastName },
          { label: t('personal.dateOfBirth'), value: data.dateOfBirth }, { label: t('personal.taxCode'), value: data.taxCode },
          { label: t('personal.email'), value: data.email }, { label: t('personal.mobilePhone'), value: data.mobilePhone },
        ]} />
        <Section title={t('summary.addressSection')} step={1} onEdit={onEdit} rows={[
          { label: t('address.street'), value: data.street }, { label: t('address.city'), value: data.city },
          { label: t('address.province'), value: data.province }, { label: t('address.postalCode'), value: data.postalCode },
          { label: t('address.region'), value: data.region },
        ]} />
        <Section title={t('summary.employmentSection')} step={2} onEdit={onEdit} rows={[
          { label: t('employment.employmentStatus'), value: employmentStatusLabel }, { label: t('employment.employer'), value: data.employer },
          { label: t('employment.monthlyNetIncome'), value: data.monthlyNetIncome ? `€${Number(data.monthlyNetIncome).toLocaleString('it-IT')}` : '—' },
          { label: t('employment.employmentStartDate'), value: data.employmentStartDate }, { label: t('employment.contractType'), value: contractTypeLabel },
        ]} />
        <Section title={t('summary.loanSection')} step={3} onEdit={onEdit} rows={[
          { label: t('loan.loanType'), value: loanTypeLabel },
          { label: t('loan.requestedAmount'), value: data.requestedAmount ? `€${Number(data.requestedAmount).toLocaleString('it-IT')}` : '—' },
          { label: t('loan.loanDuration'), value: data.loanDuration ? `${data.loanDuration} mesi` : '—' }, { label: t('loan.purpose'), value: data.purpose },
        ]} />
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-navy-900">{t('summary.documentsSection')}</h3>
            <button onClick={() => onEdit(4)} className="flex items-center gap-1.5 text-xs font-semibold text-gold-600 transition-colors hover:text-gold-500"><Pencil className="h-3.5 w-3.5" /></button>
          </div>
          {docEntries.length === 0 ? (<p className="mt-4 text-sm text-navy-400">{t('summary.noDocuments')}</p>) : (
            <ul className="mt-4 space-y-2">{docEntries.map(([key, file]) => (<li key={key} className="flex items-center gap-2 text-sm text-navy-700"><span className="h-2 w-2 rounded-full bg-gold-400" />{docLabels[key] || key}: <span className="font-medium">{file?.name}</span></li>))}</ul>
          )}
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-navy-900">{t('summary.consentSection')}</h3>
            <button onClick={() => onEdit(5)} className="flex items-center gap-1.5 text-xs font-semibold text-gold-600 transition-colors hover:text-gold-500"><Pencil className="h-3.5 w-3.5" /></button>
          </div>
          <dl className="mt-4 space-y-2">
            <div className="flex justify-between text-sm"><dt className="text-navy-400">{t('consent.gdpr')}</dt><dd className="font-medium text-navy-900">{data.gdprConsent ? t('summary.yes') : t('summary.no')}</dd></div>
            <div className="flex justify-between text-sm"><dt className="text-navy-400">{t('consent.privacy')}</dt><dd className="font-medium text-navy-900">{data.privacyConsent ? t('summary.yes') : t('summary.no')}</dd></div>
            <div className="flex justify-between text-sm"><dt className="text-navy-400">{t('consent.marketing')}</dt><dd className="font-medium text-navy-900">{data.marketingConsent ? t('summary.yes') : t('summary.no')}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  );
}
