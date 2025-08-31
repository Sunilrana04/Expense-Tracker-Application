import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { LuMenu, LuX, LuSparkles } from "react-icons/lu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100/80">
      {/* Modern Navbar with glass morphism effect */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className={`backdrop-blur-md transition-all duration-300 ${scrolled ? 'bg-white/95 border-b border-gray-200/50' : 'bg-white/80'}`}>
          <Navbar activeMenu={activeMenu} />
        </div>
      </div>

      {user && (
        <div className="flex flex-1 overflow-hidden relative">
          {/* Desktop SideMenu with glass morphism */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="fixed h-[calc(100vh-64px)] w-64 bg-white/90 backdrop-blur-md border-r border-gray-200/50 shadow-inner">
              <SideMenu activeMenu={activeMenu} />
            </div>
          </div>

          {/* Mobile SideMenu Toggle - Floating Button */}
          <button
            className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl rounded-full hover:shadow-3xl transition-all duration-300 hover:scale-110 group"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <LuX className="text-xl" />
            ) : (
              <LuMenu className="text-xl" />
            )}
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white animate-pulse">
              <LuSparkles className="w-3 h-3" />
            </span>
          </button>

          {/* Mobile SideMenu Drawer with modern animation */}
          {menuOpen && (
            <div className="lg:hidden fixed inset-0 z-40">
              {/* Backdrop with blur */}
              <div 
                className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in"
                onClick={() => setMenuOpen(false)}
              />
              
              {/* Side menu with slide-in animation */}
              <div className="absolute left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 animate-slide-in-left">
                <div className="p-4 border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Navigation</h2>
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <LuX className="text-lg text-gray-600" />
                    </button>
                  </div>
                </div>
                <SideMenu activeMenu={activeMenu} />
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto h-[calc(100vh-64px)]">
            {/* Decorative elements */}
            <div className="absolute top-20 right-0 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
            
            <div className="relative mx-4 lg:mx-6 py-6">
              {/* Content Container with glass morphism effect */}
              <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 min-h-[calc(100vh-140px)]">
                <div className="p-6 lg:p-8">
                  {children}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons for mobile */}
          <div className="lg:hidden fixed bottom-24 right-6 z-40 flex flex-col gap-3">
            <button className="p-3 bg-white shadow-2xl rounded-full hover:shadow-3xl transition-all duration-300 hover:scale-110">
              <LuSparkles className="text-blue-600 text-lg" />
            </button>
            <button className="p-3 bg-white shadow-2xl rounded-full hover:shadow-3xl transition-all duration-300 hover:scale-110">
              <LuSparkles className="text-green-600 text-lg" />
            </button>
          </div>
        </div>
      )}

      {/* Subtle background pattern */}
      <div className="fixed inset-0 -z-20 opacity-[0.03]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400"></div>
      </div>

      {/* Animated background elements */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full animate-float -z-10"></div>
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/5 to-cyan-400/5 rounded-full animate-float animation-delay-2000 -z-10"></div>
    </div>
  );
};

export default DashboardLayout;