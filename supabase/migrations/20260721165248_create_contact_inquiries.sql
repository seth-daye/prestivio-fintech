/*
# Create contact_inquiries table (single-tenant, no auth)

1. New Tables
- `contact_inquiries` — stores loan inquiry submissions from the contact form
- `id` (uuid, primary key)
- `full_name` (text, not null) — name of the person requesting consultation
- `email` (text, not null) — contact email
- `phone` (text, nullable) — optional phone number
- `loan_type` (text, nullable) — type of loan requested (slug)
- `loan_amount` (integer, nullable) — estimated loan amount in euros
- `message` (text, nullable) — additional message from the user
- `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `contact_inquiries`.
- Allow anon + authenticated INSERT only (public can submit inquiries).
- No SELECT/UPDATE/DELETE for anon (inquiries are private to admins).
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  loan_type text,
  loan_amount integer,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON contact_inquiries;
CREATE POLICY "anon_insert_inquiries" ON contact_inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);
