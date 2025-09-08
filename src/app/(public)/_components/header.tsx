"use client"
import {useState} from "react";
import  Link  from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Ghost, LogIn, Menu } from "lucide-react";
export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const session = null;
    const navItems = [
        {href: "#profissionais", label: "profissionais"},
        { href: "#contato", label: "contato" },
    ]
    const NavLinks = () => (
        <>
        {navItems.map((item) => (
        <Button
        onClick={ () => setIsOpen(false)}
            key={item.href}
            asChild
            className="text-sm font-medium text-gray-700 hover:text-gray-900">
        <Link href={item.href}>
        {item.label}
        </Link>
            </Button>
    ))}
        {session ? (
          <link href="/dashboard"
          className="flex text-sm font-medium text-gray-700 hover:text-gray-900">

            painel da clinica
          </link>
        ) : (
          <Button>
          <Link href="/login">
            <LogIn />
            login
          </Link>
          </Button>
        )}
        </>
    )


  return (
    <header className="fixed top-0 right-0 left-0 z-[999]  py-4 px-6">
    <div className="w-full container mx-auto flex items-center justify-between">
      <Link href="/ " className="text-3xl font-bold ">
      Odonto<span className="text-emerald-500">PRO</span>
      </Link>
      <nav className="mt-2 hidden md:flex items-center px-6">
        <NavLinks />
      </nav>  
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button className="hover:bg-transparent"
          variant="ghost"
          size="icon">
            <Menu className="w-6 h-6" ></Menu></Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[240px] sm:w-[300px] z-[9999]">
        <SheetTitle>menu</SheetTitle>
        <SheetHeader></SheetHeader>
        <SheetDescription>
          veja nosso menu
        </SheetDescription>
        <nav className="flex flex-col space-y-4 mt-6">
        <NavLinks />
        
      </nav>
      </SheetContent>
      </Sheet>
      </div>
    </header>
  );
}