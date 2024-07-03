import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Restaurants.css";
import AddCard from "../../components/add-card/AddCard";
import RestaurantCard from "../../components/restaurant-card/RestaurantCard";
import FormModal from "../../components/form-modal/FormModal";
import { useSnackbar } from "notistack";

const getRestaurants = () => {
  return axios.get("http://localhost:4000/restaurants");
};

const Restaurants = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isError) {
    enqueueSnackbar(error?.message, { variant: "error" });
  }
  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  return (
    <div className="restaurants-list">
      <div onClick={openModal}>
        <AddCard />
      </div>
      {data?.data?.map((restaurant) => {
        return (
          <div
            onClick={() => navigate(`${restaurant?.id}`)}
            key={restaurant?.id}
            className="reataurant-card-main"
          >
            <RestaurantCard restaurant={restaurant} />
          </div>
        );
      })}
      <FormModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Restaurants;
