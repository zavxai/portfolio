export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 text-center sm:flex-row sm:gap-3 sm:px-8 sm:py-8 sm:text-left">
        <p className="text-sm text-neutral-500">
          <span className="font-medium text-neutral-300">Johnvessly Alti</span>
          <span className="mx-2 text-neutral-700">·</span>
          AI Engineer
        </p>
        <p className="text-xs text-neutral-600">
          © {new Date().getFullYear()} · Built with intention
        </p>
      </div>
    </footer>
  );
}
