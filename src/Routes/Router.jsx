import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import AllTrainers from "../Pages/AllTrainers/AllTrainers";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Secret from "../Pages/Shared/Secret/Secret";
import TrainersDetails from "../Pages/AllTrainers/TrainersDetails/TrainersDetails";
import TrainerBooking from "../Pages/AllTrainers/TrainersDetails/TrainerBooking/TrainerBooking";
import BecomeATrainer from "../Pages/AllTrainers/TrainersDetails/BeATrainer/BecomeATrainer/BecomeATrainer";
import Payment from "../Pages/AllTrainers/TrainersDetails/TrainerBooking/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/trainers",
        element: (
          <PrivateRoutes>
            <AllTrainers></AllTrainers>
          </PrivateRoutes>
        ),
      },

      {
        path: "/trainerDetails/:id",
        element: <TrainersDetails></TrainersDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/trainers/${params.id}`),
      },

      {
        path: "/trainerBooking/:id",
        element: (
          <PrivateRoutes>
            <TrainerBooking></TrainerBooking>
          </PrivateRoutes>
        ),
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },

      {
        path: "/become-a-trainer",
        element: (
          <PrivateRoutes>
            <BecomeATrainer></BecomeATrainer>
          </PrivateRoutes>
        ),
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);
export default router;
