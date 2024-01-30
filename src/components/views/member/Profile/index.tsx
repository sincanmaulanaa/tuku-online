import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Profile.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import { useState } from "react";
import userServices from "@/services/user";

const ProfileView = (props: any) => {
  const { profile, setProfile, session } = props;
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState("");

  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    setIsLoading("picture");

    const file = e.target[0]?.files[0];
    if (file) {
      uploadFile(
        profile.id,
        file,
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data: any = {
              image: newImageURL,
            };
            const result = await userServices.updateProfile(
              profile.id,
              data,
              session.data?.accessToken
            );

            if (result.status === 200) {
              setProfile({
                ...profile,
                image: newImageURL,
              });

              setChangeImage({});
              e.target[0].value = "";

              setIsLoading("");
            } else {
              setIsLoading("");
            }
          } else {
            setIsLoading("");
            setChangeImage({});
          }
        }
      );
    }
  };

  const handleChangeProfile = async (e: any) => {
    e.preventDefault();
    setIsLoading("profile");

    const form = e.target as HTMLFormElement;
    const data: any = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };

    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });

      form.reset();
      setIsLoading("");
    } else {
      setIsLoading("");
    }
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setIsLoading("password");

    const form = e.target as HTMLFormElement;
    const data: any = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      lastPassword: profile.password,
    };

    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      form.reset();
      setIsLoading("");
    } else {
      setIsLoading("");
    }
  };

  return (
    <MemberLayout>
      <h1>Profile Page</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__avatar}>
          <h2 className={styles.profile__main__avatar__title}>Avatar</h2>
          {profile.image ? (
            <Image
              className={styles.profile__main__avatar__image}
              alt="Profile Picture"
              src={profile?.image}
              width={200}
              height={200}
            />
          ) : (
            <div className={styles.profile__main__avatar__image}>
              {profile?.fullname?.charAt(0)}
            </div>
          )}
          <form onSubmit={handleChangeProfilePicture}>
            <label
              className={styles.profile__main__avatar__label}
              htmlFor="upload-image"
            >
              {changeImage.name ? (
                <p>{changeImage.name}</p>
              ) : (
                <>
                  <p>
                    Click here to upload a new avatar, Larger image will be
                    resized automatically.
                  </p>
                  <p>
                    {" "}
                    Maximum upload size is <b>1MB</b>
                  </p>
                </>
              )}
            </label>
            <input
              className={styles.profile__main__avatar__input}
              type="file"
              name="image"
              id="upload-image"
              onChange={(e: any) => {
                e.preventDefault();
                setChangeImage(e.currentTarget.files[0]);
              }}
            />
            <Button
              className={styles.profile__main__avatar__button}
              type="submit"
            >
              {isLoading === "picture" ? "Uploading..." : "Change Picture"}
            </Button>
          </form>
        </div>
        <div className={styles.profile__main__profile}>
          <form onSubmit={handleChangeProfile}>
            <h2 className={styles.profile__main__profile__title}>Profile</h2>
            <Input
              label="Fullname"
              name="fullname"
              defaultValue={profile?.fullname}
              type="text"
            />
            <Input
              label="Email"
              name="email"
              defaultValue={profile?.email}
              type="email"
              disabled
            />
            <Input
              label="Phone Number"
              name="phone"
              defaultValue={profile?.phone}
              type="number"
            />
            <Input
              label="Role"
              name="role"
              defaultValue={profile?.role}
              type="text"
              disabled
            />
            <Button type="submit" variant="primary">
              {isLoading === "profile" ? "Loading..." : "Update Profile"}
            </Button>
          </form>
        </div>
        <div className={styles.profile__main__password}>
          <h2>Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <Input label="Old Password" name="old-password" type="password" />
            <Input label="New Password" name="new-password" type="password" />
            <Button type="submit">
              {isLoading === "password" ? "Loading..." : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};
export default ProfileView;
