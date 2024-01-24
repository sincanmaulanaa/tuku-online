import { useRouter } from "next/router";
import styles from "./Register.module.scss";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const RegisterView = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      push("/auth/login");
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError("Email is already registered");
    }
  };
  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <Input type="text" name="fullname" label="Fullname" />
          <Input type="email" name="email" label="Email" />
          <Input type="number" name="phone" label="Phone" />
          <Input type="password" name="password" label="Password" />
          <Button type="submit" className={styles.register__form__button}>
            {isLoading ? "Loading..." : "Register"}
          </Button>
          <p className={styles.register__form__link}>
            Have an account? <Link href={"/auth/login"}>Sign in here</Link>
          </p>
        </form>
        {error && <p className={styles.register__error}>{error}</p>}
      </div>
    </div>
  );
};

export default RegisterView;
