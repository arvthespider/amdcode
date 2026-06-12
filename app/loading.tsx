export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex flex-col items-center gap-6">
        <div className="h-14 w-14 animate-spin rounded-full border border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-white" />
        <div className="space-y-1 text-center">
          <p className="font-display text-lg font-semibold tracking-[0.16em]">
            TIARA
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Loading portfolio experience</p>
        </div>
      </div>
    </div>
  );
}
