import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

const LogoutBtn = () => {
  const { logout } = useAuth0();

  return (
    <Button
      className="font-bold hover:bg-white hover:text-black hover:outline"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </Button>
  );
};

export default LogoutBtn;
