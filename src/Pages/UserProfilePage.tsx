import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"
import UserProfileForm from "@/forms/user-profile-forms/UserProfileForm"

function UserProfilePage() {
  const {userData,isLoading}=useGetMyUser();
  const {updateUser,isPending}=useUpdateMyUser();
  if(isLoading){
    return <span>loading form</span>
  }
  if(!userData){
    return <span>something rong</span>
  }
  return (
    <div>
      <UserProfileForm userData={userData} onSave={updateUser} isLoading={isPending} />
    </div>
  )
}

export default UserProfilePage
