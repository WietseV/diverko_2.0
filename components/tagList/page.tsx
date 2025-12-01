type TagListProps = {
  tags: string[];
};

export default function TagList({ tags }: TagListProps) {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag} className="rounded-full border border-primary_dark/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary_dark/70">
          {tag}
        </li>
      ))}
    </ul>
  );
}
