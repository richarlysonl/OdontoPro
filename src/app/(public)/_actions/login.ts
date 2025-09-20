"use server"
import { signIn } from "@/lib/auth";
export async function HandleRegister(provider: string) {
    await signIn(provider, {redirectTo: "/dashboard"})
}