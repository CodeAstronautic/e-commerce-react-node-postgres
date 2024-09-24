import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  removeFullProductFromCart,
} from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import orderService from "../../services/orderService";
import { toast } from "react-toastify";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Cart = () => {
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cartItems);

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.quantity * parseFloat(item.price),
    0
  );

  const dispatch = useDispatch();

  const handleAddCart = (product) => {
    dispatch(addToCart(product));
  };

  const removeProductFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleRemoveFullProductFromCart = (id) => {
    dispatch(removeFullProductFromCart(id));
  };

  const handleOrder = async () => {
    if (localStorage.getItem("token")) {
      try {
        const payload = {
          products: cart,
          shippingAddress, // Add the shipping address to the payload
        };
        const res = await orderService.addOrder(payload);
        console.log("res", res);
        toast.success("Order successful!");
        navigate("/track-order");
        window.location.reload();
      } catch (error) {
        toast.error(error.message || "Something went wrong, please try again");
      } finally {
        setSubmitting(false);
        setShowModal(false); // Close modal after submitting
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative">
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cart?.map((product) => {
                  return (
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <a href="#" className="shrink-0 md:order-1">
                          <img
                            className="h-20 w-20 dark:hidden"
                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                            alt="imac image"
                          />
                          <img
                            className="hidden h-20 w-20 dark:block"
                            src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                            alt="imac image"
                          />
                        </a>

                        <label for="counter-input" className="sr-only">
                          Choose quantity:
                        </label>
                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button
                              type="button"
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                              onClick={() => removeProductFromCart(product.id)}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="w-10 text-center"
                              value={product?.quantity}
                              readOnly
                            />
                            <button
                              type="button"
                              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
                              onClick={() => handleAddCart(product)}
                            >
                              +
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold">
                              ${product?.price}
                            </p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <a
                            href="#"
                            className="text-base font-medium text-gray-900 dark:text-white"
                          >
                            {product?.description}
                          </a>
                          <button
                            type="button"
                            className="inline-flex items-center text-sm text-red-600"
                            onClick={() =>
                              handleRemoveFullProductFromCart(product.id)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border bg-white p-4 shadow-sm">
                <p className="text-xl font-semibold">Order summary</p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex justify-between">
                      <dt>Original price</dt>
                      <dd>${totalPrice}</dd>
                    </dl>
                    <dl className="flex justify-between">
                      <dt>Store Pickup</dt>
                      <dd>$0</dd>
                    </dl>
                    <dl className="flex justify-between">
                      <dt>Tax</dt>
                      <dd>$0</dd>
                    </dl>
                  </div>
                  <dl className="flex justify-between border-t pt-2">
                    <dt>Total</dt>
                    <dd>${totalPrice}</dd>
                  </dl>
                </div>

                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800"
                >
                  Proceed to Checkout
                </a>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      totalQuantity > 0 ? setShowModal(true) : null
                    } // Open the modal
                    className="inline-flex items-center text-sm font-medium text-primary-700 underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal for Address Input */}
      </section>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Enter Shipping Address"
        style={customStyles}
      >
        <h2>Enter Shipping Address</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOrder();
          }}
        >
          <div>
            <label htmlFor="address">Shipping Address:</label>
            <input
              type="text"
              id="address"
              className="w-full p-2 border"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
            />
          </div>
          <div className="mt-4 flex">
            <button
              type="submit"
              className="text-white mr-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit Order
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Cart;
