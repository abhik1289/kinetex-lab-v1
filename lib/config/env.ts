const requiredEnv = (name: string) => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

export const authEnv = {
  get secret() {
    return requiredEnv("AUTH_SECRET")
  },
  get googleClientId() {
    return requiredEnv("AUTH_GOOGLE_ID")
  },
  get googleClientSecret() {
    return requiredEnv("AUTH_GOOGLE_SECRET")
  },
}
