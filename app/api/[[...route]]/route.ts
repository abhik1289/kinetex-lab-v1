import { Hono } from "hono";
import { handle } from "hono/vercel";
import { auth } from "@/lib/config/auth";
import { authPrisma } from "@/lib/config/prisma";
// import { isKIITEmail } from "@/lib/utils";
import { z } from "zod";
import { randomUUID } from "node:crypto";

const app = new Hono().basePath("/api");

const registrationClosedMessage = "Registration closed already.";
const dietaryPreferences = ["VEG", "NON_VEG"] as const;
const certificateNotAvailableMessage =
  "Certificate not available. You were not registered/marked as a participant for Kaun Banega Codepati 2026.";
const certificateDemo = {
  name: "Abhik Patra",
  rollNo: "2305588",
  certificateId: "KBC26-DEMO-2305588",
};

const normalizeCertificateValue = (value: string) =>
  value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en");

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
      rollNo: true,
      certificateEligible: true,
      team: { select: { name: true } },
    },
  });

  return c.json({
    users: users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      rollNo: user.rollNo,
      teamName: user.team?.name ?? null,
      foodPreference: user.dietaryPreference,
      certificateEligible: user.certificateEligible,
    })),
    total: users.length,
    canPromoteAdmins: true,
  });
});

app.post("/admin/users/:id/certificate-eligibility", async (c) => {
  const admin = await getAuthenticatedAdmin();
  if ("error" in admin) return c.json({ error: admin.error }, admin.status);

  const parsedId = z
    .string()
    .regex(/^[a-f\d]{24}$/i)
    .safeParse(c.req.param("id"));
  if (!parsedId.success) return c.json({ error: "Invalid user ID." }, 400);

  const parsedBody = z
    .object({ eligible: z.boolean() })
    .safeParse(await c.req.json().catch(() => null));
  if (!parsedBody.success) {
    return c.json({ error: "Certificate eligibility value is invalid." }, 400);
  }

  const user = await authPrisma.user.findUnique({
    where: { id: parsedId.data },
    select: { id: true, name: true, rollNo: true },
  });
  if (!user) return c.json({ error: "User not found." }, 404);
  if (
    parsedBody.data.eligible &&
    (!user.name?.trim() || !user.rollNo?.trim())
  ) {
    return c.json(
      {
        error:
          "Add the student's name and roll number before marking eligibility.",
      },
      400,
    );
  }

  const updated = await authPrisma.user.update({
    where: { id: user.id },
    data: { certificateEligible: parsedBody.data.eligible },
    select: { id: true, certificateEligible: true },
  });
  if (!parsedBody.data.eligible) {
    await authPrisma.kbcCertificate.deleteMany({
      where: { userId: updated.id },
    });
  }
  return c.json(updated);
});

app.post("/certificate", async (c) => {
  const parsed = z
    .object({
      name: z.string().trim().min(1).max(100),
      rollNo: z.string().trim().min(1).max(32),
    })
    .safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) {
    return c.json({ error: "Enter a valid name and roll number." }, 400);
  }

  if (
    process.env.NODE_ENV == "production" &&
    normalizeCertificateValue(parsed.data.name) ===
      normalizeCertificateValue(certificateDemo.name) &&
    normalizeCertificateValue(parsed.data.rollNo) ===
      normalizeCertificateValue(certificateDemo.rollNo)
  ) {
    return c.json({
      available: true,
      ...certificateDemo,
      verificationPath: `/event-kbc/verify/${certificateDemo.certificateId}`,
    });
  }

  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();
  if (!email)
    return c.json({ error: "Sign in to verify your certificate." }, 401);

  const user = await authPrisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      rollNo: true,
      certificateEligible: true,
    },
  });

  if (
    !user ||
    normalizeCertificateValue(parsed.data.name) !==
      normalizeCertificateValue(user.name ?? "") ||
    normalizeCertificateValue(parsed.data.rollNo) !==
      normalizeCertificateValue(user.rollNo ?? "") ||
    !user.certificateEligible
  ) {
    return c.json({
      available: false,
      message: certificateNotAvailableMessage,
    });
  }

  const certificate = await authPrisma.kbcCertificate.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      certificateId: `KBC26-${randomUUID().replaceAll("-", "").toUpperCase()}`,
    },
    update: {},
    select: { certificateId: true },
  });
  return c.json({
    available: true,
    name: user.name,
    rollNo: user.rollNo,
    certificateId: certificate.certificateId,
    verificationPath: `/event-kbc/verify/${certificate.certificateId}`,
  });
});

app.get("/certificate/verify/:certificateId", async (c) => {
  const certificateId = c.req.param("certificateId").trim().toUpperCase();

  if (
    process.env.NODE_ENV !== "production" &&
    certificateId === certificateDemo.certificateId
  ) {
    return c.json({
      valid: true,
      ...certificateDemo,
      event: "Kaun Banega Codepati 2026",
    });
  }

  const certificate = await authPrisma.kbcCertificate.findUnique({
    where: { certificateId },
    include: {
      user: {
        select: { name: true, rollNo: true, certificateEligible: true },
      },
    },
  });
  const user = certificate?.user;

  if (!user || !user.certificateEligible) {
    return c.json({ valid: false });
  }

  return c.json({
    valid: true,
    name: user.name,
    rollNo: user.rollNo,
    certificateId,
    event: "Kaun Banega Codepati 2026",
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

app.post("/teams", (c) => {
  return c.json({ error: registrationClosedMessage }, 410);
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

app.post("/teams/join", (c) => {
  return c.json({ error: registrationClosedMessage }, 410);
});

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
