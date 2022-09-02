import { useUser } from "@auth0/nextjs-auth0";
import Dashboard from "../dashboard";

export default function Home() {
  const userData = useUser();

  if (userData.user) {
    return <Dashboard />;
  } else {
    return <a href="/api/auth/login">Login</a>;
  }
}
