import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "../api/auth/login/getSession";
import EmbedClient from "@/Components/EmbedClient";

async function Page() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/api/auth/login");
  }

  return (
    <>
      <EmbedClient ownerId={session.user.id} />
    </>
  );
}

export default Page;