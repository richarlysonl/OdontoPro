import { canPermission } from "@/utils/permissions/canPermission";
import { getAllServices } from "../_data-acess/get-all-services";
import { ServiceList } from "./service-list";
import { LabelSubscription } from "@/components/ui/label-subscription";

interface ServiceContentProps{
    userId: string;
}

export async function ServiceContent({userId }:ServiceContentProps) {
    const services = await getAllServices(userId);
    const permissions = await canPermission({type: "service"});
    return (
        <div>
            <>
            {!permissions.hasPermission && (
                <LabelSubscription expired={permissions.expired}/>
            )}
            
            <ServiceList services={services.data || []}  permission={permissions}/>
            </>
        </div>
    )
}