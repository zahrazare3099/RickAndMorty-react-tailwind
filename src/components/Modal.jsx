import { XCircleIcon } from "@heroicons/react/24/outline";

export default function Modal({ title, children, onOpen, open }) {
  const style = {
    backdrop: {
      width: " 100vw",
      height: " 100vh",
    },
    modal: {
      //   minHeight: "250px",
      maxWidth: "34rem",
      //   width: "98%",
      top: "50%",
      left: "50%",
      height: "21rem",
      boxShadow: " 1px 1px 50px #4a044e",
    },
  };
  if (!open) return null;
  return (
    <div>
      <div
        className="fixed inset-0 z-10 bg-black opacity-80"
        style={style.backdrop}
        onClick={() => onOpen(false)}
      ></div>
      <div
        className="modal absolute overflow-y-auto bg-slate-700 p-4 rounded-md z-20 ease-linear transition-all duration-150"
        style={style.modal}
      >
        <nav className="mb-3 pb-1 border-b-2 flex items-center justify-between">
          <span className="font-bold text-lg text-white font-serif px-1">
            {title}
          </span>
          <button onClick={() => onOpen(false)}>
            <XCircleIcon className="w-7 h-7 text-red-600" />
          </button>
        </nav>
        {children}
      </div>
    </div>
  );
}
