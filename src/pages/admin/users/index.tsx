import UsersView from "@/components/views/admin/users";
import userServices from "@/services/user";

const Users = ({ users }: any) => {
  return <UsersView users={users} />;
};

export default Users;

export async function getServerSideProps() {
  try {
    const { data } = await userServices.getAllUsers();
    return {
      props: {
        users: data.data,
      },
    };
  } catch (error) {
    return {
      props: {
        users: [],
      },
    };
  }
}
