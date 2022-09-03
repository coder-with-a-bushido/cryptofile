import { useUser } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";
import AddForm from "./components/addform/addForm";
import FileTile from "./components/fileTile";
export default function Dashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState();
  const userData = useUser();
  const getEvt = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        uid: userData.user.email,
      }),
    };

    try {
      const data = await fetch("/api/getFiles", requestOptions);
      data.json().then((res) => {
        setFiles(res);
      });
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };
  useEffect(() => {
    getEvt();
  }, []);
  console.log(files);
  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Add</button>

      {typeof files !== "undefined" && files.length > 0 ? (
        files.map((file) => <FileTile file={file} />)
      ) : (
        <p>No file found!</p>
      )}
      {/* <a href="api/auth/logout">logout</a> */}
      {isModalOpen ? <AddForm setModalOpen={setModalOpen} /> : null}
    </div>
  );
}
