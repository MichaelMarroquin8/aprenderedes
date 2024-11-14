import dayjs from "dayjs";
import * as React from "react";
import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import FormInput from "../TextFields/FormInput";
import { firestore } from "src/services/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const steps = [
  "ARTICULO 1",
  "ARTICULO 2",
  "ARTICULO 5",
  "ARTICULO 8",
  "ARTICULO 15",
  "ARTICULO 17",
  "ARTICULO 27",
  "ARTICULO 29",
  "ARTICULO 34",
  "ARTICULO 36",
  "ARTICULO 43",
  "ARTICULO 59",
  "ARTICULO 69",
  "ARTICULO 104",
];

export default function FormModelo() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)"); // Media query para pantallas pequeñas
  const [activeStep, setActiveStep] = React.useState(0);

  const [formData, setFormData] = React.useState({
    date: dayjs(),
  });

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  const userId = localStorage.getItem("user");

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const docRef = doc(firestore, "modelo", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleNext = async () => {
    await saveData(); // Guardar datos en cada paso
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      navigate("/dashboard");
      setShowSnackbar(true);
    }
  };

  const handleBack = async () => {
    await saveData(); // Guardar datos antes de retroceder
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveData = async () => {
    try {
      // Establecer la fecha de hoy al guardar los datos
      const updatedFormData = {
        ...formData,
        hora: dayjs().format("HH"),
        dia: dayjs().format("DD"),
        mes: dayjs().format("MM"),
        mesName: dayjs().format("MMMM"),
        año: dayjs().format("YYYY"),
        date: dayjs().toISOString(), // Almacenar la fecha como cadena ISO
      };

      await setDoc(doc(firestore, "modelo", userId), updatedFormData, {
        merge: true, // Merge para evitar sobrescribir datos previos
      });
    } catch (error) {
      console.error("Error guardando datos:", error);
      setError("Error guardando los datos. Por favor, intente nuevamente.");
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={2}>
            <FormInput
              name="rSocial"
              value={formData.rSocial || ""}
              onChange={handleChange}
              placeholder="Razón social de la cooperativa"
            />
            <FormInput
              name="sigla"
              value={formData.sigla || ""}
              onChange={handleChange}
              placeholder="SIGLA de la cooperativa"
            />
          </Stack>
        );
      case 1:
        return (
          <Stack spacing={2}>
            <FormInput
              name="municipio"
              value={formData.municipio || ""}
              onChange={handleChange}
              placeholder="Municipio donde vive"
            />
            <FormInput
              name="departamento"
              value={formData.departamento || ""}
              onChange={handleChange}
              placeholder="Departamento"
            />
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={2}>
            <FormInput
              name="objSocial"
              value={formData.objSocial || ""}
              onChange={handleChange}
              placeholder="indicar el objeto social que pretenden desarrollar"
            />
            <FormInput
              name="secciónCorrespondiente"
              value={formData.secciónCorrespondiente || ""}
              onChange={handleChange}
              placeholder="Indicar la sección correspondiente Ejemplo: Transporte, Servicios Especiales, y Comercialización"
            />
          </Stack>
        );
      case 3:
        return (
          <Stack spacing={2}>
            <FormInput
              type="number"
              name="admisión"
              value={formData.admisión || ""}
              onChange={handleChange}
              placeholder="cuota de admisión en _____% del salario mínimo"
            />
            <FormInput
              type="number"
              name="aportes"
              value={formData.aportes || ""}
              onChange={handleChange}
              placeholder="Suscribir en aportes el valor del _____% del salario mínimo"
            />
            <FormInput
              type="number"
              name="aportación"
              value={formData.aportación || ""}
              onChange={handleChange}
              placeholder="En certificados de aportación y pagar como mínimo la _____ parte de ellos una vez aceptado por el Consejo"
            />
            <FormInput
              type="number"
              name="acreditar"
              value={formData.acreditar || ""}
              onChange={handleChange}
              placeholder="Acreditar haber recibido como mínimo educación Cooperativa con una intensidad de 20 horas o comprometerse a realizarlo durante los _____ meses siguientes a su ingreso."
            />
          </Stack>
        );
      case 4:
        return (
          <Stack spacing={2}>
            <FormInput
              type="number"
              name="plazoMáximo"
              value={formData.plazoMáximo || ""}
              onChange={handleChange}
              placeholder=" El Consejo de Administración tendrá un plazo máximo de ___________ días para la devolución del saldo de sus aportes."
            />
          </Stack>
        );
      case 5:
        return (
          <Stack spacing={2}>
            <FormInput
              type="number"
              name="moraMayor"
              value={formData.moraMayor || ""}
              onChange={handleChange}
              placeholder="Por mora mayor de ___ días en el cumplimiento de las obligaciones  con la cooperativa."
            />
          </Stack>
        );
      case 6:
        return (
          <Stack spacing={2}>
            <FormInput
              type="number"
              name="retiroVoluntario"
              value={formData.retiroVoluntario || ""}
              onChange={handleChange}
              placeholder="El Asociado que por retiro voluntario dejare de pertenecer a la cooperativa y deseare afiliarse nuevamente a ella, deberá acreditar los requisitos exigidos para los nuevos asociados. Tal admisión sólo podrá concederse ________ meses después de su retiro."
            />
          </Stack>
        );
      case 7:
        return (
          <Stack spacing={2}>
            <FormInput
              type="number"
              name="retiroVoluntario2"
              value={formData.retiroVoluntario2 || ""}
              onChange={handleChange}
              placeholder="Aceptado el retiro voluntario o forzoso o confirmada la exclusión, la cooperativa dispondrá de un plazo máximo de ________ días para proceder a la devolución de los aportes."
            />
          </Stack>
        );
      case 8:
        return (
          <Stack spacing={2}>
            <FormInput
              name="suspensión"
              value={formData.suspensión || ""}
              onChange={handleChange}
              placeholder="Suspensión de la prestación de los servicios hasta por el término de _____ (  ) meses."
            />
          </Stack>
        );

      case 9:
        return (
          <Stack spacing={2}>
            <FormInput
              name="nameCCC"
              value={formData.nameCCC || ""}
              onChange={handleChange}
              placeholder="Cámara de Comercio de la ciudad ____"
            />
          </Stack>
        );
      case 10:
        return (
          <Stack spacing={2}>
            <FormInput
              name="sumaDe"
              value={formData.sumaDe || ""}
              onChange={handleChange}
              placeholder="Fíjese la suma de ____ MIL PESOS (valor escrito)"
            />
            <FormInput
              type="number"
              name="sumaDeN"
              value={formData.sumaDeN || ""}
              onChange={handleChange}
              placeholder="Fíjese la suma de ____ MIL PESOS (valor en números)"
            />
            <FormInput
              name="aporteSocialInicial"
              value={formData.aporteSocialInicial || ""}
              onChange={handleChange}
              placeholder="El aporte Social inicial suscrito de la Cooperativa del cual se haya pagado la cuarta parte o sea __________ (valor escrito)"
            />
            <FormInput
              type="number"
              name="aporteSocialInicialN"
              value={formData.aporteSocialInicialN || ""}
              onChange={handleChange}
              placeholder="El aporte Social inicial suscrito de la Cooperativa del cual se haya pagado la cuarta parte o sea __________ (valor en números)"
            />
            <FormInput
              type="number"
              name="ingresarPago"
              value={formData.ingresarPago || ""}
              onChange={handleChange}
              placeholder="Para asociados que ingresen deberán pagar el ___% del salario mínimo mensual legal vigente."
            />
            <FormInput
              type="number"
              name="contribuciónMensual"
              value={formData.contribuciónMensual || ""}
              onChange={handleChange}
              placeholder="( % ) de un salario mínimo legal vigente como cuota mensual obligatoria con que cada asociado debe contribuir a la cooperativa que se destinarán para aportes sociales."
            />
          </Stack>
        );

      case 11:
        return (
          <Stack spacing={2}>
            <FormInput
              name="cooperativaExcede"
              value={formData.cooperativaExcede || ""}
              onChange={handleChange}
              placeholder="Cuando el total de asociados de la cooperativa excede de _______. Cuando gran número de ellos estén domiciliados en diferentes Municipios del País, o cuando su realización resultase desproporcionadamente generosa en consideración a los recursos de la cooperativa la Asamblea general de asociados podrá ser sustituida por una Asamblea general de delegados."
            />
          </Stack>
        );
      case 12:
        return (
          <Stack spacing={2}>
            <FormInput
              name="consejoDeAdministración"
              value={formData.consejoDeAdministración || ""}
              onChange={handleChange}
              placeholder="El Consejo de Administración estará compuesto por _____  miembros principales"
            />
            <FormInput
              name="suplentes"
              value={formData.suplentes || ""}
              onChange={handleChange}
              placeholder="con sus respectivos suplentes numéricos, para períodos de _____ año(s)  siendo opcional la reelección."
            />
          </Stack>
        );
      case 13:
        return (
          <Stack spacing={2}>
            <FormInput
              name="comisiónCompuesta"
              value={formData.comisiónCompuesta || ""}
              onChange={handleChange}
              placeholder="se nombrará una comisión compuesta por ____ asociados dentro de un plazo fijado"
            />
          </Stack>
        );
      default:
        return <Typography>Finalización del formulario.</Typography>;
    }
  };

  if (loading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  return (
    <Card style={{ marginTop: 20, padding: "20px" }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        orientation={isMobile ? "vertical" : "horizontal"}
        nonLinear
        sx={{ width: "100%", mb: 2 }}
      >
        {steps.map((step, index) => (
          <Step key={step} completed={index < activeStep}>
            <StepLabel
              onClick={() => handleStepClick(index)}
              sx={{
                cursor: "pointer", // Cambia el cursor a pointer
                "&:hover": {
                  color: "primary.main", // Cambia el color cuando se pasa el cursor (opcional)
                },
              }}
            >
              {step}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent(activeStep)}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Stack
        direction="row"
        spacing={2}
        sx={{ paddingTop: 3, justifyContent: "space-between" }}
      >
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Atrás
        </Button>
        <Button onClick={handleNext}>
          {activeStep < steps.length - 1 ? "Siguiente" : "Finalizar"}
        </Button>
      </Stack>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity="success">
          Datos guardados exitosamente.
        </Alert>
      </Snackbar>
    </Card>
  );
}
