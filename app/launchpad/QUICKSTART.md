# Launchpad Quick Start Guide

## Adding Your First Founder Story (5-10 minutes)

Follow these steps to publish your first founder story to the Launchpad.

---

## Step 1: Deploy Sanity Schema (One-Time Setup)

```bash
cd sanity
npm run deploy
```

This updates your Sanity Studio with the new Launchpad fields.

---

## Step 2: Open Sanity Studio

1. Navigate to your Sanity Studio URL (usually `localhost:3333` or your deployed studio)
2. Sign in if prompted
3. Click on "Launchpad Story" (or "Case Study") in the sidebar

---

## Step 3: Create or Edit a Story

### Required Fields (Minimum Viable Story)

**Company Info:**
- ✅ **Company/Product Name**: e.g., "AgriPro Hub"
- ✅ **Slug**: Auto-generated from title (e.g., "agripro-hub")
- ✅ **One-Line Transformation**: e.g., "How we helped AgriPro go from idea to 500 farmers in 8 weeks"

**Founder Info:**
- ✅ **Founder Name**: e.g., "Dela Ahiabor"
- ✅ **Founder Role**: e.g., "Founder & CEO"
- ✅ **Founder Photo**: Upload a professional headshot (square crop recommended)

**Content:**
- ✅ **The Backstory**: 2-3 sentences about what they were trying to solve
- ✅ **Short Description**: For SEO and card previews
- ✅ **Key Result**: e.g., "500 farmers onboarded in 8 weeks"

**Visuals:**
- ✅ **Main Image**: Hero image for the story (landscape, 1600x1000px recommended)
- ✅ **Logo**: Company logo (square, transparent background preferred)

### Recommended Fields (Better Story)

**Classification:**
- 📌 **Industry**: Select from dropdown (Agtech, Fintech, etc.)
- 📌 **Stage**: MVP, Scale, or Enterprise
- 📌 **Primary Outcome**: Revenue Growth, Operational Efficiency, etc.

**The Build:**
- 📌 **Tech Stack**: Add 3-5 technologies (e.g., "Next.js", "Supabase", "Vercel")
- 📌 **Build Timeline**: e.g., "6 weeks from concept to launch"
- 📌 **Technical Challenges**: List 2-3 major hurdles

**Proof:**
- 📌 **Metrics**: Add 2-4 key numbers
  - Label: "Farmers Onboarded"
  - Value: "500+"
  - Period: "First 8 weeks"
- 📌 **Founder Testimonial**: Quote from the founder

### Optional (Elite Story)

**Deep Content:**
- 🎯 **The Problem** (Rich Text): Detailed explanation with market context
- 🎯 **The Build** (Rich Text): Technical approach and decisions
- 🎯 **The Outcome** (Rich Text): Results and what happened next

**Advanced:**
- 🎯 **Stack Decisions**: Document key technical choices with reasoning
- 🎯 **Video Testimonial URL**: YouTube, Vimeo, or Loom link
- 🎯 **Tech Stack Breakdown**: Organize tools by category
- 🎯 **Lessons Learned**: Bullet points for other founders
- 🎯 **Project Gallery**: Screenshots of the product
- 🎯 **Story Updates**: Add quarterly progress updates
- 🎯 **What's Next**: Current status and roadmap

---

## Step 4: Publish

1. Click **Publish** in the top right
2. Wait for confirmation
3. Visit `/launchpad` on your site to see the directory
4. Visit `/launchpad/[your-slug]` to see the full story

---

## Step 5: Test and Share

**Test:**
- [ ] Story appears in directory grid
- [ ] Founder photo displays correctly
- [ ] Filters work (if you set industry/stage/outcome)
- [ ] Story page loads with all sections
- [ ] Images load properly
- [ ] Links work (project URL, testimonial video)

**Share:**
- Send preview to the founder for approval
- Share on social media
- Add to your newsletter
- Link from relevant blog posts

---

## Example Content Structure

### AgriPro Hub Example

**Backstory:**
> "Dela saw Ghana's agricultural supply chain bleeding value at every middleman touchpoint. Small-scale farmers were getting 30% of market price. He had a thesis: cut the middlemen, connect farmers directly to buyers using mobile-first tech. We had 6 weeks to test it."

