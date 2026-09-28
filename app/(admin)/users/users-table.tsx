"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Search, ShieldCheck, UserRoundPlus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type UserRow = {
  id: string;
  name: string | null;
  email: string | null;
  isAdmin: boolean;
  teamName: string | null;
  foodPreference: string | null;
};

type UsersResponse = {
  users: UserRow[];
  total: number;
  canPromoteAdmins: boolean;
};

async function fetchUsers(search = "", foodPreference = "all") {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (foodPreference !== "all") params.set("foodPreference", foodPreference);

  const response = await fetch(`/api/admin/users?${params.toString()}`);
  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(result?.error ?? "Could not load users.");
  }
  return (await response.json()) as UsersResponse;
}

async function promoteToAdmin(user: UserRow) {
  const response = await fetch(`/api/admin/users/${user.id}/admin`, {
    method: "POST",
  });
  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(result?.error ?? "Could not approve this administrator.");
  }
}

function toCsv(rows: UserRow[]) {
  const escapeCell = (value: string) => {
    const safeValue = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
    return `"${safeValue.replaceAll('"', '""')}"`;
  };
  const lines = [
    ["Sl No", "Name", "Email", "Team Name", "Food Preference"],
    ...rows.map((user, index) => [
      String(index + 1),
      user.name ?? "",
      user.email ?? "",
      user.teamName ?? "",
      user.foodPreference ?? "",
    ]),
  ];
  return lines.map((line) => line.map(escapeCell).join(",")).join("\r\n");
}

