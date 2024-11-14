import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "src/services/firebase-config";
import * as XLSX from "xlsx";

import Cards from "src/components/Cards/Cards";
import PdfModelo from "src/components/Doc/PdfModelo";
import pdfActa from "src/components/Doc/pdfActa";
import pdfConstanciaAprobacion from "src/components/Doc/pdfConstanciaAprobacion";
import pdfConstanciaGerente from "src/components/Doc/pdfConstanciaGerente";
import pdfLink from "src/components/Doc/pdfLink";
import pdfSolicitud from "src/components/Doc/pdfSolicitud";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [forms, setForms] = useState([]);
  const [tabValue, setTabValue] = useState(2);

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
    console.log(formData);
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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ pb: 3 }}
        >
          {categories.map((item, index) => (
            <Tab
              key={index}
              value={item.idCategory}
              label={item.nameCategory}
            />
          ))}
        </Tabs>
      </Box>
      {forms.map((form, index) => (
        <Box
          key={index}
          sx={{ display: form.category === tabValue ? "block" : "none" }}
        >
          <Cards
            index={form.category}
            value={form.category}
            document={form.document}
            title={form.nameForm}
            category={form.summary}
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
        </Box>
      ))}
    </Box>
  );
}
