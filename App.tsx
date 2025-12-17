
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Play, Globe, ShoppingBag, ArrowRight } from 'lucide-react';
import ShoeScene from './components/ShoeScene';
import { SHOE_VARIANTS, SIZES } from './constants';
import { ShoeVariant } from './types';

const App: React.FC = () => {
  const [currentVariant, setCurrentVariant] = useState<ShoeVariant>(SHOE_VARIANTS[0]);
  const [selectedSize, setSelectedSize] = useState<string>(SIZES[0]);

  // Transition variants for smooth switching
  const contentVariants = {
    initial: { opacity: 0, x: -40, filter: 'blur(10px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: 40, filter: 'blur(10px)' }
  };

  return (
    <div className="w-[98vw] h-[94vh] bg-[#dbe1e8] rounded-[3rem] relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] flex flex-col p-8 md:p-12 border border-white/50 transition-colors duration-1000">
      
      {/* BACKGROUND BRANDING TEXT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
         <AnimatePresence mode="wait">
           <motion.h1 
             key={currentVariant.id + 'bg'}
             initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
             animate={{ opacity: 0.08, scale: 1, rotate: 0 }}
             exit={{ opacity: 0, scale: 1.2, rotate: 5 }}
             transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
             className="font-kanit text-[48vw] font-black italic text-black/90 select-none tracking-tighter leading-none"
           >
             {currentVariant.name.split(' ')[1]}
           </motion.h1>
         </AnimatePresence>
      </div>

      {/* TOP NAVIGATION */}
      <header className="relative z-50 flex items-center justify-between w-full">
        <div className="flex items-center gap-10">
          <motion.div 
            whileHover={{ rotate: 135 }}
            className="w-12 h-12 bg-black rotate-45 flex items-center justify-center shadow-2xl cursor-pointer transition-transform"
          >
            <div className="w-4 h-4 bg-white/20 rotate-45" />
          </motion.div>
          <nav className="hidden lg:flex gap-8 text-[10px] font-black tracking-[0.3em] uppercase text-black/40">
            {['All Catg.', 'Men', 'Women', 'Kids', 'Customize'].map(link => (
              <a key={link} href="#" className="hover:text-black hover:tracking-[0.4em] transition-all duration-300">{link}</a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-8 text-black/60">
          <Globe size={20} className="cursor-pointer hover:text-black hover:scale-110 transition-all" />
          <div className="relative cursor-pointer group">
            <ShoppingBag size={20} className="group-hover:scale-110 transition-all" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-[#dbe1e8]">2</span>
          </div>
        </div>
      </header>

      {/* 3D SCENE - Floating in the center-left focus */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <ShoeScene color={currentVariant.hex} />
      </div>

      {/* MAIN UI INTERFACE */}
      <div className="relative z-20 flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
        
        {/* LEFT: TEXTUAL PRODUCT DATA */}
        <div className="md:col-span-7 flex flex-col justify-center pointer-events-none pt-20 md:pt-0">
          <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex items-center gap-4 mb-4"
          >
             <span className="w-10 h-[2px] bg-black/10 rounded-full" />
             <p className="text-[10px] font-black tracking-[0.5em] uppercase text-black/40">PROFESSIONAL SERIES</p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentVariant.id}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto"
            >
              <h2 className="font-kanit text-8xl lg:text-[11rem] font-black italic uppercase leading-[0.75] text-white mix-blend-overlay tracking-tighter mb-6">
                JORDAN<br />{currentVariant.name.split(' ')[1]}
              </h2>

              <div className="flex items-baseline gap-6 mb-8">
                <span className="text-5xl font-kanit font-black text-black/80 italic">{currentVariant.price}</span>
                <span className="text-[10px] font-black tracking-[0.4em] uppercase text-black/20 italic border-l border-black/10 pl-6">In Stock</span>
              </div>

              <p className="text-sm font-bold leading-relaxed max-w-sm text-black/50 tracking-wide mb-10">
                {currentVariant.description}
              </p>

              <div className="flex items-center gap-4">
                <button className="bg-black text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:shadow-[0_30px_50px_-10px_rgba(0,0,0,0.4)] transition-all active:scale-95">
                  PURCHASE NOW
                </button>
                <button className="w-14 h-14 border-2 border-black/5 rounded-2xl flex items-center justify-center hover:bg-white/40 transition-all text-black/30 group">
                  <Share2 size={18} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT: INTERACTIVE CONTROLS */}
        <div className="md:col-span-5 flex flex-col justify-center items-end gap-8 pt-10 md:pt-0">
          
          {/* CONTROL BOX */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full max-w-[380px] space-y-10 bg-white/20 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/50 shadow-2xl"
          >
            {/* SIZE */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black tracking-widest uppercase text-black/40">Select Size</span>
                <span className="text-[10px] font-black tracking-widest uppercase text-black/20 hover:text-black cursor-pointer transition-colors">Size Guide</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-14 rounded-2xl font-black text-xs transition-all relative overflow-hidden group ${
                      selectedSize === size ? 'bg-black text-white shadow-xl scale-105' : 'bg-white/40 text-black/50 hover:bg-white/60'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR SWITCHER - FIXED VISIBILITY */}
            <div className="space-y-6">
              <span className="text-[10px] font-black tracking-widest uppercase text-black/40 block">Pick Edition</span>
              <div className="flex gap-4">
                {SHOE_VARIANTS.map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => setCurrentVariant(variant)}
                    className="relative group focus:outline-none"
                    aria-label={`Switch to ${variant.color}`}
                  >
                    <div 
                      className={`w-14 h-14 rounded-2xl p-1 transition-all duration-500 border-2 ${
                        currentVariant.id === variant.id 
                        ? 'border-black scale-110 shadow-2xl rotate-12' 
                        : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <div className="w-full h-full rounded-xl shadow-inner" style={{ backgroundColor: variant.hex }} />
                    </div>
                    {currentVariant.id === variant.id && (
                       <motion.div 
                        layoutId="activeDot"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full" 
                       />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* NEXT PREVIEW */}
            <div className="pt-6 border-t border-black/5 flex items-center justify-between group cursor-pointer hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-lg">
                  <Play size={14} fill="white" />
                </div>
                <div>
                  <p className="text-[9px] font-black tracking-widest uppercase text-black/20">Next Experience</p>
                  <p className="text-sm font-black tracking-tighter uppercase text-black/60">Air Heritage '85</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-black/10 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* FOOTER: STATS & INFO */}
      <footer className="relative z-50 flex flex-col md:flex-row items-center justify-between mt-auto pt-6 gap-6">
        <div className="flex items-center gap-6">
          <div className="flex -space-x-3">
            {[10, 20, 30, 40].map(seed => (
              <img 
                key={seed} 
                src={`https://picsum.photos/seed/${seed}/100/100`} 
                className="w-10 h-10 rounded-full border-4 border-[#dbe1e8] shadow-sm grayscale hover:grayscale-0 transition-all cursor-pointer"
              />
            ))}
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[10px] font-black border-4 border-[#dbe1e8] shadow-sm">+99</div>
          </div>
          <p className="text-[9px] font-black tracking-[0.3em] uppercase text-black/20">Global Community Viewing</p>
        </div>

        <div className="flex items-center gap-10">
          <div className="text-right">
            <p className="text-[9px] font-black tracking-widest uppercase text-black/20">Release Status</p>
            <p className="text-sm font-black tracking-tighter uppercase text-black/60">Limited Release</p>
          </div>
          <div className="h-8 w-[1px] bg-black/5 hidden md:block" />
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-xl shadow-green-500/50" />
             <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Secure Connection</span>
          </div>
        </div>
      </footer>

      {/* OVERLAYS */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply z-[100]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/40 blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/5 blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </div>
  );
};

export default App;
