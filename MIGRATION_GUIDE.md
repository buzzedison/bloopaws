# Migration Guide: Case Studies → Launchpad

## Current Status

You have **two routes** active:
- ✅ `/launchpad` - NEW (fully functional with founder-focused features)
- ⚠️ `/casestudies` - OLD (still has internal links pointing to it)

---

## Quick Fix (5 minutes)

I've already updated `/app/casestudies/page.tsx` to redirect to `/launchpad`. Now you need to:

### 1. Update Individual Story Redirects

Create a redirect file for individual case studies:

**File:** `/app/casestudies/[slug]/page.tsx`

Replace the ENTIRE file content with:

```tsx
import { redirect } from 'next/navigation';

interface CaseStudyParams {
  params: {
    slug: string;
  };
}

// Redirect /casestudies/[slug] to /launchpad/[slug]
export default function CaseStudyPage({ params }: CaseStudyParams) {
  redirect(`/launchpad/${params.slug}`);
}
```

### 2. Update Internal Links

Run this find-and-replace across your codebase:

**Find:** `/casestudies`
**Replace:** `/launchpad`

**Files to update:**
- `app/components/SocialProofStories.tsx`
- `app/components/SuccessStoriesInnovative.tsx`
- `app/services/web/WebServicesClient.tsx`
- Any other files that link to case studies

---

## Navigation Status

### ✅ Already Updated
- `/app/web/components/Navbar.tsx` - Changed "Portfolio" → "Launchpad"

### Check Your Site
If you still see "Stories" or "Case Studies" in your navbar, you might have:
1. **Multiple navbar components** (check for other Header/Nav files)
2. **Cached version** (hard refresh: Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
3. **Different layout being used**

---

## Manual Update Commands

### Option A: Using VS Code
1. Open Command Palette (Cmd+Shift+F / Ctrl+Shift+F)
2. Find: `/casestudies`
3. Replace with: `/launchpad`
4. Review each replacement
5. Replace all in:
   - `app/components/`
   - `app/services/`

### Option B: Using Terminal (Advanced)

```bash
# Navigate to your project
cd /Users/apple/Documents/web/bloop

# Find all TSX files with /casestudies references
grep -r "/casestudies" app --include="*.tsx" | grep -v node_modules

# Then manually update each file OR use sed (be careful!)
```

---

## Verification Checklist

After making changes, test these URLs:

- [ ] `/launchpad` - Should show directory
- [ ] `/launchpad/[any-slug]` - Should show founder story
- [ ] `/casestudies` - Should redirect to `/launchpad`
- [ ] `/casestudies/[any-slug]` - Should redirect to `/launchpad/[slug]`

---

## What About SEO?

**Good news:** Server-side redirects (what we implemented) preserve SEO value!

- ✅ 301 redirects pass link equity
- ✅ Google will update indexed URLs automatically
- ✅ Old backlinks will still work

**To speed up transition:**
1. Submit new sitemap with `/launchpad` URLs
2. Update external links when possible
3. Update social media bios
4. Update email signatures

---

## Navbar Confirmation

Your navbar SHOULD now show:
- How It Works
- Pricing
- **Launchpad** ← (was "Portfolio")
- Who We Are
- Education
- Blog

If you're still seeing "Stories" or "Case Studies", run:

```bash
# Check for other navigation files
find app -name "*[Nn]av*" -name "*.tsx" | grep -v node_modules
find app -name "*[Hh]eader*" -name "*.tsx" | grep -v node_modules
```

Then share the output with me and I'll update those files.

---

## Need Help?

If you're seeing navigation issues, tell me:
1. What text you see in your navbar currently
2. What URL you're on when you see it
3. Send a screenshot if possible

I'll identify which component needs updating.

---

## Summary

**What I've done:**
- ✅ Created `/launchpad` with all new features
- ✅ Updated `/app/casestudies/page.tsx` to redirect to `/launchpad`
- ✅ Updated `/app/web/components/Navbar.tsx` to show "Launchpad"

**What you need to do:**
1. Replace `/app/casestudies/[slug]/page.tsx` with redirect code (above)
2. Find and replace `/casestudies` → `/launchpad` in internal links
3. Test all URLs
4. Deploy changes

**Timeline:** 5-10 minutes

---

Once you've made these changes, both your navigation and internal links will use "Launchpad," but old external links to `/casestudies` will still work (they'll just redirect).
