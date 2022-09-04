import CryptoJS from "crypto-js";
import { useState } from "react";
import { Web3Storage } from "web3.storage";

import Modal from "react-modal";
import Button from "./button";
import InputBox from "./inputBox";

export default function FileTile(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDescModalOpen, setDescModalOpen] = useState(false);
  const [inputs, setInputs] = useState({});

  function convertWordArrayToUint8Array(wordArray) {
    var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
    var length = wordArray.hasOwnProperty("sigBytes")
      ? wordArray.sigBytes
      : arrayOfWords.length * 4;
    var uInt8Array = new Uint8Array(length),
      index = 0,
      word,
      i;
    for (i = 0; i < length; i++) {
      word = arrayOfWords[i];
      uInt8Array[index++] = word >> 24;
      uInt8Array[index++] = (word >> 16) & 0xff;
      uInt8Array[index++] = (word >> 8) & 0xff;
      uInt8Array[index++] = word & 0xff;
    }
    return uInt8Array;
  }
  async function downloadFile() {
    const client = new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY,
    });
    const res = await client.get(props.file.cid);
    console.log(`Got a response! [${res.status}]`);
    if (!res.ok) {
      throw new Error(`[${res.status}] ${res.statusText}`);
    }

    // unpack File objects from the response
    const files = await res.files();
    // for (const file of files) {
    //   console.log(`${file.cid} -- ${file.name} -- ${file.size}`);
    // }

    const file = files[0];
    var reader = new FileReader();
    reader.onload = () => {
      const key = inputs.key;
      var decrypted = CryptoJS.AES.decrypt(reader.result, key); // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
      var typedArray = convertWordArrayToUint8Array(decrypted); // Convert: WordArray -> typed array

      var fileDec = new Blob([typedArray]); // Create blob from typed array

      var a = document.createElement("a");
      var url = window.URL.createObjectURL(fileDec);
      a.href = url;
      a.download = props.file.file_name;
      a.click();
      window.URL.revokeObjectURL(url);
    };
    console.log(files);
    reader.readAsText(file);
  }

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div
      className="w-full w-56 m-5 bg-cardColor rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      key={props.key}
    >
      <div
        className="flex flex-col items-center  pb-10"
        onClick={() => setDescModalOpen(true)}
      >
        <img
          className="mb-3 w-24 h-24 mt-4 rounded-full"
          src="/file.png"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl text-buttonColor font-medium text-gray-900 dark:text-white">
          {props.file.file_name}
        </h5>
        <span className="text-base text-gray-500 text-descColor text-center m-2 truncate leading-tight w-48 dark:text-gray-400">
          {props.file.file_description}
        </span>
        <div className="flex space-x-3 md:mt-6">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-cardColor bg-buttonColor rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Download
          </button>
        </div>
      </div>
      {isModalOpen ? (
        <Modal
          className="filekey"
          isOpen={true}
          onRequestClose={() => setModalOpen(false)}
          ariaHideApp={false}
          overlayClassName="overlay"
        >
          <div className="inputboxes mt-7 ">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <InputBox
                title="Password"
                name="key"
                type="text"
                value={inputs.key}
                textHandler={handleChange}
              />
            </div>
          </div>
          <div className="buttons">
            <div className="m-5">
              <Button
                name="Cancel"
                onClick={() => {
                  setModalOpen(false);
                }}
              />
            </div>
            <div className="m-5">
              <Button name="Submit" onClick={() => downloadFile()} />
            </div>
          </div>
        </Modal>
      ) : null}
      {isDescModalOpen ? (
        <Modal
          className="filekey"
          isOpen={true}
          onRequestClose={() => setDescModalOpen(false)}
          ariaHideApp={false}
          overlayClassName="overlay"
        >
          <div className="mt-2 ml-2">
            <span className="text-lg underline p-3 text-buttonColor">
              Description:
            </span>
          </div>
          <div className="p-3 ml-3">
            <span className="text-mx text-descColor text-center truncate leading-tight w-48 ">
              {props.file.file_description}
            </span>
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
