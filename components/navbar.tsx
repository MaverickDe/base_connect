
import Link from "next/link"
import Logo from "./logo"
import { Menu, MenuIcon, Server, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { APPNAME } from "../const"
export interface INavbar{
    logowidth?:number
    logoheight?:number
    px?:string
    border?:any|null
}
const  Navbar = ({logoheight=40,logowidth=40,px="primarypad",border=1}:INavbar={})=>{
console.log(border)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter()
return (

     <nav className="relative z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Server className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">{APPNAME}</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-orange-400 transition-colors">Home</a>
              <a href="#features" className="hover:text-orange-400 transition-colors">Features</a>
              <a href="/about" className="hover:text-orange-400 transition-colors">About</a>
              <a href="/contact" className="hover:text-orange-400 transition-colors">Contact</a>
              <button onClick={()=>{
                router.push("/login")
              }} className="text-gray-300 hover:text-white transition-colors">Login</button>
              <button onClick={()=>{
                router.push("/signup")
              }} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-2 rounded-lg font-medium transition-all">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-gray-800">
              <a href="#home" className="block hover:text-orange-400 transition-colors">Home</a>
              <a href="#features" className="block hover:text-orange-400 transition-colors">Features</a>
              <a href="/about" className="block hover:text-orange-400 transition-colors">About</a>
              <a href="/contact" className="block hover:text-orange-400 transition-colors">Contact</a>
              <button onClick={()=>{
                router.push("/login")
              }} className="block w-full text-left text-gray-300 hover:text-white transition-colors">Login</button>
              <button onClick={()=>{
                router.push("/signup")
              }} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-6 py-2 rounded-lg font-medium transition-all">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>
)
}

export default Navbar