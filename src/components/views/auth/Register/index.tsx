import { useRouter } from "next/router";
import styles from "./Register.module.scss";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

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

    try {
      await authServices.registerAccount(data);
      form.reset();
      push("/auth/login");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setError("Email is already registered");
    }
  };
  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      error={error}
      linkText="Already have an account? Sign in "
    >
      <form onSubmit={handleSubmit}>
        <Input type="text" name="fullname" label="Fullname" required />
        <Input type="email" name="email" label="Email" required />
        <Input type="number" name="phone" label="Phone" required />
        <Input type="password" name="password" label="Password" required />
        <Button type="submit" className={styles.register__button}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterView;
