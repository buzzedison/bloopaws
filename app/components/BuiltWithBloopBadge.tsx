'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

interface BuiltWithBloopBadgeProps {
  companySlug?: string;
  variant?: 'dark' | 'light' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

/**
 * Built With Bloop Badge Component
 *
 * This component can be embedded in client websites to create a backlink network
 * and visual consistency across the Bloop ecosystem.
 *
 * Usage:
 * ```tsx
 * <BuiltWithBloopBadge
 *   companySlug="agripro"
 *   variant="dark"
 *   size="md"
 * />
 * ```
 */
export default function BuiltWithBloopBadge({
  companySlug,
  variant = 'dark',
  size = 'md',
  showIcon = true,
  className = ''
}: BuiltWithBloopBadgeProps) {

  const targetUrl = companySlug
    ? `https://bloopglobal.com/launchpad/${companySlug}`
    : 'https://bloopglobal.com/launchpad';

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'px-3 py-1.5 text-[10px]',
      icon: 'w-3 h-3',
      dot: 'w-1 h-1'
    },
    md: {
      container: 'px-4 py-2 text-xs',
      icon: 'w-4 h-4',
      dot: 'w-1.5 h-1.5'
    },
    lg: {
      container: 'px-6 py-3 text-sm',
      icon: 'w-5 h-5',
      dot: 'w-2 h-2'
    }
  };

  // Variant configurations
  const variantConfig = {
    dark: {
      container: 'bg-black/90 backdrop-blur-sm border-white/10 text-white hover:bg-black',
      brand: 'text-red-500',
      dot: 'bg-red-500'
    },
    light: {
      container: 'bg-white/90 backdrop-blur-sm border-black/10 text-black hover:bg-white',
      brand: 'text-red-600',
      dot: 'bg-red-600'
    },
    minimal: {
      container: 'bg-transparent border-current text-current hover:bg-current/5',
      brand: 'text-current',
      dot: 'bg-current'
    }
  };

  const sizes = sizeConfig[size];
  const variants = variantConfig[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`inline-block ${className}`}
    >
      <Link
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-flex items-center gap-2
          ${sizes.container}
          ${variants.container}
          border rounded-full
          font-bold uppercase tracking-wider
          transition-all duration-300
          group
        `}
      >
        {showIcon && (
          <motion.div
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.3 }}
          >
            <Rocket className={`${sizes.icon} ${variants.brand}`} />
          </motion.div>
        )}

        <span>Built with</span>

        <span className={`font-black ${variants.brand} flex items-center gap-1.5`}>
          BLOOP
          <motion.span
            className={`${sizes.dot} ${variants.dot} rounded-full`}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </span>
      </Link>
    </motion.div>
  );
}

/**
 * Standalone Badge (for plain HTML sites)
 *
 * Copy this HTML snippet into any website's footer:
 *
 * ```html
 * <a href="https://bloopglobal.com/launchpad/YOUR-COMPANY-SLUG"
 *    target="_blank"
 *    rel="noopener noreferrer"
 *    style="
 *      display: inline-flex;
 *      align-items: center;
 *      gap: 8px;
 *      padding: 8px 16px;
 *      background: rgba(0,0,0,0.9);
 *      color: white;
 *      border: 1px solid rgba(255,255,255,0.1);
 *      border-radius: 9999px;
 *      font-size: 12px;
 *      font-weight: 700;
 *      text-decoration: none;
 *      text-transform: uppercase;
 *      letter-spacing: 0.05em;
 *      transition: all 0.3s;
 *    "
 *    onmouseover="this.style.background='#000'"
 *    onmouseout="this.style.background='rgba(0,0,0,0.9)'">
 *   <span>🚀</span>
 *   <span>Built with</span>
 *   <span style="color: #ef4444; font-weight: 900;">BLOOP<span style="color: #ef4444;">.</span></span>
 * </a>
 * ```
 */

// Export HTML snippet generator for non-React sites
export function generateBadgeHTML(companySlug?: string, variant: 'dark' | 'light' = 'dark'): string {
  const url = companySlug
    ? `https://bloopglobal.com/launchpad/${companySlug}`
    : 'https://bloopglobal.com/launchpad';

  const isDark = variant === 'dark';

  return `
<a href="${url}"
   target="_blank"
   rel="noopener noreferrer"
   style="
     display: inline-flex;
     align-items: center;
     gap: 8px;
     padding: 8px 16px;
     background: ${isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'};
     color: ${isDark ? 'white' : 'black'};
     border: 1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
     border-radius: 9999px;
     font-size: 12px;
     font-weight: 700;
     text-decoration: none;
     text-transform: uppercase;
     letter-spacing: 0.05em;
     transition: all 0.3s;
     backdrop-filter: blur(8px);
   "
   onmouseover="this.style.background='${isDark ? '#000' : '#fff'}'"
   onmouseout="this.style.background='${isDark ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'}'">
  <span>🚀</span>
  <span>Built with</span>
  <span style="color: #ef4444; font-weight: 900;">BLOOP<span style="display: inline-block; width: 6px; height: 6px; background: #ef4444; border-radius: 50%; margin-left: 2px;"></span></span>
</a>
  `.trim();
}
