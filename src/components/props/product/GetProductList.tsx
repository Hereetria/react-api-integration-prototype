import React, { useEffect, useState } from "react";
import useEntityApi from "../../UseEntityApi.tsx";
import { EntityTypes } from "../../../types.tsx";

type GetProductType = {
  id: string;
  name: string;
  price: string;
  category: string;
}

const GetProductList: React.FC = () => {
  const [products, setProducts] = useState<GetProductType[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { listAsync } = useEntityApi(EntityTypes.Products);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data: products }: { data: GetProductType[] } = await listAsync();
        setProducts(products);
      } catch (error) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [])

  return (
    <div className="entityContainer">
    <h1>Products</h1>
    {products.length > 0 ? (
      products.map((product) => (
        <div key={product.id} className="productItem">
          <div>
            <label>Product Name: </label>
            <div>{product.name}</div>
          </div>
          <div>
            <label>Price: </label>
            <div>{product.price}</div>
          </div>
          <div>
            <label>Category: </label>
            <div>{product.category}</div>
          </div>
          <hr></hr>
        </div>
      ))
    ) : (
      <p>No products available</p>
    )}

    {error && <p style={{ color: "red" }}>{error}</p>}
  </div>
  )
};

export default GetProductList;
