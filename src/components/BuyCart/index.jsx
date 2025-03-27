import { BiCartDownload } from "react-icons/bi";
export default function BuyCart({ cart, draggingOver, onDrop }) {
  return (
    <div
      className="h-full flex items-center justify-center pt-10 sm:pt-0"
      onDragOver={(e) => draggingOver(e)}
      onDrop={(e) => onDrop(e)}
    >
      <div className="w-[120px] aspect-square flex items-center justify-center bg-gray-100 rounded-xl relative">
        <span className="py-1 px-3 rounded-full bg-blue-100 absolute -top-2 -left-2">
          {cart.length}
        </span>
        <BiCartDownload className="text-4xl text-blue-500" />
      </div>
    </div>
  );
}
