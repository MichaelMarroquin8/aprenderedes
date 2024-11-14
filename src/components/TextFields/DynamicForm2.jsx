import { Button, Grid, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import FormDatePicker from "../Datepickers/FormDatePicker";
import FormInput from "./FormInput"; // Tu componente FormInput

function DynamicForm2({ formData, setFormData }) {
  const handleInputChange = (index, name, value) => {
    console.log(index, name, value);
    // Si el campo es una fecha, asegúrate de pasarlo como cadena de texto formateada
    const updatedValue = name.includes("fecha") ? value : value;

    const updatedPersonas = [...formData.personas2]; // Crea una copia de personas2
    updatedPersonas[index] = {
      ...updatedPersonas[index],
      [name]: updatedValue,
    }; // Actualiza el campo de la persona
    setFormData((prevData) => ({
      ...prevData,
      personas2: updatedPersonas, // Actualiza personas2 en el estado
    }));
  };

  const handleAddPerson = () => {
    setFormData((prevData) => ({
      ...prevData,
      personas2: [
        ...(Array.isArray(prevData.personas2) ? prevData.personas2 : []),
        {
          nombre2: "",
          cc2: "",
          fecha2: "", // Inicializa fecha como cadena vacía
          nombre_suplente2: "",
          cc_suplente2: "",
          fecha_suplente2: "", // Inicializa fecha suplente como cadena vacía
        }, // Agrega una nueva persona con campos para Principales y Suplentes
      ],
    }));
  };

  return (
    <>
      <Stack sx={{ width: "96%" }} spacing={3}>
        {Array.isArray(formData.personas2) &&
          formData.personas2.map((persona, index) => (
            <Grid container spacing={3} key={index}>
              {/* Columna de Principales */}
              <Grid item xs={6}>
                <Typography variant="h6">Principal</Typography>
                <FormInput
                  name="nombre2"
                  value={persona.nombre2}
                  onChange={(e) =>
                    handleInputChange(index, e.target.name, e.target.value)
                  } // Maneja el cambio de nombre
                  placeholder="Nombre"
                />
                <FormInput
                  name="cc2"
                  type="number"
                  value={persona.cc2}
                  onChange={(e) =>
                    handleInputChange(index, e.target.name, e.target.value)
                  } // Maneja el cambio de cédula
                  placeholder="Cédula"
                />

                {/* Fecha de expedición */}
                <FormDatePicker
                  name="fecha2"
                  value={persona.fecha2} // Enviar valor como cadena en formato "YYYY-MM-DD"
                  onChange={(name, newValue) =>
                    handleInputChange(index, name, newValue)
                  } // Usamos handleInputChange para manejar la fecha
                  placeholder="Fecha de expedición"
                />
              </Grid>

              {/* Columna de Suplentes */}
              <Grid item xs={6}>
                <Typography variant="h6">Suplente</Typography>
                <FormInput
                  name="nombre_suplente2"
                  value={persona.nombre_suplente2}
                  onChange={(e) =>
                    handleInputChange(index, e.target.name, e.target.value)
                  } // Maneja el cambio de nombre suplente
                  placeholder="Nombre Suplente"
                />
                <FormInput
                  name="cc_suplente2"
                  type="number"
                  value={persona.cc_suplente2}
                  onChange={(e) =>
                    handleInputChange(index, e.target.name, e.target.value)
                  } // Maneja el cambio de cédula suplente
                  placeholder="Cédula Suplente"
                />

                {/* Fecha de expedición suplente */}
                <FormDatePicker
                  name="fecha_suplente2"
                  value={persona.fecha_suplente2} // Enviar valor como cadena en formato "YYYY-MM-DD"
                  onChange={(name, newValue) =>
                    handleInputChange(index, name, newValue)
                  } // Usamos handleInputChange para manejar la fecha
                  placeholder="Fecha de expedición Suplente"
                />
              </Grid>
            </Grid>
          ))}
      </Stack>
      <div>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
            pr: 4,
          }}
        >
          <Button variant="contained" onClick={handleAddPerson}>
            Agregar persona
          </Button>
        </Stack>
      </div>
    </>
  );
}

DynamicForm2.propTypes = {
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};

export default DynamicForm2;
