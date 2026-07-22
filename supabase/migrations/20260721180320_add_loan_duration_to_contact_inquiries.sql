/*
# Add loan_duration column to contact_inquiries

## Changes
- Adds `loan_duration` (integer, nullable) to `contact_inquiries` table.
- The ContactForm component sends `loan_duration` when submitting, and this column was missing.
*/

ALTER TABLE contact_inquiries
ADD COLUMN IF NOT EXISTS loan_duration integer;
