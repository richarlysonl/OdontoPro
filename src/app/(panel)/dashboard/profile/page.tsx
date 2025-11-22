import  getSession  from "@/lib/getSession"
import { getUserData } from "./_data-acess/get_info_user"
import { ProfileContent } from "./_components/profile";
import { redirect } from "next/navigation";

export default async function Profile() {
    const session = await getSession()
    if (!session) {
        redirect("/")
    }
    const user = await getUserData({userId: session.user.id});
    console.log(user);
    if(!user){
       redirect("/")
    }
    return (
        <div>
        <ProfileContent user={user}/>
        </div>
    )
}

//DAL data acess layer