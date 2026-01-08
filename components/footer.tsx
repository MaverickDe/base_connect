import { Server } from "lucide-react"
import { APPNAME } from "../const"
import Logo from "./logo"

export const Footer = ()=>{
    return (

           <footer className="bg-gray-900/80 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">{APPNAME}</span>
              </div>
              <p className="text-gray-400">
                Intelligent load balancing and server monitoring for modern applications.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-gray-400">
                <a href="/#features" className="block hover:text-orange-400 transition-colors">Features</a>
                {/* <a href="/#features" className="block hover:text-orange-400 transition-colors">Pricing</a> */}
                {/* <a href="#" className="block hover:text-orange-400 transition-colors">Documentation</a> */}
                {/* <a href="#" className="block hover:text-orange-400 transition-colors">API</a> */}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <a href="/about" className="block hover:text-orange-400 transition-colors">About</a>
                <a href="/contact" className="block hover:text-orange-400 transition-colors">Contact</a>
                {/* <a href="#" className="block hover:text-orange-400 transition-colors">Blog</a> */}
                {/* <a href="#" className="block hover:text-orange-400 transition-colors">Careers</a> */}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-gray-400">
                <a href="/contact" className="block hover:text-orange-400 transition-colors">Help Center</a>
                {/* <a href="#" className="block hover:text-orange-400 transition-colors">Status</a> */}
                <a href="#" className="block hover:text-orange-400 transition-colors">Community</a>
                <a href="/contact" className="block hover:text-orange-400 transition-colors">Contact Support</a>
              </div>
            </div>
          </div>

          {/* <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2024 LoadKeeper. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">Security</a>
            </div>
          </div> */}
        </div>
      </footer>
    )
}