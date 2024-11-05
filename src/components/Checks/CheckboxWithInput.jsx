import { Checkbox, FormControl, FormLabel, Stack, Input } from "@mui/joy";
import { useState, useEffect } from "react";

function CheckboxWithInput({ label, name, initialValue = "", onChange }) {
  const [checked, setChecked] = useState(initialValue !== "");
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Inicializar el valor en caso de que haya datos previos
    if (initialValue) {
      setValue(initialValue);
      setChecked(true);
    }
  }, [initialValue]);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onChange(name, isChecked ? value : ""); // Si se deselecciona, limpiar el valor
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setValue(inputValue);
    if (checked) {
      onChange(name, inputValue);
    }
  };

  return (
    <Stack spacing={1}>
      <FormControl>
        <FormLabel>
          <Checkbox checked={checked} onChange={handleCheckboxChange} />
          {label}
        </FormLabel>
      </FormControl>
      {checked && (
        <Input
          value={value}
          onChange={handleInputChange}
          placeholder={`Ingresa un valor en $ para ${label}`}
          fullWidth
        />
      )}
    </Stack>
  );
}

export default CheckboxWithInput;