**The Problem (Rich Text):**
> Farmers in rural Ghana were trapped in exploitative middleman relationships. They:
> - Sold produce at 30-40% below market price
> - Had no pricing transparency
> - Couldn't access buyer networks in Accra
> - Lost 20-30% to spoilage waiting for middlemen
>
> Market context: Ghana's agricultural sector employs 44% of the workforce but contributes only 20% to GDP. The inefficiency was systemic.

**The Build (Rich Text):**
> We chose a mobile-first PWA over native apps—most farmers had feature phones or entry-level Android devices. Key decisions:
>
> **Tech Stack:**
> - Next.js PWA for offline-first functionality
> - Supabase for real-time price updates
> - Twilio for SMS notifications (critical for areas without data)
> - Vercel Edge for fast load times even on 2G
>
> **Timeline:** 6 weeks from wireframes to first transaction
>
> **Biggest Technical Challenge:** Offline-first architecture that synced when connectivity returned. Farmers often listed produce in areas with zero coverage.
>
> **The Pivot:** Week 3, we realized SMS was more important than the app UI. Shifted to SMS-first, app-optional architecture.

**The Outcome (Rich Text):**
> Launch results:
> - 500 farmers onboarded in first 8 weeks
> - Average price increase of 40% vs. middlemen
> - 23% reduction in spoilage due to faster buyer matching
> - $50K GMV in first quarter
>
> **What happened next:** AgriPro secured pre-seed funding from Ventures Platform and scaled to 2,000 farmers across 3 regions.

**Metrics:**
1. Label: "Farmers Onboarded" | Value: "500+" | Period: "First 8 weeks"
2. Label: "Price Increase" | Value: "40%" | Period: "vs. middlemen"
3. Label: "GMV" | Value: "$50K" | Period: "Q1 2024"

**Tech Stack:**
- Next.js
- Supabase
- Twilio
- Vercel Edge
- PWA

**Lessons Learned:**
- "SMS-first beats app-first in emerging markets"
- "Offline-first isn't optional—it's essential"
- "Don't build for yourself—build for 2G speeds"

**Founder Quote:**
> "Bloop didn't just build our MVP—they taught us how to think about scale from day one. The offline-first architecture we started with is still powering us at 2,000+ farmers."
> — Dela Ahiabor, Founder & CEO, AgriPro Hub

---

## Pro Tips

1. **Start Simple**: Publish with required fields first, enhance later
2. **Use Real Metrics**: Specific numbers build more credibility than vague claims
3. **Show the Build**: Other founders want to know *how* you did it, not just *that* you did it
4. **Update Quarterly**: Living stories perform better than static ones
5. **Get Founder Buy-In**: Best stories come from 30-min founder interviews

---

## Common Questions

**Q: Can I migrate existing case studies?**
A: Yes! Open them in Sanity Studio and add the new founder fields. The old fields are preserved.

**Q: What if the founder doesn't want to share metrics?**
A: Use qualitative results or percentages instead of absolute numbers. "40% growth" works without revealing actual revenue.

**Q: How do I add a video testimonial?**
A: Upload to YouTube/Vimeo/Loom, paste the URL in "Video Testimonial URL" field. It will embed automatically.

**Q: Can I hide stories from the directory?**
A: Unpublish in Sanity Studio or set publishedAt to a future date.

---

## Next Story Templates

Use these prompts to extract content from founders:

**30-Minute Founder Interview Questions:**

1. "What was broken that made you start [Company]?"
2. "Walk me through the first version we built—what did it do?"
3. "What was the hardest technical decision we made together?"
4. "What surprised you about the launch?"
5. "Where are you now vs. where you were when we started?"
6. "What would you tell another founder about working with us?"

Record the call, transcribe it, and extract:
- Backstory → Question 1
- The Problem → Questions 1-2
- The Build → Questions 2-3
- The Outcome → Questions 4-5
- Testimonial → Question 6

---

Ready to launch your first story? Open Sanity Studio and start with the required fields above.

Questions? Reference `LAUNCHPAD_IMPLEMENTATION.md` for full details.
