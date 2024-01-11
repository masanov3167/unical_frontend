import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login } from "./pages";
import MainContent from "./mainContent";

import "./app.css"
import NotFound from "./pages/notFound";
import Products from "./pages/products/all";
import SingleProduct from "./pages/products/single";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainContent />}>
          <Route path="" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
