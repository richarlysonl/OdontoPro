import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import fotoImg from "../../../../public/foto1.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProfessionals } from "../_data-acess/get-professionals";
import { User } from "@prisma/client";
interface ProfessionalsProps{
    professionals: User[]
}
export function Professionals({professionals}:ProfessionalsProps) {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3x1 text-center mb-12 font-bold ">Clinicas disponiveis</h2>
            <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {professionals.map((clinic)=> (
                    <Card className="overflow-hidden py-0 hover:shadow-lg duration-300" key={clinic.id}>
                    <CardContent className="p-0">
                        <div>
                            <div className="relative h-48">
                                <Image 
                                src={clinic.image || fotoImg}
                                alt="Foto da clinica"
                                fill
                                className="object-cover"
                            />
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="flex items-center justify-between ">
                                    <div>
                                    <h3 className="font-semibold">
                                        {clinic.name}
                                        </h3>
                                    <p className="text-sm text-gray-500">
                                        {clinic.address}
                                        </p>
                                    </div>

                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500">
                                    </div>
                                </div>
                                <Link
                                href={`/clinica/${clinic.id}`}
                                target="_blank"
                                className="bg-emerald-500 houver:bg-emerald-400 text-white flex itens-center justify-center
                                py-2 rounded-md text-sm md:text-base font-medium"
                                >agendar horario
                                <ArrowRight className="ml-2"/>
                                </Link>
                            </div>
                            
                        </div>
                    </CardContent>
                    <CardFooter></CardFooter>
                </Card>
                ))}
            </section>
            </div>
        </section>
    )
}