function downloadCsv(rows: UserRow[], filename: string) {
  const blob = new Blob(["\uFEFF", toCsv(rows)], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function UsersTable() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [foodPreference, setFoodPreference] = useState("all");
  const [page, setPage] = useState(0);
  const [pendingAdminUser, setPendingAdminUser] = useState<UserRow | null>(
    null,
  );
  const pageSize = 10;
  const queryClient = useQueryClient();

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setDebouncedSearch(search.trim()),
      250,
    );
    return () => window.clearTimeout(timeout);
  }, [search]);

  const usersQuery = useQuery({
    queryKey: ["admin-users", debouncedSearch, foodPreference],
    queryFn: () => fetchUsers(debouncedSearch, foodPreference),
    staleTime: 30_000,
  });
  const promoteMutation = useMutation({
    mutationFn: promoteToAdmin,
    onSuccess: async () => {
      setPendingAdminUser(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
        queryClient.invalidateQueries({ queryKey: ["admin-admins"] }),
        queryClient.invalidateQueries({
          queryKey: ["admin-dashboard-summary"],
        }),
      ]);
    },
  });
  const users = usersQuery.data?.users ?? [];
  const pageCount = Math.max(1, Math.ceil(users.length / pageSize));
  const visibleUsers = users.slice(page * pageSize, (page + 1) * pageSize);
  const firstResult = users.length === 0 ? 0 : page * pageSize + 1;
  const lastResult = Math.min((page + 1) * pageSize, users.length);

  function updateSearch(value: string) {
    setSearch(value);
    setPage(0);
  }

  function updateFoodPreference(value: string | null) {
    setFoodPreference(value ?? "all");
    setPage(0);
  }

  function exportFiltered() {
    if (users.length) downloadCsv(users, "kinetex-users-filtered.csv");
  }

  async function exportAll() {
    try {
      const result = await fetchUsers();
      downloadCsv(result.users, "kinetex-users.csv");
    } catch {
      window.alert("Could not export users. Please try again.");
    }
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="relative block w-full sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Search roll no. or team name"
              aria-label="Search by roll number or team name"
              className="pl-9"
            />
          </label>
          <Select value={foodPreference} onValueChange={updateFoodPreference}>
            <SelectTrigger
              className="w-full sm:w-44"
              aria-label="Food preference">
              <SelectValue placeholder="Food preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All preferences</SelectItem>
              <SelectItem value="VEG">Vegetarian</SelectItem>
              <SelectItem value="NON_VEG">Non-vegetarian</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={exportFiltered}
            disabled={!users.length || usersQuery.isFetching}>
            <Download data-icon="inline-start" />
            Export filtered
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={exportAll}
            disabled={usersQuery.isFetching}>
            <Download data-icon="inline-start" />
            Export all
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-16">Sl No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Team Name</TableHead>
              <TableHead>Food Preference</TableHead>
              <TableHead className="w-24 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersQuery.isPending ? (
              Array.from({ length: 5 }, (_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={6}>
                    <div className="h-5 animate-pulse rounded bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : usersQuery.isError ? (
              <TableRow>
                <TableCell colSpan={6} className="h-28 text-center">
                  <p className="font-medium">Unable to load users</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {usersQuery.error.message}
                  </p>
                </TableCell>
              </TableRow>
            ) : visibleUsers.length ? (
              visibleUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="tabular-nums text-muted-foreground">
                    {page * pageSize + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {user.name || "—"}
                  </TableCell>
                  <TableCell>{user.email || "—"}</TableCell>
                  <TableCell>{user.teamName || "—"}</TableCell>
                  <TableCell>
                    {user.foodPreference ? (
                      <Badge variant="outline">
                        {user.foodPreference === "VEG"
                          ? "Vegetarian"
                          : user.foodPreference === "NON_VEG"
                            ? "Non-vegetarian"
                            : user.foodPreference}
                      </Badge>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {user.isAdmin ? (
                      <Badge variant="secondary" className="gap-1">
                        <ShieldCheck aria-hidden="true" />
                        Admin
                      </Badge>
                    ) : usersQuery.data?.canPromoteAdmins ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon-sm"
                        title={`Approve ${user.name || user.email || "user"} as admin`}
                        aria-label={`Approve ${user.name || user.email || "user"} as admin`}
                        disabled={promoteMutation.isPending}
                        onClick={() => {
                          promoteMutation.reset();
                          setPendingAdminUser(user);
                        }}>
                        <UserRoundPlus aria-hidden="true" />
                      </Button>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-28 text-center">
                  <p className="font-medium">No users found</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Change or clear the current filters to see more results.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          {usersQuery.isPending
            ? "Loading users..."
            : `Showing ${firstResult}-${lastResult} of ${usersQuery.data?.total ?? 0} users`}
        </p>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            disabled={page === 0 || usersQuery.isPending}>
            Previous
          </Button>
          <span className="tabular-nums">
            Page {page + 1} of {pageCount}
          </span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              setPage((current) => Math.min(pageCount - 1, current + 1))
            }
            disabled={page >= pageCount - 1 || usersQuery.isPending}>
            Next
          </Button>
        </div>
      </div>

      <Dialog
        open={pendingAdminUser !== null}
        onOpenChange={(open) => {
          if (!open && !promoteMutation.isPending) {
            setPendingAdminUser(null);
            promoteMutation.reset();
          }
        }}>
        <DialogContent className="gap-5 p-6">
          <div className="flex flex-col gap-2 pr-8">
            <DialogTitle>Approve administrator access?</DialogTitle>
            <DialogDescription>
              This will grant {pendingAdminUser?.name || "this user"} access to
              the admin directory and administrator actions.
            </DialogDescription>
          </div>
          {pendingAdminUser && (
            <div className="border bg-muted/40 p-3">
              <p className="font-medium">
                {pendingAdminUser.name || "Unnamed user"}
              </p>
              <p className="text-sm text-muted-foreground">
                {pendingAdminUser.email || "No email available"}
              </p>
            </div>
          )}
          {promoteMutation.isError && (
            <p role="alert" className="text-sm text-destructive">
              {promoteMutation.error.message}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={promoteMutation.isPending}
              onClick={() => setPendingAdminUser(null)}>
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!pendingAdminUser || promoteMutation.isPending}
              onClick={() => {
                if (pendingAdminUser) promoteMutation.mutate(pendingAdminUser);
              }}>
              <ShieldCheck data-icon="inline-start" />
              {promoteMutation.isPending ? "Approving..." : "Approve as admin"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
