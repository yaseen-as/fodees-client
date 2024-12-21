// import { Sheet } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function MobilNav() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Menu className="text-orange-500" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            {isAuthenticated ? (
              <div className="flex flex-col">
                <Link to="/user-profile">
                  <span>{user?.name} Profile</span>
                </Link>
                <Link to="/order-status" className="font-bold hover:text-orange-500">Order Status</Link>
                <Link to="/manage-restourant">
                  <span>Manage Restourant</span>
                </Link>
                <Logout />
              </div>
            ) : (
              <div>
                <SheetTitle>welcome to Foodees</SheetTitle>
                <SheetDescription className="flex">
                  {/* <Button className="flex-1 bg-orange-500 font-bold" >Login</Button> */}
                  <Button
                    variant="ghost"
                    className="text-orange-500 hover:bg-orange-500 hover:text-white text-2xl"
                    onClick={async () => await loginWithRedirect()}
                  >
                    Login
                  </Button>
                </SheetDescription>
              </div>
            )}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
