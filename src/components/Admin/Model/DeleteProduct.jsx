import React, { useState } from "react";
import Modal from "react-modal";
import productService from "../../../services/productService";
import { toast } from "react-toastify";

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

const DeleteProduct = ({ referesh, product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    try {
      await productService.DeleteProducts(product?.id); // Call the delete function passed as a prop
      referesh();
      toast.success("Product Delete");
      closeModal(); // Close the modal after successful deletion
    } catch (error) {

      console.log("error",error)
      toast.error(error.message);
    }
  };

  return (
    <>
      <button
        onClick={openModal} // Open modal on button click
        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Delete
      </button>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Product"
        style={customStyles}
      >
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-4">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="mr-2 text-gray-700 border border-gray-300 rounded-lg px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg px-4 py-2"
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteProduct;
