import { useTranslation } from 'react-i18next';
import type { ApplicationFormData, DocumentType, UploadedFile } from '@/lib/applicationTypes';
import { StepHeader } from '../FormFields';
import FileUpload from '../FileUpload';

type Props = { data: ApplicationFormData; update: (field: 'documents', docType: DocumentType, file: UploadedFile | null) => void; applicationId: string };

export default function DocumentsStep({ data, update, applicationId }: Props) {
  const { t } = useTranslation('application');
  const docTypes: { key: DocumentType; label: string; optional?: boolean }[] = [
    { key: 'identityCard', label: t('documents.identityCard') },
    { key: 'taxCode', label: t('documents.taxCode') },
    { key: 'payslips', label: t('documents.payslips') },
    { key: 'bankStatement', label: t('documents.bankStatement') },
    { key: 'otherDocuments', label: t('documents.otherDocuments'), optional: true },
  ];
  return (
    <div className="animate-fade-up">
      <StepHeader eyebrow={t('progress.documents')} title={t('documents.title')} subtitle={t('documents.subtitle')} />
      <div className="grid gap-5 sm:grid-cols-2">
        {docTypes.map((doc) => (<FileUpload key={doc.key} docType={doc.key} label={doc.label} optional={doc.optional} currentFile={data.documents[doc.key]} onUpload={(type, file) => update('documents', type, file)} applicationId={applicationId} />))}
      </div>
    </div>
  );
}
