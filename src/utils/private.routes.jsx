import FormActa from "src/components/Forms/formActa";
import FormConstanciaA from "src/components/Forms/formConstanciaA";
import FormConstanciaG from "src/components/Forms/formConstanciaG";
import FormCooperativa from "src/components/Forms/FormCooperativa";
import FormModelo from "src/components/Forms/formModelo";
import FormSolicitud from "src/components/Forms/formSolicitud";
import Dashboard from "src/pages/Dashboard/Dashboard";

const PrivateRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "formulario/cooperativa",
    element: <FormCooperativa />,
  },
  {
    path: "formulario/modelo",
    element: <FormModelo />,
  },
  {
    path: "formulario/acta",
    element: <FormActa />,
  },
  {
    path: "formulario/constanciaGerente",
    element: <FormConstanciaG />,
  },
  {
    path: "formulario/constanciaAprobacion",
    element: <FormConstanciaA />,
  },
  {
    path: "formulario/solicitud",
    element: <FormSolicitud />,
  },
];

export default PrivateRoutes;
