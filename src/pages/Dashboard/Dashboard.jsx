import { Box, Grid, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";

import { styled } from "@mui/joy/styles";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { collection, getDocs } from "firebase/firestore";
import { lazy, Suspense, useEffect, useState } from "react";
import { firestore } from "src/services/firebase-config";

// Lazy load CourseCard
const LazyCourseCard = lazy(() => import("src/components/Cards/Cards"));

const Dashboard = () => {
  const [categories, setCategories] = useState([]); // Mejor manejo del estado
  const [forms, setForms] = useState([]); // Mejor manejo del estado
  const [tabValue, setTabValue] = useState("Generalidades"); // Usar un string o identificador único

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchDataCategory = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "Category"));
      const dataList = querySnapshot.docs.map((doc) => doc.data());
      setCategories(dataList);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchForms = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "Forms"));
      const dataList = querySnapshot.docs.map((doc) => doc.data());
      setForms(dataList);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    fetchDataCategory();
    fetchForms();
  }, []);

  const DashboardContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.body,
    minHeight: "100vh",
  }));

  console.log(forms);
  return (
    <DashboardContainer>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Diligencia formularios
      </Typography>
      {!categories && !forms ? (
        <div>cargando</div>
      ) : (
        <Tabs
          aria-label="tabs"
          value={tabValue}
          onChange={handleChange}
          sx={{ bgcolor: "transparent" }}
        >
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
                    key={form.nameForm}
                    document={form.document}
                    title={form.nameForm}
                    category={form.summary}
                    backgroundColor="#FDECEC"
                  />
                </Suspense>
              </TabPanel>
            ))}
            <TabPanel value={"Capacitación"}>
              <AccordionGroup>
                <Accordion>
                  <AccordionSummary>
                    TECNOLÓGICA TECNOLOGÍAS DE GESTIÓN ADMINISTRATIVA Y
                    SERVICIOS FINANCIEROS
                  </AccordionSummary>
                  <AccordionDetails>
                    <strong>DESCRIPCIÓN</strong>
                    02 IDENTIFICAR LOS DIFERENTES TIPOS DE ORGANIZACIONES
                    SOLIDARIAS DE ACUERDO CON LAS ALTERNATIVAS DE LOS GRUPOS DE
                    INTERÉS, NORMATIVA VIGENTE Y UNIDAD ESTRATÉGICA DE NEGOCIO.
                    <br />
                    05 PROPONER ACCIONES DE MEJORA A LA ORGANIZACIÓN
                    SELECCIONADA TENIENDO EN CUENTA LAS POLÍTICAS, NORMATIVA,
                    ASPECTOS SOCIOECONÓMICOS, CULTURALES, AMBIENTALES Y
                    TECNOLÓGICOS.
                    <br />
                    01 INTERPRETAR LOS COMPONENTES DE LA CULTURA, FILOSOFÍA Y
                    PRINCIPIOS DE LA ECONOMÍA SOLIDARIA TENIENDO EN LA CUENTA LA
                    NORMATIVIDAD LEGAL VIGENTE Y EL CONTEXTO SOCIO ECONÓMICO DE
                    LA POBLACIÓN OBJETO DE LA FORMACIÓN EN EL EMPRENDIMIENTO
                    SOLIDARIO.
                    <br />
                    03 DETERMINAR EL TIPO DE ORGANIZACIÓN, ESTRUCTURA, CONTEXTO
                    ADMINISTRATIVO, ÓRGANOS DE VIGILANCIA Y CONTROL, TENIENDO EN
                    CUENTA LAS NECESIDADES DEL GRUPO DE INTERÉS Y LA NORMATIVA
                    LEGAL VIGENTE.
                    <br />
                    04 VERIFICAR LOS REQUISITOS DE LA PROPUESTA DEL TIPO DE
                    ORGANIZACIÓN SOLIDARIA, TENIENDO EN CUENTA LAS NECESIDADES
                    DEL GRUPO DE INTERÉS, NORMATIVA VIGENTE Y LOS PRINCIPIOS DE
                    ECONOMÍA SOLIDARIA Y DE ADMINISTRACIÓN.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>
                    TECNOLÓGICA TECNOLOGÍAS DE GESTIÓN ADMINISTRATIVA Y
                    SERVICIOS FINANCIEROS
                  </AccordionSummary>
                  <AccordionDetails>
                    <strong>DESCRIPCIÓN</strong>
                    02 IDENTIFICAR LOS DIFERENTES TIPOS DE ORGANIZACIONES
                    SOLIDARIAS DE ACUERDO CON LAS ALTERNATIVAS DE LOS GRUPOS DE
                    INTERÉS, NORMATIVA VIGENTE Y UNIDAD ESTRATÉGICA DE NEGOCIO.
                    <br />
                    05 PROPONER ACCIONES DE MEJORA A LA ORGANIZACIÓN
                    SELECCIONADA TENIENDO EN CUENTA LAS POLÍTICAS, NORMATIVA,
                    ASPECTOS SOCIOECONÓMICOS, CULTURALES, AMBIENTALES Y
                    TECNOLÓGICOS.
                    <br />
                    01 INTERPRETAR LOS COMPONENTES DE LA CULTURA, FILOSOFÍA Y
                    PRINCIPIOS DE LA ECONOMÍA SOLIDARIA TENIENDO EN LA CUENTA LA
                    NORMATIVIDAD LEGAL VIGENTE Y EL CONTEXTO SOCIO ECONÓMICO DE
                    LA POBLACIÓN OBJETO DE LA FORMACIÓN EN EL EMPRENDIMIENTO
                    SOLIDARIO.
                    <br />
                    03 DETERMINAR EL TIPO DE ORGANIZACIÓN, ESTRUCTURA, CONTEXTO
                    ADMINISTRATIVO, ÓRGANOS DE VIGILANCIA Y CONTROL, TENIENDO EN
                    CUENTA LAS NECESIDADES DEL GRUPO DE INTERÉS Y LA NORMATIVA
                    LEGAL VIGENTE.
                    <br />
                    04 VERIFICAR LOS REQUISITOS DE LA PROPUESTA DEL TIPO DE
                    ORGANIZACIÓN SOLIDARIA, TENIENDO EN CUENTA LAS NECESIDADES
                    DEL GRUPO DE INTERÉS, NORMATIVA VIGENTE Y LOS PRINCIPIOS DE
                    ECONOMÍA SOLIDARIA Y DE ADMINISTRACIÓN.
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>
                    TECNOLÓGICA TECNOLOGÍAS DE GESTIÓN ADMINISTRATIVA Y
                    SERVICIOS FINANCIEROS
                  </AccordionSummary>
                  <AccordionDetails>
                    <strong>DESCRIPCIÓN</strong>
                    02 IDENTIFICAR LOS DIFERENTES TIPOS DE ORGANIZACIONES
                    SOLIDARIAS DE ACUERDO CON LAS ALTERNATIVAS DE LOS GRUPOS DE
                    INTERÉS, NORMATIVA VIGENTE Y UNIDAD ESTRATÉGICA DE NEGOCIO.
                    <br />
                    05 PROPONER ACCIONES DE MEJORA A LA ORGANIZACIÓN
                    SELECCIONADA TENIENDO EN CUENTA LAS POLÍTICAS, NORMATIVA,
                    ASPECTOS SOCIOECONÓMICOS, CULTURALES, AMBIENTALES Y
                    TECNOLÓGICOS.
                    <br />
                    01 INTERPRETAR LOS COMPONENTES DE LA CULTURA, FILOSOFÍA Y
                    PRINCIPIOS DE LA ECONOMÍA SOLIDARIA TENIENDO EN LA CUENTA LA
                    NORMATIVIDAD LEGAL VIGENTE Y EL CONTEXTO SOCIO ECONÓMICO DE
                    LA POBLACIÓN OBJETO DE LA FORMACIÓN EN EL EMPRENDIMIENTO
                    SOLIDARIO.
                    <br />
                    03 DETERMINAR EL TIPO DE ORGANIZACIÓN, ESTRUCTURA, CONTEXTO
                    ADMINISTRATIVO, ÓRGANOS DE VIGILANCIA Y CONTROL, TENIENDO EN
                    CUENTA LAS NECESIDADES DEL GRUPO DE INTERÉS Y LA NORMATIVA
                    LEGAL VIGENTE.
                    <br />
                    04 VERIFICAR LOS REQUISITOS DE LA PROPUESTA DEL TIPO DE
                    ORGANIZACIÓN SOLIDARIA, TENIENDO EN CUENTA LAS NECESIDADES
                    DEL GRUPO DE INTERÉS, NORMATIVA VIGENTE Y LOS PRINCIPIOS DE
                    ECONOMÍA SOLIDARIA Y DE ADMINISTRACIÓN.
                  </AccordionDetails>
                </Accordion>
              </AccordionGroup>
            </TabPanel>
          </Grid>
        </Tabs>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
