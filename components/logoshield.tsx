import { ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation";

export const LogoShield =({size=20}:{size?:number})=>{

    const router = useRouter();
    return (<ShieldCheck onClick={()=>{
        router.push("/")
    }} size={size}/>)
}