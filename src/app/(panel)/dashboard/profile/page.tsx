import  getSession  from "@/lib/getSession"
import { getUserData } from "./_data-acess/get_info_user"
import { ProfileContent } from "./_components/profile";

export default async function Profile() {
    const session = await getSession()
    const user = await getUserData({userId: session?.user?.id!});
    console.log(user);
    return (
        <div>
        <ProfileContent/>
        </div>
    )
}

//DAL data acess layer