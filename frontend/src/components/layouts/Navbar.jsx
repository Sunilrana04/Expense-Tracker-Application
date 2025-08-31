import React, { useState, useEffect, useRef } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const sidebarRef = useRef();

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenSideMenu(false);
      }
    };

    if (openSideMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openSideMenu]);

  return (
    <>
      {/* ✅ Modern Glassy Navbar */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm py-4 px-7 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          {/* Hamburger: only on mobile */}
          <button
            className="block lg:hidden text-gray-700 hover:text-black transition"
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            {openSideMenu ? <HiOutlineX size={26} /> : <HiOutlineMenu size={26} />}
          </button>

          <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
            Expense <span className="text-indigo-600">Tracker</span>
          </h2>
        </div>
      </div>

      {/* ✅ Mobile Sidebar */}
      {openSideMenu && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" />

          {/* Sidebar */}
          <div
            ref={sidebarRef}
            className="relative bg-white w-[250px] h-full shadow-xl z-50 transform transition-transform duration-300 ease-in-out"
          >
            <SideMenu activeMenu={activeMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
