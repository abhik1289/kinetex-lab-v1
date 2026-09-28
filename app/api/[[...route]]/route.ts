import { Hono } from "hono";
import { handle } from "hono/vercel";
import { auth } from "@/lib/config/auth";
import { authPrisma } from "@/lib/config/prisma";
// import { isKIITEmail } from "@/lib/utils";
import { z } from "zod";

const app = new Hono().basePath("/api");

const years = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "Other",
] as const;
const dietaryPreferences = ["VEG", "NON_VEG"] as const;

const profileSchema = z.object({
  name: z.string().trim().min(2).max(80),
  rollNo: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9-]+$/),
  year: z.enum(years),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/),
  dietaryPreference: z.enum(dietaryPreferences),
});

const leaderSchema = profileSchema.extend({
  teamName: z.string().trim().min(3).max(30),
});

const joinSchema = profileSchema.extend({
  token: z.string().trim().min(20).max(100),
});

const normalizeTeamName = (value: string) =>
  value.trim().replace(/\s+/g, " ").toUpperCase();

const getAuthenticatedUser = async () => {
  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();

  if (!email) {
    return { error: "Sign in with a KIIT Google account first." as const };
  }

  const user = await authPrisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "Your account is not ready yet. Sign in again." as const };
  }

  if (user.teamId) {
    const team = await authPrisma.team.findUnique({
      where: { id: user.teamId },
      select: { id: true },
    });

    if (!team) {
      const repairedUser = await authPrisma.user.update({
        where: { id: user.id },
        data: { teamId: null, isLeader: false },
      });

      return { user: repairedUser, email };
    }
  }

  return { user, email };
};

const getAuthenticatedAdmin = async () => {
  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();

  if (!email)
    return { error: "Sign in required." as const, status: 401 as const };

  const user = await authPrisma.user.findUnique({
    where: { email },
    select: { id: true, isAdmin: true },
  });

  if (!user?.isAdmin) {
    return {
      error: "Administrator access required." as const,
      status: 403 as const,
    };
  }

  return { user };
};

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

app.get("/admin/summary", async (c) => {
  const admin = await getAuthenticatedAdmin();
  if ("error" in admin) return c.json({ error: admin.error }, admin.status);

  const [users, teams, admins, vegetarian, nonVegetarian] = await Promise.all([
    authPrisma.user.count(),
    authPrisma.team.count(),
    authPrisma.user.count({ where: { isAdmin: true } }),
    authPrisma.user.count({ where: { dietaryPreference: "VEG" } }),
    authPrisma.user.count({ where: { dietaryPreference: "NON_VEG" } }),
  ]);

  return c.json({ users, teams, admins, vegetarian, nonVegetarian });
});

app.get("/admin/teams", async (c) => {
  const admin = await getAuthenticatedAdmin();
  if ("error" in admin) return c.json({ error: admin.error }, admin.status);

  const teams = await authPrisma.team.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      createdAt: true,
      members: {
        select: {
          id: true,
          name: true,
          rollNo: true,
          dietaryPreference: true,
          isLeader: true,
        },
      },
    },
  });

  return c.json({
    teams: teams.map((team) => ({
      id: team.id,
      name: team.name,
      createdAt: team.createdAt.toISOString(),
      members: team.members.map((member) => ({
        id: member.id,
        name: member.name,
        rollNo: member.rollNo,
        foodPreference: member.dietaryPreference,
        isLeader: member.isLeader,
      })),
    })),
    total: teams.length,
  });
});

app.get("/admin/users", async (c) => {
  const admin = await getAuthenticatedAdmin();
  if ("error" in admin) return c.json({ error: admin.error }, admin.status);

  const parsedSearch = z
    .string()
    .trim()
    .max(100)
    .safeParse(c.req.query("search") ?? "");
  if (!parsedSearch.success) {
    return c.json({ error: "Search must be 100 characters or fewer." }, 400);
  }

  const rawFoodPreference = c.req.query("foodPreference");
  const parsedFoodPreference = rawFoodPreference
    ? z.enum(dietaryPreferences).safeParse(rawFoodPreference)
    : undefined;
  if (parsedFoodPreference && !parsedFoodPreference.success) {
    return c.json({ error: "Food preference is invalid." }, 400);
  }

  const search = parsedSearch.data;
  const foodPreference = parsedFoodPreference?.success
    ? parsedFoodPreference.data
    : undefined;
  const users = await authPrisma.user.findMany({
    where: {
      ...(foodPreference ? { dietaryPreference: foodPreference } : {}),
      ...(search
        ? {
            OR: [
              { rollNo: { contains: search, mode: "insensitive" as const } },
              {
                team: {
                  is: {
                    name: { contains: search, mode: "insensitive" as const },
                  },
                },
              },
            ],
          }
        : {}),
    },
    select: {
      id: true,
      name: true,
      email: true,
      isAdmin: true,
      dietaryPreference: true,
      // joinedAt: true,
      team: { select: { name: true } },
    },
  });

  return c.json({
    users: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      teamName: user.team?.name ?? null,
      foodPreference: user.dietaryPreference,
    })),
    total: users.length,
    canPromoteAdmins: true,
  });
});

