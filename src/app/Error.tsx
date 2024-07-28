const Error = () => {
  return (
    <div
      className={
        "flex items-center justify-center h-80 bg-red-400 border-red-950 rounded-md flex-col"
      }
    >
      <div className="text-black">There was an error</div>
      <button
        className="text-center text-red-950 border mt-3 py-1 px-3 rounded-md bg-transparent border-red-950 hover:bg-red-950 hover:text-white"
        onClick={() => {
          window.location.reload();
        }}
      >
        Try again
      </button>
    </div>
  );
};

export default Error;
