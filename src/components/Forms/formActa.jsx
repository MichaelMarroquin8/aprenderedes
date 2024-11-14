import {
  Alert,
  Button,
  Card,
  CircularProgress,
  FormLabel,
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
import DynamicForm from "../TextFields/DynamicForm";
import DynamicForm2 from "../TextFields/DynamicForm2";
import FormDatePicker from "../Datepickers/FormDatePicker";

const steps = ["ACTA DE CONSTITUCIÓN"];

export default function FormActa() {
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
    personas: [{ nombre: "", cc: "", fecha: "" }],
    personas2: [{ nombre: "", cc: "", fecha: "" }],
  });

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  const userId = localStorage.getItem("user");

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const docRef = doc(firestore, "acta", userId);
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

  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Actualiza personas2 en el estado
    }));
  };

  const saveData = async () => {
    try {
      // Establecer la fecha de hoy al guardar los datos
      const updatedFormData = {
        ...formData,
        hora: dayjs().format("HH"),
        minutos: dayjs().format("mm"),
        dia: dayjs().format("DD"),
        mes: dayjs().format("MM"),
        mesName: dayjs().format("MMMM"),
        año: dayjs().format("YYYY"),
        date: dayjs().toISOString(), // Almacenar la fecha como cadena ISO
      };

      await setDoc(doc(firestore, "acta", userId), updatedFormData, {
        merge: true, // Merge para evitar sobrescribir datos previos
      });
    } catch (error) {
      console.error("Error guardando datos:", error);
      setError("Error guardando los datos. Por favor, intente nuevamente.");
    }
  };

  const validateStep = () => {
    const { cooperativaName, ciudad } = formData;
    if (activeStep === 0 && (!cooperativaName || !ciudad)) {
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
              name="ciudad"
              value={formData.ciudad || ""}
              onChange={handleChange}
              placeholder="Ciudad"
            />
            <FormInput
              name="departamento"
              value={formData.departamento || ""}
              onChange={handleChange}
              placeholder="Departamento"
            />
            <FormInput
              name="municipio"
              value={formData.municipio || ""}
              onChange={handleChange}
              placeholder="Municipio donde vive"
            />
            <FormInput
              name="nameBoss"
              value={formData.nameBoss || ""}
              onChange={handleChange}
              placeholder="nombre del presidente designado"
            />
            <FormInput
              name="nameSubBoss"
              value={formData.nameSubBoss || ""}
              onChange={handleChange}
              placeholder="nombre del secretario designado"
            />
            <FormInput
              name="nameCooperativa"
              value={formData.nameCooperativa || ""}
              onChange={handleChange}
              placeholder="nombre de la cooperativa"
            />
            <FormLabel>miembros del Consejo de administración</FormLabel>
            <DynamicForm formData={formData} setFormData={setFormData} />
            <FormLabel> miembros de la junta de vigilancia</FormLabel>
            <DynamicForm2 formData={formData} setFormData={setFormData} />
            <FormInput
              name="revisorFiscal"
              value={formData.revisorFiscal || ""}
              onChange={handleChange}
              placeholder="Revisor Fiscal"
            />
            <FormInput
              name="revisorFiscalTP"
              value={formData.revisorFiscalTP || ""}
              onChange={handleChange}
              placeholder="Revisor Fiscal Tarjeta Profesional"
            />
            <FormInput
              name="revisorFiscalCC"
              value={formData.revisorFiscalCC || ""}
              onChange={handleChange}
              placeholder="Cédula Revisor Fiscal"
            />
            <FormDatePicker
              name="expediciónCC"
              value={formData.expediciónCC} // Enviar valor como cadena en formato "YYYY-MM-DD"
              onChange={(name, newValue) => handleInputChange(name, newValue)} // Usamos handleInputChange para manejar la fecha
              placeholder="fecha de expedición de la cédula del revisor fiscal"
            />
            <FormInput
              name="gerente"
              value={formData.gerente || ""}
              onChange={handleChange}
              placeholder="Gerente "
            />

            <FormInput
              name="gerenteCC"
              value={formData.gerenteCC || ""}
              onChange={handleChange}
              placeholder="Cédula Gerente "
            />
            <FormDatePicker
              name="expediciónCCG"
              value={formData.expediciónCCG} // Enviar valor como cadena en formato "YYYY-MM-DD"
              onChange={(name, newValue) => handleInputChange(name, newValue)} // Usamos handleInputChange para manejar la fecha
              placeholder="fecha de expedición de la cédula del Gerente"
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
