import { useUser } from "@auth0/nextjs-auth0";
import { useState, useEffect } from "react";
import AddForm from "./components/addform/addForm";
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

      {files
        ? files.map((file) => (
            <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                <img
                  className="mb-3 w-24 h-24 rounded-full shadow-lg"
                  src="/file.png"
                  alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {file.file_name}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {file.file_description}
                </span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))
        : null}
      {/* <a href="api/auth/logout">logout</a> */}
      {isModalOpen ? <AddForm setModalOpen={setModalOpen} /> : null}
    </div>
  );
}
