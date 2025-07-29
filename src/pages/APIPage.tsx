import LogoutBtn from "@/components/LogoutBtn";
import { Button } from "@/components/ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

export default function APIPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);
        console.log("Token:", accessToken);
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };

    getToken();
  }, []);

  console.log(token);

  return (
    <main className="min-h-screen w-full grid grid-cols-6 grid-rows-[100px_1fr] gap-4 p-4">
      <div className="w-full h-full col-start-2 col-span-4 row-start-1 border p-8 rounded-lg font-mono">
        <div className="w-full flex justify-between">
          <h1 className="text-4xl">API CALLS BELOW:</h1>
          <LogoutBtn />
        </div>
      </div>

      <div className="w-full h-full col-start-2 col-span-4 row-start-2 border p-8 rounded-lg flex flex-wrap items-start justify-around gap-4">
        <div className="w-1/4 flex flex-col gap-4">
          <h1 className="text-lg text-zinc-800 border-b">User API</h1>
          <div className="self-start w-full flex flex-col gap-2">
            <Button variant={"post"}>POST - Create a new user</Button>
          </div>
        </div>

        <div className="w-1/4 flex flex-col gap-4">
          <h1 className="text-lg text-zinc-800 border-b">
            Job Application API
          </h1>
          <div className="self-start w-full flex flex-col gap-2">
            <Button variant={"get"}>GET - Return applications from User</Button>
            <Button variant={"get"}>
              GET - Return specific application via ID
            </Button>
            <Button variant={"post"}>POST - Create new application</Button>
            <Button variant={"put"}>PUT - Update application via ID</Button>
            <Button variant={"delete"}>
              DELETE - Delete application via ID
            </Button>
          </div>
        </div>

        <div className="w-1/4 flex flex-col gap-4">
          <h1 className="text-lg text-zinc-800 border-b">
            Resume/Cover API (S3)
          </h1>
          <div className="self-start w-full flex flex-col gap-2">
            <Button variant={"get"}>
              GET - Return resume/cover-letter PDF
            </Button>
            <Button variant={"post"}>
              POST - Upload resume/cover-letter PDF
            </Button>
            <Button variant={"delete"}>
              DELETE - Delete resume/cover-letter PDF
            </Button>
          </div>
        </div>

        <div className="w-1/4 flex flex-col gap-4">
          <h1 className="text-lg text-zinc-800 border-b">
            Dashboard Stats API (Aggregations)
          </h1>
          <div className="self-start w-full flex flex-col gap-2">
            <Button variant={"get"}>GET - Return status breakdown</Button>

            <Button variant={"get"}>GET - Return monthly summary</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
