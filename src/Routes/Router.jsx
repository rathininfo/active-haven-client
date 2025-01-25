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
import BecomeATrainer from "../Pages/AllTrainers/TrainersDetails/BeATrainer/BecomeATrainer/BeATrainer";
import Payment from "../Pages/AllTrainers/TrainersDetails/TrainerBooking/Payment/Payment";
import DashBoard from "../Layout/DashBoard";
import AllClasses from "../Pages/AllClasses/AllClasses";
import ForumPage from "../Pages/Forum/Forum";
import VotePost from "../Pages/Forum/Vote/VotePost";

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
        path: "/community",
        element: <ForumPage></ForumPage>,
      },

      {
        path: "/trainerDetails/:id",
        element: <TrainersDetails></TrainersDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/trainersInfo/${params.id}`),
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
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashBoard></DashBoard>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard/admin",
        element: <h1>This is </h1>,
      },
      {
        path: "/dashboard/all-newsletter-subscribers",
        element: <h1>This is </h1>,
      },
      {
        path: "/dashboard/all-trainers",
        element: <h1>This is </h1>,
      },
      {
        path: "/dashboard/applied-trainer",
        element: <h1>This is </h1>,
      },
      {
        path: "/dashboard/balance",
        element: <h1>This is </h1>,
      },
      {
        path: "/dashboard/add-new-class",
        element: <h1>This is </h1>,
      },
    ],
  },
]);
export default router;
