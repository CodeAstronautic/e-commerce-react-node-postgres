import React, { useEffect, useState } from "react";
import productService from "../../services/productService";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import DeleteProduct from "./Model/DeleteProduct";
import AddProduct from "./Model/AddProduct";
import EditProduct from "./Model/EditProduct";

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const [referesh, setReferesh] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [referesh]);

  const fetchProducts = async () => {
    const data = await productService.getProducts();
    setProducts(data);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2>Product List</h2>
        <AddProduct referesh={() => setReferesh(!referesh)} />
      </div>
      <div className="flex flex-wrap">
        {products?.map((product) => (
          <div
            key={product.id}
            className="m-2 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <img
              className="p-8 rounded-t-lg"
              src={
                "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
              }
              alt="product image"
            />
            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h5>

              <div className="flex items-center mt-2.5 mb-5">
                <div className="text-yellow-300">⭐⭐⭐⭐⭐</div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ms-3">
                  5.0
                </span>
              </div>

              <div>
                {product.available}/{product.stock} {" "}
                {product.available > 0 ? (
                  <span className="text-green-700">In stock</span>
                ) : (
                  <span className="text-rose-700">Out of stock</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${product.price}
                </span>

                <div className="flex space-x-2">
                  <EditProduct
                    product={product}
                    referesh={() => setReferesh(!referesh)}
                  />

                  <DeleteProduct
                    product={product}
                    referesh={() => setReferesh(!referesh)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDashboard;
