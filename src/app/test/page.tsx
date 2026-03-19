import { getSession } from "../api/auth/login/getSession";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function TestPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/api/auth/login");
  }

  const ownerId = session.user.id;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return (
    <html lang="en">
      <head>
        <title>Echo AI - ChatBot Test</title>
      </head>
      <body style={{ fontFamily: "sans-serif", padding: "40px", background: "#f9f9f9" }}>
        <h2>Echo AI ChatBot Test Page</h2>
        <p style={{ color: "#666" }}>
          ChatBot loaded for owner: <strong>{ownerId}</strong>
        </p>
        <p style={{ color: "#999", fontSize: "14px" }}>
          This page dynamically loads the chatbot for the currently logged-in user.
          Change your settings on the <a href="/dashboard">dashboard</a> and the chatbot will reflect them immediately.
        </p>
        <script
          src={`${appUrl}/chatBot.js`}
          data-owner-id={ownerId}
        />
      </body>
    </html>
  );
}
