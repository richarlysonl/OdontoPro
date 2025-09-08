import { Clinics } from "./_components/clinics";
import { Header }from "./_components/header";
import { Hero } from "./_components/hero";
//quando é export function, tem que importar com chaves {}, sé for export default, importa sem chaves
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
      <div>
      <Hero />
      
      </div>
      <Clinics />
    </div>
  );
}