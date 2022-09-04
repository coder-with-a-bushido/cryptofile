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
          <div className="inputboxes m-7 ">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputBox
                title="Password"
                name="key"
                type="text"
                value={inputs.key}
                textHandler={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <InputBox
                title="Description"
                name="description"
                value={inputs.description}
                type="text"
                textHandler={handleChange}
              />
            </div>

            <div className="flex justify-center">
              <div className="mb-3 w-96">
                <input
                  className="form-control block w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                  id="formFile"
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
            </div>
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
      )}
    </Modal>
  );
}
