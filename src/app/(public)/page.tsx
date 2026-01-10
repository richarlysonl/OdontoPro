import { Professionals } from "./_components/professionals";
import { Footer } from "./_components/footer";
import { Header }from "./_components/header";
import { Hero } from "./_components/hero";
import { getProfessionals } from "./_data-acess/get-professionals";
//quando é export function, tem que importar com chaves {}, sé for export default, importa sem chaves
export const revalidate = 120; //120 segundos == 2 minutos, se for 0 é renderizada dinamicamente
export default async function Home() {
  const professionals = await getProfessionals();
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
      <div>
      <Hero />
      <Professionals professionals={professionals}/>
      <Footer />
      </div>
    </div>
    
  );
}