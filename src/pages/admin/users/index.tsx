import UserManagementView from "@/components/views/admin/Users";
import userServices from "@/services/user";

const Users = ({ users }: any) => {
  return <UserManagementView users={users} />;
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
