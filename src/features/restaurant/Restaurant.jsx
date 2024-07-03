import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import defaultImg from "../../assets/default-image.png";
import { Link } from "react-router-dom";
import "./Restaurant.css";
import { useSnackbar } from "notistack";

const getRestaurant = (id) => {
  return axios.get(`http://localhost:4000/restaurants/${id}`);
};

const Restaurant = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurant(id),
  });
  if (isError) {
    enqueueSnackbar(error?.message,{variant:"error"});
  }
  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  return (
    <div className="restaurant-detail">
      <img
        src={data.data?.image ? data.data?.image : defaultImg}
        alt="restaurant"
        className="detail-image"
      />
      <div className="detail-info">
        <h1 className="detail-name">{data.data?.name}</h1>
        <p className="detail-description">{data.data?.description}</p>
        <p className="detail-location">{data.data?.location}</p>
        <Link to="/" className="back-link">
          Back to restaurants
        </Link>
      </div>
    </div>
  );
};

export default Restaurant;
