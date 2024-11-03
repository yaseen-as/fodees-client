import { useAuth0 } from "@auth0/auth0-react";
import { User } from "lucide-react";

export default function UserNameMenu() {
    const { user} = useAuth0();
  return (
    <div className="flex flex-row">
      <User className="text-orange-500" />
     <span className="text-orange-500"> {user?.email}</span>
    </div>
  )
}
