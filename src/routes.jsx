import { createBrowserRouter } from "react-router-dom";
import Login from "src/pages/Auth/Login";
import { NotFount } from "src/pages/NotFount";
import { Layout } from "src/pages/layout/layout";
import PrivateRoutes from "./utils/private.routes";
import Portfolio from "src/pages/Portfolio/Portfolio";
import UnAuthorized from "src/pages/Auth/UnAuthorized";
import MultiStepForm from "./components/Forms/multiStep";

export const routesAIO = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <UnAuthorized>
        <Layout />
      </UnAuthorized>
    ),
    errorElement: <NotFount />,
    children: [...PrivateRoutes],
  },
  {
    path: "/",
    element: <Portfolio />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFount />,
  },
  {
    path: "/course/Cooperativa",
    element: <MultiStepForm />,
    errorElement: <NotFount />,
  },
]);
