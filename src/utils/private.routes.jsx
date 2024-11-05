import CooperativeForm from "src/components/Forms/CooperativeForm";
import FormMatricula from "src/components/Forms/FormMatricula";
import Dashboard from "src/pages/Dashboard/Dashboard";

const PrivateRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },

  {
    path: "course/cooperativa",
    element: <FormMatricula />,
  },
  {
    path: "course/modelo",
    element: <CooperativeForm />,
  },
];

export default PrivateRoutes;
