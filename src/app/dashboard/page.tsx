import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/app/api/auth/login/getSession";
import DashboardClient from "@/app/Components/dashboardclient";

async function Page() {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/api/auth/login");
  }

  return <DashboardClient ownerID={session.user.id} />;
}

export default Page;