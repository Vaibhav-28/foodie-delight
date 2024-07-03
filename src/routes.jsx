import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import { Navigate } from "react-router-dom";
import Restaurants from "./features/restaurants/Restaurants";
import Restaurant from "./features/restaurant/Restaurant";

const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/restaurants" />,
      },
      {
        path: "/restaurants",
        element: <Restaurants />,
      },
      {
        path: "/restaurants/:id",
        element: <Restaurant />,
      },
    ],
  },
]);

export default router;
