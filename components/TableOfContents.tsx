interface TOCItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
  readingTimeMin?: number;
}

export default function TableOfContents({ items, readingTimeMin }: TableOfContentsProps) {
  return (
    <aside className="card p-5 mb-8 bg-slate-50 border-slate-200">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide !border-0 !mt-0 !mb-0 !pb-0">
          In This Article
        </h2>
        {readingTimeMin && (
          <span className="text-xs text-slate-400 font-medium">
            {readingTimeMin} min read
          </span>
        )}
      </div>
      <ol className="space-y-1.5">
        {items.map((item, i) => (
          <li key={item.id} className="flex items-start gap-2">
            <span className="text-xs text-slate-400 font-mono mt-0.5 shrink-0 w-4 text-right">
              {i + 1}.
            </span>
            <a
              href={`#${item.id}`}
              className="text-sm text-primary hover:text-primary-dark underline underline-offset-2 leading-snug"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
