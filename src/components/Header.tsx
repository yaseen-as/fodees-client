import { Link } from "react-router-dom";
import MobilNav from "./MobilNav";
import MainNav from "./MainNav";

export default function Header() {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"} className="text-3xl font-bold tracking-tight text-orange-500">Foodees.in</Link>
        <div className="md:hidden">
            <MobilNav/>
        </div>
        <div className="hidden md:block">
          <MainNav/>
        </div>
      </div>
    </div>
  );
}
