import { Checkbox, FormControl, FormLabel, Stack } from "@mui/joy";
import { useState } from "react";

function MultiCheck({ label, options, name, initialSelected = [], onChange }) {
  const [selectedOptions, setSelectedOptions] = useState(
    new Set(initialSelected)
  );

  const handleCheckboxChange = (optionValue) => {
    const newSelectedOptions = new Set(selectedOptions);
    if (newSelectedOptions.has(optionValue)) {
      newSelectedOptions.delete(optionValue); // Desmarca si ya estaba seleccionada
    } else {
      newSelectedOptions.add(optionValue); // Marca si no estaba seleccionada
    }

    setSelectedOptions(newSelectedOptions);
    onChange(name, Array.from(newSelectedOptions)); // Llama a onChange con las opciones seleccionadas
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Stack spacing={1}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            checked={selectedOptions.has(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
            label={option.label}
          />
        ))}
      </Stack>
    </FormControl>
  );
}

export default MultiCheck;
