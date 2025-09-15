"use client"
import { useState } from 'react' // Import useState from React
import { usePathname } from 'next/navigation'
import clsx from 'clsx'; // Import clsx para condicional de classes
import logoImg from "@/../public/logo-odonto.png";
import Image from "next/image";
import {  // Import componentes do shadcn/ui sheet para menu mobile
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import {  // Import componentes do shadcn/ui collapsible para menu desktop
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { Banknote, CalendarCheck, CalendarCheck2, ChevronLeft, ChevronRight, Folder, List, Settings } from 'lucide-react';
import Link from 'next/link';
export function Sidebar({ children }:
    { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className='flex min-h-screen w-full'>
            <aside className={clsx("flex flex-col border-r bg-background transition-all duration-300 p-4 h-full", {
                "w-20": isCollapsed,
                "w-64": !isCollapsed,
                "hidden md:flex md:fixed": true
            }
            )
            }>

                <div className='mb-6 mt-4'>
                    {!isCollapsed && (
                        <Image
                            src={logoImg}
                            alt="logo"
                            priority
                            quality={100}
                        />)}
                </div>
                <Button
                    className='bg-gray-100 hover:bg-gray-200 text-zinc-900 self-end mb-2'
                    onClick={() => setIsCollapsed(!isCollapsed)} >
                    {!isCollapsed ? <ChevronLeft className='w-6 h-6' /> : <ChevronRight className='w-6 h-6' />}
                </Button>


                {/*mostrar apenas quando não estiver colapsado*/}
                {isCollapsed && (
                    <nav className='flex flex-col gap-1 overflow-hidden mt-2'>
                        <SidebarLink
                                href='/dashboard'
                                label='agendamentos'
                                pathname={pathname}
                                isCollapsed={isCollapsed}
                                icon={<CalendarCheck2 className='w-6 h-6' />}
                            />
                            <SidebarLink
                                href='/dashboard/services'
                                label='serviços'
                                pathname={pathname}
                                isCollapsed={isCollapsed}
                                icon={<Folder className='w-6 h-6' />}
                            />
                            <SidebarLink
                                href='/dashboard/profile'
                                label='perfil'
                                pathname={pathname}
                                isCollapsed={isCollapsed}
                                icon={<Settings className='w-6 h-6' />}
                            />
                            <SidebarLink
                                href='/dashboard/plans'
                                label='planos'
                                pathname={pathname}
                                isCollapsed={isCollapsed}
                                icon={<Banknote className='w-6 h-6' />}
                            />
                    </nav>
                )}


                <Collapsible open={!isCollapsed}>
                    <CollapsibleContent>
                        <nav className='flex flex-col gap-1 overflow-hidden'>
                            <span className='text-sm text-gray-400 font-medium mt-1 uppercase'>painel</span>
                            <SidebarLink
                                href='/dashboard'
                                label='agendamentos'
                                pathname={pathname}
                                isCollapsed={isCollapsed}
                                icon={<CalendarCheck2 className='w-6 h-6' />}
                            />
                            <SidebarLink
                                href='/dashboard/services'
                                label='serviços'
                                pathname={pathname}
                                isCollapsed={isCollapsed}
                                icon={<Folder className='w-6 h-6' />}
                            />
                            <span className='text-sm text-gray-400 font-medium mt-1 uppercase'>minha conta</span>
                            <SidebarLink
                                href='/dashboard/profile'
                                label='perfil'
                                pathname={pathname}
                                isCollapsed={isCollapsed}
                                icon={<Settings className='w-6 h-6' />}
                            />
                            <SidebarLink
                                href='/dashboard/plans'
                                label='planos'
                                pathname={pathname}
                                isCollapsed={isCollapsed}
                                icon={<Banknote className='w-6 h-6' />}
                            />
                        </nav>
                    </CollapsibleContent>
                </Collapsible>

            </aside>



            <div className={clsx("flex flex-1 flex-col transition-all duration-300", {
                "md:ml-20": isCollapsed,
                "md:ml-64": !isCollapsed
            })}>
                <header className='md:hidden flex items-center justify-between border-b px-4 h-14 z-10 sticky top-0 bg-white'>
                    <Sheet>
                        <div className='flex items-center gap-4'>
                            <SheetTrigger asChild>
                                <Button variant={"outline"} size={"icon"} className='md:hidden'>
                                    <List className='w-5 h-5 ' />
                                </Button>
                            </SheetTrigger>


                            <h1 className='textbase md:text-lg font-semibold'>Menu odontoPRO</h1>
                        </div>


                        <SheetContent side='left' className='sm:max-w-xs text-black'>
                            <SheetTitle>OdontoPro</SheetTitle>
                            <SheetDescription>dashboard</SheetDescription>
                            <nav className='grid gap-2 text-base pt-5'>
                                <SidebarLink
                                    href='/dashboard'
                                    label='agendamentos'
                                    pathname={pathname}
                                    isCollapsed={isCollapsed}
                                    icon={<CalendarCheck2 className='w-6 h-6' />}
                                />
                                <SidebarLink
                                    href='/dashboard/services'
                                    label='serviços'
                                    pathname={pathname}
                                    isCollapsed={isCollapsed}
                                    icon={<Folder className='w-6 h-6' />}
                                />
                                <SidebarLink
                                    href='/dashboard/profile'
                                    label='perfil'
                                    pathname={pathname}
                                    isCollapsed={isCollapsed}
                                    icon={<Settings className='w-6 h-6' />}
                                />
                                <SidebarLink
                                    href='/dashboard/plans'
                                    label='planos'
                                    pathname={pathname}
                                    isCollapsed={isCollapsed}
                                    icon={<Banknote className='w-6 h-6' />}
                                />
                            </nav>
                        </SheetContent>
                    </Sheet>
                </header>
                <main className="flex-1 py-4 px-2 mb-6">
                    {children}
                </main></div>
        </div>
    )
}

interface SidebarLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    isCollapsed: boolean;
    pathname: string;
}
function SidebarLink({ href, icon, label, isCollapsed, pathname }: SidebarLinkProps) {
    return (
        <Link
            href={href}

        ><div
            className={clsx('flex items-center gap-2  px-3 py-2  rounded-md transition-colors', {
                "bg-blue-500 text-white": pathname === href
            }, {
                "text-gray-700 hover:bg-gray-100": pathname !== href
            }
            )}
        >
                <span className='w-6 h-6'>{icon}</span>
                {!isCollapsed && <span>{label}</span>}
            </div></Link>
    )
}