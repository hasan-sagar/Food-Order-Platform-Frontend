import { useGetUser, useUpdateUser } from "@/api/UserApi";
import UserProfileForm from "@/components/forms/user-profile/UserProfileForm";
import { Pizza } from "lucide-react";

export default function UserProfilePage() {
  const { currentUser, isLoading: isGetLoading } = useGetUser();
  const { updateUser, isLoading } = useUpdateUser();

  if (isGetLoading) {
    return (
      <div className="flex justify-center mx-auto">
        <Pizza color="#75A107" className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    return <span>Unable to fetch user . Login again please</span>;
  }

  return (
    <div>
      <UserProfileForm
        currentUser={currentUser}
        onSave={updateUser}
        isLoading={isLoading}
      />
    </div>
  );
}
