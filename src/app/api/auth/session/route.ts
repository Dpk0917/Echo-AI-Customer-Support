import { NextResponse } from "next/server";
import { getSession } from "../login/getSession";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getSession();

  if (!session?.user?.id) {
    const response = NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
    response.headers.set("Access-Control-Allow-Origin", "null");
    response.headers.set("Access-Control-Allow-Credentials", "true");
    return response;
  }

  const response = NextResponse.json({ ownerId: session.user.id });
  response.headers.set("Access-Control-Allow-Origin", "null");
  response.headers.set("Access-Control-Allow-Credentials", "true");
  return response;
}

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "null",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