app.post("/admin/users/:id/admin", async (c) => {
  const admin = await getAuthenticatedAdmin();
  if ("error" in admin) {
    return c.json({ error: admin.error }, admin.status);
  }

  const parsedId = z
    .string()
    .regex(/^[a-f\d]{24}$/i)
    .safeParse(c.req.param("id"));
  if (!parsedId.success) return c.json({ error: "Invalid user ID." }, 400);

  const target = await authPrisma.user.findUnique({
    where: { id: parsedId.data },
    select: { id: true, isAdmin: true },
  });
  if (!target) return c.json({ error: "User not found." }, 404);

  if (!target.isAdmin) {
    await authPrisma.user.update({
      where: { id: target.id },
      data: { isAdmin: true },
    });
  }

  return c.json({ id: target.id, isAdmin: true });
});

app.get("/admin/admins", async (c) => {
  const admin = await getAuthenticatedAdmin();
  if ("error" in admin) {
    return c.json({ error: admin.error }, admin.status);
  }

  const admins = await authPrisma.user.findMany({
    where: { isAdmin: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true, rollNo: true },
  });

  return c.json({
    admins: admins.map((user) => ({
      ...user,
      canRemove:
        user.id !== admin.user.id &&
        user.email?.trim().toLowerCase() !== "theabhik2020@gmail.com",
      removalBlockedReason:
        user.id === admin.user.id
          ? "You"
          : user.email?.trim().toLowerCase() === "theabhik2020@gmail.com"
            ? "Protected"
            : null,
    })),
    total: admins.length,
  });
});

app.delete("/admin/admins/:id", async (c) => {
  const admin = await getAuthenticatedAdmin();
  if ("error" in admin) {
    return c.json({ error: admin.error }, admin.status);
  }

  const parsedId = z
    .string()
    .regex(/^[a-f\d]{24}$/i)
    .safeParse(c.req.param("id"));
  if (!parsedId.success) return c.json({ error: "Invalid admin ID." }, 400);

  const target = await authPrisma.user.findUnique({
    where: { id: parsedId.data },
    select: { id: true, email: true, isAdmin: true },
  });
  if (!target?.isAdmin) return c.json({ error: "Admin not found." }, 404);

  if (target.id === admin.user.id) {
    return c.json({ error: "You cannot remove your own admin access." }, 403);
  }
  if (target.email?.trim().toLowerCase() === "theabhik2020@gmail.com") {
    return c.json({ error: "This administrator account is protected." }, 403);
  }

  await authPrisma.user.update({
    where: { id: target.id },
    data: { isAdmin: false },
  });

  return c.json({ id: target.id, isAdmin: false });
});

app.get("/teams/me", async (c) => {
  const authenticated = await getAuthenticatedUser();
  if ("error" in authenticated)
    return c.json({ error: authenticated.error }, 401);

  const user = authenticated.user;
  if (!user.teamId) {
    return c.json({
      registered: false,
      email: authenticated.email,
      name: user.name ?? "",
      rollNo: user.rollNo ?? "",
      year: user.year ?? "",
      mobile: user.mobile ?? "",
      dietaryPreference: user.dietaryPreference ?? "",
    });
  }

  const team = await authPrisma.team.findUnique({
    where: { id: user.teamId },
    select: {
      name: true,
      inviteToken: true,
      members: {
        select: {
          name: true,
          email: true,
          isLeader: true,
          dietaryPreference: true,
          image: true,
        },
      },
    },
  });

  if (!team)
    return c.json({ error: "Your team record could not be found." }, 500);

  return c.json({
    registered: true,
    email: authenticated.email,
    name: user.name ?? "",
    dietaryPreference: user.dietaryPreference ?? "",
    isLeader: user.isLeader,
    team: {
      name: team.name,
      inviteToken: user.isLeader ? team.inviteToken : null,
      members: team.members,
      memberCount: team.members.length,
    },
  });
});

app.get("/teams/check", async (c) => {
  const rawName = c.req.query("name")?.trim();

  if (!rawName) {
    return c.json({
      available: false,
      exists: false,
      reason: "Enter a team name.",
    });
  }

  const parsed = z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9 _-]+$/)
    .safeParse(rawName);
  if (!parsed.success) {
    return c.json({
      available: false,
      exists: false,
      reason: "Use 3-30 letters, numbers, spaces, hyphens, or underscores.",
    });
  }

  const name = normalizeTeamName(parsed.data);
  const team = await authPrisma.team.findUnique({ where: { name } });

  return c.json({
    available: !team,
    exists: Boolean(team),
    normalizedName: name,
  });
});

