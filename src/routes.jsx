import { createBrowserRouter } from "react-router-dom";
import Login from "src/pages/Auth/Login";
import UnAuthorized from "src/pages/Auth/UnAuthorized";
import { NotFount } from "src/pages/NotFount";
import Portfolio from "src/pages/Portfolio/Portfolio";
import { Layout } from "src/pages/layout/layout";
import PrivateRoutes from "./utils/private.routes";

export const routesSENA = createBrowserRouter([
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
]);
