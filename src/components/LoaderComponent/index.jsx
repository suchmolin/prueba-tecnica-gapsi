import { LuLoader } from "react-icons/lu";
export default function LoaderComponent() {
  return (
    <div className="loader">
      <LuLoader className="text-6xl text-blue-600 animate animate-spin" />
    </div>
  );
}
