export { auth as proxy } from "@/lib/config/auth-edge"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/users/:path*",
    "/teams/:path*",
    "/admins/:path*",
    "/controls/:path*",
  ],
}