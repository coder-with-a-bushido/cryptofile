import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import Modal from "react-modal";
import Button from "../button";
import InputBox from "../inputBox";
export default function AddForm(props) {
  const [inputs, setInputs] = useState({});
  const userData = useUser();
  const addEvt = async (e) => {
    e.preventDefault();

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        fname: inputs.filename,
        description: inputs.description,
        cid: "",
        uid: userData.user.email,
      }),
    };

    try {
      await fetch("/api/addFile", requestOptions);
      props.setModalOpen(false);
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  const getEvt = async (e) => {
    try {
      await fetch("/api/getFiles");
    } catch (err) {
      setError(true);
      console.error(err);
    }
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
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
          Add File
        </h1>
        <div className="inputboxes m-7 ">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="File Name"
              name="filename"
              type="text"
              value={inputs.filename}
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
              />
            </div>
          </div>
        </div>
        <div className="buttons">
          <div className="m-5">
            <Button
              name="Cancel"
              onClick={(e) => {
                getEvt(e);
                props.setModalOpen(false);
              }}
            />
          </div>
          <div className="m-5">
            <Button name="Submit" onClick={(e) => addEvt(e)} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
