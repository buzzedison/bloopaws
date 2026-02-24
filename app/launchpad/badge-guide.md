# Built With Bloop Badge Guide

## For Launchpad Founders

As a member of the Bloop Launchpad, you can proudly display the "Built With Bloop" badge on your website. This creates a valuable backlink network and showcases your partnership with Bloop Global.

---

## Quick Start

### Option 1: For React/Next.js Sites

If your site is built with React or Next.js, you can use our component:

```tsx
import BuiltWithBloopBadge from '@/components/BuiltWithBloopBadge';

export default function Footer() {
  return (
    <footer>
      {/* Your footer content */}

      <BuiltWithBloopBadge
        companySlug="your-company-slug"
        variant="dark"
        size="md"
      />
    </footer>
  );
}
```

**Props:**
- `companySlug` (optional): Your unique company identifier (e.g., "agripro", "crowdpen")
- `variant`: "dark" | "light" | "minimal" (default: "dark")
- `size`: "sm" | "md" | "lg" (default: "md")
- `showIcon`: boolean (default: true)

---

### Option 2: For Plain HTML Sites

Simply copy and paste this code into your website's footer:

```html
<a href="https://bloopglobal.com/launchpad/YOUR-COMPANY-SLUG"
   target="_blank"
   rel="noopener noreferrer"
   style="
     display: inline-flex;
     align-items: center;
     gap: 8px;
     padding: 8px 16px;
     background: rgba(0,0,0,0.9);
     color: white;
     border: 1px solid rgba(255,255,255,0.1);
     border-radius: 9999px;
     font-size: 12px;
     font-weight: 700;
     text-decoration: none;
     text-transform: uppercase;
     letter-spacing: 0.05em;
     transition: all 0.3s;
     backdrop-filter: blur(8px);
   "
   onmouseover="this.style.background='#000'"
   onmouseout="this.style.background='rgba(0,0,0,0.9)'">
  <span>🚀</span>
  <span>Built with</span>
  <span style="color: #ef4444; font-weight: 900;">
    BLOOP
    <span style="display: inline-block; width: 6px; height: 6px; background: #ef4444; border-radius: 50%; margin-left: 2px;"></span>
  </span>
</a>
```

**Remember to replace** `YOUR-COMPANY-SLUG` with your actual company identifier.

---

## Light Variant (for dark backgrounds)

```html
<a href="https://bloopglobal.com/launchpad/YOUR-COMPANY-SLUG"
   target="_blank"
   rel="noopener noreferrer"
   style="
     display: inline-flex;
     align-items: center;
     gap: 8px;
     padding: 8px 16px;
     background: rgba(255,255,255,0.9);
     color: black;
     border: 1px solid rgba(0,0,0,0.1);
     border-radius: 9999px;
     font-size: 12px;
     font-weight: 700;
     text-decoration: none;
     text-transform: uppercase;
     letter-spacing: 0.05em;
     transition: all 0.3s;
     backdrop-filter: blur(8px);
   "
   onmouseover="this.style.background='#fff'"
   onmouseout="this.style.background='rgba(255,255,255,0.9)'">
  <span>🚀</span>
  <span>Built with</span>
  <span style="color: #ef4444; font-weight: 900;">
    BLOOP
    <span style="display: inline-block; width: 6px; height: 6px; background: #ef4444; border-radius: 50%; margin-left: 2px;"></span>
  </span>
</a>
```

---

## Benefits of Using the Badge

1. **Backlink Value**: The badge links back to your Launchpad profile, driving traffic to your story
2. **SEO Boost**: Quality backlink from bloopglobal.com improves your site's search ranking
3. **Credibility**: Shows visitors you're part of the Bloop ecosystem
4. **Network Effect**: Connects you with other founders in the Launchpad
5. **Discoverability**: Potential investors and customers can discover your story

---

## Placement Recommendations

**Best practices:**
- Place in your website footer
- Add to your "About" or "Team" page
- Include on your product/pricing pages
- Feature on blog posts about your journey

**Don't:**
- Hide the badge in hard-to-find locations
- Remove or modify the link destination
- Change the badge styling significantly (minor adjustments are okay)

---

## Need Help?

If you need assistance adding the badge to your website, reach out to us:
- Email: hello@bloopglobal.com
- Or message us through your Launchpad profile

---

## Your Company Slug

Your unique company identifier is: **[TO BE PROVIDED]**

This will be shared with you when your Launchpad story goes live.
