import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar.tsx";
import CreateProductForm from "./components/props/product/CreateProductForm.tsx";
import UpdateProductForm from "./components/props/product/UpdateProductForm.tsx";
import GetProductListForm from "./components/props/product/GetProductList.tsx";
import GetProductByIdForm from "./components/props/product/GetByProductIdForm.tsx";

const App: React.FC = () => {

  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route
            path="/products/create"
            element={<CreateProductForm />}
          />
          <Route
            path="/products/update/:productId"
            element={<UpdateProductForm />}
          />
          <Route
            path="/products/get"
            element={<GetProductListForm />}
          />
          <Route
            path="/products/getById/:productId"
            element={<GetProductByIdForm />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
