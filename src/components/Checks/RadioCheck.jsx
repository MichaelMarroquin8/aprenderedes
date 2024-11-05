import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/joy";
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
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        value={selectedValue}
        onChange={handleRadioChange}
        name={name}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            variant="outlined"
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default RadioCheck;
