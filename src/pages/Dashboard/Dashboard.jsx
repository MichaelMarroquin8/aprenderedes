import {
  Accordion,
  AccordionDetails,
  AccordionGroup,
  AccordionSummary,
  Grid,
  Tab,
  tabClasses,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";
import * as XLSX from "xlsx";
import { firestore } from "src/services/firebase-config";
import { lazy, Suspense, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import PdfModelo from "src/components/Doc/PdfModelo";
import pdfActa from "src/components/Doc/pdfActa";
import pdfSolicitud from "src/components/Doc/pdfSolicitud";
import pdfLink from "src/components/Doc/pdfLink";
import pdfConstanciaAprobacion from "src/components/Doc/pdfConstanciaAprobacion";
import pdfConstanciaGerente from "src/components/Doc/pdfConstanciaGerente";

const LazyCourseCard = lazy(() => import("src/components/Cards/Cards"));

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [forms, setForms] = useState([]);
  const [tabValue, setTabValue] = useState("Generalidades");

  const userId = localStorage.getItem("user");

  useEffect(() => {
    const fetchDataCategory = async () => {
      const querySnapshot = await getDocs(collection(firestore, "Category"));
      setCategories(querySnapshot.docs.map((doc) => doc.data()));
    };
    const fetchForms = async () => {
      const querySnapshot = await getDocs(collection(firestore, "Forms"));
      setForms(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchDataCategory();
    fetchForms();
  }, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Función para obtener los datos de usuario desde Firebase
  const getCooperativaFormData = async () => {
    const docRef = doc(firestore, "formularios", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  // Función para descargar un archivo Excel
  const downloadExcel = async (event) => {
    event.stopPropagation();
    const formData = await getCooperativaFormData(); // Obtener datos actualizados
    if (formData) {
      const worksheet = XLSX.utils.json_to_sheet([formData]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "form-data.xlsx");
    } else {
      console.log("No se encontraron datos del formulario");
    }
  };

  // Función para obtener los datos de usuario desde Firebase
  const getModelo = async () => {
    const docRef = doc(firestore, "modelo", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  // Función para descargar un archivo PDF
  const modeloPDF = async (event) => {
    event.stopPropagation();
    const formData = await getModelo(); // Obtener datos actualizados
    if (formData) {
      PdfModelo({
        data: formData,
      });
    } else {
      console.log("No se encontraron datos del formulario");
    }
  };

  // Función para obtener los datos de usuario desde Firebase
  const getActa = async () => {
    const docRef = doc(firestore, "acta", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  // Función para descargar un archivo PDF
  const actaPDF = async (event) => {
    event.stopPropagation();
    const formData = await getActa(); // Obtener datos actualizados
    if (formData) {
      pdfActa({
        data: formData,
      });
    } else {
      console.log("No se encontraron datos del formulario");
    }
  };

  // Función para obtener los datos de usuario desde Firebase
  const getSolicitud = async () => {
    const docRef = doc(firestore, "solicitud", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  // Función para descargar un archivo PDF
  const solicitudPDF = async (event) => {
    event.stopPropagation();
    const formData = await getSolicitud(); // Obtener datos actualizados
    pdfSolicitud({
      data: formData,
    });
  };

  // Función para descargar un archivo PDF
  const linkPDF = async (event) => {
    event.stopPropagation();
    pdfLink();
  };

  // Función para obtener los datos de usuario desde Firebase
  const getConstanciaAprobacion = async () => {
    const docRef = doc(firestore, "constanciaAprobacion", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  // Función para descargar un archivo PDF
  const constanciaAprobacionPDF = async (event) => {
    event.stopPropagation();
    const formData = await getConstanciaAprobacion(); // Obtener datos actualizados
    if (formData) {
      pdfConstanciaAprobacion({
        data: formData,
      });
    } else {
      console.log("No se encontraron datos del formulario");
    }
  };

  // Función para obtener los datos de usuario desde Firebase
  const getConstanciaGerente = async () => {
    const docRef = doc(firestore, "constanciaGerente", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  };

  // Función para descargar un archivo PDF
  const constanciaGerentePDF = async (event) => {
    event.stopPropagation();
    const formData = await getConstanciaGerente(); // Obtener datos actualizados
    if (formData) {
      pdfConstanciaGerente({
        data: formData,
      });
    } else {
      console.log("No se encontraron datos del formulario");
    }
  };

  return (
    <div>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Diligencia formularios
      </Typography>
      <Tabs value={tabValue} onChange={handleChange}>
        <TabList
          tabFlex={1}
          disableUnderline
          sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: "xl",
            bgcolor: "background.level1",
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: "sm",
              bgcolor: "background.surface",
            },
          }}
        >
          {categories.map((item) => (
            <Tab
              key={item.nameCategory}
              value={item.nameCategory}
              disableIndicator
            >
              {item.nameCategory}
            </Tab>
          ))}
        </TabList>
        <Grid container spacing={3}>
          {forms.map((form, index) => (
            <TabPanel key={index} value={form.category}>
              <Suspense fallback={<div>Loading...</div>}>
                <LazyCourseCard
                  document={form.document}
                  title={form.nameForm}
                  category={form.summary}
                  backgroundColor="#FDECEC"
                  onDownloadExcel={form.type === "excel" ? downloadExcel : null}
                  onDownloadPDF={
                    form.document === "modelo"
                      ? modeloPDF
                      : form.document === "acta"
                      ? actaPDF
                      : form.document === "solicitud"
                      ? solicitudPDF
                      : form.document === "link"
                      ? linkPDF
                      : form.document === "constanciaGerente"
                      ? constanciaGerentePDF
                      : form.document === "constanciaAprobacion"
                      ? constanciaAprobacionPDF
                      : null
                  }
                />
              </Suspense>
            </TabPanel>
          ))}
          <TabPanel value={"Capacitación"}>
            <AccordionGroup>
              <Accordion>
                <AccordionSummary>
                  TECNOLÓGICA TECNOLOGÍAS DE GESTIÓN ADMINISTRATIVA Y SERVICIOS
                  FINANCIEROS
                </AccordionSummary>
                <AccordionDetails>
                  <strong>DESCRIPCIÓN</strong>
                  02 IDENTIFICAR LOS DIFERENTES TIPOS DE ORGANIZACIONES
                  SOLIDARIAS DE ACUERDO CON LAS ALTERNATIVAS DE LOS GRUPOS DE
                  INTERÉS, NORMATIVA VIGENTE Y UNIDAD ESTRATÉGICA DE NEGOCIO.
                  <br />
                  05 PROPONER ACCIONES DE MEJORA A LA ORGANIZACIÓN SELECCIONADA
                  TENIENDO EN CUENTA LAS POLÍTICAS, NORMATIVA, ASPECTOS
                  SOCIOECONÓMICOS, CULTURALES, AMBIENTALES Y TECNOLÓGICOS.
                  <br />
                  01 INTERPRETAR LOS COMPONENTES DE LA CULTURA, FILOSOFÍA Y
                  PRINCIPIOS DE LA ECONOMÍA SOLIDARIA TENIENDO EN LA CUENTA LA
                  NORMATIVA LEGAL VIGENTE Y EL CONTEXTO SOCIO ECONÓMICO DE LA
                  POBLACIÓN OBJETO DE LA FORMACIÓN EN EL EMPRENDIMIENTO
                  SOLIDARIO.
                  <br />
                  03 DETERMINAR EL TIPO DE ORGANIZACIÓN, ESTRUCTURA, CONTEXTO
                  ADMINISTRATIVO, ÓRGANOS DE VIGILANCIA Y CONTROL, TENIENDO EN
                  CUENTA LAS NECESIDADES DEL GRUPO DE INTERÉS Y LA NORMATIVA
                  LEGAL VIGENTE.
                  <br />
                  04 VERIFICAR LOS REQUISITOS DE LA PROPUESTA DEL TIPO DE
                  ORGANIZACIÓN SOLIDARIA, TENIENDO EN CUENTA LAS NECESIDADES DEL
                  GRUPO DE INTERÉS, NORMATIVA VIGENTE Y LOS PRINCIPIOS DE
                  ECONOMÍA SOLIDARIA Y DE ADMINISTRACIÓN.
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary>
                  TECNOLÓGICA TECNOLOGÍAS DE GESTIÓN ADMINISTRATIVA Y SERVICIOS
                  FINANCIEROS
                </AccordionSummary>
                <AccordionDetails>
                  <strong>DESCRIPCIÓN</strong>
                  02 IDENTIFICAR LOS DIFERENTES TIPOS DE ORGANIZACIONES
                  SOLIDARIAS DE ACUERDO CON LAS ALTERNATIVAS DE LOS GRUPOS DE
                  INTERÉS, NORMATIVA VIGENTE Y UNIDAD ESTRATÉGICA DE NEGOCIO.
                  <br />
                  05 PROPONER ACCIONES DE MEJORA A LA ORGANIZACIÓN SELECCIONADA
                  TENIENDO EN CUENTA LAS POLÍTICAS, NORMATIVA, ASPECTOS
                  SOCIOECONÓMICOS, CULTURALES, AMBIENTALES Y TECNOLÓGICOS.
                  <br />
                  01 INTERPRETAR LOS COMPONENTES DE LA CULTURA, FILOSOFÍA Y
                  PRINCIPIOS DE LA ECONOMÍA SOLIDARIA TENIENDO EN LA CUENTA LA
                  NORMATIVA LEGAL VIGENTE Y EL CONTEXTO SOCIO ECONÓMICO DE LA
                  POBLACIÓN OBJETO DE LA FORMACIÓN EN EL EMPRENDIMIENTO
                  SOLIDARIO.
                  <br />
                  03 DETERMINAR EL TIPO DE ORGANIZACIÓN, ESTRUCTURA, CONTEXTO
                  ADMINISTRATIVO, ÓRGANOS DE VIGILANCIA Y CONTROL, TENIENDO EN
                  CUENTA LAS NECESIDADES DEL GRUPO DE INTERÉS Y LA NORMATIVA
                  LEGAL VIGENTE.
                  <br />
                  04 VERIFICAR LOS REQUISITOS DE LA PROPUESTA DEL TIPO DE
                  ORGANIZACIÓN SOLIDARIA, TENIENDO EN CUENTA LAS NECESIDADES DEL
                  GRUPO DE INTERÉS, NORMATIVA VIGENTE Y LOS PRINCIPIOS DE
                  ECONOMÍA SOLIDARIA Y DE ADMINISTRACIÓN.
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary>
                  TECNOLÓGICA TECNOLOGÍAS DE GESTIÓN ADMINISTRATIVA Y SERVICIOS
                  FINANCIEROS
                </AccordionSummary>
                <AccordionDetails>
                  <strong>DESCRIPCIÓN</strong>
                  02 IDENTIFICAR LOS DIFERENTES TIPOS DE ORGANIZACIONES
                  SOLIDARIAS DE ACUERDO CON LAS ALTERNATIVAS DE LOS GRUPOS DE
                  INTERÉS, NORMATIVA VIGENTE Y UNIDAD ESTRATÉGICA DE NEGOCIO.
                  <br />
                  05 PROPONER ACCIONES DE MEJORA A LA ORGANIZACIÓN SELECCIONADA
                  TENIENDO EN CUENTA LAS POLÍTICAS, NORMATIVA, ASPECTOS
                  SOCIOECONÓMICOS, CULTURALES, AMBIENTALES Y TECNOLÓGICOS.
                  <br />
                  01 INTERPRETAR LOS COMPONENTES DE LA CULTURA, FILOSOFÍA Y
                  PRINCIPIOS DE LA ECONOMÍA SOLIDARIA TENIENDO EN LA CUENTA LA
                  NORMATIVA LEGAL VIGENTE Y EL CONTEXTO SOCIO ECONÓMICO DE LA
                  POBLACIÓN OBJETO DE LA FORMACIÓN EN EL EMPRENDIMIENTO
                  SOLIDARIO.
                  <br />
                  03 DETERMINAR EL TIPO DE ORGANIZACIÓN, ESTRUCTURA, CONTEXTO
                  ADMINISTRATIVO, ÓRGANOS DE VIGILANCIA Y CONTROL, TENIENDO EN
                  CUENTA LAS NECESIDADES DEL GRUPO DE INTERÉS Y LA NORMATIVA
                  LEGAL VIGENTE.
                  <br />
                  04 VERIFICAR LOS REQUISITOS DE LA PROPUESTA DEL TIPO DE
                  ORGANIZACIÓN SOLIDARIA, TENIENDO EN CUENTA LAS NECESIDADES DEL
                  GRUPO DE INTERÉS, NORMATIVA VIGENTE Y LOS PRINCIPIOS DE
                  ECONOMÍA SOLIDARIA Y DE ADMINISTRACIÓN.
                </AccordionDetails>
              </Accordion>
            </AccordionGroup>
          </TabPanel>
        </Grid>
      </Tabs>
    </div>
  );
};

export default Dashboard;
