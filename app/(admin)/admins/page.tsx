import { AdminsTable } from "./admins-table";

export default function AdminsPage() {
  return (
    <main className="flex flex-1 flex-col gap-6 px-4 py-6 lg:px-6">
      <header className="flex flex-col gap-1 border-b pb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Administration
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Admins</h1>
        <p className="text-sm text-muted-foreground">
          People approved to access administrator tools.
        </p>
      </header>
      <AdminsTable />
    </main>
  );
}
