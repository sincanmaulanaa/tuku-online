import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Users.module.scss";

type Proptypes = {
  users: any;
};

const UsersView = (props: Proptypes) => {
  const { users } = props;
  console.log(users);
  return (
    <AdminLayout>
      <h1 className={styles.title}>User Management</h1>
      <div className={styles.users}>
        <table className={styles.users__table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>
                <td>
                  <div className={styles.users__table__action}>
                    <Button type="button">Update</Button>
                    <Button type="button">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default UsersView;
