import { Pre } from "./pre"

export const NormalDoc =()=>{
    return <div >
        <div className="flex px-5 max-sm:px-mprimarypad rounded-md bg-[#517188]/20">
        
<p className="text-primary py-5 font-bold h-full border-b-2 border-b-primary" >Javascipt</p>
        </div>
        <pre className="bg-white mt-3 whitespace-pre-wrap break-words px-5 rounded-md">
            {`
//npm install dotenv

import dotenv from “dotenv”
            
dotenv.config({env:”/asd/dfd”,restart:”node nest.js”,key:””,secret:””})

            
            `}
        </pre>
     
    </div>
}