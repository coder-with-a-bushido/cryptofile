import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import Modal from "react-modal";
import Button from "../button";
import InputBox from "../inputBox";
import CryptoJS from "crypto-js";
import { Web3Storage } from "web3.storage";
import Loading from "../loading";

export default function AddForm(props) {
  const [inputs, setInputs] = useState({});
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const userData = useUser();

  const addEvt = async (e) => {
    e.preventDefault();

    const file = files[0];
    var reader = new FileReader();
    reader.onload = async () => {
      setLoading(true);
      // encrypt the file
      var wordArray = CryptoJS.lib.WordArray.create(reader.result); // Convert: ArrayBuffer -> WordArray
      var encrypted = CryptoJS.AES.encrypt(wordArray, inputs.key).toString(); // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL-format)
      const fileEnc = new Blob([encrypted]); // Create blob from string
      console.log(fileEnc);

      // upload logic
      const client = new Web3Storage({
        token: process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY,
      });
      const cid = await client.put([new File([fileEnc], file.name)]);
      console.log("stored files with cid:", cid);

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          fname: file.name,
          description: inputs.description ? inputs.description : "",
          cid: cid,
          uid: userData.user.email,
        }),
      };

      try {
        await fetch("/api/addFile", requestOptions);
        props.setModalOpen(false);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Modal
      className="addForm"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
            Add File
          </h1>
          <div className="flex justify-around ">
            <div className="flex w-48 m-8 items-center justify-center bg-grey-lighter">
              <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span class="mt-2 text-base leading-normal">Select a file</span>
                <input type="file" class="hidden" />
              </label>
            </div>

            <div className="inputboxes m-7 ">
              <div className="w-full  px-3 mb-6 md:mb-0">
                <InputBox
                  title="Password"
                  name="key"
                  type="text"
                  value={inputs.key}
                  textHandler={handleChange}
                />
              </div>
              <div className="w-full px-3 mb-6 md:mb-0">
                <InputBox
                  title="Description"
                  name="description"
                  value={inputs.description}
                  type="text"
                  textHandler={handleChange}
                />
              </div>
              <div className="buttons">
                <div className="m-5">
                  <Button
                    name="Cancel"
                    onClick={(e) => {
                      props.setModalOpen(false);
                    }}
                  />
                </div>
                <div className="m-5">
                  <Button name="Submit" onClick={(e) => addEvt(e)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
