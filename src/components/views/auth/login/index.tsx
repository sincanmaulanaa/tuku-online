import { useRouter } from "next/router";
import styles from "./Login.module.scss";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

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
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <Input name="email" type="email" label="Email" />
          <Input name="password" type="password" label="Password" />
          <Button type="submit" className={styles.login__form__button}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
          <hr className={styles.login__form__divider} />
          <div className={styles.login__form__other}>
            <Button
              type="button"
              onClick={() => signIn("google", { callbackUrl, redirect: false })}
              className={styles.login__form__other__button}
            >
              <i className="bx bxl-google" />
              Login with Google
            </Button>
          </div>
          <p className={styles.login__form__link}>
            Don{"'"}t have an account?{" "}
            <Link href={"/auth/register"}>Sign up here</Link>
          </p>
        </form>
        {error && <p className={styles.login__error}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginView;
