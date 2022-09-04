import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useState, useEffect } from "react";
import AddForm from "./components/addform/addForm";
import FileTile from "./components/fileTile";
import Loading from "./components/loading";
export default function Dashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(true);

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvt();
  }, []);

  console.log(files);
  return (
    <div className="font-body">
      <div className=" w-full bg-cardColor h-72">
        <div className="flex flex-wrap items-center justify-center p-4">
          <div className="flex items-center container-fluid mt-8">
            <img className="w-20" src="/logo.png" />
            <p className="text-4xl font-extrabold p-2">CryptoFile</p>
          </div>
        </div>
        <div className="text-center">
          <span className="text-xl font-semibold  p-2 text-black">
            Encrypted file storage for Web3 lovers ❤️
          </span>
          <div className="mt-10 mb-2">
            <span className="text-lg font-medium  pt-2 text-black">
              powered by
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center">
            <img className="w-8 mr-2" src="/cockroach_logo.png" />
            <img className="w-8 mr-2" src="/filecoin_logo.png" />
            <img className="w-8 mr-2" src="/ipfs_logo.png" />
            <img className="w-8 mr-2" src="/web3storage_logo.png" />
          </div>
        </div>
      </div>

      <div className="flex justify-between m-5">
        <Link href="/api/auth/logout">
          <button className="bg-buttonColor w-10 text-cardColor rounded">
            <img src="/exit.png" className="w-5 ml-2.5" alt="exit" />
          </button>
        </Link>
        <button
          className="bg-buttonColor w-24 text-cardColor font-bold py-2 px-4 border border-blue-700 rounded mr-2"
          onClick={() => setModalOpen(true)}
        >
          + Add
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap ">
          {typeof files !== "undefined" && files.length > 0 ? (
            files.map((file, key) => <FileTile file={file} key={key} />)
          ) : (
            <p>No file found!</p>
          )}
        </div>
      )}
      {/* <a href="api/auth/logout">logout</a> */}
      {isModalOpen ? <AddForm setModalOpen={setModalOpen} /> : null}
    </div>
  );
}
