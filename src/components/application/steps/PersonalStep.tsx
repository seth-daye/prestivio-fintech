import { useTranslation } from 'react-i18next';
import type { ApplicationFormData, FormErrors } from '@/lib/applicationTypes';
import { TextField, StepHeader } from '../FormFields';

type Props = { data: ApplicationFormData; errors: FormErrors; update: (field: keyof ApplicationFormData, value: string) => void };

export default function PersonalStep({ data, errors, update }: Props) {
  const { t } = useTranslation('application');
  return (
    <div className="animate-fade-up">
      <StepHeader eyebrow={t('progress.personal')} title={t('personal.title')} subtitle={t('personal.subtitle')} />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField name="firstName" label={t('personal.firstName')} placeholder={t('personal.firstNamePlaceholder')} value={data.firstName} onChange={(v: string) => update('firstName', v)} error={errors.firstName} required />
        <TextField name="lastName" label={t('personal.lastName')} placeholder={t('personal.lastNamePlaceholder')} value={data.lastName} onChange={(v: string) => update('lastName', v)} error={errors.lastName} required />
        <TextField name="dateOfBirth" label={t('personal.dateOfBirth')} type="date" value={data.dateOfBirth} onChange={(v: string) => update('dateOfBirth', v)} error={errors.dateOfBirth} required />
        <TextField name="taxCode" label={t('personal.taxCode')} placeholder={t('personal.taxCodePlaceholder')} value={data.taxCode} onChange={(v: string) => update('taxCode', v.toUpperCase())} error={errors.taxCode} required />
        <TextField name="email" label={t('personal.email')} placeholder={t('personal.emailPlaceholder')} type="email" value={data.email} onChange={(v: string) => update('email', v)} error={errors.email} required autoComplete="email" />
        <TextField name="mobilePhone" label={t('personal.mobilePhone')} placeholder={t('personal.mobilePhonePlaceholder')} type="tel" value={data.mobilePhone} onChange={(v: string) => update('mobilePhone', v)} error={errors.mobilePhone} required autoComplete="tel" />
      </div>
    </div>
  );
}
