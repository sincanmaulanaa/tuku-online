import { useRouter } from "next/router";
import styles from "./Login.module.scss";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

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
          <div className={styles.login__form__item}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.login__form__item__input}
            />
          </div>
          <div className={styles.login__form__item}>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              className={styles.login__form__item__input}
            />
          </div>
          <p className={styles.login__form__link}>
            Don{"'"}t have an account?{" "}
            <Link href={"/auth/register"}>Sign up here</Link>
          </p>
          <button type="submit" className={styles.login__form__button}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        {error && <p className={styles.login__error}>{error}</p>}
      </div>
    </div>
  );
};

export default LoginView;
