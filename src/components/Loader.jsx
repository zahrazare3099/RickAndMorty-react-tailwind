import { LoaderIcon } from "react-hot-toast";

export default function Loader() {
  return (
    <div className="text-white font-bold bg-blue-500 flex justify-center items-center gap-2 basis-1/2 rounded-md p-2  shadow-lg">
      We try to load Data <LoaderIcon className="w-4 h-4" />
    </div>
  );
}
