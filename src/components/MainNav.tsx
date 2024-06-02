import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

export default function MainNav() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <>
      <span className="flex space-x-2 items-center">
        {isAuthenticated ? (
          <>
            <Link to="/order-status" className="font-bold hover:text-[#75A107]">
              Order Status
            </Link>
            <UsernameMenu />
          </>
        ) : (
          <Button
            className="font-semibold text-base hover:text-[#75A107] hover:bg-white"
            variant="ghost"
            onClick={async () => await loginWithRedirect()}
          >
            Log In
          </Button>
        )}
      </span>
    </>
  );
}
