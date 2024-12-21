import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-forms/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";


type Props={
  onCheackout:(userFormData:UserFormData)=>void;
  disabled:boolean;
  isLoading:boolean;
}
export default function CheckOutButton({disabled,onCheackout,isLoading}:Props) {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();
  const { pathname } = useLocation();
  const {isLoading:isGetUserLoading,userData}= useGetMyUser()
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };
  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Log in to check out
      </Button>
    );
  }
  if (!isAuthLoading|| !userData || isLoading) {
    return (<LoadingButton />);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  className="bg-orange-500 flex-1" disabled={disabled}>Go to cheakout</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          onSave={onCheackout}
          isLoading={isGetUserLoading}
          userData={userData}
          buttonText="Countinue To Payment"
          title="Confiorm Delivery Details"
        />
      </DialogContent>
    </Dialog>
  );
}
