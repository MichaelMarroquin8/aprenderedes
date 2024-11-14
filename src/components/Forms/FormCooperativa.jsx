import {
  Alert,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  FormControl,
  FormLabel,
  List,
  ListItem,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as React from "react";
import { firestore } from "src/services/firebase-config";
import MultiCheck from "../Checks/Checkbox";
import CheckboxWithInput from "../Checks/CheckboxWithInput";
import RadioCheck from "../Checks/RadioCheck";
import CustomAutocomplete from "../Selects/CustomSelect";
import FormInput from "../TextFields/FormInput";
import { useNavigate } from "react-router-dom";
import FormDatePicker from "../Datepickers/FormDatePicker";

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

export default function FormCooperativa() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
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

  const handleSelectionTypeCo = (name, value) => {
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

  const handleMultiCheckChange = (name, selectedOptions) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOptions,
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
            <Alert severity="info">
              Información correspondiente al representante de la cooperativa
            </Alert>
            <CustomAutocomplete
              label="Tipo de documento"
              name="typeId"
              options={[
                {
                  value: "CC",
                  label: "Cédula de ciudadanía",
                  tooltip: "Documento oficial",
                },
                {
                  value: "CE",
                  label: "Cédula de Extranjería",
                  tooltip: "Documento para extranjeros",
                },
                {
                  value: "PP",
                  label: "Pasaporte",
                  tooltip: "Para viajar internacionalmente",
                },
                {
                  value: "TI",
                  label: "Tarjeta de identidad",
                  tooltip: "Documento para menores de edad",
                },
                {
                  value: "PE",
                  label: "Permiso Especial de Permanencia",
                  tooltip: "Para extranjeros con permiso",
                },
                {
                  value: "PPT",
                  label: "Permiso de protección temporal",
                  tooltip: "Permiso para refugiados",
                },
              ]}
              onSelectionChange={(name, value) =>
                handleSelectionTypeCo(name, value)
              }
              defaultO={formData.typeId}
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
              <ListItem>
                <a
                  href="https://www.ccc.org.co/sedevirtual/consulta-homonimia/"
                  target="_blank"
                >
                  <Typography color="#2e6ca6">
                    <strong>Verificar Homonimia</strong>
                  </Typography>
                </a>
              </ListItem>
              <ListItem>
                Allí debe ingresar por el espacio: REGISTRO DE ENTIDADES DE LA
                ECONOMÍA SOLIDARIA
              </ListItem>
            </List>
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={2}>
            <Alert severity="info">
              <List>
                <ListItem>
                  Ingrese en la plataforma de la CC a través del botón
                  identificado como Iniciar Matricula/Inscripción
                </ListItem>
                <ListItem>
                  <a
                    href="https://www.ccc.org.co/sedevirtual/consulta-homonimia/"
                    target="_blank"
                  >
                    <Typography color="#2e6ca6">
                      <strong>Verificar Homonimia</strong>
                    </Typography>
                  </a>
                </ListItem>
                <ListItem>
                  En esta parte del proceso, el sistema le genera el código
                  único del formulario - CUF - Tome nota de ello y consérvelo
                  para posteriores accesos
                </ListItem>
              </List>
            </Alert>
            <FormInput
              name="rSocial"
              value={formData.rSocial || ""}
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
            <Alert severity="info">
              Datos del Domicilio PRINCIPAL - COMERCIAL Estos datos deben
              coincidir con los registrados en el Registro Único Tributario -
              DIAN
            </Alert>
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
            <RadioCheck
              label="Zona"
              name="ubicacion"
              options={[
                {
                  value: "urbana",
                  label: "Urbana",
                },
                { value: "rural", label: "Rural" },
              ]}
              initialValue={formData.ubicacion}
              onChange={handleRadioChange}
            />

            <FormInput
              name="Cpostal"
              value={formData.Cpostal || ""}
              onChange={handleChange}
              placeholder="Código postal"
              helperText="En la plataforma de la CC esta pregunta no es obligatoria, si lo
                conoce es opcional responderlo"
            />
            <CustomAutocomplete
              label="Ubicación"
              name="ubicacion"
              options={[
                { value: "Local", label: "Local" },
                { value: "Oficina", label: "Oficina" },
                { value: "LocalY", label: "Local y oficina" },
                { value: "Fabrica", label: "Fábrica" },
                { value: "Finca", label: "Finca" },
                { value: "Vivienda", label: "Vivienda" },
              ]}
              onSelectionChange={(name, value) =>
                handleSelectionTypeCo(name, value)
              }
              defaultO={formData.ubicacion}
            />

            <Alert severity="info">
              Se requiere como mínimo un número telefónico fijo o celular para
              el envió de mensajes
            </Alert>
            <FormInput
              name="telefono"
              value={formData.telefono || ""}
              onChange={handleChange}
              placeholder="Teléfono"
            />
            <FormInput
              name="telefono2"
              value={formData.telefono2 || ""}
              onChange={handleChange}
              placeholder="Teléfono 2"
            />
            <FormInput
              name="telefono3"
              value={formData.telefono3 || ""}
              onChange={handleChange}
              placeholder="Teléfono 2"
            />
            <FormInput
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Correo Electrónico"
            />
            <Alert severity="info">
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
            </Alert>
            <RadioCheck
              label="De conformidad con lo establecido en el artículo 67 del Código
                de Procedimiento Administrativo y de lo Contencioso
                Administrativo, autorizo para que me notifiquen personalmente a
                través del correo electrónico aquí especificado * Si"
              name="articulo67"
              options={[
                {
                  value: "articulo67True",
                  label: "Si",
                },
                { value: "articulo67False", label: "No" },
              ]}
              initialValue={formData.articulo67}
              onChange={handleRadioChange}
            />
            <CustomAutocomplete
              label="Sede"
              name="sede"
              options={[
                { value: "Arriendo", label: "Arriendo" },
                { value: "Comodato", label: "Comodato" },
                { value: "Propia", label: "Propia" },
                { value: "Préstamo", label: "Préstamo" },
              ]}
              onSelectionChange={(name, value) =>
                handleSelectionTypeCo(name, value)
              }
              defaultO={formData.sede}
            />
          </Stack>
        );
      case 3:
        return (
          <Stack spacing={2}>
            <Alert severity="info">
              En los términos de la Ley, debe tomarse del balance de apertura o
              de los Estados Financieros con corte a 31 de diciembre del año
              anterior. Expresar las cifras en pesos colombianos. Datos sin
              decimales. A traves del icono + debe adicionar la información
              financiera, en la página de la CC de Cali.
            </Alert>
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
                <RadioCheck
                  label="Grupo NIIF"
                  name="familiar"
                  options={[
                    {
                      value: "entidades",
                      label:
                        "Entidades controlados por supersalud y supersubsidio",
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
                  initialValue={formData.familiar}
                  onChange={handleRadioChange}
                />
                <Alert severity="info">ESTADO DE RESULTADOS</Alert>
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
                  value: "activa",
                  label: "Activa : Indica que se encuentra en funcionamiento",
                },
                {
                  value: "etapaPreoperativa",
                  label:
                    "Etapa preoperativa: Se refiere a que aún no ha entrado en funcionamiento la cooperativa",
                },
                {
                  value: "enConcordato",
                  label: "En concordato : No aplica",
                },
                {
                  value: "intervenida",
                  label: "Intervenida: No aplica",
                },
                {
                  value: "enLiquidación",
                  label: "En liquidación: No aplica",
                },
                {
                  value: "acuerdoDeReestructuración",
                  label: "Acuerdo de reestructuración: No aplica",
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
            <Alert severity="info">
              Registre por orden de importancia la(s) actividad(es) económica(s)
              que va a desarrollar de acuerdo con la Clasificación Industrial
              Internacional Uniforme CIIU, indicando una actividad principal y
              máximo tres clasificaciones secundarias. Asimismo, seleccione la
              actividad con mayores ingresos con corte a 31 de diciembre del año
              anterior. Si la empresa tiene menos de un año de existencia,
              deberá ser con corte al mes inmediatamente anterior. Para
              verificar su código CIIU puede hacerlo a través del siguiente
              enlace:
              <a
                href="https://enlinea.ccc.org.co/appbusquedasciiu/#/auth/login?returnUrl=%2Fuser%2Fbuscador"
                target="_blank"
              >
                <Typography color="#2e6ca6">
                  <strong>Consultar Código CIIU</strong>
                </Typography>
              </a>
            </Alert>
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
            <FormDatePicker
              name="fechaInicio"
              value={formData.fechaInicio} // Enviar valor como cadena en formato "YYYY-MM-DD"
              onChange={(name, newValue) => handleInputChange(name, newValue)} // Usamos handleInputChange para manejar la fecha
              placeholder="Fecha de inicio de la actividad indicada"
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
      case 6:
        return (
          <Stack spacing={2}>
            <Alert severity="info">
              <List>
                <ListItem>
                  Persona jurídica: Una vez verificada la información del
                  Registro Único Tributario (RUT), manifiesto que la persona
                  jurídica que represento tiene las siguientes
                  responsabilidades, calidades y atributos tributarios:
                </ListItem>
                <ListItem>
                  Consulte
                  <a
                    href="https://www.vue.gov.co/cali/consulte/consulta-de-responsabilidades-tributarias"
                    target="_blank"
                  >
                    <Typography color="#2e6ca6" sx={{ ml: 0.5, mr: 0.5 }}>
                      <strong> Aquí </strong>
                    </Typography>
                  </a>
                  las responsabilidades tributarias, con el fin de evitar
                  inconsistencias en la asignación de su NIT por parte de la
                  DIAN
                </ListItem>
              </List>
            </Alert>
            <RadioCheck
              label="Confirmo que efectué la consulta de las responsabilidades tributarias en la herramienta que dispone la VUE*"
              name="confirmo"
              options={[
                {
                  value: "confirmoTrue",
                  label: "Si",
                },
                { value: "confirmoFalse", label: "No" },
              ]}
              initialValue={formData.confirmo}
              onChange={handleRadioChange}
            />
            <RadioCheck
              label="Responsabilidad, calidad y atributo* 
              Con base en la información acordada con el CONTADOR o el área que corresponda, indica la alternativa que les representa. En la serie de opciones o alternativas de respuesta que presenta la plataforma, algunos de los códigos no son consecutivos, al momento de la captura de información en la página de la CC"
              name="responsabilidad"
              options={[
                {
                  value: "option1",
                  label: "Aporte especial para la administración de justicia",
                },
                {
                  value: "option2",
                  label: "Gravamen a los movimientos financieros",
                },
                { value: "option3", label: "Impuesto al patrimonio" },
                {
                  value: "option4",
                  label:
                    "Impuesta de renta y complementario - régimen especial",
                },
                {
                  value: "option5",
                  label:
                    "Impuesta de renta y complementario - régimen ordinario",
                },
                { value: "option6", label: "Ingresos y patrimonio" },
                {
                  value: "option7",
                  label: "Retención en la fuente a titulo de renta",
                },
                { value: "option8", label: "Retención timbre nacional" },
                {
                  value: "option9",
                  label:
                    "Retención en la fuente en el impuesto sobre las ventas",
                },
                { value: "option14", label: " Informante de exógena" },
                {
                  value: "option16",
                  label:
                    "Obligación facturar por ingresos bienes y/o servicios excluidos",
                },
                { value: "option18", label: " Precios de transferencia" },
                {
                  value: "option19",
                  label: " Productos de vienes y o servicios excentos",
                },
                { value: "option20", label: " Obtención NIT Dto 3050 de 1997" },
                {
                  value: "option21",
                  label:
                    " Declara ingreso  o sali da del país de divisas o moneda legal",
                },
                {
                  value: "option22",
                  label:
                    " Obligado a cumplir deberes formales a nombre de terceros,",
                },
                {
                  value: "option23",
                  label: " Declaración consolidada precios de transferencia",
                },
                {
                  value: "option24",
                  label: " Declaración consolidada precios de transferencia",
                },
                {
                  value: "option26",
                  label: "Declaración individual precios de transferencia",
                },
                {
                  value: "option32",
                  label: "Impuesto Nacional a la Gasolina y al ACPM",
                },
                { value: "option33", label: "Impuesto Nacional al consumo" },
                { value: "option36", label: "Establecimiento permanente" },
                {
                  value: "option41",
                  label: "Declaración anual de activos en el exterior",
                },
                { value: "option42", label: "Obligado a llevar contabilidad" },
                {
                  value: "option46",
                  label: "IVA prestadores de servicios desde el exterior",
                },
                {
                  value: "option47",
                  label: "Régimen simplificado de tributación - Simple",
                },
                { value: "option48", label: "Impuesto sobre las ventas - IVA" },
                { value: "option49", label: "No responsable de IVA" },
                {
                  value: "option50",
                  label: "No responsable de consumo: Restaurantes y bares",
                },
                {
                  value: "option51",
                  label: "Agente retención de impoconsumo bienes inmuebles",
                },
                {
                  value: "option53",
                  label: "Persona Jurídica no responsable de IVA",
                },
                {
                  value: "option54",
                  label: "Intercambio Automático de Información CRS",
                },
                {
                  value: "option55",
                  label: "Informante Beneficiarios Finales",
                },
                { value: "option56", label: "Impuesto al Carbono" },
                {
                  value: "option57",
                  label:
                    "Persona Jurídica No Responsable del Impuesto al Consumo",
                },
              ]}
              initialValue={formData.responsabilidad}
              onChange={handleRadioChange}
            />
            <Alert severity="info">ANEXO 5.</Alert>
            <FormInput
              name="cHombres"
              value={formData.cHombres || ""}
              onChange={handleChange}
              placeholder="Número de mujeres"
            />
            <FormInput
              name="cMujeres"
              value={formData.cMujeres || ""}
              onChange={handleChange}
              placeholder="Número de hombres"
            />
            <FormInput
              name="cAsociados"
              value={formData.cAsociados || ""}
              onChange={handleChange}
              placeholder="Número de asociados"
              helperText={"Numero de mujeres + número de hombres"}
            />
            <FormInput
              name="entidad"
              value={formData.entidad || ""}
              onChange={handleChange}
              placeholder="Entidad acreditada que impartió el curso básico de economía solidaria"
              helperText={
                "Indicar el nombre de la entidad que le certificó el curso referido"
              }
            />
            <RadioCheck
              label="¿Requiere autorización de registro?
              (Aplica para las organizaciones especializadas de la economía solidaria)*"
              name="autorización"
              options={[
                {
                  value: "autorizaciónTrue",
                  label: "Sí: por ejemplo Ahorro y crédito, las integrales..",
                },
                { value: "autorizaciónFalse", label: "No" },
              ]}
              initialValue={formData.autorización}
              onChange={handleRadioChange}
            />
            <RadioCheck
              label="¿Pertenece a un Gremio?*
              En caso afirmativo debe indicar en la plataforma, el gremio al que pertenece"
              name="gremio"
              options={[
                {
                  value: "gremioTrue",
                  label: "Sí",
                },
                { value: "gremioFalse", label: "No" },
              ]}
              initialValue={formData.gremio}
              onChange={handleRadioChange}
            />
            {formData.gremio == "gremioTrue" && (
              <FormInput
                name="textGremio"
                value={formData.textGremio || ""}
                onChange={handleChange}
                placeholder="Gremio al que pertenece"
              />
            )}
            <RadioCheck
              label="¿Ha remitido la documentación al ente de inspección, vigilancia y control?*"
              name="documentacion"
              options={[
                {
                  value: "documentacionTrue",
                  label: "Sí",
                },
                { value: "documentacionFalse", label: "No" },
              ]}
              initialValue={formData.documentacion}
              onChange={handleRadioChange}
            />
            <Alert severity="info">
              CLASE DE LA ENTIDAD SIN ÁNIMO DE LUCRO.
            </Alert>
            <RadioCheck
              label="Clase de la entidad sin ánimo de lucro:"
              name="claseEntidad"
              options={[
                {
                  value: "claseEntidad1",
                  label: "Cooperativa de trabajo asociado",
                },
                {
                  value: "claseEntidadFalse",
                  label:
                    "Cooperativa de usuarios o de servicios a los asociados",
                },
                {
                  value: "claseEntidad2",
                  label: "Cooperativa especializada",
                },
                {
                  value: "claseEntidad3",
                  label: "Cooperativa Integral",
                },
                {
                  value: "claseEntidad4",
                  label:
                    "Cooperativa Multiactiva: Esta opción permitiría realizar diferentes opciones de actividades económicas",
                },
              ]}
              initialValue={formData.claseEntidad}
              onChange={handleRadioChange}
            />
            <RadioCheck
              label="Nombre de la entidad que ejerce inspección, vigilancia y control:*
              Debe seleccionar entre las opciones: SUPERINTENDENCIA DE ECONOMÍA SOLIDARIA"
              name="inspección"
              options={[
                {
                  value: "inspección",
                  label: "SUPERINTENDENCIA DE ECONOMÍA SOLIDARIA",
                },
              ]}
              initialValue={formData.inspección}
              onChange={handleRadioChange}
            />
            <Alert severity="info">INFORMACIÓN ADICIONAL</Alert>
            <RadioCheck
              label="¿Personas vinculadas a su entidad presentan alguna discapacidad?"
              name="discapacidad"
              options={[
                {
                  value: "discapacidadTrue",
                  label: "Si",
                },
                {
                  value: "discapacidadFalse",
                  label: "No",
                },
              ]}
              initialValue={formData.discapacidad}
              onChange={handleRadioChange}
            />
            <RadioCheck
              label="¿Personas vinculadas a su entidad pertenecen a una etnia?*"
              name="etnia"
              options={[
                {
                  value: "etniaTrue",
                  label:
                    "Sí: En caso afirmativo en la plataforma de la CC, debe indicar cuál ETNIA",
                },
                {
                  value: "etniaFalse",
                  label: "No",
                },
              ]}
              initialValue={formData.etnia}
              onChange={handleRadioChange}
            />
            <RadioCheck
              label="¿Personas vinculadas a su entidad pertenecen a un grupo LGBTI?*"
              name="lgbti"
              options={[
                {
                  value: "lgbtiTrue",
                  label: "Si",
                },
                {
                  value: "lgbtiFalse",
                  label: "No",
                },
              ]}
              initialValue={formData.lgbti}
              onChange={handleRadioChange}
            />
            <RadioCheck
              label="¿Cuenta con indicadores de gestión?"
              name="indicadoresDeGestión"
              options={[
                {
                  value: "indicadoresDeGestiónTrue",
                  label: "Si",
                },
                {
                  value: "indicadoresDeGestiónFalse",
                  label: "No",
                },
              ]}
              initialValue={formData.indicadoresDeGestión}
              onChange={handleRadioChange}
            />
            <RadioCheck
              label="¿Personas vinculadas a su entidad, tienen una condición de desplazados, víctimas o reinsertados?"
              name="reinsertados"
              options={[
                {
                  value: "desplazado",
                  label: "Desplazado",
                },
                {
                  value: "victima",
                  label: "Victima",
                },
                {
                  value: "reinsertado",
                  label: "Reinsertado",
                },
                {
                  value: "noAplica",
                  label: "No aplica",
                },
              ]}
              initialValue={formData.reinsertados}
              onChange={handleRadioChange}
            />
            <Alert severity="info">
              BIENES RAÍCES Detalle los bienes raíces que posea en cumplimiento
              del artículo 32 del Código de Comercio. Puede agregar más de un
              bien raíz.
            </Alert>
            <MultiCheck
              label="Información requerida por cada bien raíz a reportar*"
              name="bienRaiz"
              options={[
                { value: "Matricula", label: "Matricula" },
                { value: "Dirección", label: "Dirección" },
                { value: "País", label: "País" },
                { value: "Departamento", label: "Departamento" },
                { value: "Ciudad", label: "Ciudad" },
                { value: "Barrio", label: "Barrio" },
              ]}
              initialSelected={formData.bienRaiz}
              onChange={handleMultiCheckChange}
            />
          </Stack>
        );
      case 7:
        return (
          <Stack spacing={3}>
            <Alert severity="info">
              Una vez concluido el trámite hasta este punto, sigue el paso No 2
              correspondiente al proceso de firma, donde la imagen siguiente
              ilustra la etapa en la plataforma.
            </Alert>
            <Card sx={{ maxWidth: 500, mx: "auto" }}>
              <CardMedia
                component="img"
                height="300"
                image="/src/assets/images/FIRMA.png" // Reemplaza con la URL de tu imagen
                alt="Proceso de firma"
              />
            </Card>

            <Alert severity="info">PAGO</Alert>
            <Card sx={{ maxWidth: 500, mx: "auto" }}>
              <CardMedia
                component="img"
                height="300"
                image="/src/assets/images/PAGO.png" // Reemplaza con la URL de tu imagen
                alt="Pago"
              />
            </Card>

            <Alert severity="info">DESCARGUE DOCUMENTOS Y RECIBO DE PAGO</Alert>
            <Card sx={{ maxWidth: 500, mx: "auto" }}>
              <CardMedia
                component="img"
                height="300"
                image="/src/assets/images/Descargue.png" // Reemplaza con la URL de tu imagen
                alt="Descargar documentos"
              />
            </Card>
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
