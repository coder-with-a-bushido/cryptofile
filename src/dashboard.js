import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import AddForm from "./components/addform/addForm";
export default function Dashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const userData = useUser();
  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Add</button>
      {/* <a href="api/auth/logout">logout</a> */}
      {isModalOpen ? <AddForm setModalOpen={setModalOpen} /> : null}
    </div>
  );
}
