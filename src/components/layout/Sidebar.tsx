import React from "react";
import { useInvoices } from "../../context/InvoiceContext";
import { Moon, Sun } from "lucide-react";

const Sidebar = () => {
  const { toggleTheme, theme } = useInvoices();
  return (
    <div className="sidebar">
      {/* logo */}
      <div className="logo">Logo</div>

      {/* toggle/profile */}
      <div className="sidebar-actions">
        <button
          onClick={toggleTheme}
          className="cursor-pointer"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon /> : <Sun />}
        </button>
        <div className="line-break"></div>
        <div className="w-12 h-12 rounded-full overflow-hidden flex justify-center items-center m-auto">
          <img
            src="./pharez_avatar.jpg"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
