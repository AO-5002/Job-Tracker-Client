import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const PostLoginRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && user) {
      window.location.replace(`/dashboard/${user.name}`);
    }
  }, [isAuthenticated, isLoading, user]);

  return <div>Redirecting...</div>;
};

export default PostLoginRedirect;
