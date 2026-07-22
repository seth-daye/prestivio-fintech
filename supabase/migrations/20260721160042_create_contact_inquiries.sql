/*
# Create contact_inquiries table

1. Purpose
   Stores inquiries submitted through the Prestivio public contact form.
   This is a single-tenant, no-auth marketing site: there is no sign-in screen,
   so the frontend operates as the anon role for its entire lifetime.

2. New Tables
   - `contact_inquiries`
     - `id` (uuid, primary key, default gen_random_uuid())
     - `full_name` (text, not null) — submitter's full name
     - `email` (text, not null) — submitter's email address
     - `phone` (text) — optional phone number
     - `loan_type` (text) — category of financing interest (mortgage, business, personal, auto, other)
     - `loan_amount` (numeric) — requested loan amount in EUR, optional
     - `message` (text) — free-form inquiry message
     - `status` (text, default 'new') — internal workflow status (new, contacted, closed)
     - `created_at` (timestamptz, default now())

3. Security
   - Enable RLS on `contact_inquiries`.
   - This is a public contact form with no sign-in, so we use `TO anon, authenticated`.
   - INSERT is open to anon (anyone can submit an inquiry) WITH CHECK (true).
   - SELECT/UPDATE/DELETE are intentionally NOT granted to anon — only authenticated
     staff (via a future admin tool) should read or manage inquiries. For now the
     table is write-only from the public frontend.

4. Important Notes
   - No `user_id` column or auth.users reference — this is a no-auth marketing site.
   - The anon-key frontend can only INSERT; it cannot read back submitted inquiries.
   - Re-running this migration is safe: all statements use IF NOT EXISTS / DROP IF EXISTS.
*/

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  loan_type text,
  loan_amount numeric,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON contact_inquiries;
CREATE POLICY "anon_insert_inquiries"
  ON contact_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
