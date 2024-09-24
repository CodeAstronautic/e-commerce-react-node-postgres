import React, { useState } from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'; // Ensure you have react-toastify installed
import productService from '../../../services/productService';

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

const AddProduct = ({ referesh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number()
      .required('Price is required')
      .positive('Price must be a positive number'),
    stock: Yup.number()
      .required('Stock is required')
      .integer('Stock must be an integer')
      .min(0, 'Stock cannot be negative'),
  });

  const handleSubmit = async (values) => {
    try {
      // Call your API to add a product
      await productService.AddProducts(values); // Ensure your service function is named appropriately
      toast.success('Product added successfully');
      referesh(); // Refresh the product list
      closeModal(); // Close the modal after successful submission
    } catch (error) {
      toast.error(error.message); // Show error message
    }
  };

  return (
    <>
      <button
        onClick={openModal} // Open modal on button click
        className="text-white bg-[#007Bff] hover:bg-[#007Bff] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Add Product
      </button>

      {/* Add Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Product"
        style={customStyles}
      >
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>
        <Formik
          initialValues={{
            name: '',
            description: '',
            price: '',
            stock: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <img
              className="p-8 rounded-t-lg w-[300px]"
              src={
                "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
              }
              alt="product image"
            />
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <Field name="name" className="border rounded-md w-full p-2" />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <Field name="description" as="textarea" className="border rounded-md w-full p-2" />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <Field name="price" type="number" className="border rounded-md w-full p-2" />
                <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Stock</label>
                <Field name="stock" type="number" className="border rounded-md w-full p-2" />
                <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Add Product
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="ml-2 text-gray-700 border border-gray-300 rounded-lg px-5 py-2.5"
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default AddProduct;
