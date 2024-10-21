import MultiStepForm from "src/components/Forms/multiStep";
import Dashboard from "src/pages/Dashboard/Dashboard";

const PrivateRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "course/Cooperativa",
    element: <MultiStepForm />,
  },
];

export default PrivateRoutes;
