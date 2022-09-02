import { useUser } from "@auth0/nextjs-auth0";
export default function Dashboard() {
  const userData = useUser();
  const addEvt = () => {};
  return (
    <div>
      <button onClick={() => addEvt}>Add</button>
      <a href="api/auth/logout">logout</a>
    </div>
  );
}
