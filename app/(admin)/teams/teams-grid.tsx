"use client";

import { useDeferredValue, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Crown, Search, UsersRound } from "lucide-react";

import { useTeamDialogStore } from "./team-dialog-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

type TeamMember = {
  id: string;
  name: string | null;
  rollNo: string | null;
  foodPreference: string | null;
  isLeader: boolean;
};

type Team = {
  id: string;
  name: string;
  createdAt: string;
  members: TeamMember[];
};

type TeamsResponse = { teams: Team[]; total: number };

async function fetchTeams(): Promise<TeamsResponse> {
  const response = await fetch("/api/admin/teams");
  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(result?.error ?? "Could not load teams.");
  }
  return (await response.json()) as TeamsResponse;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(
    new Date(value),
  );
}

function PreferenceBadge({ value }: { value: string | null }) {
  if (!value) {
    return <Badge variant="outline">Not specified</Badge>;
  }

  const isVegetarian = value === "VEG";
  return (
    <Badge
      variant="outline"
      className={
        isVegetarian
          ? "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200"
          : "border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200"
      }>
      {isVegetarian
        ? "Vegetarian"
        : value === "NON_VEG"
          ? "Non-vegetarian"
          : value}
    </Badge>
  );
}

export function TeamsGrid() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());
  const selectedTeamId = useTeamDialogStore((state) => state.selectedTeamId);
  const openForTeam = useTeamDialogStore((state) => state.openForTeam);
  const closeDialog = useTeamDialogStore((state) => state.close);
  const teamsQuery = useQuery({
    queryKey: ["admin-teams"],
    queryFn: fetchTeams,
    staleTime: 30_000,
  });

  const teams = teamsQuery.data?.teams ?? [];
  const filteredTeams = deferredSearch
    ? teams.filter((team) => team.name.toLowerCase().includes(deferredSearch))
    : teams;
  const selectedTeam = teams.find((team) => team.id === selectedTeamId) ?? null;

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">
            {teamsQuery.isPending ? "Loading teams" : `${teams.length} teams`}
          </p>
          <p className="text-sm text-muted-foreground">
            Select a team to review its members.
          </p>
        </div>
        <label className="relative block w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search teams"
            aria-label="Search teams"
            className="pl-9"
          />
        </label>
      </div>

      {teamsQuery.isError ? (
        <div
          role="alert"
          className="flex flex-col gap-3 border-l-4 border-destructive bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">Teams could not be loaded</p>
            <p className="text-sm text-muted-foreground">
              {teamsQuery.error.message}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => teamsQuery.refetch()}>
            Try again
          </Button>
        </div>
      ) : teamsQuery.isPending ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Card key={index}>
              <CardHeader className="gap-3">
                <Skeleton className="size-10" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredTeams.length ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTeams.map((team) => (
            <Card
              key={team.id}
              className="transition-colors hover:border-primary/40">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-sky-100 text-sm font-semibold text-sky-900 dark:bg-sky-950 dark:text-sky-200">
                    {team.name.slice(0, 1).toUpperCase()}
                  </span>
                  <Badge variant="secondary">
                    {team.members.length}{" "}
                    {team.members.length === 1 ? "member" : "members"}
                  </Badge>
                </div>
                <CardTitle className="break-words">{team.name}</CardTitle>
                <CardDescription>
                  Created {formatDate(team.createdAt)}
                </CardDescription>
                <div className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-amber-800 dark:text-amber-300">
                  <Crown aria-hidden="true" className="size-3.5 shrink-0" />
                  <span className="truncate">
                    {team.members.find((member) => member.isLeader)?.name
                      ? `Led by ${team.members.find((member) => member.isLeader)?.name}`
                      : "Leader not assigned"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3 border-t pt-4">
                <div className="flex -space-x-2" aria-hidden="true">
                  {team.members.slice(0, 4).map((member, index) => (
                    <span
                      key={member.id}
                      className={`flex size-8 items-center justify-center rounded-full border-2 border-card text-xs font-medium text-foreground ${
                        index % 2 === 0 ? "bg-emerald-100" : "bg-amber-100"
                      }`}>
                      {(member.name?.trim().charAt(0) || "?").toUpperCase()}
                    </span>
                  ))}
                  {team.members.length > 4 && (
                    <span className="flex size-8 items-center justify-center rounded-full border-2 border-card bg-muted text-xs font-medium">
                      +{team.members.length - 4}
                    </span>
                  )}
                  {team.members.length === 0 && (
                    <UsersRound className="size-5 text-muted-foreground" />
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => openForTeam(team.id)}>
                  View members
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex min-h-48 flex-col items-center justify-center gap-2 border border-dashed p-6 text-center">
          <UsersRound className="size-8 text-muted-foreground" />
          <p className="font-medium">
            {search ? "No matching teams" : "No teams yet"}
          </p>
          <p className="text-sm text-muted-foreground">
            {search
              ? "Try a different team name."
              : "Teams will appear here when members register."}
          </p>
        </div>
      )}

      <Dialog
        open={Boolean(selectedTeam)}
        onOpenChange={(open) => {
          if (!open) closeDialog();
        }}>
        <DialogContent>
          <div className="border-b p-6 pr-14">
            <DialogTitle>{selectedTeam?.name ?? "Team members"}</DialogTitle>
            <DialogDescription className="mt-1">
              {selectedTeam
                ? `${selectedTeam.members.length} ${selectedTeam.members.length === 1 ? "member" : "members"} in this team`
                : "Member details"}
            </DialogDescription>
          </div>
          {selectedTeam && selectedTeam.members.length > 0 ? (
            <div className="min-h-0 overflow-auto p-4 sm:p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-14">Sl No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Food Preference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedTeam.members.map((member, index) => (
                    <TableRow
                      key={member.id}
                      className={
                        member.isLeader
                          ? "bg-amber-50/70 dark:bg-amber-950/20"
                          : undefined
                      }>
                      <TableCell className="text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <span>{member.name || "—"}</span>
                          {member.isLeader && (
                            <Badge
                              variant="outline"
                              className="gap-1 border-amber-300 bg-amber-100 text-amber-950 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100">
                              <Crown aria-hidden="true" className="size-3" />
                              Team leader
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {member.rollNo || "—"}
                      </TableCell>
                      <TableCell>
                        <PreferenceBadge value={member.foodPreference} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-muted-foreground">
              This team has no registered members.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
