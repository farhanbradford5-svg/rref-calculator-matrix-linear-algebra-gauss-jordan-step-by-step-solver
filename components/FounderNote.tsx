import Link from 'next/link';
import { OWNER } from '@/data/site';

/** "Who runs this site" block. `full` adds the bio (used on the About page). */
export default function FounderNote({ full = false, heading = 'Who Runs RREF Calculator' }: { full?: boolean; heading?: string }) {
  return (
    <section id="muhammad-farhan" className="card p-6 scroll-mt-24" aria-labelledby="founder-note-heading">
      <h2 id="founder-note-heading" className="text-xl font-bold text-slate-900 mb-4">{heading}</h2>
      <div className="flex items-start gap-4">
        <img
          src={OWNER.photo}
          alt={`${OWNER.name}, founder and owner of RREF Calculator`}
          width={72}
          height={72}
          loading="lazy"
          decoding="async"
          className="w-[72px] h-[72px] rounded-full object-cover shrink-0 border border-slate-200"
        />
        <div>
          <p className="font-semibold text-slate-900 mb-0.5">{OWNER.name}</p>
          <p className="text-primary font-medium text-sm mb-2">{OWNER.role} · {OWNER.credentials}</p>
          {full && <p className="text-sm text-slate-700 mb-3">{OWNER.bio}</p>}
          <blockquote className="text-sm text-slate-700 italic mb-3">&ldquo;{OWNER.vision}&rdquo;</blockquote>
          <p className="text-sm text-slate-700">
            {!full && 'Farhan builds and maintains the calculators on this site and has the final say on everything published here. '}The guides cite the{' '}
            <Link href="/sources" className="text-primary hover:underline">textbook sources</Link> they are checked against.{' '}
            {!full && (
              <>
                <Link href="/about" className="text-primary hover:underline">About this site</Link>
                {' · '}
              </>
            )}
            <a href={OWNER.linkedin} target="_blank" rel="noopener noreferrer me" className="text-primary hover:underline">LinkedIn</a>
          </p>
        </div>
      </div>
    </section>
  );
}
