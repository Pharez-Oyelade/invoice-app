import { Routes, Route } from "react-router-dom";
import InvoiceListPage from "./pages/InvoiceListPage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<InvoiceListPage />} />
        <Route path="/invoice/:id" element={<InvoiceDetailPage />} />
      </Routes>
    </>
  );
};

export default App;
