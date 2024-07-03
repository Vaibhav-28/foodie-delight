/* eslint-disable react/prop-types */
import "./RestaurantCard.css";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import defaultImg from "../../assets/default-image.png";
import FormModal from "../form-modal/FormModal";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";

const deleteRestaurant = (id) => {
  return axios.delete(`http://localhost:4000/restaurants/${id}`);
};

const RestaurantCard = ({ restaurant }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const deleteMuation = useMutation(deleteRestaurant);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleEditClick = (e) => {
    e.stopPropagation();
    openModal();
  };
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    deleteMuation.mutate(restaurant?.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["restaurants"] });
        enqueueSnackbar("Restaurant Deleted", { variant: "success" });
        closeModal();
      },
      onError: (error) => {
        enqueueSnackbar(error?.message, { variant: "error" });
      },
    });
  };
  return (
    <>
      <div className="restaurant-card">
        <img
          src={restaurant?.image ? restaurant.image : defaultImg}
          alt="restaurant"
          className="restaurant-image"
        />
        <div className="restaurant-details">
          <h2 className="restaurant-name">{restaurant.name}</h2>
          <p className="restaurant-description">{restaurant.description}</p>
          <p className="restaurant-location">{restaurant.location}</p>
          <div className="restaurant-actions">
            <FaEdit onClick={handleEditClick} className="action-icon" />
            <FaTrash onClick={handleDeleteClick} className="action-icon" />
          </div>
        </div>
      </div>
      <FormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        editData={restaurant}
      />
    </>
  );
};

export default RestaurantCard;
