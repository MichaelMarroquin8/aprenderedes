import { Box, Typography, Button, Stack } from "@mui/joy";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // Importar XLSX para generar archivos Excel
import { jsPDF } from "jspdf"; // Importar jsPDF para generar PDF
import { useEffect, useState } from "react";
import { firestore } from "src/services/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const Card = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "20px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
}));

const Cards = ({ title, document, category, backgroundColor }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/dashboard/course/${document}`);
  };

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
      const docRef = doc(firestore, "formularios", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    }
    loadData();
  }, [userId]);

  // Función para descargar un archivo Excel
  const downloadExcel = (event) => {
    event.stopPropagation(); // Evitar que el clic en el botón propague el evento al Card

    const data = [
      { Name: "John", Age: 28, Gender: "Male" },
      { Name: "Jane", Age: 32, Gender: "Female" },
    ]; // Datos de ejemplo, puedes cambiarlos con los datos que desees exportar

    console.log(formData)
    const worksheet = XLSX.utils.json_to_sheet([formData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `${title}-data.xlsx`); // Nombre del archivo Excel
  };

  // Función para descargar un archivo PDF
  const downloadPDF = (event) => {
    event.stopPropagation(); // Evitar que el clic en el botón propague el evento al Card
    const doc = new jsPDF();
    doc.text(`Course: ${title}`, 10, 10); // Texto de ejemplo en el PDF
    doc.text(`Category: ${category}`, 10, 20);

    doc.save(`${title}-data.pdf`); // Nombre del archivo PDF
  };

  return (
    <Card sx={{ backgroundColor }} onClick={handleCardClick}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="textSecondary">
        {category}
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        {/* Botón para descargar Excel */}
        <Button variant="outlined" onClick={downloadExcel}>
          Descargar Excel
        </Button>
        {/* Botón para descargar PDF */}
        <Button variant="outlined" onClick={downloadPDF}>
          Descargar PDF
        </Button>
      </Stack>
    </Card>
  );
};

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  document: PropTypes.string.isRequired,
  students: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  backgroundColor: PropTypes.string,
};

export default Cards;
