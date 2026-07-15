export default function Footer() {
  return (
    <footer className="border-t border-line-onDark bg-graphite py-6">
      <div className="container-content flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="label text-faint-onDark">
          © {new Date().getFullYear()} Ahmed Habib
        </p>
        <div className="flex items-center gap-6">
          <a
            href="mailto:ahmad@omegasoftware.se"
            className="label text-faint-onDark transition-colors hover:text-paper"
          >
            E-post
          </a>
          <a
            href="#hem"
            className="label text-faint-onDark transition-colors hover:text-paper"
          >
            Till toppen
          </a>
        </div>
      </div>
    </footer>
  );
}
