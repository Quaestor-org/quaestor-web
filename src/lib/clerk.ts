export function isAdmin(id: string) {
  return (process.env.NEXT_PUBLIC_ADMIN_IDS?.split(",") ?? []).includes(id);
}
