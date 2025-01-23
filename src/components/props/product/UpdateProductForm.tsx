import React, { useState, useEffect } from "react";
import useEntityApi from "../../UseEntityApi.tsx";
import { EntityTypes } from "../../../types.tsx";
import { useParams } from "react-router-dom";

type UpdateProductType = {
  productId: string;
  name: string;
  price: string;
  category: string;
};

const UpdateProduct: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { updateAsync, getByIdAsync } = useEntityApi(EntityTypes.Products);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (productId) {
          const { data: product }: { data: UpdateProductType } = await getByIdAsync(productId);
          setName(product.name || '');
          setPrice(product.price || '');
          setCategory(product.category || '');
        } else {
          setError("Product ID is missing or invalid.");
        }
      } catch (error) {
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value);

  const handleFormSubmit = async () => {
    if (!productId || !name || !price || !category) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const data: UpdateProductType = { productId, name, price, category };
      await updateAsync(productId, data);
      setError(null);
    } catch {
      setError("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Update Product</h1>
      <div>
        <label>Product Name</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Price</label>
        <input type="text" value={price} onChange={handlePriceChange} />
      </div>
      <div>
        <label>Category</label>
        <input type="text" value={category} onChange={handleCategoryChange} />
      </div>

      <button onClick={handleFormSubmit} disabled={loading}>
        {loading ? "Updating..." : "Submit"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UpdateProduct;
