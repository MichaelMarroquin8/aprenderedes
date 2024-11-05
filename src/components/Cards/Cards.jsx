import { Box, Button, Stack, Typography } from "@mui/joy";
import { styled } from "@mui/system";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "src/services/firebase-config";

const Card = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "20px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  cursor: "pointer",
  width: "100%",
}));

const Cards = ({
  title,
  document,
  category,
  backgroundColor,
  children,
  onDownloadExcel,
  onDownloadPDF,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    nit: "",
  });
  const userId = localStorage.getItem("user");

  useEffect(() => {
    // Cargar datos guardados
    async function loadData() {
      const docRef = doc(firestore, "formularios", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    }
    loadData();
  }, [userId]);

  const handleCardClick = () => {
    navigate(`/dashboard/course/${document}`);
  };

  return (
    <Card sx={{ backgroundColor }} onClick={handleCardClick}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="textSecondary">
        {category}
      </Typography>
      <Stack direction="row" spacing={2} mt={2}>
        {children}
        {onDownloadExcel && (
          <Button
            variant="outlined"
            onClick={(e) => onDownloadExcel(e, formData)}
          >
            Descargar Excel
          </Button>
        )}
        {onDownloadPDF && (
          <Button
            variant="outlined"
            onClick={(e) => onDownloadPDF(e, formData)}
          >
            Descargar PDF
          </Button>
        )}
      </Stack>
    </Card>
  );
};

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  category: PropTypes.string.isRequired,
  document: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  onDownloadExcel: PropTypes.func,
  onDownloadPDF: PropTypes.func,
};

export default Cards;
