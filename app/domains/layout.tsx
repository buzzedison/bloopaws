'use client';

import { Toaster } from 'sonner';

export default function DomainsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster position="top-center" />
    </>
  );
} 