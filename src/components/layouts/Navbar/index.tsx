import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { data } = useSession();
  return (
    <nav className={styles.navbar}>
      <button
        className={styles.navbar__button}
        onClick={() => (data ? signOut() : signIn())}
      >
        {data ? "Logout" : "Login"}
      </button>
    </nav>
  );
};

export default Navbar;
