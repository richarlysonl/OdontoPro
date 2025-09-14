import { Clinics } from "./_components/clinics";
import { Footer } from "./_components/footer";
import { Header }from "./_components/header";
import { Hero } from "./_components/hero";
//quando é export function, tem que importar com chaves {}, sé for export default, importa sem chaves
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
    <Header />
      <div>
      <Hero />
      <Clinics />
      <Footer />
      </div>
    </div>
    
  );
}