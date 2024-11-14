import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";

function RadioCheck({ label, name, options, initialValue, onChange }) {
  const [selectedValue, setSelectedValue] = useState(initialValue || "");

  useEffect(() => {
    // Establece el valor inicial si está definido
    if (initialValue) {
      setSelectedValue(initialValue);
    }
  }, [initialValue]);

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(name, value); // Notifica el cambio al componente padre
  };

  return (
    <FormControl
      component="fieldset"
      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
    >
      <FormLabel
        component="legend"
        sx={{ fontWeight: "bold", marginBottom: 1 }}
      >
        {label}
      </FormLabel>
      <RadioGroup
        value={selectedValue}
        onChange={handleRadioChange}
        name={name}
        sx={{ display: "flex", flexDirection: "row", gap: 2 }} // Alineación horizontal con espacio
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio size="small" />} // Control con tamaño pequeño
            label={option.label}
            sx={{ flexDirection: "row" }} // Asegura que los textos estén alineados correctamente
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioCheck;
