import { useUpdateMyUser } from "@/api/MyUserApi"
import UserProfileForm from "@/forms/user-profile-forms/UserProfileForm"

function UserProfilePage() {
  const {updateUser,isPending}=useUpdateMyUser();
  return (
    <div>
      <UserProfileForm onSave={updateUser} isLoading={isPending} />
    </div>
  )
}

export default UserProfilePage
