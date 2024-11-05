import Check from "@mui/icons-material/Check";
import {
  Button,
  Card,
  Input,
  Stack,
  Step,
  StepIndicator,
  Stepper,
  Textarea,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import PdfGeneratorReplica from "../Doc/PdfGenerator";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "src/services/firebase-config";

const steps = ["CAPÍTULO I", "CAPÍTULO II"];
const CooperativeForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    nit: "",
  });

  const userId = localStorage.getItem("user");

  useEffect(() => {
    // Al montar el componente, cargar datos guardados
    async function loadData() {
      const docRef = doc(firestore, "modelo", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    }
    loadData();
  }, [userId]);

  const handleGeneratePDF = () => {
    PdfGeneratorReplica({
      data: formData,
    });
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = async () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
      // Guardar datos en Firestore cuando se avanza al siguiente paso
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const saveData = async () => {
    try {
      await setDoc(doc(firestore, "modelo", userId), formData, {
        merge: true,
      });
    } catch (error) {
      console.error("Error guardando datos:", error);
    }
    handleGeneratePDF();
  };
  return (
    <div style={{ padding: "20px" }}>
      <Stepper sx={{ width: "100%" }}>
        {steps.map((step, index) => (
          <Step
            key={step}
            indicator={
              <StepIndicator
                variant={activeStep <= index ? "soft" : "solid"}
                color={activeStep < index ? "neutral" : "primary"}
              >
                {activeStep <= index ? index + 1 : <Check />}
              </StepIndicator>
            }
          >
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => setActiveStep(index)}
            >
              {step}
            </Typography>
          </Step>
        ))}
      </Stepper>
      <Card style={{ marginTop: 20 }}>
        {activeStep === 0 && (
          <Stack spacing={2}>
            <Input
              placeholder="Nombre de la Cooperativa"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Input
              placeholder="municipio"
              name="municipio"
              value={formData.municipio}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Input
              placeholder="Departamento de"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Stack>
        )}
        {activeStep === 1 && (
          <Stack spacing={2}>
            <Textarea
              placeholder="OBJETO SOCIAL"
              name="obj"
              value={formData.obj}
              onChange={handleChange}
            />
            {/* <Input
              placeholder="OBJETO SOCIAL"
              name="obj"
              fullWidth
              margin="normal"
            />
            <Input
              placeholder="municipio"
              name="municipio"
              value={formData.municipio}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Input
              placeholder="Departamento de"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              margin="normal"
            /> */}
          </Stack>
        )}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            paddingTop: 3,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Atrás
          </Button>
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext}>Siguiente</Button>
          ) : (
            <Button onClick={saveData}>Finalizar y Guardar</Button>
          )}
        </Stack>
      </Card>
    </div>
  );
};

export default CooperativeForm;
