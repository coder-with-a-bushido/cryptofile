import CryptoJS from "crypto-js";
import { Web3Storage } from "web3.storage";

export default function FileTile(props) {
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
      var key = "123456";

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
  return (
    <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 w-24 h-24 rounded-full shadow-lg"
          src="/file.png"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {props.file.file_name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {props.file.file_description}
        </span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <button
            onClick={(e) => downloadFile(e)}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
}
