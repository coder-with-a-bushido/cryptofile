const InputBox = ({ title, type = "text", value, name, textHandler, rows }) => {
  return (
    <div>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {title}
      </label>
      {title === "Description" ? (
        <textarea
          rows={rows ? rows : 5}
          name={name}
          placeholder={title}
          onChange={textHandler}
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize rounded-md"
        ></textarea>
      ) : (
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          type={type}
          name={name}
          placeholder={title}
          onChange={textHandler}
        />
      )}
      {name === "company" ||
      title === "Title" ||
      name === "name" ||
      title === "Job Title" ? (
        <p className="text-red-500 text-xs italic m-2">
          Please fill out this field.
        </p>
      ) : null}
    </div>
  );
};

export default InputBox;
