import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { ApplicationFormData, FormErrors } from '@/lib/applicationTypes';
import { CheckboxField, StepHeader } from '../FormFields';

type Props = { data: ApplicationFormData; errors: FormErrors; update: (field: keyof ApplicationFormData, value: boolean) => void };

export default function ConsentStep({ data, errors, update }: Props) {
  const { t } = useTranslation('application');
  return (
    <div className="animate-fade-up">
      <StepHeader eyebrow={t('progress.consent')} title={t('consent.title')} subtitle={t('consent.subtitle')} />
      <div className="space-y-6">
        <div className="rounded-xl border border-navy-100 bg-navy-50 p-5"><CheckboxField name="gdprConsent" label={t('consent.gdpr')} checked={data.gdprConsent} onChange={(v: boolean) => update('gdprConsent', v)} error={errors.gdprConsent} required /></div>
        <div className="rounded-xl border border-navy-100 bg-navy-50 p-5"><CheckboxField name="privacyConsent" label={t('consent.privacy')} checked={data.privacyConsent} onChange={(v: boolean) => update('privacyConsent', v)} error={errors.privacyConsent} required /><Link to="/privacy" className="mt-2 inline-block pl-8 text-xs font-medium text-gold-600 hover:text-gold-500">{t('consent.viewPrivacy')}</Link></div>
        <div className="rounded-xl border border-navy-100 bg-navy-50 p-5"><CheckboxField name="marketingConsent" label={t('consent.marketing')} checked={data.marketingConsent} onChange={(v: boolean) => update('marketingConsent', v)} optional /></div>
      </div>
    </div>
  );
}
