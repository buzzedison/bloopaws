-- ============================================================
-- referral_codes
-- Stores the unique referral code generated for each Kazi partner.
-- ============================================================
CREATE TABLE IF NOT EXISTS referral_codes (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  user_id     UUID        NOT NULL UNIQUE,
  code        TEXT        NOT NULL UNIQUE,
  uses        INTEGER     NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_referral_codes_user_id ON referral_codes (user_id);
CREATE INDEX IF NOT EXISTS idx_referral_codes_code    ON referral_codes (code);

ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;

-- Partners can read/insert their own code
CREATE POLICY "Users can manage own referral code"
  ON referral_codes
  FOR ALL
  USING  (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can read all codes
CREATE POLICY "Admins can view all referral codes"
  ON referral_codes
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.is_admin = true
    )
  );


-- ============================================================
-- referrals
-- Each row is a lead/referral submitted by an approved Kazi partner.
-- ============================================================
CREATE TABLE IF NOT EXISTS referrals (
  id                   UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),

  -- Who referred
  referrer_id          UUID        NOT NULL,
  referrer_name        TEXT,
  referrer_email       TEXT,
  referrer_phone       TEXT,
  referrer_code        TEXT,

  -- The lead
  client_name          TEXT        NOT NULL,
  client_email         TEXT        NOT NULL,
  client_phone         TEXT,
  company_name         TEXT,
  message              TEXT,

  -- Pipeline status
  status               TEXT        NOT NULL DEFAULT 'pending'
                         CHECK (status IN (
                           'pending',
                           'contacted',
                           'meeting_scheduled',
                           'proposal_sent',
                           'closed_won',
                           'closed_lost'
                         )),

  -- Financials (filled in by admin once deal progresses)
  potential_value      NUMERIC     DEFAULT 0,
  actual_value         NUMERIC,
  commission_rate      NUMERIC     DEFAULT 0.05,
  commission           NUMERIC,
  commission_paid      BOOLEAN     NOT NULL DEFAULT false,
  commission_paid_date TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id  ON referrals (referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status        ON referrals (status);
CREATE INDEX IF NOT EXISTS idx_referrals_created_at    ON referrals (created_at DESC);

-- Keep updated_at fresh
CREATE OR REPLACE FUNCTION update_referrals_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = timezone('utc', now());
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_referrals_updated_at ON referrals;
CREATE TRIGGER trg_referrals_updated_at
  BEFORE UPDATE ON referrals
  FOR EACH ROW EXECUTE FUNCTION update_referrals_updated_at();

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Partners can insert and read/update their own referrals
CREATE POLICY "Partners can insert referrals"
  ON referrals FOR INSERT
  WITH CHECK (auth.uid() = referrer_id);

CREATE POLICY "Partners can view own referrals"
  ON referrals FOR SELECT
  USING (auth.uid() = referrer_id);

CREATE POLICY "Partners can update own referrals"
  ON referrals FOR UPDATE
  USING (auth.uid() = referrer_id)
  WITH CHECK (auth.uid() = referrer_id);

-- Admins can do everything
CREATE POLICY "Admins can manage all referrals"
  ON referrals FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.is_admin = true
    )
  );
