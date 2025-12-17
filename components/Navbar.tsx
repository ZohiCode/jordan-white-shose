
import React from 'react';
import { ShoppingBag, Globe, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between text-white mix-blend-difference">
      <div className="flex items-center gap-12">
        <div className="w-10 h-10 bg-white clip-path-polygon-[50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%]">
            <div className="w-full h-full bg-black/10 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rotate-45" />
            </div>
        </div>
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase opacity-80">
          <a href="#" className="hover:opacity-100 transition-opacity">All Catg.</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Men</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Women</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Kids</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Customize</a>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <Globe size={18} />
        </button>
        <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
          <ShoppingBag size={18} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-[10px] flex items-center justify-center rounded-full font-bold">2</span>
        </button>
        <button className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors">
          <Menu size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
