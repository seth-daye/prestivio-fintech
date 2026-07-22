/*
# Create contact_inquiries table (single-tenant, no auth)

1. New Tables
- `contact_inquiries`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `full_name` (text, not null)
  - `email` (text, not null)
  - `phone` (text, nullable)
  - `loan_type` (text, nullable)
  - `loan_amount` (numeric, nullable)
  - `loan_duration` (integer, nullable)
  - `message` (text, nullable)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `contact_inquiries`.
- Allow anon + authenticated INSERT only (public contact form submissions).
  No SELECT/UPDATE/DELETE for anon — only admin/service role can read inquiries.

3. Notes
- This is a no-auth app: the contact form is public. Only INSERT is allowed for anon.
- All other CRUD operations are restricted to the service role (server-side only).
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  loan_type text,
  loan_amount numeric,
  loan_duration integer,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_inquiries" ON contact_inquiries;
CREATE POLICY "anon_insert_contact_inquiries"
ON contact_inquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);
