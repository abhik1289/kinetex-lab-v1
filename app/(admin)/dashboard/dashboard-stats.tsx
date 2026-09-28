"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Drumstick,
  Leaf,
  ShieldCheck,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type DashboardSummary = {
  users: number;
  teams: number;
  admins: number;
  vegetarian: number;
  nonVegetarian: number;
};

async function fetchDashboardSummary(): Promise<DashboardSummary> {
  const response = await fetch("/api/admin/summary");
  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(result?.error ?? "Could not load dashboard totals.");
  }
  return (await response.json()) as DashboardSummary;
}

const stats: {
  key: keyof DashboardSummary;
  title: string;
  description: string;
  icon: LucideIcon;
  iconStyle: string;
}[] = [
  {
    key: "teams",
    title: "Total teams",
    description: "Created teams",
    icon: UsersRound,
    iconStyle: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  },
  {
    key: "users",
    title: "Total users",
    description: "Registered accounts",
    icon: Users,
    iconStyle:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  },
  {
    key: "admins",
    title: "Admins",
    description: "Accounts marked as admin",
    icon: ShieldCheck,
    iconStyle:
      "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  },
  {
    key: "vegetarian",
    title: "Vegetarian",
    description: "Recorded food preferences",
    icon: Leaf,
    iconStyle: "bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-300",
  },
  {
    key: "nonVegetarian",
    title: "Non-vegetarian",
    description: "Recorded food preferences",
    icon: Drumstick,
    iconStyle: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
  },
];

const numberFormat = new Intl.NumberFormat("en-IN");

export function DashboardStats() {
  const summaryQuery = useQuery({
    queryKey: ["admin-dashboard-summary"],
    queryFn: fetchDashboardSummary,
    staleTime: 30_000,
  });

  return (
    <section aria-label="Registration totals" className="flex flex-col gap-4">
      {summaryQuery.isError && (
        <div
          role="alert"
          className="flex flex-col gap-3 border-l-4 border-destructive bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">Dashboard totals are unavailable</p>
            <p className="text-sm text-muted-foreground">
              {summaryQuery.error.message}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => summaryQuery.refetch()}>
            Try again
          </Button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map(({ key, title, description, icon: Icon, iconStyle }) => (
          <Card key={key} className="min-w-0">
            <CardHeader className="flex flex-row items-start justify-between gap-3">
              <div className="min-w-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-md ${iconStyle}`}>
                <Icon aria-hidden="true" className="size-4" />
              </span>
            </CardHeader>
            <CardContent>
              {summaryQuery.isPending ? (
                <Skeleton className="h-9 w-20" />
              ) : (
                <p className="text-3xl font-semibold tabular-nums">
                  {summaryQuery.isError || !summaryQuery.data
                    ? "—"
                    : numberFormat.format(summaryQuery.data[key])}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
