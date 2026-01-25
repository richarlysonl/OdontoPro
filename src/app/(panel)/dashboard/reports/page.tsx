import { redirect } from "next/navigation"
import { getPermissionUserToReports } from "./_data-acess/get-permission-reports"
import { auth } from "@/lib/auth";

export default async function Reports() {
    const session = await auth();
    console.log(session?.user?.name);
    if (!session)
        redirect("/");
    const user = await getPermissionUserToReports({ userId: session.user.id });
    console.log("usuario junior",user);
    if (!user) {
        return(
        <main>
            <h1>você não tem permissão para acessar esta pagina</h1>
            <p>assine o plano profissional para avançar</p>
        </main>
        )
    }
    return (
        <main>
            <h1>pagina de Relatórios aa</h1>
        </main>
    )
}