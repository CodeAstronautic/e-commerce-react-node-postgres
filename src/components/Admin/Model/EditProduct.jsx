import * as Yup from "yup";
import { useState } from "react";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import productService from "../../../services/productService";

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

const EditProduct = ({ product, referesh }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    stock: Yup.number()
      .required("Stock is required")
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative"),
  });

  const onClose = () => setEditModalOpen(false);

  const handleSubmit = async (values) => {
    try {
      await productService.UpdateProducts(values);
      toast.success("Prduct Update");
      referesh();
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const openEditModal = (product) => {
    setEditModalOpen(true);
  };
  return (
    <>
      <button
        onClick={() =>
          openEditModal({
            name: "Sample Product",
            description: "This is a sample product.",
            price: 19,
            stock: 10,
          })
        }
        className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Edit
      </button>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={onClose}
        contentLabel="Edit Product"
        style={customStyles}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <Formik
          initialValues={product}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700">Product Name</label>
                <Field name="name" className="border rounded-md w-full p-2" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <Field
                  name="description"
                  as="textarea"
                  className="border rounded-md w-full p-2"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <Field
                  name="price"
                  type="number"
                  className="border rounded-md w-full p-2"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Stock</label>
                <Field
                  name="stock"
                  type="number"
                  className="border rounded-md w-full p-2"
                />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={onClose}
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
export default EditProduct;
