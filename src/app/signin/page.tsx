import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <main className="flex h-full  flex-col items-center justify-between p-4">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-2xl font-medium">Just memo it.</h1>
        <p className="text-sm text-muted-foreground">Sign in to continue</p>

        <br />

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <Button type="submit">Signin with Google</Button>
        </form>
      </div>
    </main>
  );
}
