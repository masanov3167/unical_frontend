import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, NotFound, Posts, Products, SinglePost, SingleProduct, SingleTodo, Todos } from "./pages";
import MainContent from "./mainContent";

import "./app.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<MainContent />}>
          <Route path="" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/todos/:id" element={<SingleTodo />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
