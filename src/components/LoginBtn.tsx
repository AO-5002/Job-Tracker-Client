import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

const LoginBtn = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      className="bg-indigo-500 text-white font-bold hover:bg-white hover:text-indigo-500"
      onClick={() => loginWithRedirect()}
    >
      Log in
    </Button>
  );
};

export default LoginBtn;
