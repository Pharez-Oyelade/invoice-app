import { Routes, Route } from "react-router-dom";
import InvoiceListPage from "./pages/InvoiceListPage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import Sidebar from "./components/layout/Sidebar";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<InvoiceListPage />} />
        <Route path="/invoice/:id" element={<InvoiceDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
