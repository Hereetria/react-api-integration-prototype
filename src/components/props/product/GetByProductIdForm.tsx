import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useEntityApi from "../../UseEntityApi.tsx";
import { EntityTypes } from "../../../types.tsx";

type ProductType = {
  productId: string;
  name: string;
  price: string;
  category: string;
}

const GetProductById: React.FC =  () => {
  const { productId } = useParams<{ productId: string }>();

    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

  const { getByIdAsync } = useEntityApi(EntityTypes.Products);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (productId) {
          const { data: product }: { data: ProductType } = await getByIdAsync(productId);
          setName(product.name);
          setPrice(product.price);
          setCategory(product.category);
        } else {
          setError("ProductId is missing or invalid");
        }
      } catch (error) {
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
<div className="entityContainer">
  <h1>Product</h1>
  <div>
    <label>Product Name: </label>
    <div>{name}</div>
  </div>
  <div>
    <label>Price: </label>
    <div>{price}</div>
  </div>
  <div>
    <label>Category: </label>
    <div>{category}</div>
  </div>

  {error && <p style={{ color: "red" }}>{error}</p>}
</div>

  );
};

export default GetProductById;
