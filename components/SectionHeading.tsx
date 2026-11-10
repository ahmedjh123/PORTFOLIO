export default function SectionHeading({
  title,
  onDark = false,
}: {
  title: string;
  onDark?: boolean;
}) {
  return (
    <h2
      className={`mb-8 font-display text-3xl font-semibold tracking-tight md:mb-12 md:text-4xl ${
        onDark ? "text-paper" : "text-ink"
      }`}
    >
      {title}
    </h2>
  );
}
