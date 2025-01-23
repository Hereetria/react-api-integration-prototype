import React, { useState } from "react";
import useEntityApi from "../../UseEntityApi.tsx";
import { EntityTypes } from "../../../types.tsx";

type CreateProductType = {
  name: string;
  price: string;
  category: string;
};

const CreateProduct: React.FC = () => {
  const [product, setProduct] = useState<CreateProductType>({
    name: "",
    price: "",
    category: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { createAsync } = useEntityApi(EntityTypes.Products);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    const { name, price, category } = product;

    if (!name || !price || !category) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await createAsync(product);
      setError(null);
      setProduct({ name: "", price: "", category: "" });
    } catch (error: any) {
      setError("Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Product</h1>
      <div>
        <label>Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Price</label>
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleInputChange}
        />
      </div>

      <button onClick={handleFormSubmit} disabled={loading}>
        {loading ? "Creating..." : "Submit"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateProduct;
