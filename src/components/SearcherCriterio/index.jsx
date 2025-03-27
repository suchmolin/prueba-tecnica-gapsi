import { IoSearchSharp } from "react-icons/io5";
export default function SearcherCriterio({ setCriterio }) {
  const updateCriterio = (e) => {
    e.preventDefault();
    const input = document.getElementById("searcher");
    setCriterio(input.value);
  };
  return (
    <form
      onSubmit={(e) => updateCriterio(e)}
      className="buscador sm:w-11/12 flex flex-col justify-center px-5 sm:px-20"
    >
      <label htmlFor="searcher">Introduzca la categoria</label>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          name="searcher"
          id="searcher"
          placeholder="computer"
          className="w-full h-[50px] border-2 border-gray-300 rounded-md px-5"
        />
        <button
          onClick={(e) => updateCriterio(e)}
          className="p-2 rounded-full cursor-pointer"
        >
          <IoSearchSharp className="text-2xl text-blue-300" />
        </button>
      </div>
    </form>
  );
}
