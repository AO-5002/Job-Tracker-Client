import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "sonner";
import axios from "axios";

const { user, getAccessTokenSilently } = useAuth0();

async function createUser() {
  try {
    const token = await getAccessTokenSilently();

    const userDto = {
      name: user?.name,
      email: user?.email,
    };

    await axios.post("http://localhost:8080/user/private", userDto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("User creation failed:", e);

    toast.error(
      "Oops! We could not finish setting up your account. Please try again later."
    );
  }
}
