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
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as React from "react";
import { firestore } from "src/services/firebase-config";
import FormInput from "../TextFields/FormInput";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const steps = ["Constancia Gerente Pago Aportes"];

export default function FormConstanciaG() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);

  const [formData, setFormData] = React.useState({
    nameDestinatario: "",
    date: dayjs(),
    nameCCC: "",
    ciudad: "",
    departamento: "",
    name: "",
    cc: "",
    cooperativaName: "",
  });

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  const userId = localStorage.getItem("user");

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const docRef = doc(firestore, "constanciaGerente", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
          console.log(docSnap.data());
          console.log(formData);
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
    if (validateStep()) {
      await saveData(); // Guardar datos en cada paso
      if (activeStep < steps.length - 1) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
        navigate("/dashboard");
        setShowSnackbar(true);
      }
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
        date: dayjs().format("DD/MM/YYYY"), // Establecer la fecha actual aquí
      };

      console.log(updatedFormData); // Imprime los datos actualizados, incluyendo la fecha

      await setDoc(
        doc(firestore, "constanciaGerente", userId),
        updatedFormData,
        {
          merge: true, // Merge para evitar sobrescribir datos previos
        }
      );
    } catch (error) {
      console.error("Error guardando datos:", error);
      setError("Error guardando los datos. Por favor, intente nuevamente.");
    }
  };

  const validateStep = () => {
    const { cooperativaName, cantidadE, cantidadN, ciudad } = formData;
    if (
      activeStep === 0 &&
      (!cooperativaName || !cantidadE || !cantidadN || !ciudad)
    ) {
      setError(
        "Por favor, complete todos los campos obligatorios correctamente."
      );
      return false;
    }
    setError("");
    return true;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={2}>
            <FormInput
              name="cooperativaName"
              value={formData.cooperativaName || ""}
              onChange={handleChange}
              placeholder="Razón social"
            />
            <FormInput
              name="cantidadE"
              value={formData.cantidadE || ""}
              onChange={handleChange}
              placeholder="Cantidad que han aportado todos los asociados a la cooperativa en partes iguales"
            />
            <FormInput
              name="cantidadN"
              value={formData.cantidadN || ""}
              onChange={handleChange}
              placeholder="Cantidad en números que han aportado todos los asociados a la cooperativa en partes iguales"
            />
            <FormInput
              name="ciudad"
              value={formData.ciudad || ""}
              onChange={handleChange}
              placeholder="Ciudad"
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
  return (
    <Card style={{ marginTop: 20, padding: "20px" }}>
      <Stepper activeStep={activeStep} sx={{ width: "100%", mb: 2 }}>
        {steps.map((step) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
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
