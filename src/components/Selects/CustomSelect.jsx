import InfoIcon from "@mui/icons-material/Info";
import { Autocomplete, TextField, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

export default function CustomAutocomplete({
  label,
  name,
  options = [], // Por defecto, un arreglo vacío para evitar errores
  onSelectionChange,
  defaultO = "", // Asegúrate de que defaultO tenga un valor por defecto
  isDisable = false,
}) {
  // Verifica que el valor inicial esté en las opciones o sea una cadena vacía
  const [selectedValue, setSelectedValue] = useState(
    options.some((option) => option.value === defaultO) ? defaultO : ""
  );

  // Cuando defaultO cambia, actualiza el estado solo si es válido
  useEffect(() => {
    if (options.some((option) => option.value === defaultO)) {
      setSelectedValue(defaultO);
    }
  }, [defaultO, options]);

  const handleChange = (event, newValue) => {
    setSelectedValue(newValue?.value || ""); // Actualiza el estado local
    if (onSelectionChange) {
      onSelectionChange(name, newValue?.value || ""); // Envía el valor seleccionado al padre
    }
  };

  return (
    <Autocomplete
      value={options.find((option) => option.value === selectedValue) || null}
      onChange={handleChange}
      disableClearable
      disabled={isDisable}
      options={options}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => <TextField {...params} label={label} />}
      isOptionEqualToValue={(option, value) => option.value === value?.value}
      renderOption={(props, option) => (
        <li {...props}>
          {option.tooltip ? (
            <Tooltip title={option.tooltip} arrow>
              <span style={{ display: "flex", alignItems: "center" }}>
                <InfoIcon style={{ color: "gray", marginRight: 8 }} />
                {option.label}
              </span>
            </Tooltip>
          ) : (
            option.label
          )}
        </li>
      )}
    />
  );
}
