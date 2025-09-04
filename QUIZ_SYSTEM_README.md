# 🎯 Bloop Global Quiz System

A comprehensive, professional-grade assessment system for The Vanguard Program internships.

## 📋 Overview

The quiz system evaluates candidates for three internship roles:
- **Mobile Engineering Intern** - React Native, Flutter, Supabase
- **Business Development & Sales Intern** - Pipeline management, client acquisition
- **Investment Analyst Intern** - Financial modeling, market analysis

## 🏗️ System Architecture

### Core Components

1. **Quiz Data Structure** (`lib/quiz-data.ts`)
   - Configurable quiz settings per role
   - MCQ and short answer question types
   - Automatic scoring for multiple choice
   - Manual grading workflow for essays

2. **Quiz Components**
   - `MCQQuestion` - Multiple choice with real-time feedback
   - `ShortAnswerQuestion` - Text areas with character limits
   - `QuizTimer` - Visual countdown with warnings
   - `QuizSection` - Section-based navigation

3. **Dynamic Quiz Pages**
   - `/quiz/[role]` - Main quiz interface
   - `/quiz/[role]/results` - Results display

4. **API Endpoints**
   - `/api/quiz/submit` - Quiz submission and auto-scoring
   - `/api/quiz/results` - Results retrieval and manual grading
   - `/api/quiz/invite` - Send quiz invitation emails

5. **Admin Interface**
   - `/admin/quiz-invitations` - Send bulk quiz invitations

## 🎮 Quiz Flow

```
Application Submitted → Manual Review → Quiz Invitation → Quiz Completion → Results Email → Manual Grading → Final Decision
```

## 📊 Quiz Specifications

### Mobile Engineering Quiz (45 min, 100 pts)
- **Section 1**: Core Concepts (MCQ, 30 pts) - React Native, Flutter, Supabase
- **Section 2**: Debugging (Short Answer, 20 pts) - Code analysis and fixes
- **Section 3**: Build Task (Short Answer, 25 pts) - Architecture design
- **Section 4**: Testing & Deployment (Short Answer, 25 pts) - Release hygiene

### Business Development Quiz (40 min, 100 pts)
- **Section 1**: Pipeline Math (MCQ, 20 pts) - Sales calculations
- **Section 2**: Case Study (Short Answer, 30 pts) - ICP and messaging
- **Section 3**: Objection Handling (Short Answer, 20 pts) - Sales responses
- **Section 4**: Strategy (Short Answer, 30 pts) - KPIs and offers

### Investment Analyst Quiz (45 min, 100 pts)
- **Section 1**: Financial Math (MCQ, 25 pts) - LTV, CAC, unit economics
- **Section 2**: Market Analysis (Short Answer, 25 pts) - Competitive positioning
- **Section 3**: Modeling (Short Answer, 30 pts) - MRR projections and memos
- **Section 4**: Research (Short Answer, 20 pts) - Data sources and visualization

## 🚀 Getting Started

### 1. Environment Setup

Add to your `.env.local`:

```bash
# Resend Email Service (Required)
RESEND_API_KEY=your_resend_api_key_here

# Base URL for quiz links
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

### 2. Send Quiz Invitations

Visit `/admin/quiz-invitations` to send quiz invitations to approved applicants.

**Sample API call:**

```javascript
fetch('/api/quiz/invite', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    applicantName: 'John Doe',
    applicantEmail: 'john.doe@example.com',
    role: 'mobile',
    applicationId: 'APP001' // Optional
  })
});
```

### 3. Monitor Results

- Quiz submissions are emailed to `ask@bloopglobal.com`
- Results are stored in memory (upgrade to database for production)
- Short answer questions require manual grading via `/api/quiz/results`

## 🎯 Key Features

### ✅ Professional UX
- Clean, mobile-responsive design
- Real-time progress tracking
- Auto-save functionality
- Visual timer with warnings

### ✅ Anti-Cheating Measures
- One-time quiz links with unique tokens
- Time limits with auto-submission
- No external help instructions
- Attestation checkbox (can be added)

### ✅ Comprehensive Scoring
- Automatic MCQ grading
- Manual essay evaluation workflow
- Detailed result breakdowns
- Email notifications for all stakeholders

### ✅ Email Integration
- Professional invitation emails
- Confirmation emails to applicants
- Internal notifications for team
- Follow-up emails with results

## 📈 Analytics & Insights

### Scoring Metrics
- Overall pass/fail rate
- Section-by-section performance
- Question-level difficulty analysis
- Time-to-completion tracking

### Manual Grading Process
1. Receive submission notification email
2. Review short answer responses
3. Update scores via API
4. Send final results email

## 🔧 Customization

### Adding New Quiz Questions

Edit `lib/quiz-data.ts`:

```typescript
{
  id: 'new-question',
  question: 'Your question here?',
  options: [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' }
  ],
  correctAnswer: 'a',
  points: 5
}
```

### Modifying Quiz Settings

Update quiz configuration:

```typescript
const QUIZ_CONFIGS = {
  your_role: {
    timeLimit: 60, // minutes
    totalPoints: 100,
    passingScore: 75, // percentage
    sections: [...]
  }
}
```

### Custom Email Templates

Modify email templates in:
- `/api/quiz/invite/route.ts` - Invitation emails
- `/api/quiz/submit/route.ts` - Confirmation and internal notifications

## 🚨 Production Considerations

### Database Integration
Replace in-memory storage with:
- PostgreSQL/Supabase for quiz data
- Redis for session management
- File storage for quiz attempts

### Security Enhancements
- Rate limiting for quiz submissions
- IP tracking and fraud detection
- Browser fingerprinting
- Screenshot prevention

### Scaling
- Load balancing for concurrent quiz takers
- CDN for static quiz assets
- Queue system for email processing
- Database indexing for performance

## 📞 Support

For technical issues or feature requests:
- Email: ask@bloopglobal.com
- Check `/admin/quiz-invitations` for bulk operations
- Monitor email notifications for system health

## 🎉 Success Metrics

Track these KPIs:
- Quiz completion rate (>80%)
- Average quiz scores
- Time-to-hire reduction
- Candidate quality improvement
- Team feedback on hire quality

---

**Built with ❤️ for Bloop Global's Vanguard Program**
