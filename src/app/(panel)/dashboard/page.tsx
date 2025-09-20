import  getSession  from "@/lib/getSession";
import { redirect} from "next/navigation";
export default async function dashboard() {
    const session = await getSession();
    //console.log(session?.user?.name);
    if(!session)
        redirect("/");
    return (
        <div>
            <h1 className="font-bold">Dashboard</h1>
            <div className="w-full h-[600px] bg-gray-200 mb-10"></div>
           <div className="w-full h-[600px] bg-gray-200 mb-10"></div>
        </div>
    );
} 