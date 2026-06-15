export function isAdmin(id: string) { 
  return (process.env.ADMIN_IDS?.split(",") ?? []).includes(id);
}
