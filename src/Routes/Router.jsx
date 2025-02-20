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
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import AppliedTrainer from "../Pages/DashBoard/AppliedTrainer/AppliedTrainer";
import ManageSlots from "../Pages/DashBoard/ManageSlots/ManageSlots";
import AddNewSlot from "../Pages/DashBoard/AddNewSlot/AddNewSlot";
import AddNewForum from "../Pages/DashBoard/AddNewForum/AddNewForum";
import AllNewsletterSubscribers from "../Pages/DashBoard/AllNewsletterSubscribers/AllNewsletterSubscribers";
import AllTrainer from "../Pages/DashBoard/AllTrainer/AllTrainer";
import ForumPage from "../Pages/Forum/Vote/Forum";
import Profile from "../Pages/DashBoard/Profile/Profile";
import ActivityLog from "../Pages/Forum/Vote/ActivityLog/ActivityLog";
import BookedTrainer from "../Pages/DashBoard/BookedTrainer/BookedTrainer";
import Balance from "../Pages/DashBoard/Balance/Balance";
import AddClass from "../Pages/DashBoard/AddClass/AddClass";

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
        path: "/forumPage",
        element: <ForumPage></ForumPage>,
      },

      {
        path: "/trainerDetails/:id",
        element: <TrainersDetails></TrainersDetails>,
        loader: ({ params }) =>
          fetch(
            `https://fitness-tracker-server-side-nine.vercel.app/trainersInfo/${params.id}`
          ),
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
      // admin routers
      {
        path: "all-newsletter-subscribers",
        element: <AllNewsletterSubscribers></AllNewsletterSubscribers>,
      },
      {
        path: "all-trainer",
        element: <AllTrainer></AllTrainer>,
      },
      {
        path: "applied-trainer",
        element: <AppliedTrainer></AppliedTrainer>,
      },

      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },

      {
        path: "/dashboard/balance",
        element: <Balance></Balance>,
      },

      {
        path: "/dashboard/addClasses",
        element: <AddClass></AddClass>,
      },

      // trainer routes
      {
        path: "/dashboard/addClasses",
        element: <AddClass></AddClass>,
      },

      {
        path: "add-new-slot",
        element: <AddNewSlot></AddNewSlot>,
      },

      {
        path: "add-new-forum",
        element: <AddNewForum></AddNewForum>,
      },

      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },

      {
        path: "/dashboard/activity-log",
        element: <ActivityLog></ActivityLog>,
      },
      {
        path: "/dashboard/booked-trainer",
        element: <BookedTrainer></BookedTrainer>,
      },
    ],
  },
]);
export default router;
