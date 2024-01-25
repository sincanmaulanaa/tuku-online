import { useRouter } from "next/router";
import styles from "./Login.module.scss";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";

const LoginView = () => {
  const { push, query } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const form = event.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };
  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't have any account? Sign up "
      error={error}
    >
      <form onSubmit={handleSubmit}>
        <Input name="email" type="email" label="Email" />
        <Input name="password" type="password" label="Password" />
        <Button type="submit" className={styles.login__button}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
        <hr className={styles.login__divider} />
        <div className={styles.login__other}>
          <Button
            type="button"
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className={styles.login__other__button}
          >
            <i className="bx bxl-google" />
            Login with Google
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginView;
