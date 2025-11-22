import { getAllServices } from "../_data-acess/get-all-services";

interface ServiceContentProps{
    userId: string;
}

export async function ServiceContent({userId }:ServiceContentProps) {
    console.log("User ID in ServiceContent:", userId);
    const services = await getAllServices(userId);
    return (
        <div>
            todos os serviços
        </div>
    )
}