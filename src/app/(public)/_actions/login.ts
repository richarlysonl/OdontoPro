"use server"
import { signIn } from "@/lib/auth";
type Provider = "github" | "google";
export async function HandleRegister(provider: Provider) {
    await signIn(provider, {redirectTo: "/dashboard"})
}