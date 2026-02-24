-- ============================================================
-- referral_visits
-- One row per unique browser session that arrived via a referral link.
-- session_id is a client-generated UUID stored in sessionStorage.
-- ============================================================
CREATE TABLE IF NOT EXISTS referral_visits (
  id               UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  referral_code    TEXT        NOT NULL,
  session_id       TEXT        NOT NULL UNIQUE,   -- browser session, prevents duplicates
  ip               TEXT,                           -- first 3 octets only (anonymised)
  user_agent       TEXT,
  landing_page     TEXT        NOT NULL,
  converted_at     TIMESTAMPTZ,
  conversion_type  TEXT                            -- 'contact', 'apply', 'signup', etc.
);

CREATE INDEX IF NOT EXISTS idx_rv_referral_code ON referral_visits (referral_code);
CREATE INDEX IF NOT EXISTS idx_rv_created_at    ON referral_visits (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rv_session_id    ON referral_visits (session_id);

-- ============================================================
-- referral_events
-- Every page view or meaningful action recorded within a visit.
-- ============================================================
CREATE TABLE IF NOT EXISTS referral_events (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  visit_id      UUID        REFERENCES referral_visits (id) ON DELETE CASCADE,
  referral_code TEXT        NOT NULL,
  event_type    TEXT        NOT NULL,   -- 'page_view' | 'contact_form' | 'apply' | 'signup'
  page_path     TEXT        NOT NULL,
  metadata      JSONB
);

CREATE INDEX IF NOT EXISTS idx_re_visit_id      ON referral_events (visit_id);
CREATE INDEX IF NOT EXISTS idx_re_referral_code ON referral_events (referral_code);
CREATE INDEX IF NOT EXISTS idx_re_event_type    ON referral_events (event_type);

-- RLS: both tables are written to by the public track endpoint (no auth)
-- but only readable by the owning partner or an admin.
ALTER TABLE referral_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_events ENABLE ROW LEVEL SECURITY;

-- Public insert (the tracking API uses the service-role key server-side,
-- so these policies cover direct client use if ever needed)
CREATE POLICY "Public can insert visits"
  ON referral_visits FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert events"
  ON referral_events FOR INSERT WITH CHECK (true);

-- Partners can read visits/events for their own code
CREATE POLICY "Partners can read own visits"
  ON referral_visits FOR SELECT
  USING (
    referral_code IN (
      SELECT code FROM referral_codes WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Partners can read own events"
  ON referral_events FOR SELECT
  USING (
    referral_code IN (
      SELECT code FROM referral_codes WHERE user_id = auth.uid()
    )
  );

-- Admins can read everything
CREATE POLICY "Admins can read all visits"
  ON referral_visits FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can read all events"
  ON referral_events FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));
