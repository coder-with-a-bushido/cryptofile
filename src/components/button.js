const Button = (props) => {
  return (
    <button
      className="bg-buttonColor text-cardColor font-bold py-2 px-4 rounded"
      onClick={props.onClick ? props.onClick : null}
      type={props.type ? props.type : null}
      name={props.name}
    >
      {props.name}
    </button>
  );
};
export default Button;
