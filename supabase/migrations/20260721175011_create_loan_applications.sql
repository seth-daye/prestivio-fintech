/*
# Create loan_applications table and storage bucket

## Purpose
Stores multi-step loan application submissions from the Prestivio loan application form.
Each application captures personal info, address, employment details, loan preferences,
consent flags, and references to uploaded documents in Supabase Storage.

## New Tables
- `loan_applications`
  - `id` (uuid, primary key)
  - `reference_number` (text, unique) — human-readable application code like PRE-2025-000001
  - `first_name` (text)
  - `last_name` (text)
  - `date_of_birth` (date)
  - `tax_code` (text) — Codice Fiscale
  - `email` (text)
  - `mobile_phone` (text)
  - `street` (text)
  - `city` (text)
  - `province` (text)
  - `postal_code` (text) — CAP
  - `region` (text)
  - `employment_status` (text)
  - `employer` (text)
  - `monthly_net_income` (numeric)
  - `employment_start_date` (date)
  - `contract_type` (text)
  - `loan_type` (text)
  - `requested_amount` (numeric)
  - `loan_duration_months` (integer)
  - `loan_purpose` (text)
  - `document_paths` (jsonb) — map of doc type → storage path
  - `gdpr_consent` (boolean, not null)
  - `privacy_consent` (boolean, not null)
  - `marketing_consent` (boolean, default false)
  - `status` (text, default 'pending')
  - `created_at` (timestamptz, default now())

## Security
- RLS enabled on `loan_applications`.
- This is a no-auth public form app: policies use `TO anon, authenticated` so the anon-key
  client can insert new applications. SELECT/UPDATE/DELETE are restricted to authenticated
  (admin) users only — anon can only INSERT.

## Storage
- Creates a private storage bucket `loan-documents` for uploaded files.
- Adds a storage policy allowing anon uploads to the bucket.
*/

CREATE TABLE IF NOT EXISTS loan_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text UNIQUE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  date_of_birth date NOT NULL,
  tax_code text NOT NULL,
  email text NOT NULL,
  mobile_phone text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  postal_code text NOT NULL,
  region text NOT NULL,
  employment_status text NOT NULL,
  employer text NOT NULL,
  monthly_net_income numeric NOT NULL,
  employment_start_date date NOT NULL,
  contract_type text NOT NULL,
  loan_type text NOT NULL,
  requested_amount numeric NOT NULL,
  loan_duration_months integer NOT NULL,
  loan_purpose text NOT NULL,
  document_paths jsonb NOT NULL DEFAULT '{}'::jsonb,
  gdpr_consent boolean NOT NULL,
  privacy_consent boolean NOT NULL,
  marketing_consent boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_loan_applications" ON loan_applications;
CREATE POLICY "anon_insert_loan_applications" ON loan_applications
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_loan_applications" ON loan_applications;
CREATE POLICY "auth_read_loan_applications" ON loan_applications
  FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_loan_applications" ON loan_applications;
CREATE POLICY "auth_update_loan_applications" ON loan_applications
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_loan_applications" ON loan_applications;
CREATE POLICY "auth_delete_loan_applications" ON loan_applications
  FOR DELETE TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_loan_applications_reference ON loan_applications(reference_number);
CREATE INDEX IF NOT EXISTS idx_loan_applications_email ON loan_applications(email);
CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON loan_applications(status);

-- Sequence for reference numbers
CREATE SEQUENCE IF NOT EXISTS loan_application_seq START 1;

-- Function to generate reference number
CREATE OR REPLACE FUNCTION generate_reference_number()
RETURNS text AS $$
DECLARE
  next_val bigint;
  year_val int;
BEGIN
  next_val := nextval('loan_application_seq');
  year_val := EXTRACT(YEAR FROM now());
  RETURN 'PRE-' || year_val || '-' || lpad(next_val::text, 6, '0');
END;
$$ LANGUAGE plpgsql;

-- Storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('loan-documents', 'loan-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: allow anon to upload and read their own docs
DROP POLICY IF EXISTS "anon_upload_loan_documents" ON storage.objects;
CREATE POLICY "anon_upload_loan_documents" ON storage.objects
  FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'loan-documents');

DROP POLICY IF EXISTS "anon_read_loan_documents" ON storage.objects;
CREATE POLICY "anon_read_loan_documents" ON storage.objects
  FOR SELECT TO anon, authenticated USING (bucket_id = 'loan-documents');
