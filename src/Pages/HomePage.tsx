import landing from "../assets/landing.png";
import appDown from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate=useNavigate()
  const handleSearchSubmit=(searchvalue:SearchForm)=>{
    navigate({pathname:`search/${searchvalue}`})
  }
  return (
    <div>
      <div className="container bg-white flex flex-col items-center justify-center -mt-16 py-6 shadow-md rounded-sm mb-1">
        <span className="text-3xl font-bold tracking-tight text-orange-500">
          Trek in to a takeaway Today
        </span>
        <span className="text-xl pt-4">Food is just a click away!</span>
        <SearchBar placeHolder="Searchby city or town" onSubmit={handleSearchSubmit}/>
      </div>
      <div className="flex flex-col sm:flex-row justify-evenly ">
        <img src={landing} alt="" className="w-full h-48 sm:w-1/2 sm:h-auto" />
        <div className="flex flex-col justify-center items-center mr-4">
          <span className="text-bold text-2xl">order tack away even fast</span>
          <span>Download the app now</span>
          <img
            src={appDown}
            alt=""
            className="w-full h-48 sm:w-1/2 sm:h-auto"
          />
        </div>
      </div>
    </div>
  );
}
