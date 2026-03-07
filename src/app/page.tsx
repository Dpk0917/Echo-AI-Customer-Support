import { getSession } from "@/app/api/auth/login/getSession";
import HomeClient from "./Components/HomeClient";

export default async function Home() {
  const session = await getSession();

  return (
    <>
      <HomeClient email={session?.user?.email ?? ""} />
    </>
  );
}
