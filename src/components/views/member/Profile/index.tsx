import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Profile.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import { useState } from "react";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
const ProfileView = (props: any) => {
  const { profile, setProfile, session } = props;
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    setIsLoading(true);

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

              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            setChangeImage({});
          }
        }
      );
    }
  };

  return (
    <MemberLayout>
      <h1>Profile Page</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__avatar}>
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
                    Upload a new avatar, Larger image will be resized
                    automatically.
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
              {isLoading ? "Uploading..." : "Change Picture"}
            </Button>
          </form>
        </div>
        <div className={styles.profile__main__detail}>
          <form>
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
            />
            <Input
              label="Phone Number"
              name="phone"
              defaultValue={profile?.phone}
              type="number"
            />
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};
export default ProfileView;
