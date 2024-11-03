import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";


export default function Logout() {
    const { logout } = useAuth0();
  return (
    <div>
      <Button onClick={() => logout()}>
        Logout
      </Button>
    </div>
  )
}
