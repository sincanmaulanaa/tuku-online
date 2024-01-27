import UsersView from "@/components/views/admin/users";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };

    getAllUsers();
  }, []);

  return <UsersView users={users} />;
};

export default Users;
