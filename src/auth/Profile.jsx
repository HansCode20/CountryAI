import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/Tooltip.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const name = localStorage.getItem("name");
  const avatar = localStorage.getItem("avatar");

  
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="p-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */ }
        <h1 className="text-xl font-bold">
          CountryList
        </h1>

        {/* Menu */}
    

        {/* Profile & Logout */}
        <div className="hidden md:flex items-center space-x-4">
          {username && (
            <div className="flex items-center space-x-2">
              <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
              <div className='tooltip p-2 bg-white rounded-full'>
                Hey, {username}
                <div className="tooltiptext bottom-0">{name}</div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white p-2 rounded shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
          >
             <img src="https://img.icons8.com/ios-filled/exit.png" alt="exit" className='w-5'/>
             Logout
          </button>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
           {isOpen ?  <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/delete-sign.png" alt="delete-sign"/> : <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/menu--v1.png" alt="menu--v1"/> }
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="w-full mx-auto md:hidden flex justify-between p-4 bg-white shadow-lg">
        
          <div className="flex items-center space-x-2">
              <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
              <div className="flex flex-col text-left text-md font-semibold">
                {username}
                <span className="text-sm font-normal">{name}</span>
              </div>
         </div>
         

          <button
            onClick={handleLogout}
            className="cursor-pointer"
          >
             <img src="https://img.icons8.com/ios-filled/exit.png" alt="exit" className='w-5'/>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
