import { useInvoices } from "../../context/InvoiceContext";
import { Moon, Sun } from "lucide-react";

const Sidebar = () => {
  const { toggleTheme, theme } = useInvoices();
  return (
    <div className="sidebar z-999 overflow-hidden">
      {/* logo */}
      <div className="logo">
        <img src="./logoipsum-409 (1).svg" alt="Logo" className="text-white" />
      </div>

      {/* toggle/profile */}
      <div className="sidebar-actions">
        <button
          onClick={toggleTheme}
          className="cursor-pointer"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
        </button>
        <div className="line-break"></div>
        <div className="w-10 h-10 rounded-full overflow-hidden flex justify-center items-center m-auto shrink-0">
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
