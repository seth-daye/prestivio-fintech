import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import type { DocumentType, UploadedFile } from '@/lib/applicationTypes';
import { validateFile } from '@/lib/validation';
import { supabase } from '@/lib/supabase';

type Props = {
  docType: DocumentType;
  label: string;
  optional?: boolean;
  currentFile?: UploadedFile;
  onUpload: (docType: DocumentType, file: UploadedFile | null) => void;
  applicationId: string;
};

export default function FileUpload({ docType, label, optional, currentFile, onUpload, applicationId }: Props) {
  const { t } = useTranslation('application');
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File) => {
    setError(null);
    const validationError = validateFile(file);
    if (validationError) { setError(validationError); return; }
    setUploading(true);
    try {
      const ext = file.name.split('.').pop() || 'bin';
      const filePath = `${applicationId}/${docType}-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('loan-documents').upload(filePath, file);
      if (uploadError) throw uploadError;
      onUpload(docType, { file, path: filePath, name: file.name, size: file.size });
    } catch { setError('uploadFailed'); } finally { setUploading(false); }
  };

  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if (file) handleFile(file); };
  const handleRemove = () => { onUpload(docType, null); if (inputRef.current) inputRef.current.value = ''; };

  if (currentFile) {
    return (
      <div className="rounded-xl border border-navy-100 bg-white p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/10"><CheckCircle className="h-5 w-5 text-gold-500" /></div>
            <div><p className="text-sm font-medium text-navy-900">{currentFile.name}</p><p className="text-xs text-navy-400">{(currentFile.size / 1024).toFixed(0)} KB</p></div>
          </div>
          <button onClick={handleRemove} className="rounded-lg p-1.5 text-navy-400 transition-colors hover:bg-navy-50 hover:text-navy-700"><X className="h-4 w-4" /></button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 flex items-center gap-2"><FileText className="h-4 w-4 text-navy-400" /><span className="text-sm font-medium text-navy-700">{label}</span>{optional && <span className="text-xs text-navy-400">({t('documents.optional')})</span>}</div>
      <div onClick={() => inputRef.current?.click()} onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${isDragging ? 'border-gold-400 bg-gold-400/5' : 'border-navy-200 hover:border-navy-300 hover:bg-navy-50'} ${uploading ? 'pointer-events-none opacity-60' : ''}`}>
        <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file); }} />
        <Upload className="mx-auto h-6 w-6 text-navy-300" />
        <p className="mt-2 text-sm text-navy-400">{uploading ? '...' : t('documents.dragDrop')}</p>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{t(`errors.${error}`)}</p>}
      <p className="mt-1.5 text-xs text-navy-300">{t('documents.maxSize')} · {t('documents.acceptedFormats')}</p>
    </div>
  );
}
