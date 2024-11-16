import { useAuth0 } from "@auth0/auth0-react"
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
    const {isAuthenticated}=useAuth0();
  return (
    <div>
      {isAuthenticated? (<Outlet/>):(<Navigate to={'/'}/>)}
    </div>
  )
}
