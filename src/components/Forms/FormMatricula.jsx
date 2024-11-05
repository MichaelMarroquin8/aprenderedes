import * as React from "react";
import Check from "@mui/icons-material/Check";
import {
  Alert,
  Button,
  Card,
  CircularProgress,
  FormControl,
  FormLabel,
  List,
  ListItem,
  Option,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  Stack,
  Step,
  StepIndicator,
  Stepper,
  Typography,
} from "@mui/joy";
import FormInput from "../TextFields/FormInput";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "src/services/firebase-config";
import CheckboxWithInput from "../Checks/CheckboxWithInput";
import RadioCheck from "../Checks/RadioCheck";

const steps = [
  "Datos del solicitante",
  "INSCRIPCIÓN ESAL",
  "Iniciar Matricula/Inscripción",
  "Información Financiera",
  "Estado ACTUAL",
  "ACTIVIDAD ECONÓMICA",
  "RESPONSABILIDADES TRIBUTARIAS",
  "FIRMA",
];

export default function FormMatricula() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    nombre: "",
    apellido: "",
    empresa: "",
    nit: "",
    id: "",
    telefono: "",
    email: "",
    cemail: "",
  });

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  const userId = localStorage.getItem("user");

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const docRef = doc(firestore, "formularios", userId);
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
  }, [userId]);

  const handleNext = async () => {
    if (validateStep()) {
      await saveData(); // Guardar datos en cada paso
      if (activeStep < steps.length - 1) {
        setActiveStep((prevStep) => prevStep + 1);
      } else {
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
      [name]: value,
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveData = async () => {
    try {
      await setDoc(doc(firestore, "formularios", userId), formData, {
        merge: true,
      });
    } catch (error) {
      console.error("Error guardando datos:", error);
      setError("Error guardando los datos. Por favor, intente nuevamente.");
    }
  };

  const validateStep = () => {
    const { nombre } = formData;
    if (activeStep === 0 && !nombre) {
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
            <FormControl>
              <FormLabel>Tipo de Documento</FormLabel>
              <Select defaultValue={"CC"} name="target" onChange={handleChange}>
                <Option value="CC">Cédula de ciudadanía</Option>
                <Option value="CE">Cédula de Extranjería</Option>
                <Option value="PP">Pasaporte</Option>
                <Option value="TI">Tarjeta de identidad</Option>
                <Option value="PE">Permiso Especial de Permanencia</Option>
                <Option value="PPT">Permiso de protección temporal</Option>
              </Select>
            </FormControl>
            <FormInput
              label="Número de Documento"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="Número de documento"
            />

            <FormInput
              name="id"
              value={formData.id || ""}
              onChange={handleChange}
              placeholder="Numero de documento"
            />

            <FormInput
              name="nombre"
              value={formData.nombre || ""}
              onChange={handleChange}
              placeholder="Nombres"
            />

            <FormInput
              name="apellido"
              value={formData.apellido || ""}
              onChange={handleChange}
              placeholder="Apellidos"
            />

            <FormInput
              name="telefono"
              value={formData.telefono || ""}
              onChange={handleChange}
              placeholder="Teléfono"
            />

            <FormInput
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Correo Electrónico"
              helperText="Por favor, asegúrese de que el correo es correcto."
            />
          </Stack>
        );
      case 1:
        return (
          <Stack spacing={2}>
            <List>
              <ListItem>
                Seleccione esta alternativa en el sitio web de la cámara de
                comercio donde esta cargando Por favor recuerde
              </ListItem>
              <ListItem>
                que antes de continuar en la plataforma de la CC, debe verificar
                si el nombre que desea para su empresa ya se encuentra
                registrado y por lo tanto debería establecer un nombre diferente
                para su cooperativa
              </ListItem>
              <a href="https://www.ccc.org.co/sedevirtual/consulta-homonimia/">
                Verificar Homonimia
              </a>
              <ListItem>
                Allí debe ingresar por el espacio: REGISTRO DE ENTIDADES DE LA
                ECONOMIA SOLIDARIA
              </ListItem>
            </List>
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={2}>
            <FormInput
              name="Rsocial"
              value={formData.Rsocial || ""}
              onChange={handleChange}
              placeholder="Razón Social"
              helperText="Nombre que le identificará, normalmente se inicia con la palabra
                Cooperativa...."
            />

            <FormInput
              name="SIGLA"
              value={formData.SIGLA || ""}
              onChange={handleChange}
              placeholder="SIGLA"
              helperText="Que representa el nombre de la Cooperativa"
            />

            <Typography variant="body1" color="initial">
              Datos del Domicilio PRINCIPAL - COMERCIAL Estos datos deben
              coincidir con los registrados en el Registro Único Tributario -
              DIAN
            </Typography>
            <FormInput
              name="País"
              value={formData.Pais || ""}
              onChange={handleChange}
              placeholder="País"
            />
            <FormInput
              name="Municipio"
              value={formData.Municipio || ""}
              onChange={handleChange}
              placeholder="Municipio"
            />
            <FormInput
              name="Domicilio"
              value={formData.Domicilio || ""}
              onChange={handleChange}
              placeholder="Dirección del Domicilio principal"
            />
            <FormInput
              name="Localidad"
              value={formData.Localidad || ""}
              onChange={handleChange}
              placeholder="Localidad, barrio, vereda, corregimiento"
              helperText="En la plataforma de la CC debe seleccionarlo entre las
                alternativas que allí se presentan"
            />
            <FormControl>
              <FormLabel>Zona</FormLabel>
              <RadioGroup defaultValue="outlined" name="radio-buttons-group">
                <Radio value="Urbana" label="Urbana" variant="outlined" />
                <Radio value="Rural" label="Rural" variant="outlined" />
              </RadioGroup>
            </FormControl>
            <FormInput
              name="Cpostal"
              value={formData.Cpostal || ""}
              onChange={handleChange}
              placeholder="Código postal"
              helperText="En la plataforma de la CC esta pregunta no es obligatoria, si lo
                conoce es opcional responderlo"
            />
            <FormControl>
              <FormLabel>Ubicación</FormLabel>
              <Select
                defaultValue={"Oficina"}
                name="target"
                onChange={handleChange}
              >
                <Option value="Local">Local</Option>
                <Option value="Oficina">Oficina</Option>
                <Option value="LocalY">Local y oficina</Option>
                <Option value="Fabrica">Fabrica</Option>
                <Option value="Finca">Finca</Option>
                <Option value="Vivienda">Vivienda</Option>
              </Select>
            </FormControl>
            <Typography variant="body1" color="initial">
              Se requiere como mínimo un número telefónico fijo o celular para
              el envió de mensajes
            </Typography>
            <FormInput
              name="telefono"
              value={formData.telefono || ""}
              onChange={handleChange}
              placeholder="Teléfono"
            />
            <FormInput
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Correo Electrónico"
            />
            <Typography variant="body1" color="initial">
              De acuerdo con el artículo 291 del Código General del Proceso,
              “las personas jurídicas de derecho privado y los comerciantes
              inscritos en el registro mercantil deberán registrar en la Cámara
              de Comercio o en la oficina de registro correspondiente del lugar
              donde funcione su sede principal, sucursal o agencia, la dirección
              donde recibirán notificaciones judiciales. Con el mismo propósito
              deberán registrar, además, una dirección electrónica”. Si los
              datos para notificación judicial son iguales a los datos del
              domicilio principal oprima el botón copiar datos comerciales. En
              caso contrario debe diligenciar los mismos campos pero con la
              información para recibo de notificaciones judiciales
            </Typography>
            <FormControl>
              <FormLabel>
                De conformidad con lo establecido en el artículo 67 del Código
                de Procedimiento Administrativo y de lo Contencioso
                Administrativo, autorizo para que me notifiquen personalmente a
                través del correo electrónico aquí especificado * Si
              </FormLabel>
              <RadioGroup defaultValue="outlined" name="radio-buttons-group">
                <Radio value="Si" label="Si" variant="outlined" />
                <Radio value="No" label="No" variant="outlined" />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel>La sede administrativa es</FormLabel>
              <Select
                defaultValue={"Arriendo"}
                name="sede"
                onChange={handleChange}
              >
                <Option value="Arriendo">Arriendo</Option>
                <Option value="Comodato">Comodato</Option>
                <Option value="Propia">Propia</Option>
                <Option value="Prestamo">Prestamo</Option>
              </Select>
            </FormControl>
          </Stack>
        );
      case 3:
        return (
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>
                Estado situación financiera * <br />A continuación se presentan
                los campos que requiere tener la información disponible en
                cifras, para cargar a la plataforma de la CC
              </FormLabel>
              <Stack spacing={2}>
                <CheckboxWithInput
                  label="Activo Corriente - todo lo que es convertible en liquidez Ej: Caja, bancos, cuentas por cobrar, inventarios"
                  name="activoCorriente"
                  initialValue={formData.activoCorriente}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Activo No Corriente  - Activos fijos: Ej: Maquinaria y equipos, herramientas, vehículos..."
                  name="activoNoCorriente"
                  initialValue={formData.activoNoCorriente}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Activo Total = Suma de los corrientes + los No corrientes"
                  name="activoTotal"
                  initialValue={formData.activoTotal}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Pasivo Corriente - Deudas menores a un año - obligaciones bancarias - cuentas por pagar .."
                  name="pasivoCorriente"
                  initialValue={formData.pasivoCorriente}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Pasivo No Corrientes: Deudas u obligaciones a largo plazo mayores a un año: Ej - Créditos, obligaciones bancarias, cuentas por pagar ..."
                  name="pasivoNoCorrientes"
                  initialValue={formData.pasivoNoCorrientes}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Pasivo Total = Pasivo Corriente + Pasivo No corriente"
                  name="pasivoTotal"
                  initialValue={formData.pasivoTotal}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Patrimonio Neto = Activos Total - Pasivo Total"
                  name="patrimonioNeto"
                  initialValue={formData.patrimonioNeto}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Pasivo + Patrimonio = Activos Totales"
                  name="pasivoPatrimonio"
                  initialValue={formData.pasivoPatrimonio}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Balance Social $ : Corresponde el valor relacionado con actividades como recreación, turismo, vivienda, educación, etc para sus asociados"
                  name="balanceSocial"
                  initialValue={formData.balanceSocial}
                  onChange={handleInputChange}
                />
                <FormControl>
                  <FormLabel>Grupo NIIF</FormLabel>
                  <RadioGroup
                    defaultValue="outlined"
                    name="radio-buttons-group"
                  >
                    <Radio
                      value="Entidades"
                      label="Entidades controlados por supersalud y supersubsidio"
                      variant="outlined"
                    />
                    <Radio
                      value="grupo1"
                      label="Grupo 1: NIIF Plenas: corresponde a los que cumplen montos mínimos de acuerdo a sus estados financieros"
                      variant="outlined"
                    />
                    <Radio
                      value="grupo2"
                      label="Grupo 2: PYMES: Las cooperativas aplican en este grupo"
                      variant="outlined"
                    />
                    <Radio
                      value="grupo3"
                      label="Grupo 3: Personas naturales, jurídicas o microempresas"
                      variant="outlined"
                    />
                  </RadioGroup>
                </FormControl>
                <Alert color="neutral">ESTADO DE RESULTADOS</Alert>
                <FormLabel>
                  Valores requeridos en $ para cargar en la plataforma de la
                  CC.*
                </FormLabel>
                <CheckboxWithInput
                  label="Ingresos Actividad Ordinaria $: corresponde a lo percibido como ventas de su actividad normal"
                  name="ingresosActividad"
                  initialValue={formData.ingresosActividad}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Otros Ingresos $: corresponde a lo percibido por actividades adicionales a la normal"
                  name="otrosIngresos"
                  initialValue={formData.otrosIngresos}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Costo de Ventas $: Costos que le implica o le representa los costos de mercancía o de producción."
                  name="costoDeVentas"
                  initialValue={formData.costoDeVentas}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Gastos Operativos $: Son los Desembolso relacionados con el funcionamiento de la parte administrativa y servicios públicos"
                  name="gastosOperativos"
                  initialValue={formData.gastosOperativos}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Otros Gastos $: Desembolso generados por imprevistos o antes no cubiertos"
                  name="otrosGastos"
                  initialValue={formData.otrosGastos}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Gastos por Impuestos $: como se indica corresponde a lo relacionado por impuestos"
                  name="gastosPorImpuestos"
                  initialValue={formData.gastosPorImpuestos}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Utilidad / Pérdida Operacional $ = Total Ingresos - Total (Gastos y costos)"
                  name="utilidad"
                  initialValue={formData.utilidad}
                  onChange={handleInputChange}
                />
                <CheckboxWithInput
                  label="Resultado del Periodo $ = Utilidad/ Pérdida operacional - impuestos - depreciación  = Total Ingresos - Total (Gastos y costos) - Impuestos - depreciación"
                  name="resultadoDelPeriodo"
                  initialValue={formData.resultadoDelPeriodo}
                  onChange={handleInputChange}
                />
              </Stack>
            </FormControl>
          </Stack>
        );
      case 4:
        return (
          <Stack spacing={2}>
            <RadioCheck
              label="Estado actual de la persona JURÍDICA *"
              name="estadoActual"
              options={[
                {
                  value: "Entidades",
                  label: "Entidades controlados por supersalud y supersubsidio",
                },
                {
                  value: "grupo1",
                  label:
                    "Grupo 1: NIIF Plenas: corresponde a los que cumplen montos mínimos de acuerdo a sus estados financieros",
                },
                {
                  value: "grupo2",
                  label:
                    "Grupo 2: PYMES: Las cooperativas aplican en este grupo",
                },
                {
                  value: "grupo3",
                  label:
                    "Grupo 3: Personas naturales, jurídicas o microempresas",
                },
              ]}
              initialValue={formData.estadoActual}
              onChange={handleRadioChange}
            />

            <FormInput
              name="cEmpleados"
              value={formData.cEmpleados || ""}
              onChange={handleChange}
              placeholder="Número de empleados"
              helperText={
                "Incluye trabajadores vinculados directamente con la empresa y empleados temporales. (pueden ser o hacer parte de los mismos asociados)"
              }
            />
            <FormInput
              name="pEmpleados"
              value={formData.pEmpleados || ""}
              onChange={handleChange}
              placeholder="Porcentaje de empleados temporales (%)"
            />
            <FormInput
              name="cEmpleadosMujeres"
              value={formData.cEmpleadosMujeres || ""}
              onChange={handleChange}
              placeholder="Indique número total de mujeres empleadas en la empresa"
            />
            <FormInput
              name="cEmpleadosMujeresBoss"
              value={formData.cEmpleadosMujeresBoss || ""}
              onChange={handleChange}
              placeholder="Indique número de mujeres que ocupan cargos directivos. (Que pertenecen al consejo de administración y/o Gerencia)"
            />

            <RadioCheck
              label="¿Es una empresa familiar?"
              name="familiar"
              options={[
                {
                  value: "familiarTrue",
                  label: "Si",
                },
                { value: "familiarFalse", label: "No" },
              ]}
              initialValue={formData.familiar}
              onChange={handleRadioChange}
            />

            <RadioCheck
              label="¿Tiene la empresa implementado un proceso de innovación? 
                En caso de encontrarse formalmente establecido dicho proceso"
              name="proceso"
              options={[
                {
                  value: "empresaTrue",
                  label: "Si",
                },
                { value: "empresaFalse", label: "No" },
              ]}
              initialValue={formData.proceso}
              onChange={handleRadioChange}
            />

            <RadioCheck
              label="Seleccione si es importador o exportador *"
              name="tipoUsuario"
              options={[
                { value: "noAplica", label: "No aplica" },
                { value: "importador", label: "Importador" },
                {
                  value: "importadorExportador",
                  label: "Importador y exportador",
                },
                { value: "usuarioAduanero", label: "Usuario aduanero" },
              ]}
              initialValue={formData.tipoUsuario}
              onChange={handleRadioChange}
            />
            <RadioCheck
              label="¿Es aportante al sistema de seguridad y protección social? *"
              name="tipoAportante"
              options={[
                {
                  value: "aportanteTrue",
                  label:
                    "Si : Para este caso debe identificar tipo de aportante: Independientes, + o - de 200 trabajadores",
                },
                { value: "aportanteFalse", label: "No" },
              ]}
              initialValue={formData.tipoAportante}
              onChange={handleRadioChange}
            />
          </Stack>
        );
      case 5:
        return (
          <Stack spacing={2}>
            <FormInput
              name="actividadEconomica"
              value={formData.actividadEconomica || ""}
              onChange={handleChange}
              placeholder="Actividad económica No 1 - de acuerdo al CIIU -  (Debe hacer el mismo alistamiento de información en caso de que vaya a reportar varias actividades)"
              helperText={
                "Ingrese la descripción reportada en la página consultada para el CIIU"
              }
            />
            <FormInput
              name="codigoActividad"
              value={formData.codigoActividad || ""}
              onChange={handleChange}
              placeholder="Código Actividad económica No 1 - de acuerdo al CIIU -  (Debe hacer el mismo alistamiento de información en caso de que vaya a reportar varias actividades)"
              helperText={
                "Ingrese el código de la actividad económica reportado en la página consultada para el CIIU"
              }
            />
            <RadioCheck
              label="Indicar si corresponde a la actividad que genera los mayores ingresos*"
              name="mayoresIngresos"
              options={[
                {
                  value: "ingresosTrue",
                  label: "Si",
                },
                { value: "ingresosFalse", label: "No" },
              ]}
              initialValue={formData.mayoresIngresos}
              onChange={handleRadioChange}
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
    <Card style={{ marginTop: 20 }}>
      <Stepper activeStep={activeStep} sx={{ width: "100%" }}>
        {steps.map((step, index) => (
          <Step key={step}>
            <StepIndicator
              variant={activeStep <= index ? "soft" : "solid"}
              color={activeStep < index ? "neutral" : "primary"}
            >
              {activeStep <= index ? index + 1 : <Check />}
            </StepIndicator>
            <Typography onClick={() => setActiveStep(index)}>{step}</Typography>
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
