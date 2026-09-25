import { Hono } from "hono";
import { handle } from "hono/vercel";
import { auth } from "@/lib/config/auth";
import { authPrisma } from "@/lib/config/prisma";
import { extractRollNo, isKIITEmail } from "@/lib/utils";

const app = new Hono().basePath("/api");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

app.get("/teams/check", async (c) => {
  const name = c.req.query("name")?.trim();

  if (!name) return c.json({ exists: false });

  const team = await authPrisma.team.findUnique({ where: { name } });
  return c.json({ exists: Boolean(team) });
});

app.post("/teams", async (c) => {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();

  if (!email || !isKIITEmail(email)) {
    return c.json({ error: "Sign in with a KIIT Google account first." }, 401);
  }

  const body = await c.req.json<{
    leaderName?: string;
    teamName?: string;
    mobile?: string;
  }>();
  const leaderName = body.leaderName?.trim();
  const name = body.teamName?.trim();
  const mobile = body.mobile?.trim();

  if (!leaderName || !name || !mobile || !/^\d{10}$/.test(mobile)) {
    return c.json(
      { error: "A team name and valid 10-digit mobile number are required." },
      400,
    );
  }

  const user = await authPrisma.user.findUnique({ where: { email } });
  if (!user)
    return c.json(
      { error: "Your account is not ready yet. Sign in again." },
      400,
    );
  if (user.teamId)
    return c.json({ error: "You already belong to a team." }, 409);

  const existingTeam = await authPrisma.team.findUnique({ where: { name } });
  if (existingTeam)
    return c.json({ error: "That team name is already taken." }, 409);

  const inviteToken = crypto.randomUUID();
  const rollNo = extractRollNo(email);
  const team = await authPrisma.team.create({
    data: {
      name,
      inviteToken,
      leaderEmail: email,
      leaderRollNo: rollNo,
      leaderMobile: mobile,
      members: { connect: { id: user.id } },
    },
  });

  await authPrisma.user.update({
    where: { id: user.id },
    data: {
      name: leaderName,
      mobile,
      rollNo,
      isLeader: true,
      teamId: team.id,
    },
  });

  return c.json({ teamName: team.name, inviteToken });
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
  });
});

app.post("/teams/join", async (c) => {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  const body = await c.req.json<{
    token?: string;
    name?: string;
    mobile?: string;
  }>();

  if (!email || !isKIITEmail(email)) {
    return c.json({ error: "Sign in with a KIIT Google account first." }, 401);
  }

  const token = body.token?.trim();
  const name = body.name?.trim();
  const mobile = body.mobile?.trim();
  if (!token || !name || !mobile || !/^\d{10}$/.test(mobile)) {
    return c.json(
      {
        error:
          "Name, invite link, and valid 10-digit mobile number are required.",
      },
      400,
    );
  }

  const team = await authPrisma.team.findUnique({
    where: { inviteToken: token },
    include: { members: true },
  });
  if (!team)
    return c.json({ error: "This invite link is invalid or expired." }, 404);
  if (team.members.length >= 3)
    return c.json({ error: "This team already has three members." }, 409);

  const user = await authPrisma.user.findUnique({ where: { email } });
  if (!user)
    return c.json(
      { error: "Your account is not ready yet. Sign in again." },
      400,
    );
  if (user.teamId)
    return c.json({ error: "You already belong to a team." }, 409);

  const rollNo = extractRollNo(email);
  await authPrisma.user.update({
    where: { id: user.id },
    data: { name, mobile, rollNo, teamId: team.id, isLeader: false },
  });

  return c.json({ teamName: team.name });
});

export const GET = handle(app);
export const POST = handle(app);
