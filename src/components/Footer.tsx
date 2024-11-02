import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-orange-500 py-6 flex items-center justify-center">
      <div className="container flex md:flex-row  justify-between  ">
      <Link to={"/"} className="text-3xl font-bold tracking-tight text-white">Foodees.in</Link>
        <div>
            <span className="text-white text-lg">privacy policy </span>
            <span className="text-white text-lg">Terms of service</span>
        </div>
      </div>
    </div>
  )
}
