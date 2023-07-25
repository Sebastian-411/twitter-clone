import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import { ClipLoader }  from "react-spinners";

import { useRouter } from "next/router";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";

const UserViewer = () => {

    const router = useRouter();
    const { userId } = router.query;

    const { data: fetchedUser, isLoading } = useUser(userId as string);

    if(isLoading || !fetchedUser){
        return(
            <div className="
                flex
                justify-center
                items-center
                h-full

            ">
                <ClipLoader color="Lightblue" size={80} />
            </div>
        );
    }
    return ( 
        <>
            <Header label={fetchedUser?.username}  showBackArrow/>
            <UserHero userId={userId as string} />
            <UserBio userId={userId as string} />

        </>
    );
}
 
export default UserViewer;