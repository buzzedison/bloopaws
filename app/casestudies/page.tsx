import { redirect } from 'next/navigation';

// Redirect /casestudies to /launchpad for backward compatibility
export default function CaseStudiesPage() {
  redirect('/launchpad');
}