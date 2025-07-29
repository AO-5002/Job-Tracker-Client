import LoginBtn from "@/components/LoginBtn";

export default function Home() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
      <h1>Home Page</h1>
      <div>
        <LoginBtn />
      </div>
    </section>
  );
}
