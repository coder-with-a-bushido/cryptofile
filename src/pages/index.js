import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Dashboard from "../dashboard";
import Landing from "../landing";

export default function Home() {
  const userData = useUser();

  if (userData.user) {
    return <Dashboard />;
  } else {
    return <Landing />;
  }
}
