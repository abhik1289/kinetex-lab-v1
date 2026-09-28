"use client";

import { useDeferredValue, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, ShieldCheck, UserRoundMinus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AdminRecord = {
  id: string;
  name: string | null;
  email: string | null;
  rollNo: string | null;
  canRemove: boolean;
  removalBlockedReason: "You" | "Protected" | null;
};

type AdminsResponse = { admins: AdminRecord[]; total: number };

async function fetchAdmins(): Promise<AdminsResponse> {
  const response = await fetch("/api/admin/admins");
  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(result?.error ?? "Could not load administrators.");
  }
  return (await response.json()) as AdminsResponse;
}

async function removeAdmin(admin: AdminRecord) {
  const response = await fetch(`/api/admin/admins/${admin.id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(result?.error ?? "Could not remove administrator access.");
  }
}

export function AdminsTable() {
  const [search, setSearch] = useState("");
  const [adminToRemove, setAdminToRemove] = useState<AdminRecord | null>(null);
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());
  const queryClient = useQueryClient();
  const adminsQuery = useQuery({
    queryKey: ["admin-admins"],
    queryFn: fetchAdmins,
    staleTime: 30_000,
  });
  const removeMutation = useMutation({
    mutationFn: removeAdmin,
    onSuccess: async () => {
      setAdminToRemove(null);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-admins"] }),
        queryClient.invalidateQueries({
          queryKey: ["admin-dashboard-summary"]),
        }),
      ]);
    },
  });

  const admins = adminsQuery.data?.admins ?? [];
  const filteredAdmins = deferredSearch
    ? admins.filter((admin) =>
        [admin.name, admin.email, admin.rollNo].some((value) =>
          value?.toLowerCase().includes(deferredSearch),
        ),
      )
    : admins;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">
            {adminsQuery.isPending
              ? "Loading administrators"
              : `${admins.length} ${admins.length === 1 ? "administrator" : "administrators"}`}
          </p>
          <p className="text-sm text-muted-foreground">
            Admin access is assigned from the Users page.
          </p>
        </div>
        <label className="relative block w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search admins"
            aria-label="Search administrators"
            className="pl-9"
          />
        </label>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-16">Sl No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Roll No</TableHead>
              <TableHead>Access</TableHead>
              <TableHead className="w-28 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminsQuery.isPending ? (
              Array.from({ length: 4 }, (_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={6}>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : adminsQuery.isError ? (
              <TableRow>
                <TableCell colSpan={6} className="h-28 text-center">
                  <p className="font-medium">Unable to load admins</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {adminsQuery.error.message}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => adminsQuery.refetch()}>
                    Try again
                  </Button>
                </TableCell>
              </TableRow>
            ) : filteredAdmins.length ? (
              filteredAdmins.map((admin, index) => (
                <TableRow key={admin.id}>
                  <TableCell className="tabular-nums text-muted-foreground">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {admin.name || "—"}
                  </TableCell>
                  <TableCell>{admin.email || "—"}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {admin.rollNo || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="gap-1">
                      <ShieldCheck aria-hidden="true" />
                      Administrator
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {admin.canRemove ? (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon-sm"
                        title={`Remove admin access for ${admin.name || admin.email || "this user"}`}
                        aria-label={`Remove admin access for ${admin.name || admin.email || "this user"}`}
                        disabled={removeMutation.isPending}
                        onClick={() => {
                          removeMutation.reset();
                          setAdminToRemove(admin);
                        }}>
                        <UserRoundMinus aria-hidden="true" />
                      </Button>
                    ) : (
                      <Badge variant="outline">
                        {admin.removalBlockedReason ?? "Protected"}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-28 text-center">
                  <p className="font-medium">
                    {search ? "No matching admins" : "No admins assigned"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {search
                      ? "Try a different name, email, or roll number."
                      : "Assign the first admin in the database. Admins can approve additional users from the Users page."}
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={adminToRemove !== null}
        onOpenChange={(open) => {
          if (!open && !removeMutation.isPending) {
            setAdminToRemove(null);
            removeMutation.reset();
          }
        }}>
        <DialogContent className="gap-5 p-6">
          <div className="flex flex-col gap-2 pr-8">
            <DialogTitle>Remove administrator access?</DialogTitle>
            <DialogDescription>
              {adminToRemove?.name || adminToRemove?.email || "This user"} will
              lose access to the admin dashboard and tools.
            </DialogDescription>
          </div>
          {adminToRemove && (
            <div className="border bg-muted/40 p-3">
              <p className="font-medium">{adminToRemove.name || "Unnamed admin"}</p>
              <p className="text-sm text-muted-foreground">
                {adminToRemove.email || "No email available"}
              </p>
            </div>
          )}
          {removeMutation.isError && (
            <p role="alert" className="text-sm text-destructive">
              {removeMutation.error.message}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={removeMutation.isPending}
              onClick={() => setAdminToRemove(null)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={!adminToRemove || removeMutation.isPending}
              onClick={() => {
                if (adminToRemove) removeMutation.mutate(adminToRemove);
              }}>
              <UserRoundMinus data-icon="inline-start" />
              {removeMutation.isPending ? "Removing..." : "Remove admin"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
