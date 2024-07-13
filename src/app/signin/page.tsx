import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <main className="flex h-full  flex-col items-center justify-between p-4">
      <div className="flex items-center h-full">
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
      </div>
    </main>
  );
}
