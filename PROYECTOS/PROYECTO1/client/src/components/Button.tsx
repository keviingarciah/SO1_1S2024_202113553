function Button({
  children,
  onClick,
  type,
}: {
  children: React.ReactNode;
  onClick: () => void;
  type: "new" | "stop" | "resume" | "kill";
}) {
  let colorClasses = "";

  switch (type) {
    case "new":
      colorClasses = "bg-green-500 hover:bg-green-700";
      break;
    case "stop":
      colorClasses = "bg-yellow-500 hover:bg-yellow-700";
      break;
    case "resume":
      colorClasses = "bg-sky-500 hover:bg-sky-700";
      break;
    case "kill":
      colorClasses = "bg-red-500 hover:bg-red-700";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${colorClasses} text-white text-3xl font-bold py-2 px-4 rounded`}
    >
      {children}
    </button>
  );
}

export default Button;
