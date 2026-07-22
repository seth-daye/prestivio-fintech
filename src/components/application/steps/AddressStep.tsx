import { useTranslation } from 'react-i18next';
import type { ApplicationFormData, FormErrors } from '@/lib/applicationTypes';
import { TextField, StepHeader } from '../FormFields';

type Props = { data: ApplicationFormData; errors: FormErrors; update: (field: keyof ApplicationFormData, value: string) => void };

export default function AddressStep({ data, errors, update }: Props) {
  const { t } = useTranslation('application');
  return (
    <div className="animate-fade-up">
      <StepHeader eyebrow={t('progress.address')} title={t('address.title')} subtitle={t('address.subtitle')} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2"><TextField name="street" label={t('address.street')} placeholder={t('address.streetPlaceholder')} value={data.street} onChange={(v: string) => update('street', v)} error={errors.street} required autoComplete="street-address" /></div>
        <TextField name="city" label={t('address.city')} placeholder={t('address.cityPlaceholder')} value={data.city} onChange={(v: string) => update('city', v)} error={errors.city} required autoComplete="address-level2" />
        <TextField name="province" label={t('address.province')} placeholder={t('address.provincePlaceholder')} value={data.province} onChange={(v: string) => update('province', v.toUpperCase())} error={errors.province} required />
        <TextField name="postalCode" label={t('address.postalCode')} placeholder={t('address.postalCodePlaceholder')} value={data.postalCode} onChange={(v: string) => update('postalCode', v)} error={errors.postalCode} required autoComplete="postal-code" />
        <TextField name="region" label={t('address.region')} placeholder={t('address.regionPlaceholder')} value={data.region} onChange={(v: string) => update('region', v)} error={errors.region} required autoComplete="address-level1" />
      </div>
    </div>
  );
}
