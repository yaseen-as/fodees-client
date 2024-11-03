import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";
import Logout from "./Logout";


export default function MainNav() {
  const { loginWithRedirect, isAuthenticated ,user} = useAuth0();
  return (
    <div>
      {isAuthenticated ? (
        <DropdownMenu>
        <DropdownMenuTrigger><UserNameMenu /></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel><Link to="/user-profile"><span>{user?.name} Profile</span></Link></DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Logout/>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>        
      ) : (
        <Button
          variant="ghost"
          className="text-orange-500 hover:bg-orange-500 hover:text-white text-2xl"
          onClick={async () => await loginWithRedirect()}
        >
          Login
        </Button>
      )}
    </div>
  );
}
