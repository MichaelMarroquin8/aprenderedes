import * as React from "react";
import Check from "@mui/icons-material/Check";
import {
  Button,
  Card,
  Input,
  List,
  ListItem,
  Stack,
  Step,
  StepIndicator,
  Stepper,
  Typography,
  Select,
  Option,
} from "@mui/joy";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "src/services/firebase-config";

const steps = [
  "Primer paso",
  "Segundo paso",
  "Tercero paso",
  "Cuarto paso",
  "Quinto paso",
  "Sexto paso",
  "Datos Personales",
  "Datos Empresa",
];

export default function MultiStepForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    nombre: "",
    apellido: "",
    empresa: "",
    nit: "",
  });

  const userId = localStorage.getItem("user");

  React.useEffect(() => {
    // Al montar el componente, cargar datos guardados
    async function loadData() {
      const docRef = doc(firestore, "formularios", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    }
    loadData();
  }, [userId]);

  const handleNext = async () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
      // Guardar datos en Firestore cuando se avanza al siguiente paso
      await saveData();
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveData = async () => {
    try {
      await setDoc(doc(firestore, "formularios", userId), formData, {
        merge: true,
      });
    } catch (error) {
      console.error("Error guardando datos:", error);
    }
  };

  return (
    <>
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
            <List marker={"upper-roman"}>
              <ListItem>
                Verifica la Homonimia, es decir, consulta primero si su nombre
                de la Cooperativa ya existe en otra organización solidaria y se
                encuentra registrada en alguna Cámara de Comercio del País.
              </ListItem>
              <ListItem>
                Consulta por medio de este link:{" "}
                <a
                  style={{ color: "blue" }}
                  href="https://www.ccc.org.co/sedevirtual/consulta-homonimia/"
                  target="_blank"
                >
                  https://www.ccc.org.co/sedevirtual/consulta-homonimia/
                </a>
              </ListItem>
              <ListItem>
                Cuando ingrese, diríjase al botón “Registro de entidades de la
                Economía Solidaria” y escriba en el espacio asignado el nombre a
                consultar.
              </ListItem>
            </List>
          </Stack>
        )}
        {activeStep === 1 && (
          <Stack spacing={2}>
            <List marker={"upper-roman"}>
              <ListItem>CAPACITACIÓN DE LOS ASOCIADOS:</ListItem>
              <ListItem>
                Por ley, los asociados de una cooperativa deben realizar un
                curso básico en economía solidaria, mínimo de 20 horas, en una
                institución o entidad acreditada por la Unidad Administrativa
                Especial de Organizaciones Solidarias.
              </ListItem>
              <ListItem>(Dibujo)</ListItem>
            </List>
          </Stack>
        )}
        {activeStep === 2 && (
          <Stack spacing={2}>
            <List marker={"upper-roman"}>
              <ListItem>
                Elaborar un proyecto de estatutos de la cooperativa:
              </ListItem>
              <ListItem nested>
                <ListItem>
                  Se debe redactar un documento a nivel de propuesta donde
                  contemple aspectos importantes para el buen desarrollo de la
                  Cooperativa. Debe incluir al menos lo siguiente:
                </ListItem>
                <List marker="circle">
                  <ListItem>Nombre tentativo de la cooperativa.</ListItem>
                  <ListItem>Domicilio de la organización.</ListItem>
                  <ListItem>
                    Tipo de cooperativa: si es especializada, multiactiva o
                    integral.
                  </ListItem>
                  <ListItem>
                    Objeto de la cooperativa: cuáles son las actividades que
                    llevará a cabo{" "}
                  </ListItem>
                </List>
              </ListItem>
              <ListItem>organización</ListItem>
            </List>
          </Stack>
        )}
        {activeStep === 3 && (
          <Stack spacing={2}>
            <List marker={"upper-roman"}>
              <ListItem>LLEVAR A CABO LA ASAMBLEA DE CONSTITUCIÓN</ListItem>
              <ListItem>CONVOCAR A LOS ASOCIADOS:</ListItem>
              <ListItem>
                La cual consiste en CITAR a los asociados fundadores que mínimo
                deben ser tres (3) asociados, definir sitio, lugar, hora y
                objeto de la reunión.
              </ListItem>
              <ListItem>(Dibujo)</ListItem>
            </List>
          </Stack>
        )}
        {activeStep === 4 && (
          <Stack spacing={2}>
            <List marker={"upper-roman"}>
              <ListItem>DESARROLLO DE LA ASAMBLEA DE CONSTITUCIÓN:</ListItem>
              <ListItem nested>
                <ListItem>
                  Reunidos los asociados fundadores, definen el orden del día
                  plasmado en un acta de constitución, que debe considerar los
                  siguientes puntos:
                </ListItem>
                <List marker="circle">
                  <ListItem>
                    A-Nombramiento de Presidente y Secretario Ad-hoc.
                  </ListItem>
                  <ListItem>
                    Aprobación, constitución de la Cooperativa.
                  </ListItem>
                  <ListItem>Aprobación de estatutos.</ListItem>
                  <ListItem>Elección de Consejo de administración.</ListItem>
                  <ListItem>Elección de Junta de vigilancia.</ListItem>
                  <ListItem>Elección del Revisor Fiscal.</ListItem>
                  <ListItem>Elección de Gerente.</ListItem>
                  <ListItem>Aprobación del Acta.</ListItem>
                </List>
              </ListItem>
            </List>
          </Stack>
        )}
        {activeStep === 5 && (
          <Stack spacing={2}>
            <List marker={"upper-roman"}>
              <ListItem>
                Registrar la cooperativa en la Cámara de Comercio
              </ListItem>
              <ListItem>
                Anexar los siguientes documentos: El acta de constitución
              </ListItem>
              <ListItem>
                los aportes y la aceptación de cargos suscrito por el presidente
                y el secretario de la asamblea y los integrantes de la
                cooperativa
              </ListItem>
              <ListItem>
                copia de los estatutos firmados por los asistentes a la asamblea
              </ListItem>
            </List>
          </Stack>
        )}
        {activeStep === 6 && (
          <>
            <Select defaultValue="CC">
              <Option value="CC">Cédula de ciudadanía</Option>
              <Option value="CE">Cédula de Extranjería</Option>
              <Option value="PP">Pasaporte</Option>
              <Option value="TI">Tarjeta de identidad</Option>
              <Option value="PE">Permiso Especial de Permanencia</Option>
              <Option value="PPT">Permiso de protección temporal</Option>
            </Select>
            <Input
              placeholder="Numero de documento"
              name="id"
              value={formData.id}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Input
              placeholder="Nombres"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Input
              placeholder="Apellidos"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Input
              placeholder="Teléfono"
              name="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Input
              placeholder="Correo Electrónico"
              name="Correo"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Input
              placeholder="Confirme el correo electrónico"
              name="Correo2"
              value={formData.cemail}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </>
        )}
        {activeStep === 7 && (
          <>
            <Input
              placeholder="Nombre Empresa"
              name="empresa"
              value={formData.empresa}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Input
              placeholder="NIT"
              name="nit"
              value={formData.nit}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </>
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
    </>
  );
}
