import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login } from "./pages";
import MainContent from "./mainContent";

import "./app.css"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainContent />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
