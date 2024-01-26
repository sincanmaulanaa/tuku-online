import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";
import { useState } from "react";

type Proptypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};

const Sidebar = (props: Proptypes) => {
  const { lists } = props;
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div>
        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <i className="bx bx-menu"></i>
          <h1>
            {!pathname.split("/")[2]
              ? "Dashboard"
              : pathname.split("/")[2].charAt(0).toUpperCase() +
                pathname.split("/")[2].slice(1)}
          </h1>
        </button>
        <div
          className={
            isOpen ? styles.mobile_sidebar : styles.mobile_sidebar_close
          }
        >
          <div className={styles.mobile_sidebar__top}>
            <h1 className={styles.mobile_sidebar__top__title}>Admin Panel</h1>
            <div className={styles.mobile_sidebar__top__lists}>
              {lists.map((list, index) => (
                <Link
                  href={list.url}
                  key={index}
                  className={`${styles.mobile_sidebar__top__lists__item} ${
                    pathname === list.url &&
                    styles.mobile_sidebar__top__lists__item__active
                  }`}
                >
                  <i
                    className={`bx ${list.icon} ${styles.mobile_sidebar__top__lists__item__icon}`}
                  />
                  <h4
                    className={styles.mobile_sidebar__top__lists__item__title}
                  >
                    {list.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.mobile_sidebar__bottom}>
            <Button
              type="button"
              className={styles.mobile_sidebar__bottom__button}
              variant="secondary"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.sidebar}>
        <div className={styles.sidebar__top}>
          <h1 className={styles.sidebar__top__title}>Admin Panel</h1>
          <div className={styles.sidebar__top__lists}>
            {lists.map((list, index) => (
              <Link
                href={list.url}
                key={index}
                className={`${styles.sidebar__top__lists__item} ${
                  pathname === list.url &&
                  styles.sidebar__top__lists__item__active
                }`}
              >
                <i
                  className={`bx ${list.icon} ${styles.sidebar__top__lists__item__icon}`}
                />
                <h4 className={styles.sidebar__top__lists__item__title}>
                  {list.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.sidebar__bottom}>
          <Button
            type="button"
            className={styles.sidebar__bottom__button}
            variant="secondary"
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
