import Button from "@/components/ui/Button";
import styles from "./ModalDeleteUser.module.scss";
import userServices from "@/services/user";
import Modal from "@/components/ui/Modal";

const ModalDeleteUser = (props: any) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;

  const handleDeleteUser = async () => {
    userServices.deleteUser(deletedUser.id);
    setDeletedUser({});

    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <div className={styles.modal}>
        <h1>Are you sure?</h1>
        <Button type="button" onClick={() => handleDeleteUser()}>
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
