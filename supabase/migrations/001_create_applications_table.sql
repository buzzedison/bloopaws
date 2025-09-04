-- Create applications table for Vanguard Program
CREATE TABLE applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Applicant Information
  role TEXT NOT NULL CHECK (role IN ('mobile', 'bd-sales', 'investment')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,

  -- Experience & Background
  experience TEXT NOT NULL,
  portfolio TEXT NOT NULL,
  linkedin TEXT,
  github TEXT,

  -- Application Details
  motivation TEXT NOT NULL,
  availability TEXT NOT NULL,
  referral_source TEXT,

  -- Application Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'quiz_sent', 'quiz_completed', 'interview_scheduled', 'hired', 'withdrawn')),
  status_updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  status_notes TEXT,

  -- Quiz Information
  quiz_invited_at TIMESTAMP WITH TIME ZONE,
  quiz_completed_at TIMESTAMP WITH TIME ZONE,
  quiz_score INTEGER,
  quiz_passed BOOLEAN,
  quiz_feedback TEXT,

  -- Interview Information
  interview_scheduled_at TIMESTAMP WITH TIME ZONE,
  interview_completed_at TIMESTAMP WITH TIME ZONE,
  interview_notes TEXT,
  interview_rating INTEGER CHECK (interview_rating >= 1 AND interview_rating <= 5),

  -- Final Decision
  final_decision TEXT CHECK (final_decision IN ('hired', 'rejected', 'waitlist', 'pending')),
  final_decision_at TIMESTAMP WITH TIME ZONE,
  final_decision_notes TEXT,

  -- Admin Notes
  admin_notes TEXT,
  tags TEXT[],

  -- Metadata
  application_id TEXT UNIQUE, -- Auto-generated application ID like APP001
  source_ip TEXT,
  user_agent TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_role ON applications(role);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created_at ON applications(created_at DESC);
CREATE INDEX idx_applications_quiz_status ON applications(quiz_passed) WHERE quiz_completed_at IS NOT NULL;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create status_updated_at trigger
CREATE OR REPLACE FUNCTION update_status_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        NEW.status_updated_at = timezone('utc'::text, now());
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_applications_status_updated_at BEFORE UPDATE ON applications
    FOR EACH ROW EXECUTE FUNCTION update_status_updated_at();

-- Create function to generate application ID
CREATE OR REPLACE FUNCTION generate_application_id()
RETURNS TRIGGER AS $$
DECLARE
    next_id INTEGER;
    app_id TEXT;
BEGIN
    -- Get the next sequence number
    SELECT COALESCE(MAX(CAST(SUBSTRING(application_id FROM 4) AS INTEGER)), 0) + 1
    INTO next_id
    FROM applications;

    -- Generate APP001, APP002, etc.
    app_id := 'APP' || LPAD(next_id::TEXT, 3, '0');

    NEW.application_id := app_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER generate_application_id_trigger BEFORE INSERT ON applications
    FOR EACH ROW EXECUTE FUNCTION generate_application_id();

-- Create quiz_submissions table
CREATE TABLE quiz_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  -- Link to application
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  application_email TEXT NOT NULL,

  -- Quiz details
  role TEXT NOT NULL CHECK (role IN ('mobile', 'bd-sales', 'investment')),
  quiz_token TEXT UNIQUE,
  time_limit INTEGER NOT NULL, -- in minutes
  total_points INTEGER NOT NULL,

  -- Submission data
  answers JSONB NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE,
  time_taken INTEGER, -- in seconds

  -- Scoring
  mcq_score INTEGER DEFAULT 0,
  mcq_total INTEGER DEFAULT 0,
  total_score INTEGER DEFAULT 0,
  percentage DECIMAL(5,2),
  passed BOOLEAN,

  -- Grading status
  graded BOOLEAN DEFAULT FALSE,
  graded_at TIMESTAMP WITH TIME ZONE,
  graded_by TEXT,

  -- Feedback
  feedback TEXT,
  section_breakdown JSONB,

  -- Metadata
  ip_address TEXT,
  user_agent TEXT,
  time_up BOOLEAN DEFAULT FALSE
);

-- Indexes for quiz_submissions
CREATE INDEX idx_quiz_submissions_application_id ON quiz_submissions(application_id);
CREATE INDEX idx_quiz_submissions_quiz_token ON quiz_submissions(quiz_token);
CREATE INDEX idx_quiz_submissions_passed ON quiz_submissions(passed);
CREATE INDEX idx_quiz_submissions_graded ON quiz_submissions(graded);

-- Create application status history table for audit trail
CREATE TABLE application_status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  old_status TEXT,
  new_status TEXT NOT NULL,
  changed_by TEXT,
  notes TEXT
);

-- Indexes for status history
CREATE INDEX idx_status_history_application_id ON application_status_history(application_id);
CREATE INDEX idx_status_history_created_at ON application_status_history(created_at DESC);

-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_status_history ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth setup)
-- For now, allow all operations (you can restrict these later)
CREATE POLICY "Allow all operations on applications" ON applications FOR ALL USING (true);
CREATE POLICY "Allow all operations on quiz_submissions" ON quiz_submissions FOR ALL USING (true);
CREATE POLICY "Allow all operations on application_status_history" ON application_status_history FOR ALL USING (true);
