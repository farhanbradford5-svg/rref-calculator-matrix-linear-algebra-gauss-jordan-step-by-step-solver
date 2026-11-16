import Link from 'next/link';
import { OWNER, LAST_UPDATED } from '@/data/site';

/** One-line "last updated / who maintains this" note shown on content pages. */
export default function UpdatedNote({ className = '' }: { className?: string }) {
  return (
    <p className={`text-xs text-slate-500 ${className}`}>
      Last updated <time dateTime={LAST_UPDATED.iso}>{LAST_UPDATED.long}</time>. Built and maintained by{' '}
      <Link href={OWNER.profilePath} className="text-primary hover:underline">{OWNER.name}</Link>, {OWNER.credentials.toLowerCase()} and founder of RREF Calculator.
    </p>
  );
}
