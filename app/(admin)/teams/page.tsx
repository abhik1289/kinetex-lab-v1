import { TeamsGrid } from "./teams-grid";

export default function TeamsPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 px-4 py-6 lg:px-6">
      <header className="flex flex-col gap-1 border-b pb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Administration
        </p>
        <h1 className="text-2xl font-semibold">Teams</h1>
        <p className="text-sm text-muted-foreground">
          Browse team registrations and review member details.
        </p>
      </header>
      <TeamsGrid />
    </main>
  );
}