app.post("/teams", async (c) => {
  const authenticated = await getAuthenticatedUser();

  if ("error" in authenticated)
    return c.json({ error: authenticated.error }, 401);

  const parsed = leaderSchema.safeParse(await c.req.json());
  if (!parsed.success)
    return c.json(
      { error: "Check the highlighted details and try again." },
      400,
    );

  const name = normalizeTeamName(parsed.data.teamName);
  if (authenticated.user.teamId) {
    const existingTeam = await authPrisma.team.findUnique({
      where: { id: authenticated.user.teamId },
      select: { name: true },
    });

    return c.json(
      {
        error: existingTeam
          ? `You already belong to team \"${existingTeam.name}\".`
          : "Your previous team link was stale. Refresh and try again.",
      },
      409,
    );
  }

  const userExits = await authPrisma.user.findFirst({
    where: {
      id: authenticated.user.id,
    },
  });

  console.log("THE USER IS: ", userExits);

  try {
    const result = await authPrisma.$transaction(async (tx) => {
      const team = await tx.team.create({
        data: {
          name,
          inviteToken: crypto.randomUUID(),
          leaderEmail: authenticated.email,
          leaderRollNo: parsed.data.rollNo,
          leaderMobile: parsed.data.mobile,
        },
      });

      const user = await tx.user.findUnique({
        where: {
          id: authenticated.user.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.teamId !== null) {
        throw new Error("User is already part of a team");
      }

      const updated = await tx.user.update({
        where: { id: authenticated.user.id },
        data: {
          name: parsed.data.name,
          rollNo: parsed.data.rollNo,
          year: parsed.data.year,
          mobile: parsed.data.mobile,
          dietaryPreference: parsed.data.dietaryPreference,
          isLeader: true,
          teamId: team.id,
          joinedAt: new Date(),
        },
      });
      console.log(updated);

      // if (updated.count !== 1) throw new Error("USER_ALREADY_ASSIGNED");
      return { teamName: team.name, inviteToken: team.inviteToken };
    });

    return c.json(result, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "USER_ALREADY_ASSIGNED") {
      return c.json({ error: "You already belong to a team." }, 409);
    }
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      return c.json({ error: "That team name is already taken." }, 409);
    }
    console.error("Team creation failed", error);
    return c.json(
      { error: "We could not create your team. Please try again." },
      500,
    );
  }
});

app.get("/teams/join", async (c) => {
  const token = c.req.query("token");
  if (!token) return c.json({ error: "Invite link is missing." }, 400);

  const team = await authPrisma.team.findUnique({
    where: { inviteToken: token },
    select: {
      name: true,
      leaderEmail: true,
      members: { select: { email: true } },
    },
  });

  if (!team)
    return c.json({ error: "This invite link is invalid or expired." }, 404);
  return c.json({
    name: team.name,
    leaderEmail: team.leaderEmail,
    memberCount: team.members.length,
    capacity: 3,
  });
});

app.post("/teams/join", async (c) => {
  const authenticated = await getAuthenticatedUser();

  console.log("USER IS IN JOIN", authenticated);

  if ("error" in authenticated)
    return c.json({ error: authenticated.error }, 401);

  const parsed = joinSchema.safeParse(await c.req.json());

  console.log("AFETR ZOD VCALIDATIOn", parsed);

  if (!parsed.success) {
    return c.json(
      { error: "Check the highlighted details and try again." },
      400,
    );
  }
  if (authenticated.user.teamId !== null) {
    // console.log("THIS IS CALLED");
    return c.json({ error: "You already belong to a team." }, 409);
  }
  console.log("THIS IS PASSED");

  try {
    const result = await authPrisma.$transaction(async (tx) => {
      const team = await tx.team.findUnique({
        where: { inviteToken: parsed.data.token },
        include: { members: { select: { id: true } } },
      });
      // console.log("JOIN TEAM", team);
      if (!team) throw new Error("INVITE_NOT_FOUND");
      if (team.members.length > 3) throw new Error("TEAM_FULL");
      const user = await tx.user.findUnique({
        where: {
          id: authenticated.user.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.teamId !== null) {
        throw new Error("User is already part of a team");
      }
      const updated = await tx.user.updateMany({
        where: { id: authenticated.user.id },
        data: {
          name: parsed.data.name,
          rollNo: parsed.data.rollNo,
          year: parsed.data.year,
          mobile: parsed.data.mobile,
          dietaryPreference: parsed.data.dietaryPreference,
          isLeader: false,
          teamId: team.id,
          joinedAt: new Date(),
        },
      });
      if (updated.count !== 1) throw new Error("USER_ALREADY_ASSIGNED");
      return { teamName: team.name };
    });

    return c.json(result, 201);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "INVITE_NOT_FOUND")
        return c.json(
          { error: "This invite link is invalid or expired." },
          404,
        );
      if (error.message === "TEAM_FULL")
        return c.json({ error: "This team already has three members." }, 409);
      if (error.message === "USER_ALREADY_ASSIGNED")
        return c.json({ error: "You already belong to a team." }, 409);
    }
    console.error("Team join failed", error);
    return c.json(
      { error: "We could not join this team. Please try again." },
      500,
    );
  }
});

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
