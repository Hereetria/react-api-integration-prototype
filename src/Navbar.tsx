import React, { useState } from "react";
import { Link } from "react-router-dom";
import useEntityApi from "./components/UseEntityApi.tsx";
import { EntityTypes } from "./types.tsx";

const Navbar: React.FC = () => {
  const [productId, setProductId] = useState<string>("f47c");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(e.target.value);
    
  };

  const { deleteAsync } = useEntityApi(EntityTypes.Products);

  const handleDelete = async () => {
    try {
      await deleteAsync(productId);
      
    } catch {
      console.log(1);
    }
  }

  return (
    
    <nav>
      <ul>
      <li>
          <label htmlFor="productId">Product ID: </label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={handleIdChange}
            placeholder="Enter Product ID"
          />
        </li>
        <br />
        <li>
          <Link to="/products/create">Create Product</Link>
          </li>

        <li>
          <Link to={`/products/update/${productId}`} >Update Product</Link>
        </li>
        <li>
          <Link to={`/products/getById/${productId}`} >Get Product By ID</Link>
        </li>
        <li>
          <Link to="/products/get">Get Products</Link>
          </li>

          <li>
            <button onClick={handleDelete}>Sil</button>
          </li>
      </ul>
    </nav>
  );
};

export default Navbar;
