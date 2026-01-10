import { getAllServices } from "../_data-acess/get-all-services";
import { ServiceList } from "./service-list";

interface ServiceContentProps{
    userId: string;
}

export async function ServiceContent({userId }:ServiceContentProps) {
    const services = await getAllServices(userId);
    return (
        <div>
            <ServiceList services={services.data || []}/>
        </div>
    )
}