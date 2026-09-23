import "dotenv/config"
import { defineConfig, env } from "prisma/config"

export default defineConfig({
  schema: "prisma/contact.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
})
