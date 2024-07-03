/* eslint-disable react/prop-types */
import { useState } from "react";
import "./FormModal.css";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";

const addRestaurant = (payload) => {
  return axios.post("http://localhost:4000/restaurants", payload);
};

const editRestaurant = (payload) => {
  return axios.put(
    `http://localhost:4000/restaurants/${payload?.id}`,
    payload?.body
  );
};

const FormModal = ({ isOpen, onClose, editData }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const addMutation = useMutation(addRestaurant);
  const editMutation = useMutation(editRestaurant);
  const initialFormData = editData
    ? {
        name: editData?.name,
        description: editData?.description,
        location: editData?.location,
        image: editData?.image,
      }
    : {
        name: "",
        description: "",
        location: "",
        image: null,
      };
  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    location: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let value = "";

    reader.onloadend = () => {
      value = reader.result;
      setFormData({
        ...formData,
        image: value,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.location) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editData) {
        const payload = { body: formData, id: editData?.id };
        editMutation.mutate(payload, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurants"] });
            setFormData(initialFormData);
            enqueueSnackbar("Restaurant Edited", { variant: "success" });
            onClose();
          },
          onError: (error) => {
            enqueueSnackbar(error?.message, { variant: "error" });
          },
        });
      } else {
        addMutation.mutate(formData, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["restaurants"] });
            setFormData(initialFormData);
            enqueueSnackbar("Restaurant Created", { variant: "success" });
            onClose();
          },
          onError: (error) => {
            enqueueSnackbar(error?.message, { variant: "error" });
          },
        });
      }
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleModalClick}>
      <div className="modal-content" onClick={handleModalClick}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>Add Restaurant</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={errors.description ? "error" : ""}
            />
            {errors.description && (
              <p className="error-message">{errors.description}</p>
            )}
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className={errors.location ? "error" : ""}
            />
            {errors.location && (
              <p className="error-message">{errors.location}</p>
            )}
          </div>
          <div className="form-group">
            <label>Upload Image: </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
