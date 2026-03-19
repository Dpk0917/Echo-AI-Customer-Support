import { cookies } from "next/headers";
import { scalekit } from "@/lib/scalekit";

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const result: any = await scalekit.validateToken(token);
    const userResponse = await scalekit.user.getUser(result.sub);
    return { user: userResponse.user };
  } catch {
    return null;
  }
}