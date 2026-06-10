import { cookies } from "next/headers";
import { mvGet } from "./api";

export const USER_COOKIE = "mv_user";
export const DEFAULT_USER = "joseph";

/** Lee el usuario activo de la cookie (selector local; en prod sería Supabase auth + magic_links). */
export function getUserId(): string {
  return cookies().get(USER_COOKIE)?.value || DEFAULT_USER;
}

export interface MvUser {
  id: string;
  role: string;
  nombre: string;
  profile?: any;
}

export async function getUsers(): Promise<MvUser[]> {
  return mvGet<MvUser[]>("/users");
}

export async function getCurrentUser(): Promise<MvUser> {
  return mvGet<MvUser>(`/users/${getUserId()}`);
}
