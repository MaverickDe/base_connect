import { Copy } from "lucide-react"
import toast from "react-hot-toast"

export const Pre = ({code}:{code:string})=>{
return    <pre className="bg-white mt-3  whitespace-pre-wrap break-words px-5 rounded-md">
    <div className="pt-5">
        
        
        <Copy className="ml-auto hover:text-primary cursor-pointer active:scale-120"  width={14} onClick={()=>{
        navigator.clipboard.writeText(code)
        toast.success("Copied to clipboard")
    }}/>
    
    
    </div>
            {code}


        </pre>
}