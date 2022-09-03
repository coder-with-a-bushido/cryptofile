const Button = (props) => {
  return (
    <button
      className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 border-b-4 border-white-700 hover:border-white-500 rounded"
      onClick={props.onClick ? props.onClick : null}
      type={props.type ? props.type : null}
      name={props.name}
    >
      {props.name}
    </button>
  );
};
export default Button;
