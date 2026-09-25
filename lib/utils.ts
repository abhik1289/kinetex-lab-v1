export { cn } from "cn";

export function isKIITEmail(email: string) {
  return /^[a-zA-Z0-9._%+-]+@kiit\.ac\.in$/i.test(email.trim());
}

export function extractRollNo(email: string) {
  return email.trim().split("@")[0] ?? "";
}
