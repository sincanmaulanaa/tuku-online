import ProfileView from "@/components/views/member/Profile";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Profile = () => {
  const session: any = useSession();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        try {
          const accessToken = session.data?.accessToken;
          if (!accessToken) {
            throw new Error("Access token is missing");
          }

          const { data } = await userServices.getProfile(accessToken);
          setProfile(data.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      getProfile();
    }
  }, [profile, session]);
  return (
    <ProfileView profile={profile} setProfile={setProfile} session={session} />
  );
};

export default Profile;
