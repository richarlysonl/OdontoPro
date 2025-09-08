import { Button } from "@/components/ui/button";
import Image from "next/image";
import ImgHero from "../../../../public/doctor-hero.png";
export function Hero() {
    return (
        <section className="bg-gray-50">
            <div className="container mx-auto pt-20 pb-4  px-4 sm:pb-0 sm:6 lg:8">
                <main className="flex items-center justify-center">
                    <article className=" flex-[2]  space-y-8 max-w-2xl flex flex-col justify-center">
                        <h1 className="text-4xl lg:text-5xl font-bold max-w-2xl leading-tight tracking-tight">
                            encontre os melhores profissionais em um só local!
                        </h1>
                        <p className="text-base lg:text-lg text-gray-600">
                            Nós somos uma plataforma que conecta você aos melhores dentistas da sua região. Agende sua consulta de forma rápida e prática!
                        </p>
                        
                        <Button className="bg-emerald-500 hover:bg-emerald-600 w-fit px-6 font-semibold">{//w-fit faz o botao ter o tamanho do conteudo
                        }
                            econtre uma clinica
                        </Button>
                    </article>
                    <div className="hidden lg:block">
                        <Image 
                        src={ImgHero}
                        alt="doctor-hero"
                        width={340}
                        height={400}
                        className="object-contain"
                        quality={100}
                        priority
                        />
                    </div>
                </main>
            </div>
        </section>
    )
}