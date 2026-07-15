export default function SectionLabel({
  index,
  title,
  onDark = false,
}: {
  index: string;
  title: string;
  onDark?: boolean;
}) {
  return (
    <div className="mb-8 flex items-baseline gap-4 md:mb-12">
      <span className="label text-blue">{index}</span>
      <span className={`h-px flex-1 ${onDark ? "bg-line-onDark" : "bg-line"}`} />
      <h2
        className={`font-display text-2xl font-medium tracking-tight md:text-3xl ${
          onDark ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
