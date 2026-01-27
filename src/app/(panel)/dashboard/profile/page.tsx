import { getUserData } from "./_data-acess/get-info-user"
import { ProfileContent } from "./_components/profile";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function Profile() {
    const session = await auth()
    if (!session) {
        redirect("/")
    }
    const user = await getUserData({userId: session.user.id});
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