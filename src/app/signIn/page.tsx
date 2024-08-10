import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <main className="flex h-full  flex-col items-center justify-between p-4">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-2xl font-medium">그냥 메모장</h1>
        <p className="text-sm text-muted-foreground">일일 메모 남기기</p>

        <br />

        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <Button type="submit" variant="outline" className="pl-1.5">
            <GoogleIcon /> Google로 계속하기
          </Button>
        </form>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 40 40" width="36" height="36">
      <g xmlns="http://www.w3.org/2000/svg">
        <path
          d="M31.6 20.2273C31.6 19.5182 31.5364 18.8364 31.4182 18.1818H22V22.05H27.3818C27.15 23.3 26.4455 24.3591 25.3864 25.0682V27.5773H28.6182C30.5091 25.8364 31.6 23.2727 31.6 20.2273V20.2273Z"
          fill="#4285F4"
        />
        <path
          d="M22 30C24.7 30 26.9636 29.1045 28.6181 27.5773L25.3863 25.0682C24.4909 25.6682 23.3454 26.0227 22 26.0227C19.3954 26.0227 17.1909 24.2636 16.4045 21.9H13.0636V24.4909C14.7091 27.7591 18.0909 30 22 30Z"
          fill="#34A853"
        />
        <path
          d="M16.4045 21.9C16.2045 21.3 16.0909 20.6591 16.0909 20C16.0909 19.3409 16.2045 18.7 16.4045 18.1V15.5091H13.0636C12.3864 16.8591 12 18.3864 12 20C12 21.6136 12.3864 23.1409 13.0636 24.4909L16.4045 21.9V21.9Z"
          fill="#FBBC04"
        />
        <path
          d="M22 13.9773C23.4681 13.9773 24.7863 14.4818 25.8227 15.4727L28.6909 12.6045C26.9591 10.9909 24.6954 10 22 10C18.0909 10 14.7091 12.2409 13.0636 15.5091L16.4045 18.1C17.1909 15.7364 19.3954 13.9773 22 13.9773Z"
          fill="#E94235"
        />
      </g>
    </svg>
  );
}
