import Link from "next/link"
import Logo from "./logo"

const  Navbar = ()=>{

const links = [
    {alias:"Pricing",href:"/pricing",},{alis:"contact",href:""},{alias:"Documetation",href:""}
]

    return <div className="w-full px-primarypad max-sm:px-mprimarypad items-center  h-[53px] flex flex-row ">
        <div className="flex items-center gap-5 ">

        <Logo {...{width:40 ,height:40}} />
        <div className="flex items-center h-full gap-3">
            {
                links.map((e:any,index:number)=>{
                    return <div key={index}>{e.alias}</div>
                })
            }
        </div>
        </div>
        <div className="flex items-center gap-3 ml-auto">
<Link href="/e">
log in
</Link>
<Link className="border rounded-md p-3 py-0.5 hover:text-primary hover:border-primay" href="">
sign up
</Link>
        </div>
        



    </div>
}

export default Navbar