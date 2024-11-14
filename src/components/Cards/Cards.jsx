import { Box, Button, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { doc, getDoc } from "firebase/firestore";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from "src/services/firebase-config";

const OuterCard = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor:
    theme.palette.mode === "light"
      ? "rgba(255, 255, 255, 0.4)"
      : "rgba(0, 0, 0, 0.4)",
  WebkitBackdropFilter: "blur(240px)",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "30px",
  height: "99%",
  width: "99%",
  boxShadow:
    theme.palette.mode === "light"
      ? `0 2px 15px rgb(161, 214, 135), 0 0 2px rgb(64, 153, 101)`
      : `0 2px 15px rgba(85, 166, 246, 0.5), 0 0 2px rgba(85, 166, 246, 0.3)`,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  border: "-1px solid",
  borderColor: "divider",
  cursor: "pointer",
}));

const Cards = ({
  title,
  document,
  category,
  onDownloadExcel,
  onDownloadPDF,
  value,
  index,
  ...other
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
    if (document != "link") {
      navigate(`/dashboard/formulario/${document}`);
    }
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <OuterCard onClick={handleCardClick}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {category}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "flex-end", width: "100%" }}
          >
            {onDownloadExcel && (
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownloadExcel(e, formData);
                }}
              >
                Descargar Excel
              </Button>
            )}
            {onDownloadPDF && (
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownloadPDF(e, formData);
                }}
              >
                Descargar PDF
              </Button>
            )}
          </Stack>
        </OuterCard>
      )}
    </div>
  );
};

Cards.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  document: PropTypes.string.isRequired,
  onDownloadExcel: PropTypes.func,
  onDownloadPDF: PropTypes.func,
};

export default Cards;
