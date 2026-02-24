-- Referral partner onboarding and approval workflow for the Kazi program
CREATE TABLE IF NOT EXISTS referral_partner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  user_id UUID NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  city_country TEXT NOT NULL,
  industry TEXT NOT NULL,
  network TEXT NOT NULL,
  motivation TEXT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_at TIMESTAMPTZ NULL,
  approved_by UUID NULL,
  admin_notes TEXT NULL
);

CREATE INDEX IF NOT EXISTS idx_referral_partner_applications_email
  ON referral_partner_applications (email);

CREATE INDEX IF NOT EXISTS idx_referral_partner_applications_status
  ON referral_partner_applications (status);

-- Keep updated_at fresh on row edits
CREATE OR REPLACE FUNCTION update_referral_partner_applications_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_referral_partner_applications_updated_at
  ON referral_partner_applications;

CREATE TRIGGER trg_referral_partner_applications_updated_at
  BEFORE UPDATE ON referral_partner_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_referral_partner_applications_updated_at();

ALTER TABLE referral_partner_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application, but only as pending.
DROP POLICY IF EXISTS "Anyone can submit referral partner application"
  ON referral_partner_applications;

CREATE POLICY "Anyone can submit referral partner application"
  ON referral_partner_applications
  FOR INSERT
  WITH CHECK (
    status = 'pending'
    AND approved_at IS NULL
    AND approved_by IS NULL
  );

-- Authenticated users can read only their own application by email.
DROP POLICY IF EXISTS "Users can view own referral partner application"
  ON referral_partner_applications;

CREATE POLICY "Users can view own referral partner application"
  ON referral_partner_applications
  FOR SELECT
  USING (
    lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );

-- Admins can read and manage all applications.
DROP POLICY IF EXISTS "Admins can view referral partner applications"
  ON referral_partner_applications;

CREATE POLICY "Admins can view referral partner applications"
  ON referral_partner_applications
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM profiles p
      WHERE p.id = auth.uid()
        AND p.is_admin = true
    )
  );

DROP POLICY IF EXISTS "Admins can update referral partner applications"
  ON referral_partner_applications;

CREATE POLICY "Admins can update referral partner applications"
  ON referral_partner_applications
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM profiles p
      WHERE p.id = auth.uid()
        AND p.is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM profiles p
      WHERE p.id = auth.uid()
        AND p.is_admin = true
    )
  );
