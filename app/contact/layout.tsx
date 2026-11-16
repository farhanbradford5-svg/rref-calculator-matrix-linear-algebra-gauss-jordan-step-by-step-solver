import type { Metadata } from 'next';

// The contact page is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: 'Contact — RREF Calculator',
  description: 'Contact RREF Calculator to report a bug, a mathematical error in a guide, or to suggest a new calculator.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/contact/' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
