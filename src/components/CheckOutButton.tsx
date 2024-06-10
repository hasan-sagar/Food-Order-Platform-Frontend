import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Pizza } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "./forms/user-profile/UserProfileForm";
import { useGetUser } from "@/api/UserApi";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
};

export default function CheckOutButton({ onCheckout, disabled }: Props) {
  const { currentUser, isLoading: isGetUserLoading } = useGetUser();

  const {
    isAuthenticated,
    isLoading: authLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="flex-1">
        Login to check out
      </Button>
    );
  }

  if (authLoading || !currentUser) {
    return (
      <div className="flex justify-center mx-auto">
        <Pizza color="#75A107" className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={disabled} className="flex-1">
            Go to checkout page
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[450px] md:min-w-[700px] bg-gray-50">
          <UserProfileForm
            currentUser={currentUser}
            onSave={onCheckout}
            isLoading={isGetUserLoading}
            title="Please Fillup Delivery Details"
            buttonText="Continue to payment"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
