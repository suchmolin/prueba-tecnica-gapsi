import { TfiReload } from "react-icons/tfi";
export default function HeaderGapsi({ resetApp }) {
  return (
    <nav className="w-full bg-gray-100 px-10 py-5 flex justify-between items-center">
      <div className="flex flex-col sm:flex-row gap-10 items-center ">
        <img src="/img/logo.png" alt="Gaspi logo" className="" />
        <h1 className="font-bold text-xl text-gray-600"> e-Commerce Gapsi</h1>
      </div>
      <button
        onClick={resetApp}
        className="rounded-full p-3 bg-gray-200 cursor-pointer hover:scale-110 duration-300"
      >
        <TfiReload className="text-lg text-blue-500" />
      </button>
    </nav>
  );
}
