import { Box, Grid, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
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
          </Grid>
        </Tabs>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
