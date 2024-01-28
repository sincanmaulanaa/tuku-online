import { FormEvent, useState } from "react";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import styles from "./ModalUpdateUser.module.scss";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";

const ModalUpdateUser = (props: any) => {
  const session: any = useSession();
  const { updatedUser, setUpdatedUser, setUsersData } = props;

  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    try {
      const result = await userServices.updateUser(
        updatedUser.id,
        data,
        session.data?.accessToken
      );
      console.log(result);

      if (result.status === 200) {
        setIsLoading(false);
        setUpdatedUser({});
        const { data } = await userServices.getAllUsers();
        setUsersData(data.data);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <div className={styles.modal}>
        <h1>Update User</h1>
        <form onSubmit={handleUpdateUser}>
          <Input
            type="text"
            name="fullname"
            label="Fullname"
            defaultValue={updatedUser.fullname}
            disabled
          />
          <Input
            type="email"
            name="email"
            label="Email"
            defaultValue={updatedUser.email}
            disabled
          />
          <Input
            type="number"
            name="phone"
            label="Phone"
            defaultValue={updatedUser.phone}
            disabled
          />
          <Select
            label="Role"
            name="role"
            defaultValue={updatedUser.role}
            options={[
              {
                label: "Member",
                value: "member",
              },
              {
                label: "Admin",
                value: "admin",
              },
            ]}
          />
          <Button type="submit">{isLoading ? "Loading..." : "Update"}</Button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalUpdateUser;
